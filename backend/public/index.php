<?php
/**
 * MangaVerse API v1 Router & Gateway
 * Handles public endpoints: /v1/manga, /v1/manga/{id}, /v1/manga/{id}/chapters, /v1/genres, /v1/languages
 * and administrative discovery/publishing actions.
 */

// Defensive CORS & Security Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-API-Key');
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../app/Helpers/Logger.php';
require_once __DIR__ . '/../app/Services/RightsVerifier.php';
require_once __DIR__ . '/../app/Services/ChapterIngestService.php';
require_once __DIR__ . '/../app/Services/MangaDexProxy.php';
require_once __DIR__ . '/../app/Services/RateLimiter.php';
require_once __DIR__ . '/../discovery/Connectors/InternetArchiveConnector.php';
require_once __DIR__ . '/../discovery/Connectors/WikimediaConnector.php';
require_once __DIR__ . '/../discovery/Connectors/NDLConnector.php';

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Normalize base path
$uri = preg_replace('#^/api/v1#', '/v1', $uri);
$uri = preg_replace('#^/backend/public#', '', $uri);
if (empty($uri)) $uri = '/';

$method = $_SERVER['REQUEST_METHOD'];

// Helper to return JSON
function jsonResponse($data, int $status = 200) {
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

// Stateless HMAC-SHA256 Bearer Token Helpers (Web + Mobile shared auth)
function issueAuthToken(int $userId, string $role = 'user'): string {
    $secret = getenv('JWT_SECRET') ?: (getenv('ADMIN_API_KEY') ?: 'mv_dev_token_secret_change_me');
    $payload = rtrim(strtr(base64_encode(json_encode([
        'sub' => $userId,
        'role' => $role,
        'exp' => time() + (30 * 86400),
    ])), '+/', '-_'), '=');
    $sig = rtrim(strtr(base64_encode(hash_hmac('sha256', $payload, $secret, true)), '+/', '-_'), '=');
    return "{$payload}.{$sig}";
}

function requireAuthUserId(): int {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+([A-Za-z0-9\-_]+)\.([A-Za-z0-9\-_]+)$/', $auth, $m)) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized: Missing Bearer token'], 401);
    }
    $secret = getenv('JWT_SECRET') ?: (getenv('ADMIN_API_KEY') ?: 'mv_dev_token_secret_change_me');
    $expected = rtrim(strtr(base64_encode(hash_hmac('sha256', $m[1], $secret, true)), '+/', '-_'), '=');
    if (!hash_equals($expected, $m[2])) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized: Invalid token signature'], 401);
    }
    $data = json_decode(base64_decode(strtr($m[1], '-_', '+/')), true);
    if (!is_array($data) || empty($data['sub']) || ($data['exp'] ?? 0) < time()) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized: Token expired'], 401);
    }
    return (int)$data['sub'];
}

// ----------------------------------------------------------------------------
// 1. GET /v1/health
// ----------------------------------------------------------------------------
if ($uri === '/v1/health') {
    $dbStatus = 'disconnected';
    $mangaCount = null;
    try {
        $db = Database::connect();
        $db->query('SELECT 1');
        $dbStatus = 'connected';
        $mangaCount = (int)$db->query('SELECT COUNT(*) FROM manga')->fetchColumn();
    } catch (Throwable $e) {
        $dbStatus = 'error';
    }
    jsonResponse([
        'status' => 'healthy',
        'service' => 'MangaVerse Content Automation Engine (MCAE)',
        'db' => $dbStatus,
        'manga_count' => $mangaCount,
        'timestamp' => date('c'),
        'version' => '1.0.0'
    ]);
}

// ----------------------------------------------------------------------------
// 2. GET /v1/genres
// ----------------------------------------------------------------------------
if ($uri === '/v1/genres' && $method === 'GET') {
    $db = Database::connect();
    $stmt = $db->query("SELECT slug, name FROM genres ORDER BY name ASC");
    jsonResponse(['success' => true, 'genres' => $stmt->fetchAll()]);
}

