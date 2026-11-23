# MangaVerse: Next-Gen Manga Platform

A high-performance web platform and directory for reading Manga, Manhwa, and Manhua with real-time Tokyo simulpub synchronization, embedded PDF manuscript support, and client-side inverted-index search.

## Live Deployment

Production website: **[https://manga-reader-tau-six.vercel.app](https://manga-reader-tau-six.vercel.app)**

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
npm test
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
