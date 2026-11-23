const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7890;
const ROOT = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  let cleanUrl = req.url.split('?')[0];
  if (cleanUrl === '/' || cleanUrl === '') {
    cleanUrl = '/index.html';
  }

  let filePath = path.join(ROOT, cleanUrl);

  // Security: Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(ROOT, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Service Worker Header
    if (ext === '.js' && filePath.endsWith('sw.js')) {
      res.setHeader('Service-Worker-Allowed', '/');
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache'
    });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 MangaVerse server running live at http://localhost:${PORT}/`);
  console.log(`📁 Serving directory: ${ROOT}`);
});
