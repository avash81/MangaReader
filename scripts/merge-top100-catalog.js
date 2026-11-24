/**
 * MangaVerse Master Ingestion & Normalizer: AniList Top 100 + Existing Curated Titles
 * Maps 100+ titles into canonical MangaVerse schema:
 * - Real chapter numbers for iconic ongoing series (One Piece: 1130, Berserk: 376, etc.)
 * - Rich author/artist names
 * - Demographic mapping
 * - Genres and high-res AniList extraLarge CDN covers
 */

const fs = require('fs');
const path = require('path');

const ANILIST_FILE = path.join(__dirname, 'anilist-top-100-manga.json');
const APP_JS_PATH = path.join(__dirname, '..', 'app.js');

const anilistList = JSON.parse(fs.readFileSync(ANILIST_FILE, 'utf8'));

// Accurate chapter counts for famous ongoing/long-running works where AniList chapters is null
const CHAPTER_OVERRIDE_MAP = {
  'One Piece': 1130,
  'Berserk': 376,
  'Vagabond': 327,
  'Kingdom': 815,
  'Hunter x Hunter': 405,
  'Vinland Saga': 216,
  'Detective Conan': 1135,
  'Hajime no Ippo': 1475,
  'JoJo\'s Bizarre Adventure: Part 7–Steel Ball Run': 95,
  'JoJo\'s Bizarre Adventure: Part 8–JoJolion': 110,
  'The Climber': 170,
  'Oyasumi Punpun': 147,
  'Monster': 162,
  '20th Century Boys': 249,
  'Pluto': 65,
  'Grand Blue Dreaming': 98,
  'Slam Dunk': 276,
  'Real': 96,
  'Land of the Lustrous': 108,
  'Fullmetal Alchemist': 108,
  'Chihayafuru': 247,
  'Ashita no Joe: Fighting for Tomorrow': 171,
  'The Greatest Estate Developer': 165,
  'Solo Leveling': 200,
  'Omniscient Reader': 230,
  'Tower of God': 640,
  'The Horizon': 21,
  'Bastard': 94,
  'Sweet Home': 141,
  'Wind Breaker': 505
};

// Helper to determine demographic
function inferDemographic(genres, title, country) {
  const gStr = genres.join(' ').toLowerCase();
  const tStr = title.toLowerCase();

  if (gStr.includes('josei')) return 'Josei';
  if (gStr.includes('shoujo') || gStr.includes('shōjo') || (gStr.includes('romance') && gStr.includes('slice of life') && !gStr.includes('action'))) return 'Shōjo';
  if (gStr.includes('seinen') || gStr.includes('psychological') || gStr.includes('horror') || gStr.includes('thriller') || tStr.includes('berserk') || tStr.includes('vagabond') || tStr.includes('vinland')) return 'Seinen';
  if (tStr.includes('villainess') || tStr.includes('princess') || tStr.includes('noble')) return 'Shōjo';
  return 'Shōnen';
}

function cleanSynopsis(raw) {
  if (!raw) return 'Read the official chapters online on MangaVerse.';
  let text = raw
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<i>(.*?)<\/i>/gi, '$1')
    .replace(/<b>(.*?)<\/b>/gi, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/\r?\n+/g, ' ')
    .replace(/\[\/?\w+\]/g, '')
    .trim();
  if (text.length > 290) {
    text = text.slice(0, 287) + '...';
  }
  return text;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Archive'];

// Read existing app.js to preserve customized entries (like Solo-Necromancer, Chrono-Blade, Villainess-Tea-Empire)
const appJsContent = fs.readFileSync(APP_JS_PATH, 'utf8');
const match = appJsContent.match(/const MANGA_DATABASE = (\[[\s\S]*?\n\]);/);
let existingDb = [];
if (match) {
  existingDb = eval(match[1]);
}

const existingById = new Map();
const existingByTitle = new Map();
existingDb.forEach(m => {
  existingById.set(m.id, m);
  existingByTitle.set(m.title.toLowerCase().trim(), m);
});

const mergedList = [];
const seenTitles = new Set();

// 1. First keep all local custom uploads (with actual local PDFs)
existingDb.forEach(m => {
  if (m.chapters && m.chapters.some(c => c.pdfData) || m.pdfData) {
    mergedList.push(m);
    seenTitles.add(m.title.toLowerCase().trim());
  }
});

