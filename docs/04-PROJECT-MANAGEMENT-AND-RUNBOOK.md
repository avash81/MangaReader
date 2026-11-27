# 04 — Project Management, CI/CD & Operations Runbook

> **Purpose:** How work is planned, tested, released, and operated in production so any developer can step in and run the project safely.

---

## 1. Git & Release Workflow

### Branch & Commit Convention
- `main` is always deployable (auto-deploys static frontend on Vercel; cPanel deploys pull from verified commits).
- Use Conventional Commits:
  - `feat(scope): ...` — new capability
  - `fix(scope): ...` — bug fix
  - `refactor(scope): ...` — internal cleanup without behavior change
  - `docs(scope): ...` — documentation updates
  - `chore(scope): ...` — cron, config, maintenance

### Mandatory Pre-Push Gate (PowerShell)
```powershell
cd E:\Manga
node test-suite.js
# Must output: 28 PASSED, 0 FAILED
```
Never push if any test fails or if `app.js` has syntax errors.

---

## 2. Sprint & Task Management Template

Organize all work into prioritized buckets:
- **P0 (Blocker / Broken):** Breaks core user flow or security (e.g., trailer strip missing, proxy not wired).
- **P1 (Core Quality):** UX, responsiveness, Core Web Vitals, SEO basics.
- **P2 (Scale & Growth):** Bulk 1K+ import, reading progress persistence, cPanel go-live.
- **P3 (Polish & Future):** Swipe gestures, prefetching, Flutter mobile app.

### Definition of Done (DoD)
A task is only **Done** when:
1. Code is implemented following `docs/03-CODING-STANDARDS-AND-SECURITY.md`.
2. `node test-suite.js` passes `28/28`.
3. Mobile (`375px`) and Desktop (`1280px`) layouts are verified.
4. Relevant documentation (`docs/` or `DEPLOY-CPANEL.md`) is updated if architecture/config changed.

---

## 3. cPanel Production Deployment Runbook

1. **Upload Files:**
   - Upload `index.html`, `app.js`, `styles.css`, `sw.js`, `.htaccess`, and `backend/` to `public_html/`.
2. **Database Setup:**
   - Create MySQL DB & user in cPanel → MySQL Databases.
   - Import `backend/database/schema.sql` via phpMyAdmin.
3. **Environment Configuration:**
   - Copy `backend/.env.example` → `backend/.env` and fill `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`, `ADMIN_API_KEY`.
4. **Verify Health Endpoint:**
   - Visit `https://yourdomain.com/api/v1/health` → confirm `{"status":"ok","db":"connected"}`.
5. **Seed Initial Catalog:**
   ```powershell
   node scripts/seed-to-mysql.js --api-url=https://yourdomain.com/api/v1
   ```
6. **Configure Cron Jobs in cPanel:**
   - Every 2 hours: `php /home/USER/public_html/backend/cron/sync_chapters.php >> /home/USER/logs/sync.log 2>&1`
   - Daily 03:00: bulk import new AniList titles.
   - Hourly: purge expired rows in `api_cache` and `rate_limits`.

---

## 4. Incident & Rollback Runbook

| Symptom | First Check | Immediate Mitigation |
|---|---|---|
| Users see stale UI after deploy | Check `sw.js` version & Network-First rules | Bump cache version in `sw.js` and push |
| Chapter images fail to load | Test `/api/v1/proxy/pages/{uuid}` & check `sync.log` | Verify MangaDex API reachability & `api_cache` table |
| Sudden 500 errors on PHP API | Check cPanel `error_log` & `mangaverse.log` | Revert last commit (`git revert HEAD`) & re-upload |
| Scraper traffic spike | Check `rate_limits` row counts & Cloudflare Analytics | Tighten Cloudflare WAF challenge on `/api/v1/proxy/*` |
