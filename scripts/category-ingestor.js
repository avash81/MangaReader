/**
 * MangaVerse Category-First Ingestion Pipeline
 * Automatically scans the `mangas/` directory tree, categorizes titles by:
 * Format (Manga, Manhwa, Manhua), Demographic (Shōnen, Seinen, Shōjo, Josei),
 * detects all chapter PDFs or image manuscripts, and syncs into the live database.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MANGAS_DIR = path.join(ROOT_DIR, 'mangas');
const APP_JS_PATH = path.join(ROOT_DIR, 'app.js');

console.log('================================================================');
console.log('       MANGAVERSE: CATEGORY-FIRST AUTOMATED INGESTION           ');
console.log('================================================================\n');

// Valid canonical taxonomy values
const VALID_TYPES = ['Manga', 'Manhwa', 'Manhua'];
const VALID_DEMOGRAPHICS = ['Shōnen', 'Seinen', 'Shōjo', 'Josei', 'Shonen', 'Shojo'];

function normalizeDemographic(demo) {
  if (!demo) return 'Shōnen';
  const lower = demo.toLowerCase();
  if (lower.includes('shon') || lower.includes('shōn')) return 'Shōnen';
  if (lower.includes('sein')) return 'Seinen';
  if (lower.includes('shoj') || lower.includes('shōj')) return 'Shōjo';
  if (lower.includes('jos')) return 'Josei';
  return 'Shōnen';
}

function normalizeType(t) {
  if (!t) return 'Manga';
  const lower = t.toLowerCase();
  if (lower === 'manhwa') return 'Manhwa';
  if (lower === 'manhua') return 'Manhua';
  return 'Manga';
}

function titleCaseFromSlug(slug) {
  return slug
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase())
    .trim();
}

/**
 * Recursively find all series folders containing chapters or info.json
 */
