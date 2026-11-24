<?php
/**
 * Cron Job: Source Discovery Engine
 * Run every 2 hours via cPanel:
 * php /home/USERNAME/mangaverse/backend/cron/discover.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../discovery/Connectors/InternetArchiveConnector.php';
require_once __DIR__ . '/../discovery/Connectors/WikimediaConnector.php';
require_once __DIR__ . '/../discovery/Connectors/NDLConnector.php';
require_once __DIR__ . '/../app/Services/RightsVerifier.php';

echo "[MangaVerse-Cron] Starting Scheduled Discovery Job: " . date('Y-m-d H:i:s') . "\n";

$db = Database::connect();

// 1. Discover from Internet Archive
$ia = new InternetArchiveConnector();
$items = $ia->discover('mediatype:texts AND (subject:manga OR subject:comics)', 10);
echo "[MangaVerse-Cron] Found " . count($items) . " candidate items from Internet Archive.\n";

$srcStmt = $db->prepare("SELECT id FROM sources WHERE connector_key = 'internet-archive' LIMIT 1");
$srcStmt->execute();
$srcId = $srcStmt->fetchColumn() ?: 1;

$insStmt = $db->prepare("INSERT IGNORE INTO source_records (source_id, external_id, external_url, external_title, language_code, metadata_json, discovery_status) VALUES (?, ?, ?, ?, ?, ?, 'discovered')");

foreach ($items as $it) {
    $insStmt->execute([
        $srcId,
        $it['external_id'],
        $it['external_url'],
        $it['title'],
        $it['language'],
        json_encode($it)
    ]);
}

echo "[MangaVerse-Cron] Discovery scan complete.\n";