// ----------------------------------------------------------------------------
// 3. GET /v1/languages
// ----------------------------------------------------------------------------
if ($uri === '/v1/languages' && $method === 'GET') {
    jsonResponse([
        'success' => true,
        'languages' => [
            ['code' => 'en', 'name' => 'English'],
            ['code' => 'ja', 'name' => 'Japanese (日本語)'],
            ['code' => 'ko', 'name' => 'Korean (한국어)'],
            ['code' => 'zh', 'name' => 'Chinese (中文)']
        ]
    ]);
}

// ----------------------------------------------------------------------------
// 4. GET /v1/manga (List/Search catalog)
// ----------------------------------------------------------------------------
if ($uri === '/v1/manga' && $method === 'GET') {
    RateLimiter::check('catalog');
    $db = Database::connect();
    $limit = min((int)($_GET['limit'] ?? 24), 100);
    $offset = (int)($_GET['offset'] ?? 0);
    $search = trim($_GET['q'] ?? '');
    $genre = trim($_GET['genre'] ?? '');
    $type = trim($_GET['type'] ?? '');

    $where = ["1=1"];
    $params = [];

    if ($search !== '') {
        $where[] = "(title LIKE ? OR synopsis LIKE ? OR author LIKE ?)";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
        $params[] = "%{$search}%";
    }

    if ($type !== '' && $type !== 'All') {
        $where[] = "content_type = ?";
        $params[] = $type;
    }

    $whereSql = implode(" AND ", $where);
    $stmt = $db->prepare("SELECT m.id, m.slug, m.title, m.original_title, m.synopsis, m.author, m.artist, m.demographic, m.content_type, m.original_language, m.publication_status, m.reading_direction, m.cover_url, m.publication_year, m.mangadex_id, m.anilist_id, m.trailer_id, m.trailer_source, m.release_day, m.is_featured, m.rating, EXISTS(SELECT 1 FROM rights_records r WHERE r.manga_id = m.id AND r.verification_status = 'verified' AND r.commercial_use = 1 AND r.redistribution_allowed = 1) AS is_commercially_verified FROM manga m WHERE {$whereSql} ORDER BY m.id ASC LIMIT {$limit} OFFSET {$offset}");
    $stmt->execute($params);
    $items = $stmt->fetchAll();

    jsonResponse([
        'success' => true,
        'count' => count($items),
        'limit' => $limit,
        'offset' => $offset,
        'manga' => $items
    ]);
}

// ----------------------------------------------------------------------------
// 5. GET /v1/manga/{id}/chapters
// ----------------------------------------------------------------------------
if (preg_match('#^/v1/manga/([^/]+)/chapters$#', $uri, $matches) && $method === 'GET') {
    RateLimiter::check('catalog');
    $mangaId = $matches[1];
    $db = Database::connect();

    $stmt = $db->prepare("SELECT id FROM manga WHERE id = ? OR slug = ? LIMIT 1");
    $stmt->execute([$mangaId, $mangaId]);
    $manga = $stmt->fetch();

    if (!$manga) {
        jsonResponse(['success' => false, 'error' => 'Manga not found'], 404);
    }

    $cStmt = $db->prepare("SELECT id, chapter_number, chapter_title, volume_number, language_code, release_date, status, page_count, external_chapter_id, external_url, pdf_url FROM chapters WHERE manga_id = ? AND status = 'published' ORDER BY chapter_number ASC");
    $cStmt->execute([$manga['id']]);
    $chapters = $cStmt->fetchAll();

    jsonResponse(['success' => true, 'manga_id' => $mangaId, 'chapters' => $chapters]);
}

// ----------------------------------------------------------------------------
// 5b. GET /v1/proxy/pages/{chapterId} (Secure MangaDex @at-home image proxy)
// ----------------------------------------------------------------------------
if (preg_match('#^/v1/proxy/pages/([A-Za-z0-9\-]+)$#', $uri, $matches) && $method === 'GET') {
    RateLimiter::check('proxy');
    $proxy = new MangaDexProxy(Database::connect());
    $res = $proxy->getPages($matches[1]);
    Logger::info('proxy_pages', ['chapter_id' => $matches[1], 'success' => !empty($res['success'])]);
    jsonResponse($res);
}

