# MangaVerse: Next-Gen Manga Platform

A high-performance web platform and directory for reading Manga, Manhwa, and Manhua with real-time Tokyo simulpub synchronization, embedded PDF manuscript support, and client-side inverted-index search.

## Live Deployment

Production website: **[https://www.managaa.website](https://www.managaa.website)**

* Infrastructure: Vercel Global Edge Network
* Deployment: Automated Git CI/CD on every push to `main`
* Formats: Manga (Right-to-Left), Manhwa (Vertical Webtoon Scroll), Manhua (Full-Color Scroll), and PDF manuscripts up to 50MB

---

## Architecture and Performance

MangaVerse is engineered as a client-side edge application with sub-50ms Time-to-First-Byte (TTFB) and zero database latency:

* **Off-Main-Thread Search Engine**: Executes multi-token fuzzy search and 3-state boolean tag algebra across the entire catalog in under 5ms using a dedicated Web Worker and inverted index.
* **Persistent Storage**: Uses IndexedDB to store reading history, bookmarks, offline chapters, and user preferences locally on the client.
* **Offline-Ready Service Worker**: Progressive Web App (PWA) shell with a Stale-While-Revalidate caching strategy for uninterrupted reading without internet connectivity.
* **CSS Performance Containment**: Uses CSS containment and content visibility to maintain smooth 60fps scrolling across extensive card grids.

---

## Core Capabilities

### 1. Tokyo Synchronized Simulpub
* Real-time JST live clock synchronized with Japan Standard Time for publisher drops.
* 7-day schedule matrix organizing series drops from Sunday through Saturday.
* Live metadata tracking for chapter drop dates, view metrics, and community reactions.

### 2. Directory and 3-State Tag Algebra
* Interactive tag filtering engine:
  * Click 1x: **Include (+)**
  * Click 2x: **Exclude (-)**
  * Click 3x: **Reset**
* Demographic filters: Shonen, Seinen, Shojo, Josei.
* Format filters: Manga, Manhwa, Manhua.
* Multi-parameter sort metrics: Popularity, Community Rating, Latest Chapter Release, Alphabetical.

### 3. Unified Reader and PDF Viewer
* Responsive vertical continuous scroll for webtoons and horizontal pagination for traditional manga.
* Native PDF viewer integration allowing creators to read full PDF manuscripts directly inside the browser.
* 4 viewing themes: OLED Black, Charcoal, Vintage Sepia, and Tokyo Paper White.
* Integrated keyboard navigation (`Esc` to exit, `F` for fullscreen, arrow keys for page progression).

---

## Local Development

### Prerequisites
* Node.js (version 18 or higher)

### Setup and Local Server
```bash
# Clone the repository
git clone https://github.com/avash81/MangaReader.git
cd MangaReader

# Start the local development server
npm start
```
The application will be accessible locally at `http://localhost:7890`.

### Running Tests
```bash
# Master IEEE 1012 verification runner (78 automated assertions across all 5 suites)
npm test # or node test-all.js

# Run individual verification suites
npm run test:core         # Core architecture & schema suite (28 tests)
npm run test:deep         # Deep functions & worker integration suite (16 tests)
npm run test:subsystems   # Individual subsystem validation suite (19 tests)
npm run test:ui           # Recent changes & UI layout regression suite (7 tests)
npm run test:perf         # Enhancement & performance suite (8 tests)

# Comprehensive audit & payload footprint runner
npm run audit             # or node audit-runner.js
```

---

## 📚 Engineering Documentation & Playbooks

The repository includes a comprehensive, publication-grade developer playbook in `docs/`:

1. **[01-ENGINEERING-WORKFLOW.md](docs/01-ENGINEERING-WORKFLOW.md)**: 7-stage SDLC process (Requirements $\rightarrow$ Architecture $\rightarrow$ Construction $\rightarrow$ Testing $\rightarrow$ Deployment $\rightarrow$ SRE).
2. **[02-ARCHITECTURE-AND-DATA.md](docs/02-ARCHITECTURE-AND-DATA.md)**: C4 architecture diagrams, 19-table 3NF schema, REST API contract, and mobile blueprint.
3. **[03-CODING-STANDARDS-AND-SECURITY.md](docs/03-CODING-STANDARDS-AND-SECURITY.md)**: Clean Code rules, 5-layer security architecture (OWASP ASVS), Core Web Vitals targets.
4. **[04-PROJECT-MANAGEMENT-AND-RUNBOOK.md](docs/04-PROJECT-MANAGEMENT-AND-RUNBOOK.md)**: Git conventions, Definition of Done (DoD), incident response, and live operations runbook.
5. **[05-FLUTTER-PLAYBOOK.md](docs/05-FLUTTER-PLAYBOOK.md)**: Mobile Clean Architecture (Riverpod 2.5), offline caching engine, FCM topic push alerts, and app store release workflows.
6. **[06-SOFTWARE-ENGINEERING-THEORY-AND-FORMAL-VERIFICATION.md](docs/06-SOFTWARE-ENGINEERING-THEORY-AND-FORMAL-VERIFICATION.md)**: IEEE 12207 & SWEBOK v4 alignment, ISO 25010 Quality Model, and 78-test verification matrix.
7. **[DEPLOY-CPANEL.md](DEPLOY-CPANEL.md)**: 8-step production deployment guide for standard cPanel shared hosting (PHP 8.0+ & MySQL).

---

## 📱 Mobile App (Flutter)

The `mangaverse_app/` directory contains the production-grade Flutter application sharing the same `/api/v1` backend:
```bash
cd mangaverse_app
flutter create . --platforms=android,ios
flutter pub get
flutter test
flutter run --dart-define=API_BASE_URL=https://yourdomain.com/api/v1
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
