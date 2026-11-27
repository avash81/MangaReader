<?php
/**
 * RateLimiter.php
 * ───────────────
 * MySQL-backed IP rate limiter with per-endpoint limits.
 * Upgrade to Redis (phpredis) at Tier 2 by swapping the backend.
 *
 * Usage:
 *   RateLimiter::check('proxy', 20);   // 20 req/min for chapter proxy
 *   RateLimiter::check('catalog', 120); // 120 req/min for catalog
 */

class RateLimiter {

    private static array $limits = [
        'default'  => ['requests' => 100, 'window' => 60],
        'catalog'  => ['requests' => 200, 'window' => 60],
        'proxy'    => ['requests' => 30,  'window' => 60],  // Chapter page proxy
        'search'   => ['requests' => 60,  'window' => 60],
        'admin'    => ['requests' => 20,  'window' => 60],
    ];

    /**
     * Check rate limit for the current IP.
     * Sends HTTP 429 and exits if limit exceeded.
     */
    public static function check(string $endpoint = 'default', ?int $overrideLimit = null): void {
        $ip       = self::getClientIp();
        $ipHash   = hash('sha256', $ip);
        $limit    = $overrideLimit ?? (self::$limits[$endpoint] ?? self::$limits['default'])['requests'];
        $window   = (self::$limits[$endpoint] ?? self::$limits['default'])['window'];
        $key      = "{$endpoint}:{$ipHash}";

        try {
            $db = Database::connect();

            // Clean expired windows first (keep table small)
            $db->exec("DELETE FROM rate_limits WHERE window_start < DATE_SUB(NOW(), INTERVAL 2 MINUTE)");

            // Upsert: increment count or create new window
            $stmt = $db->prepare("
                INSERT INTO rate_limits (ip_hash, endpoint, request_count, window_start)
                VALUES (?, ?, 1, NOW())
                ON DUPLICATE KEY UPDATE
                  request_count = IF(window_start < DATE_SUB(NOW(), INTERVAL ? SECOND), 1, request_count + 1),
                  window_start  = IF(window_start < DATE_SUB(NOW(), INTERVAL ? SECOND), NOW(), window_start)
            ");
            $stmt->execute([$key, $endpoint, $window, $window]);

            // Read current count
            $stmt2 = $db->prepare("SELECT request_count FROM rate_limits WHERE ip_hash = ? AND endpoint = ?");
            $stmt2->execute([$key, $endpoint]);
            $count = (int)($stmt2->fetchColumn() ?: 0);

            if ($count > $limit) {
                http_response_code(429);
                header('Retry-After: ' . $window);
                header('X-RateLimit-Limit: ' . $limit);
                header('X-RateLimit-Remaining: 0');
                echo json_encode([
                    'success' => false,
                    'error'   => 'Rate limit exceeded. Please slow down.',
                    'retryAfter' => $window
                ]);
                exit;
            }

            header('X-RateLimit-Limit: ' . $limit);
            header('X-RateLimit-Remaining: ' . max(0, $limit - $count));

        } catch (Exception $e) {
            // If rate limiter itself fails, let the request through (fail open)
            error_log('[RateLimiter] Error: ' . $e->getMessage());
        }
    }

    private static function getClientIp(): string {
        $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
        foreach ($headers as $h) {
            if (!empty($_SERVER[$h])) {
                $ip = trim(explode(',', $_SERVER[$h])[0]);
                if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                    return $ip;
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
}