// ----------------------------------------------------------------------------
// 5c. POST /v1/creator/submit (Creator Studio intake + RightsVerifier gate)
// ----------------------------------------------------------------------------
if ($uri === '/v1/creator/submit' && $method === 'POST') {
    RateLimiter::check('admin');
    $body = json_decode(file_get_contents('php://input'), true);
    if (!is_array($body) || empty($body['slug']) || empty($body['title']) || empty($body['license_code'])) {
        jsonResponse(['success' => false, 'error' => 'Missing required fields: slug, title, license_code'], 400);
    }

    $rightsEval = RightsVerifier::evaluateRights([
        'license_code' => $body['license_code'],
        'commercial_use' => !empty($body['commercial_use']),
        'redistribution_allowed' => !empty($body['redistribution_allowed']),
        'valid_until' => $body['valid_until'] ?? null,
    ]);

    if ($rightsEval['status'] === 'rejected') {
        jsonResponse([
            'success' => false,
            'error' => 'Submission rejected by RightsVerifier',
            'rights' => $rightsEval
        ], 403);
    }

    $db = Database::connect();
    $mStmt = $db->prepare("SELECT id FROM manga WHERE slug = ? LIMIT 1");
    $mStmt->execute([$body['slug']]);
    $mangaId = $mStmt->fetchColumn();

    if (!$mangaId) {
        $insM = $db->prepare("INSERT INTO manga (slug, title, synopsis, author, content_type, publication_status, cover_url) VALUES (?, ?, ?, ?, ?, 'ongoing', ?)");
        $insM->execute([
            $body['slug'],
            $body['title'],
            $body['synopsis'] ?? null,
            $body['rights_holder'] ?? ($body['author'] ?? 'Independent Creator'),
            $body['content_type'] ?? 'Manga',
            $body['cover_url'] ?? null,
        ]);
        $mangaId = (int)$db->lastInsertId();
    }

    $insR = $db->prepare("INSERT INTO rights_records (manga_id, rights_holder, license_code, license_url, commercial_use, redistribution_allowed, attribution_text, verification_status, verified_by, verified_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'RightsVerifier', NOW())");
    $insR->execute([
        $mangaId,
        $body['rights_holder'] ?? 'Creator',
        $body['license_code'],
        $body['license_url'] ?? null,
        $rightsEval['commercial_use'] ? 1 : 0,
        $rightsEval['redistribution_allowed'] ? 1 : 0,
        $body['attribution_text'] ?? null,
        $rightsEval['status'],
    ]);

    jsonResponse([
        'success' => true,
        'manga_id' => (int)$mangaId,
        'rights' => $rightsEval,
        'auto_publish_eligible' => ($rightsEval['status'] === 'verified')
    ], 201);
}

