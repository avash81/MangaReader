# 02 — System Architecture, Data Flow & API Contract

> **Purpose:** Complete technical blueprint of MangaVerse across **Edge, Web Frontend, Mobile App (Flutter), PHP Backend, MySQL Database, and External APIs**. Any developer onboarding to this repo should read this file first.

---

## 1. High-Level System Architecture

```
                         ┌───────────────────────────┐
                         │   Users (Web & Mobile)    │
                         └─────────────┬─────────────┘
                                       │ HTTPS
                                       ▼
                         ┌───────────────────────────┐
                         │  Cloudflare Edge (Free)   │
                         │  WAF · Bot Filter · DDoS  │
                         └──────┬─────────────┬──────┘
                                │             │
              Static SPA Assets │             │ /api/v1/*
                                ▼             ▼
               ┌────────────────────┐   ┌──────────────────────────┐
               │  Web Frontend      │   │  cPanel PHP 8+ Router    │
               │  index.html        │   │  backend/public/index.php│
               │  app.js · styles   │   │  RateLimiter · Proxy     │
               │  sw.js (v2.2)      │   └──────┬─────────────┬─────┘
               └────────────────────┘          │             │
                                               ▼             ▼
                                     ┌──────────────┐  ┌─────────────────┐
                                     │  MySQL 8.0   │  │ External APIs   │
                                     │  manga       │  │ AniList GraphQL │
                                     │  chapters    │  │ MangaDex API v5 │
                                     │  api_cache   │  │ MangaDex@Home   │
                                     │  rate_limits │  └─────────────────┘
                                     └──────────────┘
```

### Key Architectural Principles
1. **Zero Local Piracy / DMCA-Safe Metadata Model:**
   - We **never** store third-party manga page images on our server.
   - We store metadata + AniList CDN cover URLs + MangaDex chapter UUIDs.
   - At read time, `MangaDexProxy.php` resolves chapter page URLs and the user's browser/app fetches images directly from MangaDex@Home CDN nodes.
2. **Single Backend for Web + Mobile App:**
   - Both the Web SPA (`app.js`) and the planned Flutter App consume `/api/v1/*`.
   - Web SPA auto-detects environment via `detectApiBase()` (`localhost` → local PHP, `*.vercel.app` → embedded `MANGA_DATABASE` fallback, custom domain → `/api/v1`).
3. **cPanel-Compatible Design:**
   - No Node.js daemon, Docker, or Redis required in production.
   - MySQL `api_cache` table acts as our 20-minute TTL cache; cPanel cron jobs replace background queues.

---

## 2. Database Schema & Entity Relationships

```
[manga] 1 ──────< * [chapters]
   │
   └── (anilist_id, mangadex_id, title, slug, cover_url, trailer_id, genres JSON, score)

[api_cache]         (cache_key PK, response_body MEDIUMTEXT, expires_at DATETIME)
[rate_limits]       (ip_hash + endpoint PK, request_count, window_start)
[import_batches]    (id PK, source, status, titles_found, titles_imported, timestamps)
```

### Table Responsibilities
| Table | Purpose | Retention / Indexing |
|---|---|---|
| `manga` | Master catalog (1K → 100K titles) | `UNIQUE(anilist_id)`, `UNIQUE(mangadex_id)`, `FULLTEXT(title)` |
| `chapters` | Chapter index + UUIDs + local PDF URLs | `INDEX(manga_id, language, chapter_number DESC)` |
| `api_cache` | 20-min cache for MangaDex `@at-home` responses | Hourly cleanup where `expires_at < NOW()` |
| `rate_limits` | Sliding-window anti-abuse counters | `ip_hash` = SHA-256 (never raw IP) |
| `import_batches` | Audit log for cron & bulk imports | Tracks `running / done / failed` |

---

## 3. REST API Contract (`/api/v1/*`)

All responses return `Content-Type: application/json; charset=utf-8`.

| Method | Endpoint | Auth | Rate Limit | Response |
|---|---|---|---|---|
| `GET` | `/api/v1/health` | Public | 200/min | `{"status":"ok","db":"connected","manga_count":...}` |
| `GET` | `/api/v1/catalog?page=1&limit=18&genre=&status=&sort=` | Public | 200/min | `{"data":[...],"meta":{"page":1,"limit":18,"total":...}}` |
| `GET` | `/api/v1/manga/{id}` | Public | 200/min | `{"data":{...}}` |
| `GET` | `/api/v1/manga/{id}/chapters?lang=en` | Public | 200/min | `{"data":[...]}` |
| `GET` | `/api/v1/proxy/pages/{chapterUuid}` | Public | 30/min | `{"data":{"pages":["https://..."]}}` |
| `POST` | `/api/v1/admin/manga/import` | `X-Admin-Key` | Strict | `{"imported":N,"updated":N,"skipped":N}` |

### Standard Error Payload
```json
{
  "error": "Too Many Requests",
  "code": 429,
  "message": "Rate limit exceeded. Retry after 60s."
}
```

---

## 4. Mobile App Architecture (Flutter Blueprint)

When building the mobile app, mirror the exact same backend API using **Clean Architecture + Riverpod**:

```
lib/
├── core/          # Dio HTTP client, Isar local DB, theme tokens, connectivity
├── data/          # RemoteDataSource (/api/v1/*), LocalDataSource (Isar + file downloads), Models
├── domain/        # Pure Dart entities (Manga, Chapter), Repository interfaces, UseCases
└── presentation/  # Riverpod providers, Home/Detail/Reader/Settings screens, Shimmer cards
```

### Mobile-Specific Capabilities
- **Dual Reader Engine:** `PageView.builder` (RTL/LTR paged with `InteractiveViewer` 4x zoom) + `ListView.builder` (Webtoon vertical scroll with `cacheExtent: 2000`).
- **Offline Downloads:** Save binary pages to `getApplicationDocumentsDirectory()/mangaverse/{mangaId}/{chapterUuid}/001.webp` and track state in Isar.
- **Push Notifications:** Subscribe to FCM topic `manga_{id}`; `sync_chapters.php` triggers FCM multicast on new chapter discovery with deep link `mangaverse://manga/{id}/chapter/{uuid}`.
