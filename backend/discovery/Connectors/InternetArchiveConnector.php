<?php
/**
 * MangaVerse Discovery Connector: Internet Archive (archive.org)
 * Searches texts, historical manga, and scans with machine-readable license verification.
 */

class InternetArchiveConnector {
    private const ADVANCED_SEARCH_URL = 'https://archive.org/advancedsearch.php';
    private const METADATA_URL = 'https://archive.org/metadata/';

    /**
     * Search Internet Archive for historical public domain / CC manga
     */
    public function discover(string $query = 'mediatype:texts AND (subject:manga OR subject:comics)', int $rows = 20): array {
        $params = http_build_query([
            'q' => $query,
            'fl' => ['identifier', 'title', 'creator', 'language', 'licenseurl', 'date', 'description', 'publicdate'],
            'sort' => ['downloads desc'],
            'rows' => $rows,
            'page' => 1,
            'output' => 'json'
        ]);

        $url = self::ADVANCED_SEARCH_URL . '?' . $params;
        $response = @file_get_contents($url, false, stream_context_create([
            'http' => ['header' => 'User-Agent: MangaVerse-MCAE/1.0 (https://mangaverse.app)']
        ]));

        if (!$response) return [];
        $data = json_decode($response, true);
        $docs = $data['response']['docs'] ?? [];

        $results = [];
        foreach ($docs as $doc) {
            $identifier = $doc['identifier'] ?? '';
            if (!$identifier) continue;

            $licenseUrl = $doc['licenseurl'] ?? '';
            $results[] = [
                'external_id' => $identifier,
                'external_url' => "https://archive.org/details/{$identifier}",
                'title' => $doc['title'] ?? $identifier,
                'creator' => $doc['creator'] ?? 'Unknown',
                'language' => $doc['language'] ?? 'en',
                'description' => $doc['description'] ?? '',
                'license_url' => $licenseUrl,
                'year' => isset($doc['date']) ? (int)substr($doc['date'], 0, 4) : null,
                'source_type' => 'internet-archive'
            ];
        }

        return $results;
    }

    /**
     * Fetch all available file formats (PDF, ZIP, CBZ, JP2) for an identified item
     */
    public function getItemFiles(string $identifier): array {
        $url = self::METADATA_URL . urlencode($identifier) . '/files';
        $response = @file_get_contents($url, false, stream_context_create([
            'http' => ['header' => 'User-Agent: MangaVerse-MCAE/1.0']
        ]));

        if (!$response) return [];
        $data = json_decode($response, true);
        $files = $data['result'] ?? [];

        $downloadables = [];
        foreach ($files as $f) {
            $name = $f['name'] ?? '';
            $format = strtolower($f['format'] ?? '');
            if (preg_match('/\.(pdf|cbz|zip)$/i', $name)) {
                $downloadables[] = [
                    'name' => $name,
                    'format' => pathinfo($name, PATHINFO_EXTENSION),
                    'size' => (int)($f['size'] ?? 0),
                    'url' => "https://archive.org/download/{$identifier}/" . rawurlencode($name)
                ];
            }
        }
        return $downloadables;
    }
}
