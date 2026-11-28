<?php
/**
 * generate_sitemap.php
 * ────────────────────
 * Cron script: generates public_html/sitemap.xml dynamically from MySQL manga slugs.
 * Run daily or after bulk imports:
 *   php /home/USER/public_html/backend/cron/generate_sitemap.php
 */
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../app/Helpers/Logger.php';

$baseUrl = rtrim(getenv('APP_URL') ?: 'https://www.managaa.website', '/');
$outputPath = __DIR__ . '/../../sitemap.xml';

try {
    $db = Database::connect();
    $stmt = $db->query("SELECT slug, updated_at FROM manga ORDER BY id ASC LIMIT 50000");
    $rows = $stmt->fetchAll();

    $xml = [];
    $xml[] = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml[] = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    $xml[] = '  <url><loc>' . htmlspecialchars($baseUrl . '/', ENT_XML1, 'UTF-8') . '</loc><changefreq>daily</changefreq><priority>1.0</priority></url>';

    foreach ($rows as $row) {
        $slug = rawurlencode($row['slug']);
        $lastmod = !empty($row['updated_at']) ? date('Y-m-d', strtotime($row['updated_at'])) : date('Y-m-d');
        $loc = htmlspecialchars("{$baseUrl}/manga/{$slug}", ENT_XML1, 'UTF-8');
        $xml[] = "  <url><loc>{$loc}</loc><lastmod>{$lastmod}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>";
    }

    $xml[] = '</urlset>';
    file_put_contents($outputPath, implode("\n", $xml) . "\n");
    Logger::info('sitemap_generated', ['count' => count($rows)]);
    echo "Generated sitemap.xml with " . count($rows) . " manga URLs.\n";
} catch (Throwable $e) {
    Logger::error('sitemap_generation_failed', ['error' => $e->getMessage()]);
    fwrite(STDERR, "Sitemap error: " . $e->getMessage() . "\n");
    exit(1);
}
