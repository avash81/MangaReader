<?php
/**
 * Cron Job: Daily Chapter & Local PDF Auto-Sync
 * ---------------------------------------------
 * Schedules on cPanel Cron (every 2 hours or daily):
 *   php /home/USERNAME/public_html/backend/cron/sync_chapters.php >> /home/USERNAME/logs/sync.log 2>&1
 *
 * 1. Syncs latest English chapters from MangaDex API for every manga with a `mangadex_id`.
 * 2. Scans `/mangas/` for any local `.pdf` chapter files (e.g. `ch-01.pdf`) and registers them.
 */

require_once __DIR__ . '/../config/database.php';

$db = Database::connect();
$now = date('Y-m-d H:i:s');
echo "[MangaVerse-Sync] Starting Daily Chapter Sync at {$now}\n";

function httpGetJson(string $url): ?array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 15,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTPHEADER => [
            'User-Agent: MangaVerse-cPanelSync/1.0',
            'Accept: application/json'
        ]
    ]);
    $raw = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    if ($code !== 200 || !$raw) return null;
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : null;
}

// ----------------------------------------------------------------------------
// 1. Sync New Chapters from MangaDex API
// ----------------------------------------------------------------------------
$mangaList = $db->query("SELECT id, slug, title, mangadex_id, release_day FROM manga WHERE mangadex_id IS NOT NULL AND mangadex_id != ''")->fetchAll();
$insertCh = $db->prepare("
    INSERT IGNORE INTO chapters
      (manga_id, chapter_number, chapter_title, volume_number, language_code, release_date, status, page_count, source_key, external_chapter_id)
    VALUES
      (?, ?, ?, ?, 'en', ?, 'published', ?, 'mangadex', ?)
");

$newChapters = 0;
foreach ($mangaList as $m) {
    $feedUrl = "https://api.mangadex.org/manga/" . urlencode($m['mangadex_id']) . "/feed?translatedLanguage[]=en&order[chapter]=desc&limit=25";
    $data = httpGetJson($feedUrl);
    if (!$data || empty($data['data'])) {
        usleep(250000);
        continue;
    }

    foreach ($data['data'] as $ch) {
        $attr = $ch['attributes'] ?? [];
        $chNum = isset($attr['chapter']) && is_numeric($attr['chapter']) ? (float)$attr['chapter'] : null;
        if ($chNum === null) continue;

        $chTitle = !empty($attr['title']) ? mb_substr($attr['title'], 0, 250) : "Chapter {$chNum}";
        $volNum  = isset($attr['volume']) && is_numeric($attr['volume']) ? (int)$attr['volume'] : null;
        $pages   = (int)($attr['pages'] ?? 0);
        $relDate = !empty($attr['publishAt']) ? date('Y-m-d H:i:s', strtotime($attr['publishAt'])) : $now;

        $insertCh->execute([
            $m['id'],
            $chNum,
            $chTitle,
            $volNum,
            $relDate,
            $pages,
            $ch['id']
        ]);
        if ($insertCh->rowCount() > 0) {
            $newChapters++;
        }
    }

    usleep(250000); // Respect MangaDex rate limit (~4 req/sec)
}

echo "[MangaVerse-Sync] MangaDex pass complete. New chapters added: {$newChapters}\n";

// ----------------------------------------------------------------------------
// 2. Scan Local /mangas/ Directory for PDF Chapters
// ----------------------------------------------------------------------------
$mangasRoot = realpath(__DIR__ . '/../../mangas');
$pdfAdded = 0;

if ($mangasRoot && is_dir($mangasRoot)) {
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($mangasRoot));
    $pdfInsert = $db->prepare("
        INSERT IGNORE INTO chapters
          (manga_id, chapter_number, chapter_title, language_code, release_date, status, source_key, pdf_url)
        VALUES
          (?, ?, ?, 'en', ?, 'published', 'local-pdf', ?)
    ");

    foreach ($it as $file) {
        if (!$file->isFile() || strtolower($file->getExtension()) !== 'pdf') continue;
        $relPath = str_replace('\\', '/', substr($file->getPathname(), strlen(realpath(__DIR__ . '/../..')) + 1));
        $folderName = strtolower(basename(dirname($file->getPathname())));
        $fileName = $file->getBasename('.pdf');

        if (!preg_match('/(\d+(?:\.\d+)?)/', $fileName, $numMatch)) continue;
        $chNum = (float)$numMatch[1];

        $mStmt = $db->prepare("SELECT id FROM manga WHERE LOWER(slug) = ? OR LOWER(REPLACE(title, ' ', '-')) LIKE ? LIMIT 1");
        $mStmt->execute([$folderName, "%{$folderName}%"]);
        $mangaId = $mStmt->fetchColumn();
        if (!$mangaId) continue;

        $pdfInsert->execute([$mangaId, $chNum, "Chapter {$chNum}", $now, $relPath]);
        if ($pdfInsert->rowCount() > 0) {
            $pdfAdded++;
        }
    }
}

echo "[MangaVerse-Sync] Local PDF pass complete. New PDF chapters registered: {$pdfAdded}\n";