function scanMangaDirectory() {
  if (!fs.existsSync(MANGAS_DIR)) {
    console.log(`[!] "mangas/" directory not found at: ${MANGAS_DIR}`);
    console.log(`[*] Creating default directory structure...`);
    fs.mkdirSync(MANGAS_DIR, { recursive: true });
    return [];
  }

  const seriesList = [];

  function walk(currentPath, typeHint, demoHint) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    // Check if current directory has chapter PDFs or info.json
    const pdfFiles = entries.filter(e => e.isFile() && e.name.toLowerCase().endsWith('.pdf'));
    const infoFile = entries.find(e => e.isFile() && e.name.toLowerCase() === 'info.json');
    const coverFile = entries.find(e => e.isFile() && /cover\.(jpg|jpeg|png|webp|svg)$/i.test(e.name));

    if (pdfFiles.length > 0 || infoFile) {
      // This is a series directory!
      const seriesSlug = path.basename(currentPath);
      let infoData = {};
      if (infoFile) {
        try {
          infoData = JSON.parse(fs.readFileSync(path.join(currentPath, infoFile.name), 'utf8'));
        } catch (e) {
          console.warn(`[Warn] Invalid JSON in ${infoFile.name}: ${e.message}`);
        }
      }

      // Sort chapters numerically (e.g. ch-1.pdf, ch-02.pdf, ch-10.pdf)
      const chapters = pdfFiles
        .map(f => {
          const numMatch = f.name.match(/(\d+)/);
          const chNum = numMatch ? parseInt(numMatch[1], 10) : 1;
          const relativePdfPath = path.relative(ROOT_DIR, path.join(currentPath, f.name)).replace(/\\/g, '/');
          return {
            number: chNum,
            fileName: f.name,
            pdfData: relativePdfPath
          };
        })
        .sort((a, b) => a.number - b.number);

      const latestChapterNum = chapters.length > 0 ? chapters[chapters.length - 1].number : 1;

      // Determine cover path
      let coverRelPath = null;
      if (coverFile) {
        coverRelPath = path.relative(ROOT_DIR, path.join(currentPath, coverFile.name)).replace(/\\/g, '/');
      }

      // Infer categorization
      const seriesType = normalizeType(infoData.type || typeHint);
      const seriesDemo = normalizeDemographic(infoData.demographic || demoHint);
      const seriesTitle = infoData.title || titleCaseFromSlug(seriesSlug);
      const isSimulpub = infoData.isSimulpub !== undefined 
        ? Boolean(infoData.isSimulpub) 
        : (infoData.releaseDay && infoData.releaseDay !== 'Archive');

      seriesList.push({
        id: infoData.id || `series-${seriesSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: seriesTitle,
        altTitle: infoData.altTitle || seriesTitle,
        type: seriesType,
        demographic: seriesDemo,
        genres: Array.isArray(infoData.genres) && infoData.genres.length > 0 
          ? infoData.genres 
          : ['Action', 'Fantasy'],
        rating: Number(infoData.rating) || 4.90,
        totalChapters: chapters.length > 0 ? chapters.length : (infoData.totalChapters || 1),
        releaseDay: infoData.releaseDay || (isSimulpub ? 'Sun' : 'Archive'),
        latestChapter: {
          number: latestChapterNum,
          title: infoData.latestChapterTitle || `Chapter ${latestChapterNum}`,
          views: infoData.views || '120K',
          dropTime: isSimulpub ? 'Today (Auto-Synced)' : 'Archive Vault'
        },
        isSimulpub,
        isFeatured: Boolean(infoData.isFeatured),
        coverPath: coverRelPath || infoData.coverPath || null,
        pdfData: chapters.length > 0 ? chapters[chapters.length - 1].pdfData : (infoData.pdfData || null),
        chapters: chapters.map(c => ({ number: c.number, pdfData: c.pdfData })),
        author: infoData.author || 'Independent Creator',
        artist: infoData.artist || 'Independent Creator',
        synopsis: infoData.synopsis || `Official release of ${seriesTitle}. Read all chapters online on MangaVerse.`
      });

      return; // Stop descending deeper in this series folder
    }

    // Traverse child directories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = path.join(currentPath, entry.name);
        const nameLower = entry.name.toLowerCase();

        // Check if directory matches format or demographic
        let nextType = typeHint;
        let nextDemo = demoHint;

        if (nameLower === 'manga' || nameLower === 'manhwa' || nameLower === 'manhua') {
          nextType = normalizeType(entry.name);
        } else if (nameLower.includes('shon') || nameLower.includes('sein') || nameLower.includes('shoj') || nameLower.includes('jos')) {
          nextDemo = normalizeDemographic(entry.name);
        }

        walk(subPath, nextType, nextDemo);
      }
    }
  }

  walk(MANGAS_DIR, 'Manga', 'Shōnen');
  return seriesList;
}

/**
 * Merge scanned series into app.js MANGA_DATABASE
 */
function updateAppDatabase(scannedSeries) {
  if (scannedSeries.length === 0) {
    console.log('[*] No new series or chapters found in "mangas/".');
    console.log('[Tip] Add your folders as: mangas/<Format>/<Demographic>/<SeriesName>/ch-1.pdf');
    return;
  }

  console.log(`[*] Found ${scannedSeries.length} series in category directories:`);
  scannedSeries.forEach(s => {
    console.log(`    + [${s.type} | ${s.demographic}] "${s.title}" (${s.totalChapters} chapters)`);
  });

  const appJs = fs.readFileSync(APP_JS_PATH, 'utf8');
  const match = appJs.match(/const MANGA_DATABASE = (\[[\s\S]*?\n\]);/);
  if (!match) {
    console.error('[Error] Could not find MANGA_DATABASE in app.js');
    return;
  }

  let db = [];
  try {
    db = eval(match[1]);
  } catch (e) {
    console.error('[Error] Failed to evaluate MANGA_DATABASE:', e.message);
    return;
  }

  let added = 0;
  let updated = 0;

  for (const series of scannedSeries) {
    const existingIndex = db.findIndex(m => m.id === series.id || m.title.toLowerCase() === series.title.toLowerCase());
    if (existingIndex === -1) {
      // Add to front of database
      db.unshift(series);
      added++;
    } else {
      // Update chapters and PDF link
      const existing = db[existingIndex];
      existing.totalChapters = Math.max(existing.totalChapters || 0, series.totalChapters);
      if (series.latestChapter.number >= existing.latestChapter.number) {
        existing.latestChapter = series.latestChapter;
      }
      if (series.pdfData) existing.pdfData = series.pdfData;
      if (series.coverPath) existing.coverPath = series.coverPath;
      if (series.chapters && series.chapters.length > 0) existing.chapters = series.chapters;
      updated++;
    }
  }

  const newDbString = 'const MANGA_DATABASE = ' + JSON.stringify(db, null, 2) + ';';
  const newAppJs = appJs.replace(/const MANGA_DATABASE = \[[\s\S]*?\n\];/, newDbString);

  fs.writeFileSync(APP_JS_PATH, newAppJs, 'utf8');

  console.log(`\n================================================================`);
  console.log(`[Success] Database Updated: ${added} added, ${updated} updated.`);
  console.log(`[Status] Total Catalog Size: ${db.length} titles.`);
  console.log(`================================================================\n`);
}

// Run scanner
const series = scanMangaDirectory();
updateAppDatabase(series);

module.exports = { scanMangaDirectory, updateAppDatabase };
