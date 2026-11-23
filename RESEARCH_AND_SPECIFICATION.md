# Deep-Dive Research & Exact Functional Specification
**Manga Reader Nexus: Forensic Teardown & Synthesis of MangaPlus, MangaPlaza, and Anime-Planet**

---

## 1. Deep-Dive Field Research & Network Extraction

### 1.1. Target 1: MangaPlus by Shueisha (`https://mangaplus.shueisha.co.jp/updates`)
* **Underlying Architecture**: Vue.js Single Page Application (SPA) powered by Shueisha Tokyo CDN (`jumpg-webapi.tokyo-cdn.com`).
* **Design DNA**: High-contrast dark theme (primary background `#0c0d10`, header `#12151e`, crimson accent `#e60024`).
* **Exact Component Hierarchy**:
  1. **Daily Calendar Tabs**: A 7-day horizontal carousel (`Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`, `Sunday`) plus an `All / Today` filter.
  2. **Simulpub Feed Rows (`ChapterListItem-module`)**:
     - Cover thumbnail with aspect ratio 1:1.4 or 1:1 square crop.
     - Title header (`TitleDetail-module_scheduleLabel`).
     - Chapter label & Chapter subtitle (e.g. `Ch. 271 - From Here to Eternity`).
     - Release timestamp (`ChapterListItem-module_date`, e.g. `Nov 18, 2026` or `3 hours ago`).
     - View count badge (`ChapterList-module_numberOfViews` with eye icon, e.g. `1.8M`).
     - Comment count badge (`ChapterListItem-module_commentCount` with bubble icon, e.g. `2,450`).
     - Already-read indicator (`alreadyReadChapterListItem` with dimmed opacity and green checkmark).
     - Simulpub / Free badge (`FREE`, `FIRST 3 CH FREE`, `MAX SUB`).
  3. **Reader Mechanism**:
     - Top navigation bar with chapter selector, zoom, and orientation.
     - Chapter end screen with comment stream and recommendation carousel.

### 1.2. Target 2: MangaPlaza Special Campaign (`https://mangaplaza.com/special/20261118-natipri/`)
* **Real Production Event Extracted**: **"National Princess Day Get 50% Off 1 Item"** (Active Period: *Nov. 18, 2026 12:00 AM – Dec. 1, 2026 11:59 PM PST*).
* **Design DNA**: Opulent royal pastel & gold aesthetics (`#2d1124`, `#fff3f8`, gold accent `#f59e0b`, crimson `#ff2a6d`), tiara/sparkle motifs.
* **Exact Component Hierarchy**:
  1. **Campaign Hero Header**:
     - Event Title: *"National Princess Day Get 50% Off 1 Item"*.
     - Validity Countdown Timer with exact PST expiration.
     - Interactive Coupon Claim Button: *"Get Coupon"* / *"Apply 50% Promo Pass"*.
     - Disclaimer & Eligibility: *"Excluding new releases • Redeemable across all featured royalty & reijo titles"*.
  2. **Staff Picks Spotlight Section (`✨ Staff Picks ✨`)**:
     - Highlight 1: *The Woebegone Wonder Girl Wants to Be Wicked* (by Sora Goto / Saki Ichibu / Yukako Fujimura) — Tags: `#Romance`, `#Fantasy`, `#Reijo/Aristocratic Daughters`, `#Shoujo`.
     - Highlight 2: *I Body-Switched With an Evil Hag for 10 Years, and Now My Knight Ex-Fiance Can't Let Me Go* (by Kotoko / Botemaru / Bodax) — Tags: `#Romance`, `#Fantasy`, `#Reijo`, `#Shoujo`.
     - Highlight 3: *The Reincarnated Villainess's Imperial Contract* — Tags: `#Isekai`, `#Reijo`, `#Drama`.
  3. **Keyword Taxonomy Grid**:
     - Chips: `Adult Romance`, `Mature(18+)`, `Yuri`, `Romance`, `Yaoi`, `Boys' Love`, `Full Color`, `MP Originals`, `Fantasy`, `Isekai`, `Reijo`, `Drama`, `School Life`, `Shoujo`, `Josei`, `Seinen`, `Complete`, `Anime Adaptation`, `Action`, `Horror`, `Revenge`.
  4. **18+ Mature Content Toggle Dialog**:
     - Modal warning: *"This will show mature content. Are you over the age of 18? [No] [Yes]"*.
  5. **Free Chapters Bulk Preview**:
     - Unlocks up to 10 free chapters per campaign title without spending points or coins.

