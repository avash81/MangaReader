# MangaVerse — cPanel Production Deployment Guide

> Follow these steps to deploy MangaVerse (Web SPA + PHP API + MySQL + Cron Sync) onto shared or managed **cPanel** hosting.

---

## 1. Prerequisites
- **cPanel Hosting** with **PHP 8.0+** (`pdo_mysql`, `curl`, `json`, `mbstring` enabled)
- **MySQL 8.0+** (or MariaDB 10.4+) + **phpMyAdmin**
- **SSL Certificate** (AutoSSL / Let's Encrypt enabled in cPanel)
- *(Recommended)* **Cloudflare Free Plan** in front of your domain for WAF, bot filtering, and edge caching

---

## 2. Upload Project Files
Upload the repository contents into `public_html/` (via cPanel File Manager, Git Version Control, or SFTP):
- `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.json`, `robots.txt`, `sitemap.xml`, `db.js`, `search-worker.js`
- `.htaccess` (routes `/api/v1/*` to `backend/public/index.php` and blocks `.env`, `backend/config/`, `scripts/`)
- `backend/` directory

> **Verify `.htaccess`:** Ensure hidden dotfiles (`.htaccess`) are visible and uploaded in `public_html/`.

---

## 3. Create MySQL Database & Import Schema
1. In cPanel → **MySQL® Databases**:
   - Create database: `yourcpanel_mangaverse`
   - Create user: `yourcpanel_mangauser` with a strong password
   - Add user to database with **ALL PRIVILEGES**
2. Open **phpMyAdmin** → select `yourcpanel_mangaverse` → **Import** → choose `backend/database/schema.sql` → **Go**.
3. Confirm all 16 tables exist (including `manga`, `chapters`, `api_cache`, `rate_limits`, `import_batches`).

---

## 4. Configure `backend/.env`
Copy `backend/.env.example` to `backend/.env` and update with your production values:

```ini
APP_ENV=production
DB_HOST=localhost
DB_PORT=3306
DB_NAME=yourcpanel_mangaverse
DB_USER=yourcpanel_mangauser
DB_PASS=YOUR_STRONG_DB_PASSWORD

ADMIN_API_KEY=GENERATE_A_RANDOM_64_CHAR_HEX_KEY
STORAGE_DRIVER=local
```

> **Security:** Never commit `backend/.env` to Git. `.htaccess` blocks HTTP access to `.env` files, and PHP `display_errors` should be `Off` in cPanel MultiPHP INI Editor.

---

## 5. Verify API Health Endpoint
Open in your browser or `curl`:
```
https://yourdomain.com/api/v1/health
```
Expected response:
```json
{
  "status": "healthy",
  "service": "MangaVerse Content Automation Engine (MCAE)",
  "db": "connected",
  "manga_count": 0,
  "version": "1.0.0"
}
```
If `db` is `"error"`, double-check `DB_HOST`, `DB_NAME`, `DB_USER`, and `DB_PASS` in `backend/.env`.

---

## 6. Seed the Initial Catalog to MySQL
From your local machine (with Node.js installed):
```powershell
cd E:\Manga
node scripts/seed-to-mysql.js --api-url=https://yourdomain.com/api/v1 --api-key=YOUR_ADMIN_API_KEY
```
Re-check `/api/v1/health` — `manga_count` should now reflect the imported catalog.

---

## 7. Configure cPanel Cron Jobs
In cPanel → **Cron Jobs**, add these 3 jobs (replace `CPANEL_USER` with your cPanel username):

1. **MangaDex Chapter Sync (Every 2 Hours):**
   ```bash
   0 */2 * * * php /home/CPANEL_USER/public_html/backend/cron/sync_chapters.php >> /home/CPANEL_USER/logs/mangaverse_sync.log 2>&1
   ```
2. **Hourly Expired Cache Cleanup:**
   ```bash
   0 * * * * php -r "require '/home/CPANEL_USER/public_html/backend/config/database.php'; \$db=Database::connect(); \$db->exec('DELETE FROM api_cache WHERE expires_at < NOW()');" >/dev/null 2>&1
   ```
3. **Daily AniList Bulk Import (03:00 AM, if Node.js is available on server, or run locally & seed):**
   ```bash
   0 3 * * * node /home/CPANEL_USER/public_html/scripts/bulk-import-anilist.js --pages=20 --target=mysql --api-url=https://yourdomain.com/api/v1 --api-key=YOUR_ADMIN_API_KEY >> /home/CPANEL_USER/logs/mangaverse_import.log 2>&1
   ```

---

## 8. Enable Cloudflare (Recommended)
1. Point your domain's DNS to Cloudflare (Proxied / orange cloud).
2. Set SSL/TLS mode to **Full (strict)**.
3. Add a WAF rule blocking obvious scraper User-Agents (`python-requests`, `Scrapy`) on `/api/v1/proxy/*`.
