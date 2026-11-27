# 03 — Coding Standards, Security & Performance Rules

> **Purpose:** Non-negotiable engineering rules for anyone writing or reviewing code in MangaVerse (or any derivative project).

---

## 1. Coding Standards by Language

### JavaScript (`app.js`, `sw.js`, `scripts/*.js`)
- **No build step assumptions:** Keep `app.js` valid browser ES2020 without bundler-only syntax.
- **Data-write safety:** When scripts update `MANGA_DATABASE` in `app.js`, always replace with:
  ```js
  const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + JSON.stringify(db, null, 2) + ';');
  ```
  Never append an extra `];` (prevents the double-bracket syntax error).
- **Debounce user input:** Search inputs must debounce (`300ms`) before filtering or calling `/api/v1/search`.
- **No download UI:** Never render download buttons or raw PDF save links in the reader.

### CSS (`styles.css`)
- **Design tokens only:** Use CSS custom properties from `:root` for colors, spacing, radii, and shadows.
- **Mobile-first grid:** Default to 2 columns on `< 640px`, 3 on tablet, 5 on laptop, 6 on desktop.
- **Zero Layout Shift (CLS < 0.1):** Every cover image container must declare `aspect-ratio: 2 / 3;` and explicit dimensions.
- **Touch targets:** All interactive buttons/links on mobile must be at least `44px × 44px`.

### PHP (`backend/**/*.php`)
- **PDO Prepared Statements ONLY:** Zero string interpolation in SQL queries. Set `PDO::ATTR_EMULATE_PREPARES => false`.
- **Output escaping:** Use `htmlspecialchars($val, ENT_QUOTES, 'UTF-8')` if rendering HTML; use `json_encode(..., JSON_THROW_ON_ERROR)` for API JSON.
- **Input validation:** Cast pagination params (`max(1, (int)$_GET['page'])`, cap `limit` at `50`). Validate UUID formats with regex before querying MangaDex.
- **Production error hygiene:** `display_errors = 0`, `log_errors = 1`. Never leak stack traces or DB credentials in HTTP responses.

---

## 2. Security Checklist (Defense in Depth)

1. **Edge (Cloudflare):** Enable WAF, block known scraper User-Agents (`python-requests`, `Scrapy`, empty UA), rate-limit `/api/v1/proxy/*`.
2. **Apache / `.htaccess`:**
   - Route `/api/v1/*` → `backend/public/index.php`.
   - Deny HTTP access to `.env`, `.sql`, `.log`, `backend/config/`, `scripts/`.
   - Enforce security headers:
     - `X-Content-Type-Options: nosniff`
     - `X-Frame-Options: SAMEORIGIN`
     - `Referrer-Policy: strict-origin-when-cross-origin`
3. **Content Security Policy (`index.html`):**
   - Whitelist only `'self'`, `cdnjs.cloudflare.com` (PDF.js), `s4.anilist.co`, `*.mangadex.org`, and `www.youtube.com` (trailers).
   - Keep `object-src 'none'` to block legacy plugins.
4. **Rate Limiting (`RateLimiter.php`):**
   - Store hashed IP (`SHA-256`) + endpoint in `rate_limits`.
   - Limits: `proxy = 30 req/min`, `catalog = 200 req/min`. Return HTTP `429` on breach.
5. **Admin Authentication:**
   - Protect `POST /api/v1/admin/*` with `X-Admin-Key` verified via `hash_equals()`.

---

## 3. Performance & Core Web Vitals Rules

| Metric | Target | Enforcement Rule |
|---|---|---|
| **LCP** | `< 2.5s` | First 6 visible catalog covers & first reader page use `loading="eager"` + `fetchpriority="high"`. |
| **CLS** | `< 0.1` | Reserve `aspect-ratio: 2 / 3` on cards and `aspect-ratio` wrappers on reader pages. |
| **FCP** | `< 1.8s` | Render animated CSS skeleton cards immediately while catalog data loads. |
| **INP** | `< 200ms` | Lazy-load PDF.js only when a PDF chapter is opened; use `IntersectionObserver` (`rootMargin: '400px'`) for images. |
| **Cache** | Fresh code | Service Worker (`sw.js`) uses **Network-First** for `index.html`, `app.js`, `styles.css` so updates never get stuck. |
