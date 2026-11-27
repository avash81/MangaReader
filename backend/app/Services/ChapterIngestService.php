<?php
/**
 * ChapterIngestService.php
 * ────────────────────────
 * Safe multipart chapter intake for Creator Studio:
 * - Supports ZIP/CBZ archives or direct image/PDF uploads
 * - Prevents Zip-Slip path traversal
 * - Sorts page filenames naturally (natsort)
 * - Computes SHA-256 hashes and skips duplicate assets in storage_assets
 * - Gates publishing through RightsVerifier::canAutoPublish()
 */
class ChapterIngestService {
    private PDO $db;
    private string $storageRoot;

    public function __construct(PDO $db, ?string $storageRoot = null) {
        $this->db = $db;
        $this->storageRoot = $storageRoot ?? (__DIR__ . '/../../storage/chapters');
    }

    public function ingestUploadedFiles(int $mangaId, int $chapterId, array $uploadedFiles, array $rightsEval): array {
        $allowedExt = ['webp', 'jpg', 'jpeg', 'png', 'pdf'];
        $targetDir = "{$this->storageRoot}/{$mangaId}/{$chapterId}";
        if (!is_dir($targetDir)) {
            @mkdir($targetDir, 0755, true);
        }

        $candidates = [];
        foreach ($uploadedFiles as $file) {
            $tmp = $file['tmp_name'] ?? '';
            $name = basename((string)($file['name'] ?? ''));
            if ($tmp === '' || !is_uploaded_file($tmp)) {
                continue;
            }
            $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));

            if (($ext === 'zip' || $ext === 'cbz') && class_exists('ZipArchive')) {
                $zip = new ZipArchive();
                if ($zip->open($tmp) === true) {
                    for ($i = 0; $i < $zip->numFiles; $i++) {
                        $entryName = $zip->getNameIndex($i);
                        if (!$entryName || str_contains($entryName, '..') || str_ends_with($entryName, '/')) {
                            continue;
                        }
                        $entryExt = strtolower(pathinfo($entryName, PATHINFO_EXTENSION));
                        if (!in_array($entryExt, $allowedExt, true)) {
                            continue;
                        }
                        $bytes = $zip->getFromIndex($i);
                        if ($bytes !== false) {
                            $candidates[] = [
                                'name' => basename($entryName),
                                'ext' => $entryExt,
                                'bytes' => $bytes,
                            ];
                        }
                    }
                    $zip->close();
                }
            } elseif (in_array($ext, $allowedExt, true)) {
                $bytes = file_get_contents($tmp);
                if ($bytes !== false) {
                    $candidates[] = [
                        'name' => $name,
                        'ext' => $ext,
                        'bytes' => $bytes,
                    ];
                }
            }
        }

        // Natural sort (e.g. page2.webp before page10.webp)
        usort($candidates, fn($a, $b) => strnatcasecmp($a['name'], $b['name']));

        $pageNum = 0;
        $stored = [];
        $dupCheckStmt = $this->db->prepare("SELECT id FROM storage_assets WHERE sha256 = ? LIMIT 1");
        $assetStmt = $this->db->prepare("INSERT INTO storage_assets (storage_provider, storage_key, mime_type, file_size, sha256, asset_type) VALUES ('local', ?, ?, ?, ?, 'page')");
        $pageStmt = $this->db->prepare("INSERT INTO chapter_pages (chapter_id, page_number, image_url) VALUES (?, ?, ?)");

        foreach ($candidates as $item) {
            $pageNum++;
            $sha256 = hash('sha256', $item['bytes']);
            $dupCheckStmt->execute([$sha256]);
            $existingAsset = $dupCheckStmt->fetchColumn();

            $filename = sprintf('%03d.%s', $pageNum, $item['ext']);
            $destPath = "{$targetDir}/{$filename}";
            $relKey = "storage/chapters/{$mangaId}/{$chapterId}/{$filename}";

            if (!$existingAsset) {
                file_put_contents($destPath, $item['bytes']);
                $mime = $item['ext'] === 'pdf' ? 'application/pdf' : 'image/' . ($item['ext'] === 'jpg' ? 'jpeg' : $item['ext']);
                $assetStmt->execute([$relKey, $mime, strlen($item['bytes']), $sha256]);
            }

            $pageStmt->execute([$chapterId, $pageNum, $relKey]);
            $stored[] = ['page' => $pageNum, 'key' => $relKey, 'sha256' => $sha256, 'deduplicated' => (bool)$existingAsset];
        }

        $quality = [
            'all_files_valid' => $pageNum > 0,
            'page_sequence_valid' => $pageNum > 0,
            'page_count' => $pageNum,
            'duplicate_check_passed' => true,
        ];
        $canPublish = RightsVerifier::canAutoPublish([], [], $rightsEval, $quality);
        $status = $canPublish ? 'published' : 'pending_review';

        $upd = $this->db->prepare("UPDATE chapters SET page_count = ?, status = ? WHERE id = ?");
        $upd->execute([$pageNum, $status, $chapterId]);

        return [
            'pages_ingested' => $pageNum,
            'status' => $status,
            'assets' => $stored,
        ];
    }
}
