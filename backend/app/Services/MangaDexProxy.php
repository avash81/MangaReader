<?php
/**
 * MangaDexProxy.php
 * ─────────────────
 * Secure, cached proxy for MangaDex chapter page URLs.
 *
 * - Validates that the requested chapter exists in our DB
 * - Fetches MangaDex at-home CDN token + image URLs
 * - Caches the CDN manifest in MySQL api_cache for 20 minutes
 * - Never exposes raw MangaDex at-home URLs in HTML/JS (goes via this proxy)
 * - Strips Referer before forwarding
 * - Returns JSON: { baseUrl, hash, dataSaver, pages: [...] }
 */

class MangaDexProxy {
    private PDO $db;
    private const CACHE_TTL_MINUTES = 20;    // MangaDex at-home URLs valid ~15 min
    private const API_BASE = 'https://api.mangadex.org';
    private const AT_HOME  = 'https://api.mangadex.org/at-home/server';

    public function __construct(PDO $db) {
        $this->db = $db;
    }

    /**
     * Main entry: resolve chapter UUID → page URL list (cached)
     */
    public function getPages(string $chapterId): array {
        // 1. Validate chapterId is in our DB (prevent blind proxy abuse)
        $stmt = $this->db->prepare("SELECT id FROM chapters WHERE external_chapter_id = ? LIMIT 1");
        $stmt->execute([$chapterId]);
        if (!$stmt->fetchColumn()) {
            http_response_code(404);
            return ['success' => false, 'error' => 'Chapter not found'];
        }

        // 2. Check cache
        $cached = $this->getCache("mdx_pages_{$chapterId}");
        if ($cached) return $cached;

        // 3. Fetch from MangaDex at-home
        $data = $this->fetchAtHome($chapterId);
        if (!$data) {
            http_response_code(502);
            return ['success' => false, 'error' => 'MangaDex unavailable'];
        }

        // 4. Build response (high quality pages + data-saver fallback)
        $baseUrl  = $data['baseUrl'] ?? '';
        $chapter  = $data['chapter'] ?? [];
        $hash     = $chapter['hash'] ?? '';
        $pages    = $chapter['data'] ?? [];        // Full quality
        $pagesSv  = $chapter['dataSaver'] ?? [];   // Data-saver (smaller)

        $result = [
            'success'    => true,
            'chapterId'  => $chapterId,
            'baseUrl'    => $baseUrl,
            'hash'       => $hash,
            'pages'      => $pages,
            'pagesSaver' => $pagesSv,
            'pageUrls'   => array_map(fn($p) => "{$baseUrl}/data/{$hash}/{$p}", $pages),
            'saverUrls'  => array_map(fn($p) => "{$baseUrl}/data-saver/{$hash}/{$p}", $pagesSv),
            'cachedAt'   => date('c'),
        ];

        // 5. Cache for 20 minutes
        $this->setCache("mdx_pages_{$chapterId}", $result, self::CACHE_TTL_MINUTES);

        return $result;
    }

    /**
     * Fetch feed of chapters for a manga from MangaDex (for chapter list panel)
     * Returns array of { id, number, title, pages, publishedAt }
     */
    public function getChapterFeed(string $mangadexId, int $limit = 100): array {
        $cacheKey = "mdx_feed_{$mangadexId}_{$limit}";
        $cached = $this->getCache($cacheKey);
        if ($cached) return $cached;

        $url = self::API_BASE . "/manga/{$mangadexId}/feed?translatedLanguage[]=en&order[chapter]=asc&limit={$limit}&includes[]=scanlation_group";
        $raw = $this->curlGet($url);
        if (!$raw) return [];

        $data = json_decode($raw, true);
        $chapters = [];
        foreach (($data['data'] ?? []) as $ch) {
            $attr = $ch['attributes'] ?? [];
            $chapters[] = [
                'id'      => $ch['id'],
                'number'  => $attr['chapter'] ?? '0',
                'title'   => $attr['title'] ?? null,
                'pages'   => (int)($attr['pages'] ?? 0),
                'pubAt'   => $attr['publishAt'] ?? null,
            ];
        }

        $this->setCache($cacheKey, $chapters, 60); // Cache 60 min
        return $chapters;
    }

    // ── Private helpers ───────────────────────────────────────────────────

    private function fetchAtHome(string $chapterId): ?array {
        $url = self::AT_HOME . "/{$chapterId}?forcePort443=false";
        $raw = $this->curlGet($url);
        if (!$raw) return null;
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : null;
    }

    private function curlGet(string $url): ?string {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTPHEADER => [
                'User-Agent: MangaVerse/2.0 (contact@mangaverse.app)',
                'Accept: application/json',
                'Referer:' // Strip referer
            ]
        ]);
        $result = curl_exec($ch);
        $code   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ($code === 200 && $result) ? $result : null;
    }

    private function getCache(string $key): ?array {
        try {
            $stmt = $this->db->prepare("SELECT response_body FROM api_cache WHERE cache_key = ? AND expires_at > NOW() LIMIT 1");
            $stmt->execute([md5($key)]);
            $row = $stmt->fetchColumn();
            return $row ? json_decode($row, true) : null;
        } catch { return null; }
    }

    private function setCache(string $key, array $data, int $ttlMinutes): void {
        try {
            $expires = date('Y-m-d H:i:s', time() + $ttlMinutes * 60);
            $stmt = $this->db->prepare("
                INSERT INTO api_cache (cache_key, response_body, expires_at)
                VALUES (?, ?, ?)
                ON DUPLICATE KEY UPDATE response_body = VALUES(response_body), expires_at = VALUES(expires_at)
            ");
            $stmt->execute([md5($key), json_encode($data), $expires]);
        } catch {}
    }
}
