<?php
/**
 * MangaVerse Discovery Connector: National Diet Library (NDL) Japan
 * Searches Japanese historical publications via the NDL OpenSearch API.
 * Validates the copyright protection period expired status: インターネット公開（保護期間満了）
 */

class NDLConnector {
    private const OPENSEARCH_URL = 'https://ndlsearch.ndl.go.jp/api/opensearch';

    public function discover(string $keyword = '漫画', int $count = 20): array {
        $params = http_build_query([
            'dpid' => 'iss-ndl-opac',
            'any' => $keyword,
            'cnt' => $count,
            'mediatype' => '1' // Books
        ]);

        $url = self::OPENSEARCH_URL . '?' . $params;
        $xmlContent = @file_get_contents($url, false, stream_context_create([
            'http' => ['header' => 'User-Agent: MangaVerse-MCAE/1.0']
        ]));

        if (!$xmlContent) return [];
        $xml = @simplexml_load_string($xmlContent);
        if (!$xml || !isset($xml->channel->item)) return [];

        $results = [];
        foreach ($xml->channel->item as $item) {
            $title = (string)$item->title;
            $link = (string)$item->link;
            $author = (string)($item->author ?? 'Unknown');
            $pubDate = (string)($item->pubDate ?? '');

            // Check namespaces for rights
            $namespaces = $item->getNameSpaces(true);
            $dc = isset($namespaces['dc']) ? $item->children($namespaces['dc']) : null;
            $rights = $dc ? (string)$dc->rights : '';

            $isPublicDomain = (strpos($rights, '保護期間満了') !== false || strpos($rights, 'インターネット公開（保護期間満了）') !== false);

            $results[] = [
                'external_id' => md5($link),
                'title' => $title,
                'author' => $author,
                'external_url' => $link,
                'published_date' => $pubDate,
                'rights_raw' => $rights,
                'is_verified_public_domain' => $isPublicDomain,
                'source_type' => 'ndl-japan'
            ];
        }

        return $results;
    }
}
