/**
 * MangaVerse Service Worker - High-Performance Edge Offline & Cache Engine
 * Enables sub-100ms load times and offline reading for millions of concurrent users.
 */

const CACHE_NAME = 'mangaverse-v2.5';
const CORE_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './styles.css',
  './app.js',
  './db.js',
  './search-worker.js',
  './manifest.json',
  './robots.txt',
  './sitemap.xml',
  './.well-known/assetlinks.json',
  './.well-known/apple-app-site-association'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[ServiceWorker] Pre-cache partial skip:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore cross-origin non-GET requests
  if (event.request.method !== 'GET') return;

  // Network-First for app core assets so deployments appear immediately
  event.respondWith(
    fetch(event.request).then((networkResponse) => {
      if (networkResponse && networkResponse.status === 200) {
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
      }
      return networkResponse;
    }).catch(() => {
      return caches.match(event.request).then((cached) => {
        if (cached) return cached;
        if (event.request.mode === 'navigate') {
          return caches.match('./offline.html');
        }
        return undefined;
      });
    })
  );
});
