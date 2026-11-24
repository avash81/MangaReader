<?php
/**
 * MangaVerse Discovery Connector: Wikimedia Commons
 * Queries Wikimedia API for openly licensed manga illustrations, historical woodblock prints, and comics.
 */

class WikimediaConnector {
    private const API_URL = 'https://commons.wikimedia.org/w/api.php';

    public function discover(string $searchTerm = 'manga illustration', int $limit = 20): array {
        $params = http_build_query([
            'action' => 'query',
            'generator' => 'search',
            'gsrsearch' => $searchTerm,
            'gsrnamespace' => 6, // File namespace
            'gsrlimit' => $limit,
            'prop' => 'imageinfo',
            'iiprop' => 'url|size|extmetadata',
            'format' => 'json'
        ]);

        $url = self::API_URL . '?' . $params;
        $response = @file_get_contents($url, false, stream_context_create([
            'http' => ['header' => 'User-Agent: MangaVerse-MCAE/1.0 (https://mangaverse.app)']
        ]));

        if (!$response) return [];
        $data = json_decode($response, true);
        $pages = $data['query']['pages'] ?? [];

        $results = [];
        foreach ($pages as $p) {
            $info = $p['imageinfo'][0] ?? null;
            if (!$info) continue;

            $meta = $info['extmetadata'] ?? [];
            $license = $meta['LicenseShortName']['value'] ?? 'Unknown';
            $artist = strip_tags($meta['Artist']['value'] ?? 'Unknown');
            $credit = strip_tags($meta['Credit']['value'] ?? '');

            $results[] = [
                'external_id' => (string)$p['pageid'],
                'title' => str_replace(['File:', '_'], ['', ' '], $p['title'] ?? ''),
                'file_url' => $info['url'] ?? '',
                'width' => (int)($info['width'] ?? 0),
                'height' => (int)($info['height'] ?? 0),
                'license_code' => $license,
                'artist' => $artist,
                'credit' => $credit,
                'source_type' => 'wikimedia-commons'
            ];
        }

        return $results;
    }
}