// ----------------------------------------------------------------------------
// 5d. POST /v1/creator/upload (Multipart ZIP/CBZ/PDF/image chapter intake)
// ----------------------------------------------------------------------------
if ($uri === '/v1/creator/upload' && $method === 'POST') {
    RateLimiter::check('admin');
    $slug = trim($_POST['slug'] ?? '');
    $chapterNum = (float)($_POST['chapter_number'] ?? 1);
    $licenseCode = trim($_POST['license_code'] ?? '');
    if ($slug === '' || $licenseCode === '' || empty($_FILES['pages'])) {
        jsonResponse(['success' => false, 'error' => 'Missing required multipart fields: slug, license_code, pages'], 400);
    }

    $rightsEval = RightsVerifier::evaluateRights([
        'license_code' => $licenseCode,
        'commercial_use' => !empty($_POST['commercial_use']),
        'redistribution_allowed' => !empty($_POST['redistribution_allowed']),
    ]);
    if ($rightsEval['status'] === 'rejected') {
        jsonResponse(['success' => false, 'error' => 'Rejected by RightsVerifier', 'rights' => $rightsEval], 403);
    }

    $db = Database::connect();
    $mStmt = $db->prepare("SELECT id FROM manga WHERE slug = ? LIMIT 1");
    $mStmt->execute([$slug]);
    $mangaId = (int)$mStmt->fetchColumn();
    if (!$mangaId) {
        jsonResponse(['success' => false, 'error' => 'Manga slug not found; submit metadata first'], 404);
    }

    $chStmt = $db->prepare("INSERT INTO chapters (manga_id, chapter_number, chapter_title, language_code, status) VALUES (?, ?, ?, ?, 'pending_review')");
    $chStmt->execute([$mangaId, $chapterNum, $_POST['chapter_title'] ?? null, $_POST['language_code'] ?? 'en']);
    $chapterId = (int)$db->lastInsertId();

    $files = [];
    if (is_array($_FILES['pages']['name'])) {
        foreach ($_FILES['pages']['name'] as $i => $n) {
            $files[] = ['name' => $n, 'tmp_name' => $_FILES['pages']['tmp_name'][$i] ?? ''];
        }
    } else {
        $files[] = $_FILES['pages'];
    }

    $ingest = new ChapterIngestService($db);
    $result = $ingest->ingestUploadedFiles($mangaId, $chapterId, $files, $rightsEval);
    Logger::info('creator_chapter_upload', ['manga_id' => $mangaId, 'chapter_id' => $chapterId, 'pages' => $result['pages_ingested']]);
    jsonResponse(['success' => true, 'chapter_id' => $chapterId, 'ingest' => $result], 201);
}