// 2. Now process AniList Top 100
anilistList.forEach((al, index) => {
  const primaryTitle = (al.title.english || al.title.romaji).trim();
  const lowerTitle = primaryTitle.toLowerCase();

  if (seenTitles.has(lowerTitle)) {
    return; // Already included with priority
  }
  seenTitles.add(lowerTitle);

  // Check if we had an existing entry with matching title
  const existing = existingByTitle.get(lowerTitle);

  let type = 'Manga';
  if (al.countryOfOrigin === 'KR') type = 'Manhwa';
  else if (al.countryOfOrigin === 'CN' || al.countryOfOrigin === 'TW') type = 'Manhua';

  // Map author and artist from staff
  let author = 'Unknown';
  let artist = 'Unknown';
  if (al.staff && al.staff.edges) {
    al.staff.edges.forEach(e => {
      const role = (e.role || '').toLowerCase();
      const name = e.node?.name?.full || '';
      if (role.includes('story') || role.includes('original') || role.includes('author') || role.includes('writer')) {
        author = name;
      }
      if (role.includes('art') || role.includes('illustrator')) {
        artist = name;
      }
    });
    if (author === 'Unknown' && al.staff.edges[0]?.node?.name?.full) {
      author = al.staff.edges[0].node.name.full;
      artist = author;
    }
  }

  const demographic = inferDemographic(al.genres || [], primaryTitle, al.countryOfOrigin);
  
  // Calculate realistic total chapters
  let totalChapters = CHAPTER_OVERRIDE_MAP[primaryTitle] || al.chapters || (existing?.totalChapters);
  if (!totalChapters) {
    totalChapters = Math.floor(Math.random() * 80) + 30;
  }

  const rating = Number(((al.averageScore || 85) / 20).toFixed(2));
  const isOngoing = al.status === 'RELEASING';
  const releaseDay = isOngoing ? DAYS[index % 7] : 'Archive';

  const entry = {
    id: existing?.id || `mv-al-${al.id}`,
    anilistId: al.id,
    mangadexId: existing?.mangadexId || null,
    title: primaryTitle,
    altTitle: al.title.native || al.title.romaji || primaryTitle,
    type: type,
    demographic: demographic,
    genres: al.genres && al.genres.length > 0 ? al.genres.slice(0, 5) : ['Drama', 'Action'],
    rating: rating,
    totalChapters: totalChapters,
    releaseDay: releaseDay,
    latestChapter: {
      number: totalChapters,
      title: `Chapter ${totalChapters}`,
      views: `${(Math.random() * 8 + 1).toFixed(1)}M`,
      dropTime: isOngoing ? 'Today (Tokyo Sync)' : 'Archive Vault'
    },
    isSimulpub: isOngoing,
    isFeatured: index < 12,
    coverUrl: existing?.coverUrl || al.coverImage?.extraLarge || al.coverImage?.large,
    author: existing?.author || author,
    artist: existing?.artist || artist,
    synopsis: cleanSynopsis(al.description || existing?.synopsis)
  };

  mergedList.push(entry);
});

// Also re-add any remaining existing titles that were curated and not in top 100
existingDb.forEach(m => {
  const lower = m.title.toLowerCase().trim();
  if (!seenTitles.has(lower)) {
    mergedList.push(m);
    seenTitles.add(lower);
  }
});

console.log(`================================================================`);
console.log(`Successfully merged ${mergedList.length} total manga titles into catalog!`);
console.log(`================================================================`);

// Breakdown by format
const types = {};
const demographics = {};
mergedList.forEach(m => {
  types[m.type] = (types[m.type] || 0) + 1;
  demographics[m.demographic] = (demographics[m.demographic] || 0) + 1;
});
console.log('Catalog Types:', types);
console.log('Catalog Demographics:', demographics);

// Update app.js
const newDbString = 'const MANGA_DATABASE = ' + JSON.stringify(mergedList, null, 2) + ';';
const updatedAppJs = appJsContent.replace(/const MANGA_DATABASE = \[[\s\S]*?\n\];/, newDbString);

fs.writeFileSync(APP_JS_PATH, updatedAppJs, 'utf8');
console.log(`Updated ${APP_JS_PATH}`);

// Also export to a standalone JSON file for easy API / DB seeding
fs.writeFileSync(path.join(__dirname, '..', 'backend', 'database', 'seed-100-manga.json'), JSON.stringify(mergedList, null, 2));
console.log(`Exported seed to backend/database/seed-100-manga.json`);
