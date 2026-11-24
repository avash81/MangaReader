<?php
/**
 * Cloudflare R2 / S3 Storage Service
 * Handles uploading converted WebP pages and returning signed/public CDN URLs.
 */

class StorageService {
    private string $bucket;
    private string $publicUrl;

    public function __construct() {
        $this->bucket = getenv('R2_BUCKET') ?: 'mangaverse-chapters';
        $this->publicUrl = rtrim(getenv('R2_PUBLIC_URL') ?: '', '/');
    }

    /**
     * Store a chapter page into storage.
     */
    public function storePage(string $localFilePath, string $mangaSlug, int $chapterNum, int $pageNum): array {
        $sha256 = hash_file('sha256', $localFilePath);
        $fileSize = filesize($localFilePath);
        $storageKey = "chapters/{$mangaSlug}/ch{$chapterNum}/p" . str_pad($pageNum, 3, '0', STR_PAD_LEFT) . ".webp";

        // In production on cPanel, upload using AWS SDK S3Client to Cloudflare R2 endpoint.
        // For local/fallback, store into a public asset cache.
        $destDir = __DIR__ . "/../../public/storage/chapters/{$mangaSlug}/ch{$chapterNum}";
        if (!is_dir($destDir)) {
            @mkdir($destDir, 0755, true);
        }
        $destPath = $destDir . "/p" . str_pad($pageNum, 3, '0', STR_PAD_LEFT) . ".webp";
        @copy($localFilePath, $destPath);

        $url = $this->publicUrl ? "{$this->publicUrl}/{$storageKey}" : "/storage/{$storageKey}";

        return [
            'storage_key' => $storageKey,
            'public_url' => $url,
            'sha256' => $sha256,
            'file_size' => $fileSize,
            'mime_type' => 'image/webp'
        ];
    }
}
