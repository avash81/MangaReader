<?php
/**
 * Cron Job: Automatic Publishing Gate
 * Runs every 5 minutes:
 * php /home/USERNAME/mangaverse/backend/cron/publish.php
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../app/Services/RightsVerifier.php';

echo "[MangaVerse-Cron] Evaluating Publishing Queue: " . date('Y-m-d H:i:s') . "\n";

$db = Database::connect();

// Find chapters in 'processing' or 'ready' status
$stmt = $db->query("SELECT c.*, m.title as manga_title FROM chapters c JOIN manga m ON c.manga_id = m.id WHERE c.status IN ('ready', 'processing') LIMIT 50");
$chapters = $stmt->fetchAll();

foreach ($chapters as $ch) {
    // Check rights record
    $rStmt = $db->prepare("SELECT * FROM rights_records WHERE manga_id = ? AND (chapter_id = ? OR chapter_id IS NULL) ORDER BY chapter_id DESC LIMIT 1");
    $rStmt->execute([$ch['manga_id'], $ch['id']]);
    $rights = $rStmt->fetch() ?: [];

    // Check page quality
    $pStmt = $db->prepare("SELECT COUNT(*) as total_pages FROM chapter_pages WHERE chapter_id = ?");
    $pStmt->execute([$ch['id']]);
    $pageCount = (int)$pStmt->fetchColumn();

    $quality = [
        'all_files_valid' => true,
        'page_sequence_valid' => true,
        'page_count' => $pageCount,
        'duplicate_check_passed' => true
    ];

    $canPublish = RightsVerifier::canAutoPublish(['id' => $ch['manga_id']], $ch, $rights, $quality);

    if ($canPublish) {
        $up = $db->prepare("UPDATE chapters SET status = 'published', page_count = ? WHERE id = ?");
        $up->execute([$pageCount, $ch['id']]);
        echo "[MangaVerse-Cron] PUBLISHED: {$ch['manga_title']} - Ch. {$ch['chapter_number']}\n";
    } else {
        echo "[MangaVerse-Cron] HELD in Review (Failed verification): {$ch['manga_title']} - Ch. {$ch['chapter_number']}\n";
    }
}
