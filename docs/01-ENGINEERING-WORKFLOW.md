# 01 — End-to-End Software Engineering Workflow (Reusable Blueprint)

> **Purpose:** This document defines the complete, repeatable Software Development Life Cycle (SDLC) used to plan, design, build, test, deploy, and manage **MangaVerse** — and serves as a **reusable template** any developer can follow to build another production web + mobile platform from scratch.

---

## The 7-Stage Engineering Lifecycle

```
[1. Discovery & PRD] ──▶ [2. System & Data Design] ──▶ [3. UI/UX & API Contract]
         ▲                                                         │
         │                                                         ▼
[7. Operate & Monitor] ◀── [6. Release & Deploy] ◀── [5. QA & Security] ◀── [4. Implementation]
```

Every feature, bugfix, or new project moves through these 7 gates in order. **Never skip straight to coding.**

---

## Stage 1: Discovery & Product Requirements (PRD)
Before writing a single line of code, document:
1. **Problem Statement:** What user problem are we solving, and why now?
2. **User Personas:** Who uses the system? (e.g., *Casual Mobile Reader*, *Power Desktop Reader*, *Admin/Operator*).
3. **User Stories + Acceptance Criteria (AC):**
   - Format: `As a <persona>, I want <action>, so that <outcome>.`
   - Every story must have testable **Acceptance Criteria** (pass/fail conditions).
4. **Explicit Out-of-Scope:** List what we are **not** building in this phase to prevent scope creep.
5. **Non-Functional Requirements (NFRs):**
   - Performance budgets (LCP `< 2.5s`, CLS `< 0.1`, API p95 `< 300ms`).
   - Scalability targets (concurrent users, total records).
   - Security & legal constraints (no DMCA-infringing local files, no PII in logs).

---

## Stage 2: System Architecture & Data Design
1. **Architecture Decision Records (ADRs):**
   - Record every major choice (`Context → Decision → Alternatives Rejected → Consequences`).
   - Example: *Why Vanilla JS + PHP on cPanel instead of Next.js + Docker?* (Zero build step, shared hosting compatibility).
2. **System Context & Component Diagrams:**
   - Draw the 3+ layers: **Edge (CDN/WAF) → Frontend (SPA / Mobile App) → Backend API → Database / External APIs**.
3. **Database Schema & Indexing Plan:**
   - Design normalized tables (`manga → chapters → reading_history`, `api_cache`, `rate_limits`, `import_batches`).
   - Define foreign keys, `FULLTEXT` / composite indexes, and data retention rules *before* coding.

---

## Stage 3: UI/UX Design & API-First Contract
1. **Design System & Tokens:**
   - Define colors, typography scale, 8px spacing grid, border radii, and responsive breakpoints (`320px → 480px → 768px → 1024px → 1280px+`) in CSS variables (`:root`).
2. **Component & State Inventory:**
   - Design **4 states** for every UI component: `Loading (Skeleton)`, `Empty`, `Error`, and `Populated`.
3. **API-First Contract:**
   - Lock request/response JSON shapes and standard error format (`{"error":"...","code":400}`) before frontend and backend developers work in parallel.
   - Both the **Web SPA** and **Flutter Mobile App** consume this exact same `/api/v1/*` contract.

---

## Stage 4: Implementation & Coding Standards
1. **Branching:** Create a feature branch from `main` (`feat/skeleton-loading`, `fix/trailer-strip`).
2. **Small, Single-Purpose Units:**
   - Keep functions focused, avoid duplicated logic, validate inputs at boundaries.
3. **Self-Documenting + Explicit Comments:**
   - Document *why* non-obvious rules exist (e.g., why `Referer` is stripped in `MangaDexProxy.php`, why `relationType === 'ADAPTATION' && format !== 'MUSIC'` is enforced).

---

## Stage 5: Verification, QA & Security Gate
Nothing merges or ships without passing:
1. **Automated Test Suite:** `node test-suite.js` (must be `28/28 PASSED`, 0 failures).
2. **Static / Sanity Checks:**
   - No syntax errors (`node --check app.js`, `php -l backend/public/index.php`).
   - No hardcoded secrets or API keys in tracked files.
3. **Security Audit:** PDO prepared statements, `htmlspecialchars()`, rate limiting, CSP headers, `.htaccess` restrictions.
4. **Core Web Vitals & Accessibility Check:** `aspect-ratio` on images (CLS = 0), keyboard navigation, ARIA labels, 44px+ mobile touch targets.

---

## Stage 6: Release & Deployment
1. **Environment Parity:** Config lives in `.env` (never committed); `.env.example` documents every variable.
2. **Database Migrations First:** Apply `schema.sql` changes before deploying code that queries new columns/tables.
3. **Deploy + Smoke Test:** Upload/push code, then immediately verify `/api/v1/health`, catalog load, series page, trailer embed, and chapter reader.
4. **Rollback Plan:** Every deploy must have a documented revert path (`git revert` / restore previous release).

---

## Stage 7: Operations, Monitoring & Iteration
1. **Structured Logging:** JSON logs with timestamps, request IDs, hashed IPs (never raw PII).
2. **Automated Background Jobs (Cron):**
   - Chapter sync every 2 hours (`sync_chapters.php`)
   - Daily metadata import (`bulk-import-anilist.js`)
   - Hourly expired cache cleanup (`api_cache` / `rate_limits`)
3. **Continuous Feedback Loop:** Track errors, slow queries, and Core Web Vitals → feed insights back into Stage 1 for the next sprint.