### 1.3. Target 3: Anime-Planet Manga Read Online (`https://www.anime-planet.com/manga/read-online/`)
* **Design DNA**: Deep catalog database, utility-first dark/light UI, cyan & emerald accents (`#00b4d8`, `#10b981`).
* **Exact Component Hierarchy**:
  1. **Combinatorial Inclusion & Exclusion Multi-Tag Filtering**:
     - Tags can be clicked once to **Include** (+), clicked again to **Exclude** (-), or clicked a third time to reset.
  2. **Format & Demographic Selectors**:
     - Format: `Manga`, `Manhwa`, `Manhua`, `Light Novel`, `One-shot`, `Webtoon`.
     - Demographic: `Shōnen`, `Seinen`, `Shōjo`, `Josei`.
  3. **Sorting Engine**:
     - Options: `Popularity`, `Average Rating (High to Low)`, `Title (A-Z)`, `Most Chapters`, `Year of Release`.
  4. **Dual Layout Switcher**:
     - **Grid Poster View**: 3:4 aspect ratio covers with star rating pill (`★ 4.9`), type pill (`MANGA`), and hover quick-actions.
     - **Detailed List View**: Comprehensive table showing Thumbnail, Title, Japanese Title, Author, Year, Demographic, Rating Bar, Total Chapters, and Direct Reading Status Dropdown.
  5. **In-Browser Reading Hub / Tracking**:
     - Status categories: `Currently Reading`, `Plan to Read`, `Completed`, `On Hold`, `Dropped`, `Favorites`.
     - Tracks current chapter progress (e.g. `Ch. 42 / 271`).
     - JSON Export & Import for user ownership without lock-in.

---

## 2. The Unified Fusion Blueprint

```
+------------------------------------------------------------------------------------+
|                                    GLOBAL HEADER                                   |
| Logo | Simulpub Ticker | Navigation | 18+ Toggle | Search | Library (N) | Theme Mode  |
+------------------------------------------------------------------------------------+
|                                                                                    |
| [PILLAR 1: MANGAPLAZA CAMPAIGN STAGE]                                              |
| - "National Princess Day: 50% Off & Free Unlocks" Live Banner                      |
| - Real-Time PST Countdown Timer [DD : HH : MM : SS]                                |
| - Instant "Claim 50% Off / 24h Free Pass" Button + Coupon Wallet                   |
| - Interactive Campaign Carousel (Switch between Princess Day, Jump Fest, Dark Fantasy)|
| - ✨ Staff Picks Spotlight with In-Depth Synopsis & Instant "Read Ch. 1"           |
|                                                                                    |
+------------------------------------------------------------------------------------+
|                                                                                    |
| [PILLAR 2: MANGAPLUS SIMULPUB FEED & CALENDAR]                                     |
| - 7-Day Synchronized Drop Calendar (Sun, Mon, Tue, Wed, Thu, Fri, Sat)              |
| - Live Ticker: "Next Drop in 03h:28m:14s"                                          |
| - Card Feed with:                                                                  |
|   * Cover Thumbnail + "SIMULPUB" ribbon                                            |
|   * Series Title + Chapter Number + Subtitle                                       |
|   * View Counts (e.g. 1.8M) + Comment Counts (e.g. 2,410)                          |
|   * Read Checkmark for finished chapters                                           |
|   * Direct "Read Latest" Action                                                    |
|                                                                                    |
+------------------------------------------------------------------------------------+
|                                                                                    |
| [PILLAR 3: ANIME-PLANET POWER CATALOG & DIRECTORY]                                 |
| - Multi-Tag Include (+) & Exclude (-) Tag Matrix (20+ Tags)                        |
| - Format Selector (Manga, Manhwa, Manhua) & Demographic Tabs                       |
| - Grid View vs Detailed Table/List View Switcher                                   |
| - Live Debounced Search Bar with Result Counter                                    |
| - Full Library Manager Modal (Reading, Plan to Read, Completed, Favorites)         |
| - JSON Reading List Backup & Restore                                               |
|                                                                                    |
+------------------------------------------------------------------------------------+
|                                                                                    |
| [SUPERIOR FULLSCREEN MANGA READER OVERLAY]                                         |
| - Top Bar: Manga Title | Chapter Dropdown | Mode Switcher | Page Jump | Settings   |
| - Modes: (1) Vertical Webtoon (2) Paginated RTL/LTR (3) Double-Page Spread         |
| - Viewport: High-contrast illustrated manga art with dynamic dialogue & screentones|
| - Reader Settings: Background Color (Black, Dark, Sepia, White) | Zoom Level       |
| - Real-Time Chapter Comments Drawer (Post & View community comments like MangaPlus)|
| - Bottom Thumbnail Strip & Navigation Arrows                                       |
|                                                                                    |
+------------------------------------------------------------------------------------+
```

---

## 3. Detailed Component & Data Architecture

### 3.1. Catalog Schema
Each entry includes:
- `id`, `title`, `japaneseTitle`, `type`, `demographic`, `genres`, `rating`, `totalChapters`, `releaseYear`
- `releaseDay`, `latestChapter` (`number`, `title`, `dropTime`, `views`, `comments`)
- `isSimulpub`, `isCampaignFeatured`, `campaignBadge`
- `author`, `artist`, `synopsis`, `whereToRead`
- `coverTheme` (gradient palette, motifs, kanji seal)

### 3.2. Reader Engine
- High-fidelity canvas/SVG comic page renderer generating rich story scenes, screentone shading, action SFX, dialogue bubbles, and authentic layout grids.
- Reading states and last-read chapter saved automatically to `localStorage`.
- Commenting system allowing mock community engagement on any chapter.
