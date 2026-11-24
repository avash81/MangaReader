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
require_once __DIR__ . '/../app/Services/RightsVerifier.php';
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

// ----------------------------------------------------------------------------
// 1. GET /v1/health
// ----------------------------------------------------------------------------
if ($uri === '/v1/health') {
    jsonResponse([
        'status' => 'healthy',
        'service' => 'MangaVerse Content Automation Engine (MCAE)',
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
    $stmt = $db->prepare("SELECT id, slug, title, original_title, synopsis, author, artist, demographic, content_type, original_language, publication_status, reading_direction, cover_url, publication_year, mangadex_id, rating FROM manga WHERE {$whereSql} ORDER BY id ASC LIMIT {$limit} OFFSET {$offset}");
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
    $mangaId = $matches[1];
    $db = Database::connect();

    $stmt = $db->prepare("SELECT id FROM manga WHERE id = ? OR slug = ? LIMIT 1");
    $stmt->execute([$mangaId, $mangaId]);
    $manga = $stmt->fetch();

    if (!$manga) {
        jsonResponse(['success' => false, 'error' => 'Manga not found'], 404);
    }

    $cStmt = $db->prepare("SELECT id, chapter_number, chapter_title, volume_number, language_code, status, page_count, external_chapter_id, external_url FROM chapters WHERE manga_id = ? AND status = 'published' ORDER BY chapter_number ASC");
    $cStmt->execute([$manga['id']]);
    $chapters = $cStmt->fetchAll();

    jsonResponse(['success' => true, 'manga_id' => $mangaId, 'chapters' => $chapters]);
}

// ----------------------------------------------------------------------------
// 6. POST /v1/admin/discover (Discover historical / open public domain material)
// ----------------------------------------------------------------------------
if ($uri === '/v1/admin/discover' && $method === 'POST') {
    $apiKey = $_SERVER['HTTP_X_API_KEY'] ?? '';
    $expectedKey = getenv('ADMIN_API_KEY') ?: 'mv_adm_secret_key_change_in_production';
    if ($apiKey !== $expectedKey) {
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
