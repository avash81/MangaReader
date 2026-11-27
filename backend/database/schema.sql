-- ============================================================================
-- MangaVerse Production Database Schema (MySQL 8.0+ / MariaDB 10.5+)
-- UTF8mb4 Unicode 520, InnoDB Engine, Foreign Key Constraints & Strict Indexing
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- Drop tables if re-running
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS storage_assets;
DROP TABLE IF EXISTS import_jobs;
DROP TABLE IF EXISTS rights_evidence;
DROP TABLE IF EXISTS rights_records;
DROP TABLE IF EXISTS source_records;
DROP TABLE IF EXISTS sources;
DROP TABLE IF EXISTS chapter_pages;
DROP TABLE IF EXISTS chapters;
DROP TABLE IF EXISTS manga_genres;
DROP TABLE IF EXISTS genres;
DROP TABLE IF EXISTS manga_translations;
DROP TABLE IF EXISTS manga;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- ----------------------------------------------------------------------------
-- 1. Users & Administrators
-- ----------------------------------------------------------------------------
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(60) NOT NULL UNIQUE,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('superadmin', 'admin', 'editor', 'creator', 'user') DEFAULT 'user',
  api_key VARCHAR(64) NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_user_role (role),
  INDEX idx_api_key (api_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Core Manga Identity
-- ----------------------------------------------------------------------------
CREATE TABLE manga (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  original_title VARCHAR(500) NULL,
  alt_titles JSON NULL,
  synopsis TEXT NULL,
  author VARCHAR(255) NULL,
  artist VARCHAR(255) NULL,
  demographic ENUM('Shonen','Shojo','Seinen','Josei','Kodomomuke','Unknown') DEFAULT 'Unknown',
  content_type ENUM('Manga','Manhwa','Manhua','Webtoon','Comic','One-shot') DEFAULT 'Manga',
  original_language ENUM('en','ja','ko','zh') DEFAULT 'ja',
  publication_status ENUM('ongoing','completed','hiatus','cancelled','unknown') DEFAULT 'unknown',
  reading_direction ENUM('rtl','ltr') DEFAULT 'rtl',
  cover_url VARCHAR(1000) NULL,
  cover_svg TEXT NULL,
  publication_year SMALLINT UNSIGNED NULL,
  mangadex_id VARCHAR(100) NULL,
  anilist_id INT UNSIGNED NULL,
  trailer_id VARCHAR(32) NULL,
  trailer_source VARCHAR(60) NULL,
  release_day VARCHAR(20) NULL,
  external_ids JSON NULL,
  total_views BIGINT UNSIGNED DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 4.50,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_manga_title (title(100)),
  INDEX idx_manga_status (publication_status),
  INDEX idx_manga_language (original_language),
  INDEX idx_manga_type (content_type),
  INDEX idx_manga_demographic (demographic),
  INDEX idx_mangadex (mangadex_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Translations (English, Japanese, Korean, Chinese)
-- ----------------------------------------------------------------------------
CREATE TABLE manga_translations (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  manga_id BIGINT UNSIGNED NOT NULL,
  language_code VARCHAR(10) NOT NULL,
  translated_title VARCHAR(500) NOT NULL,
  translated_synopsis TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_translation (manga_id, language_code),
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Genres & Tags
-- ----------------------------------------------------------------------------
CREATE TABLE genres (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  INDEX idx_genre_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE manga_genres (
  manga_id BIGINT UNSIGNED NOT NULL,
  genre_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (manga_id, genre_id),
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Chapters
-- ----------------------------------------------------------------------------
CREATE TABLE chapters (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  manga_id BIGINT UNSIGNED NOT NULL,
  chapter_number DECIMAL(10,3) NOT NULL,
  chapter_title VARCHAR(255) NULL,
  volume_number INT UNSIGNED NULL,
  language_code VARCHAR(10) NOT NULL DEFAULT 'en',
  release_date DATETIME NULL,
  status ENUM('draft','processing','ready','published','rejected') DEFAULT 'draft',
  page_count INT UNSIGNED DEFAULT 0,
  source_key VARCHAR(100) NULL,
  external_chapter_id VARCHAR(255) NULL,
  external_url VARCHAR(1000) NULL,
  pdf_url VARCHAR(1000) NULL,
  view_count INT UNSIGNED DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_chapter (manga_id, chapter_number, language_code),
  INDEX idx_chapter_status (status),
  INDEX idx_chapter_release (release_date),
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Chapter Pages
-- ----------------------------------------------------------------------------
CREATE TABLE chapter_pages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  chapter_id BIGINT UNSIGNED NOT NULL,
  page_number INT UNSIGNED NOT NULL,
  storage_key VARCHAR(1000) NOT NULL,
  public_url VARCHAR(1000) NOT NULL,
  width INT UNSIGNED NULL,
  height INT UNSIGNED NULL,
  file_size INT UNSIGNED NULL,
  mime_type VARCHAR(50) DEFAULT 'image/webp',
  sha256 CHAR(64) NOT NULL,
  UNIQUE KEY uq_page (chapter_id, page_number),
  INDEX idx_page_sha (sha256),
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Sources Registry
-- ----------------------------------------------------------------------------
CREATE TABLE sources (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  connector_key VARCHAR(100) NOT NULL UNIQUE,
  base_url VARCHAR(500) NULL,
  source_type ENUM('archive','library','creator','publisher','api') DEFAULT 'archive',
  enabled BOOLEAN DEFAULT TRUE,
  rate_limit_ms INT UNSIGNED DEFAULT 2000,
  last_scanned_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Discovered Source Records
-- ----------------------------------------------------------------------------
CREATE TABLE source_records (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  source_id BIGINT UNSIGNED NOT NULL,
  external_id VARCHAR(255) NOT NULL,
  external_url VARCHAR(1000) NULL,
  external_title VARCHAR(500) NOT NULL,
  language_code VARCHAR(10) DEFAULT 'en',
  metadata_json JSON NULL,
  discovery_status ENUM('discovered','queued','imported','rejected','review') DEFAULT 'discovered',
  discovered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_external (source_id, external_id),
  FOREIGN KEY (source_id) REFERENCES sources(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Rights & Legal Permissions (Mandatory Verification Gate)
-- ----------------------------------------------------------------------------
CREATE TABLE rights_records (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  manga_id BIGINT UNSIGNED NOT NULL,
  chapter_id BIGINT UNSIGNED NULL,
  rights_holder VARCHAR(255) NULL,
  license_code VARCHAR(100) NOT NULL,
  license_url VARCHAR(1000) NULL,
  commercial_use BOOLEAN DEFAULT FALSE,
  redistribution_allowed BOOLEAN DEFAULT FALSE,
  modification_allowed BOOLEAN DEFAULT FALSE,
  attribution_required BOOLEAN DEFAULT TRUE,
  attribution_text TEXT NULL,
  territorial_scope JSON NULL,
  valid_from DATE NULL,
  valid_until DATE NULL,
  verification_status ENUM('pending','verified','rejected','expired','revoked') DEFAULT 'pending',
  verified_by VARCHAR(100) NULL,
  verified_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_rights_status (verification_status),
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 10. Rights Evidence Documents
-- ----------------------------------------------------------------------------
CREATE TABLE rights_evidence (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  rights_record_id BIGINT UNSIGNED NOT NULL,
  evidence_type ENUM('license_url','api_response','document','screenshot','agreement') DEFAULT 'license_url',
  evidence_url VARCHAR(1000) NULL,
  evidence_snapshot TEXT NULL,
  notes TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (rights_record_id) REFERENCES rights_records(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 11. Import Job Queue
-- ----------------------------------------------------------------------------
CREATE TABLE import_jobs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  job_type ENUM('discover','import','process','validate','publish') NOT NULL,
  source_record_id BIGINT UNSIGNED NULL,
  manga_id BIGINT UNSIGNED NULL,
  chapter_id BIGINT UNSIGNED NULL,
  status ENUM('queued','running','done','failed','cancelled') DEFAULT 'queued',
  attempts TINYINT UNSIGNED DEFAULT 0,
  max_attempts TINYINT UNSIGNED DEFAULT 3,
  payload JSON NULL,
  error_message TEXT NULL,
  started_at DATETIME NULL,
  completed_at DATETIME NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_job_queue (status, created_at),
  FOREIGN KEY (source_record_id) REFERENCES source_records(id) ON DELETE SET NULL,
  FOREIGN KEY (manga_id) REFERENCES manga(id) ON DELETE CASCADE,
  FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 12. Storage Assets
-- ----------------------------------------------------------------------------
CREATE TABLE storage_assets (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  storage_provider ENUM('r2','local','s3') DEFAULT 'r2',
  storage_key VARCHAR(1000) NOT NULL,
  mime_type VARCHAR(100) NULL,
  file_size BIGINT UNSIGNED NULL,
  sha256 CHAR(64) NULL,
  asset_type ENUM('page','cover','source_file') DEFAULT 'page',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_sha256 (sha256)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 13. Audit Logs
-- ----------------------------------------------------------------------------
CREATE TABLE audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id BIGINT UNSIGNED NULL,
  details_json JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_date (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Seed Data
-- ----------------------------------------------------------------------------
INSERT INTO genres (slug, name) VALUES
('action', 'Action'),
('adventure', 'Adventure'),
('comedy', 'Comedy'),
('drama', 'Drama'),
('fantasy', 'Fantasy'),
('horror', 'Horror'),
('mystery', 'Mystery'),
('romance', 'Romance'),
('sci-fi', 'Sci-Fi'),
('sports', 'Sports'),
('supernatural', 'Supernatural'),
('historical', 'Historical'),
('slice-of-life', 'Slice of Life'),
('isekai', 'Isekai'),
('psychological', 'Psychological'),
('villainess', 'Villainess / Reijo');

INSERT INTO sources (name, connector_key, base_url, source_type) VALUES
('Internet Archive', 'internet-archive', 'https://archive.org', 'archive'),
('Wikimedia Commons', 'wikimedia-commons', 'https://commons.wikimedia.org', 'archive'),
('National Diet Library Japan', 'ndl-japan', 'https://ndlsearch.ndl.go.jp', 'library'),
('Digital Comic Museum', 'digital-comic-museum', 'https://digitalcomicmuseum.com', 'archive'),
('Comic Book Plus', 'comic-book-plus', 'https://comicbookplus.com', 'archive');

-- ----------------------------------------------------------------------------
-- 14. API Cache (20-min TTL for MangaDex @at-home manifests)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS api_cache (
  cache_key VARCHAR(255) NOT NULL PRIMARY KEY,
  response_body MEDIUMTEXT NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 15. Rate Limits (MySQL-backed sliding window per hashed IP + endpoint)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rate_limits (
  ip_hash VARCHAR(128) NOT NULL,
  endpoint VARCHAR(100) NOT NULL,
  request_count SMALLINT UNSIGNED DEFAULT 1,
  window_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (ip_hash, endpoint),
  INDEX idx_window (window_start)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 16. Import Batches (Audit log for bulk AniList / MangaDex sync runs)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS import_batches (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  source VARCHAR(50) NOT NULL,
  batch_ref VARCHAR(255) NULL,
  status ENUM('running','done','failed') DEFAULT 'running',
  titles_found INT UNSIGNED DEFAULT 0,
  titles_imported INT UNSIGNED DEFAULT 0,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
('Creator Studio Submissions', 'creator-studio', NULL, 'creator');
