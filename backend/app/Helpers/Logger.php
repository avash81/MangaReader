<?php
/**
 * Logger.php
 * ──────────
 * Structured JSON logger with PII/secret redaction and SHA-256 IP hashing.
 */
class Logger {
    private static function getLogPath(): string {
        $dir = __DIR__ . '/../../logs';
        if (!is_dir($dir)) {
            @mkdir($dir, 0750, true);
        }
        return $dir . '/mangaverse.log';
    }

    public static function info(string $message, array $context = []): void {
        self::write('INFO', $message, $context);
    }

    public static function warn(string $message, array $context = []): void {
        self::write('WARN', $message, $context);
    }

    public static function error(string $message, array $context = []): void {
        self::write('ERROR', $message, $context);
    }

    private static function write(string $level, string $message, array $context): void {
        $safeContext = self::redact($context);
        $entry = json_encode([
            'timestamp'  => date('c'),
            'level'      => $level,
            'message'    => $message,
            'request_id' => $_SERVER['HTTP_X_REQUEST_ID'] ?? uniqid('req_', true),
            'ip_hash'    => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0'),
            'uri'        => $_SERVER['REQUEST_URI'] ?? 'cli',
            'context'    => $safeContext,
        ], JSON_UNESCAPED_UNICODE);

        if ($entry !== false) {
            @file_put_contents(self::getLogPath(), $entry . PHP_EOL, FILE_APPEND | LOCK_EX);
        }
    }

    private static function redact(array $data): array {
        $sensitive = ['password', 'pass', 'token', 'api_key', 'x_api_key', 'secret', 'email', 'authorization'];
        $clean = [];
        foreach ($data as $k => $v) {
            $lower = strtolower((string)$k);
            if (in_array($lower, $sensitive, true)) {
                $clean[$k] = '[REDACTED]';
            } elseif (is_array($v)) {
                $clean[$k] = self::redact($v);
            } else {
                $clean[$k] = $v;
            }
        }
        return $clean;
    }
}