// ----------------------------------------------------------------------------
// 5e. POST /v1/auth/register & /v1/auth/login (Web + Mobile Auth)
// ----------------------------------------------------------------------------
if ($uri === '/v1/auth/register' && $method === 'POST') {
    RateLimiter::check('admin');
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $email = filter_var(trim($body['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $username = trim($body['username'] ?? '');
    $password = (string)($body['password'] ?? '');
    if (!$email || $username === '' || strlen($password) < 8) {
        jsonResponse(['success' => false, 'error' => 'Valid email, username, and password (8+ chars) required'], 400);
    }
    $db = Database::connect();
    $chk = $db->prepare("SELECT id FROM users WHERE email = ? OR username = ? LIMIT 1");
    $chk->execute([$email, $username]);
    if ($chk->fetchColumn()) {
        jsonResponse(['success' => false, 'error' => 'Email or username already registered'], 409);
    }
    $ins = $db->prepare("INSERT INTO users (username, email, password_hash, role) VALUES (?, ?, ?, 'user')");
    $ins->execute([$username, $email, password_hash($password, PASSWORD_DEFAULT)]);
    $uid = (int)$db->lastInsertId();
    jsonResponse(['success' => true, 'token' => issueAuthToken($uid, 'user'), 'user' => ['id' => $uid, 'username' => $username]], 201);
}

if ($uri === '/v1/auth/login' && $method === 'POST') {
    RateLimiter::check('admin');
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $email = trim($body['email'] ?? '');
    $password = (string)($body['password'] ?? '');
    $db = Database::connect();
    $stmt = $db->prepare("SELECT id, username, password_hash, role, is_active FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if (!$user || empty($user['is_active']) || !password_verify($password, $user['password_hash'])) {
        jsonResponse(['success' => false, 'error' => 'Invalid credentials'], 401);
    }
    jsonResponse(['success' => true, 'token' => issueAuthToken((int)$user['id'], $user['role']), 'user' => ['id' => (int)$user['id'], 'username' => $user['username']]]);
}

// ----------------------------------------------------------------------------
// 5f. GET/POST /v1/user/progress & /v1/user/bookmarks (Cross-device Sync)
// ----------------------------------------------------------------------------
if ($uri === '/v1/user/progress' && $method === 'GET') {
    $uid = requireAuthUserId();
    $db = Database::connect();
    $stmt = $db->prepare("SELECT m.slug, m.title, rh.chapter_number, rh.page_number, rh.updated_at FROM reading_history rh JOIN manga m ON rh.manga_id = m.id WHERE rh.user_id = ? ORDER BY rh.updated_at DESC LIMIT 100");
    $stmt->execute([$uid]);
    jsonResponse(['success' => true, 'progress' => $stmt->fetchAll()]);
}

if ($uri === '/v1/user/progress' && $method === 'POST') {
    $uid = requireAuthUserId();
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $slug = trim($body['slug'] ?? '');
    $chapter = (float)($body['chapter_number'] ?? 1);
    $page = max(1, (int)($body['page_number'] ?? 1));
    $db = Database::connect();
    $mStmt = $db->prepare("SELECT id FROM manga WHERE slug = ? LIMIT 1");
    $mStmt->execute([$slug]);
    $mangaId = (int)$mStmt->fetchColumn();
    if (!$mangaId) {
        jsonResponse(['success' => false, 'error' => 'Manga not found'], 404);
    }
    $up = $db->prepare("INSERT INTO reading_history (user_id, manga_id, chapter_number, page_number) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE chapter_number = VALUES(chapter_number), page_number = VALUES(page_number), updated_at = NOW()");
    $up->execute([$uid, $mangaId, $chapter, $page]);
    jsonResponse(['success' => true, 'slug' => $slug, 'chapter_number' => $chapter, 'page_number' => $page]);
}

if ($uri === '/v1/user/bookmarks' && $method === 'GET') {
    $uid = requireAuthUserId();
    $db = Database::connect();
    $stmt = $db->prepare("SELECT m.slug, m.title, m.cover_url, ub.created_at FROM user_bookmarks ub JOIN manga m ON ub.manga_id = m.id WHERE ub.user_id = ? ORDER BY ub.created_at DESC");
    $stmt->execute([$uid]);
    jsonResponse(['success' => true, 'bookmarks' => $stmt->fetchAll()]);
}

if ($uri === '/v1/user/bookmarks' && $method === 'POST') {
    $uid = requireAuthUserId();
    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $slug = trim($body['slug'] ?? '');
    $db = Database::connect();
    $mStmt = $db->prepare("SELECT id FROM manga WHERE slug = ? LIMIT 1");
    $mStmt->execute([$slug]);
    $mangaId = (int)$mStmt->fetchColumn();
    if (!$mangaId) {
        jsonResponse(['success' => false, 'error' => 'Manga not found'], 404);
    }
    $chk = $db->prepare("SELECT 1 FROM user_bookmarks WHERE user_id = ? AND manga_id = ?");
    $chk->execute([$uid, $mangaId]);
    if ($chk->fetchColumn()) {
        $db->prepare("DELETE FROM user_bookmarks WHERE user_id = ? AND manga_id = ?")->execute([$uid, $mangaId]);
        jsonResponse(['success' => true, 'bookmarked' => false]);
    }
    $db->prepare("INSERT INTO user_bookmarks (user_id, manga_id) VALUES (?, ?)")->execute([$uid, $mangaId]);
    jsonResponse(['success' => true, 'bookmarked' => true]);
}

// ----------------------------------------------------------------------------
// 6. POST /v1/admin/manga/import (Upsert manga metadata from seeder/cron)
// ----------------------------------------------------------------------------
if ($uri === '/v1/admin/manga/import' && $method === 'POST') {
    RateLimiter::check('admin');
    $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
    $expectedKey = getenv('ADMIN_API_KEY') ?: 'mv_adm_secret_key_change_in_production';
    if (!hash_equals($expectedKey, $apiKey)) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized: Invalid X-API-Key'], 401);
    }

    $body = json_decode(file_get_contents('php://input'), true);
    if (!is_array($body) || empty($body['slug']) || empty($body['title'])) {
        jsonResponse(['success' => false, 'error' => 'Missing required fields: slug, title'], 400);
    }

    $db = Database::connect();
    $existsStmt = $db->prepare("SELECT id FROM manga WHERE slug = ? LIMIT 1");
    $existsStmt->execute([$body['slug']]);
    $existingId = $existsStmt->fetchColumn();

    if ($existingId) {
        $upd = $db->prepare("
            UPDATE manga SET
              title = ?, original_title = ?, synopsis = ?, author = ?, artist = ?,
              demographic = ?, content_type = ?, publication_status = ?, reading_direction = ?,
              cover_url = ?, mangadex_id = ?, anilist_id = ?, trailer_id = ?,
              trailer_source = ?, release_day = ?
            WHERE id = ?
        ");
        $upd->execute([
            $body['title'], $body['original_title'] ?? null, $body['synopsis'] ?? null,
            $body['author'] ?? null, $body['artist'] ?? null, $body['demographic'] ?? 'Unknown',
            $body['content_type'] ?? 'Manga', $body['publication_status'] ?? 'ongoing',
            $body['reading_direction'] ?? 'rtl', $body['cover_url'] ?? null,
            $body['mangadex_id'] ?? null, $body['anilist_id'] ?? null,
            $body['trailer_id'] ?? null, $body['trailer_source'] ?? null,
            $body['release_day'] ?? null, $existingId
        ]);
        jsonResponse(['success' => true, 'action' => 'updated', 'id' => (int)$existingId]);
    } else {
        $ins = $db->prepare("
            INSERT INTO manga (
              slug, title, original_title, synopsis, author, artist, demographic,
              content_type, publication_status, reading_direction, cover_url,
              mangadex_id, anilist_id, trailer_id, trailer_source, release_day
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $ins->execute([
            $body['slug'], $body['title'], $body['original_title'] ?? null,
            $body['synopsis'] ?? null, $body['author'] ?? null, $body['artist'] ?? null,
            $body['demographic'] ?? 'Unknown', $body['content_type'] ?? 'Manga',
            $body['publication_status'] ?? 'ongoing', $body['reading_direction'] ?? 'rtl',
            $body['cover_url'] ?? null, $body['mangadex_id'] ?? null,
            $body['anilist_id'] ?? null, $body['trailer_id'] ?? null,
            $body['trailer_source'] ?? null, $body['release_day'] ?? null
        ]);
        jsonResponse(['success' => true, 'action' => 'inserted', 'id' => (int)$db->lastInsertId()], 201);
    }
}

// ----------------------------------------------------------------------------
// 7. POST /v1/admin/discover (Discover historical / open public domain material)
// ----------------------------------------------------------------------------
if ($uri === '/v1/admin/discover' && $method === 'POST') {
    RateLimiter::check('admin');
    $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
    $expectedKey = getenv('ADMIN_API_KEY') ?: 'mv_adm_secret_key_change_in_production';
    if (!hash_equals($expectedKey, $apiKey)) {
        jsonResponse(['success' => false, 'error' => 'Unauthorized: Invalid X-API-Key'], 401);
    }

    $body = json_decode(file_get_contents('php://input'), true) ?? [];
    $source = $body['source'] ?? 'internet-archive';
    $results = [];

    if ($source === 'internet-archive') {
        $connector = new InternetArchiveConnector();
        $query = $body['query'] ?? 'mediatype:texts AND (subject:manga OR subject:comics)';
        $results = $connector->discover($query, 15);
    } elseif ($source === 'wikimedia-commons') {
        $connector = new WikimediaConnector();
        $query = $body['query'] ?? 'manga illustration';
        $results = $connector->discover($query, 15);
    } elseif ($source === 'ndl-japan') {
        $connector = new NDLConnector();
        $query = $body['query'] ?? '漫画';
        $results = $connector->discover($query, 15);
    }

    jsonResponse([
        'success' => true,
        'source' => $source,
        'count' => count($results),
        'results' => $results
    ]);
}

// Fallback: 404
jsonResponse([
    'success' => false,
    'error' => 'Endpoint not found',
    'requested_uri' => $uri
], 404);
