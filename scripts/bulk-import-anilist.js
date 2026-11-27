/**
 * bulk-import-anilist.js
 * ─────────────────────
 * Pages through AniList's entire manga catalog (50,000+ titles) and
 * imports metadata into app.js MANGA_DATABASE AND/OR MySQL via PHP API.
 *
 * Usage:
 *   node scripts/bulk-import-anilist.js                  # import first 20 pages (1,000 titles)
 *   node scripts/bulk-import-anilist.js --pages=100       # 5,000 titles
 *   node scripts/bulk-import-anilist.js --pages=all       # full catalog (50,000+, takes hours)
 *   node scripts/bulk-import-anilist.js --dry-run         # preview only, no writes
 *   node scripts/bulk-import-anilist.js --target=appjs    # write to app.js (default)
 *   node scripts/bulk-import-anilist.js --target=mysql    # POST to PHP API
 *   node scripts/bulk-import-anilist.js --start-page=50   # resume from page 50
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const APP_PATH   = path.join(__dirname, '..', 'app.js');
const LOG_PATH   = path.join(__dirname, '..', 'sync-log.json');

const ARGS       = process.argv.slice(2);
const DRY_RUN    = ARGS.includes('--dry-run');
const TARGET     = (ARGS.find(a => a.startsWith('--target=')) || '--target=appjs').split('=')[1];
const API_URL    = (ARGS.find(a => a.startsWith('--api-url=')) || '--api-url=http://localhost:7890/backend/public/v1').split('=')[1];
const API_KEY    = (ARGS.find(a => a.startsWith('--api-key=')) || '--api-key=').split('=')[1];
const START_PAGE = parseInt((ARGS.find(a => a.startsWith('--start-page=')) || '--start-page=1').split('=')[1], 10);
const PAGES_ARG  = (ARGS.find(a => a.startsWith('--pages=')) || '--pages=20').split('=')[1];
const MAX_PAGES  = PAGES_ARG === 'all' ? 999999 : parseInt(PAGES_ARG, 10);
const PER_PAGE   = 50; // AniList max

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpsPost(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = typeof body === 'string' ? body : JSON.stringify(body);
    const urlObj = new URL(url);
    const opts = {
      hostname: urlObj.hostname, path: urlObj.pathname + urlObj.search,
      method: 'POST', port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload), 'Accept': 'application/json', 'User-Agent': 'MangaVerse-Importer/2.0', ...headers }
    };
    const proto = urlObj.protocol === 'https:' ? https : require('http');
    const req = proto.request(opts, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

// ─── AniList GraphQL ───────────────────────────────────────────────────────

const MANGA_PAGE_QUERY = `
query ($page: Int, $perPage: Int) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { hasNextPage currentPage lastPage total }
    media(type: MANGA, sort: SCORE_DESC, isAdult: false) {
      id
      title { romaji english native }
      coverImage { extraLarge large }
      bannerImage
      description(asHtml: false)
      genres
      tags { name rank }
      status
      chapters
      volumes
      averageScore
      popularity
      format
      countryOfOrigin
      startDate { year month day }
      staff {
        edges {
          role
          node { name { full } }
        }
      }
      trailer { id site }
      relations {
        edges {
          relationType
          node {
            id type format
            trailer { id site }
          }
        }
      }
      externalLinks { site url }
    }
  }
}`;

async function fetchAniListPage(page) {
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await httpsPost('https://graphql.anilist.co', {
      query: MANGA_PAGE_QUERY,
      variables: { page, perPage: PER_PAGE }
    });
    if (res.status === 429 || (res.body?.errors?.[0]?.status === 429)) {
      console.warn(`  [AniList] Rate limit on page ${page}, waiting 90s...`);
      await sleep(90000);
      continue;
    }
    if (res.status !== 200) return null;
    return res.body?.data?.Page || null;
  }
  return null;
}

// ─── MangaDex ID Resolution ────────────────────────────────────────────────

async function fetchMangaDexId(title, anilistId) {
  try {
    const encoded = encodeURIComponent(title.substring(0, 60));
    const urlStr = `https://api.mangadex.org/manga?title=${encoded}&limit=5&includes[]=author`;
    const res = await new Promise((resolve, reject) => {
      const u = new URL(urlStr);
      const req = https.get({ hostname: u.hostname, path: u.pathname + u.search, headers: { 'User-Agent': 'MangaVerse-Importer/2.0' } }, r => {
        let d = ''; r.on('data', c => d += c); r.on('end', () => {
          try { resolve({ status: r.statusCode, body: JSON.parse(d) }); } catch { resolve({ status: r.statusCode, body: null }); }
        });
      });
      req.on('error', reject);
      req.setTimeout(8000, () => { req.destroy(); reject(new Error('timeout')); });
    });
    if (res.status === 200 && res.body?.data?.length > 0) {
      return res.body.data[0].id;
    }
  } catch {}
  return null;
}

// ─── Build a manga entry from AniList data ─────────────────────────────────

function buildMangaEntry(media, mangadexId) {
  const title    = media.title.english || media.title.romaji || media.title.native || 'Unknown';
  const altTitle = media.title.romaji !== title ? media.title.romaji : (media.title.native || '');

  // Determine type
  const typeMap = { MANGA: 'Manga', MANHWA: 'Manhwa', MANHUA: 'Manhua', ONE_SHOT: 'Manga', NOVEL: null };
  const contentType = typeMap[media.format] || 'Manga';
  if (!contentType) return null; // skip novels

  // Demographic from tags
  const tagNames  = (media.tags || []).map(t => t.name);
  let demographic = 'Unknown';
  if (tagNames.includes('Shounen') || tagNames.includes('Shonen')) demographic = 'Shōnen';
  else if (tagNames.includes('Shoujo') || tagNames.includes('Shojo')) demographic = 'Shōjo';
  else if (tagNames.includes('Seinen')) demographic = 'Seinen';
  else if (tagNames.includes('Josei')) demographic = 'Josei';

  // Author / Artist from staff edges
  let author = 'Unknown', artist = 'Unknown';
  for (const edge of (media.staff?.edges || [])) {
    if (edge.role?.toLowerCase().includes('story') || edge.role === 'Original Creator') author = edge.node.name.full;
    if (edge.role?.toLowerCase().includes('art') || edge.role === 'Character Design') artist = edge.node.name.full;
  }
  if (author === 'Unknown' && media.staff?.edges?.[0]) author = media.staff.edges[0].node.name.full;

  // Trailer (manga directly OR official anime ADAPTATION)
  let trailerUrl = null;
  if (media.trailer?.site === 'youtube' && media.trailer.id) {
    trailerUrl = media.trailer.id;
  } else {
    const adaptEdges = (media.relations?.edges || []).filter(
      e => e.relationType === 'ADAPTATION' && e.node?.type === 'ANIME' && e.node?.format !== 'MUSIC' && e.node?.trailer?.site === 'youtube' && e.node?.trailer?.id
    );
    const tvEdge = adaptEdges.find(e => e.node.format === 'TV') || adaptEdges[0];
    if (tvEdge) trailerUrl = tvEdge.node.trailer.id;
  }

  // Status → releaseDay
  const statusMap = { FINISHED: 'Archive', RELEASING: null, NOT_YET_RELEASED: 'Archive', CANCELLED: 'Archive', HIATUS: 'Archive' };
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const releaseDay = statusMap[media.status] ?? days[media.id % 7];
  const isSimulpub = media.status === 'RELEASING';

  // Country of origin
  const countryMap = { JP: 'ja', KR: 'ko', CN: 'zh', TW: 'zh' };

  // Clean synopsis (strip HTML tags if any leaked)
  const synopsis = (media.description || '').replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim().substring(0, 500);

  const id = `mv-al-${media.id}`;

  return {
    id,
    title,
    altTitle,
    type: contentType,
    demographic,
    genres: (media.genres || []).slice(0, 6),
    rating: parseFloat(((media.averageScore || 75) / 20).toFixed(2)),
    totalChapters: media.chapters || 0,
    releaseDay,
    latestChapter: {
      number: media.chapters || 1,
      title: media.chapters ? `Chapter ${media.chapters}` : 'Chapter 1',
      views: `${Math.floor((media.popularity || 1000) / 1000)}K`,
      dropTime: isSimulpub ? 'Live' : 'Archive Vault'
    },
    isSimulpub,
    isFeatured: (media.averageScore || 0) >= 85 && (media.popularity || 0) >= 50000,
    coverUrl: media.coverImage?.extraLarge || media.coverImage?.large || null,
    coverPath: null,
    mangadexId: mangadexId || null,
    anilistId: media.id,
    trailerUrl,
    author,
    artist: artist !== 'Unknown' ? artist : author,
    synopsis: synopsis || `${title} — a ${contentType.toLowerCase()} series.`,
    language: countryMap[media.countryOfOrigin] || 'ja'
  };
}

// ─── Write to app.js ───────────────────────────────────────────────────────

function writeToAppJs(newEntries) {
  const src = fs.readFileSync(APP_PATH, 'utf8');
  const regex = /const MANGA_DATABASE = (\[[\s\S]*?\n\]);/;
  const match = src.match(regex);
  if (!match) throw new Error('MANGA_DATABASE not found');
  const db = eval(match[1]);

  const existingIds = new Set(db.map(m => m.id));
  const toAdd = newEntries.filter(m => m && !existingIds.has(m.id));

  if (toAdd.length === 0) { console.log('  No new entries to add.'); return 0; }

  const updated = [...db, ...toAdd];
  const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + JSON.stringify(updated, null, 2) + ';');

  // Double-bracket safety check
  const lines = newSrc.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i].trim() === ']' && lines[i+1].trim() === '];') {
      throw new Error('Double-bracket bug detected! Aborting.');
    }
  }

  fs.writeFileSync(APP_PATH, newSrc, 'utf8');
  return toAdd.length;
}

// ─── Write to MySQL via PHP API ────────────────────────────────────────────

async function writeToMysql(entries) {
  let saved = 0;
  for (const entry of entries) {
    if (!entry) continue;
    const res = await httpsPost(`${API_URL}/admin/manga/import`, entry, {
      'X-API-Key': API_KEY
    });
    if (res.status === 200 || res.status === 201) saved++;
    await sleep(50);
  }
  return saved;
}

// ─── Main ──────────────────────────────────────────────────────────────────

(async () => {
  console.log(`\n🚀 MangaVerse Bulk Importer`);
  console.log(`   Target: ${TARGET} | Pages: ${MAX_PAGES} | From page: ${START_PAGE} | Dry-run: ${DRY_RUN}\n`);

  // Load existing log to track progress
  let log = { lastPage: 0, totalImported: 0, runs: [] };
  try { log = JSON.parse(fs.readFileSync(LOG_PATH, 'utf8')); } catch {}

  const runStart = Date.now();
  let pagesProcessed = 0, titlesFound = 0, titlesImported = 0;
  const failedPages = [];

  for (let page = START_PAGE; page < START_PAGE + MAX_PAGES; page++) {
    process.stdout.write(`\r  📄 Page ${page}/${START_PAGE + MAX_PAGES - 1} | Found: ${titlesFound} | Imported: ${titlesImported} | Failed pages: ${failedPages.length}`);

    const pageData = await fetchAniListPage(page);
    if (!pageData || !pageData.media?.length) {
      failedPages.push(page);
      await sleep(1500);
      continue;
    }

    const batch = [];
    for (const media of pageData.media) {
      titlesFound++;
      let mdxId = null;

      // Resolve MangaDex ID via title search (throttled)
      const searchTitle = media.title.english || media.title.romaji || '';
      if (searchTitle) {
        mdxId = await fetchMangaDexId(searchTitle, media.id);
        await sleep(260); // respect MangaDex rate limit
      }

      const entry = buildMangaEntry(media, mdxId);
      if (entry) batch.push(entry);
    }

    if (!DRY_RUN && batch.length > 0) {
      let added = 0;
      if (TARGET === 'appjs') {
        try { added = writeToAppJs(batch); } catch (e) { console.error('\n  ❌ Write error:', e.message); }
      } else if (TARGET === 'mysql') {
        added = await writeToMysql(batch);
      }
      titlesImported += added;
    } else {
      titlesImported += batch.length;
    }

    pagesProcessed++;
    log.lastPage = page;

    // Stop if AniList signals last page
    if (!pageData.pageInfo?.hasNextPage) {
      console.log(`\n  ✅ Reached last AniList page (${page}).`);
      break;
    }

    await sleep(700); // AniList ~90 req/min
  }

  const elapsed = ((Date.now() - runStart) / 1000 / 60).toFixed(1);
  console.log(`\n\n━━━ BULK IMPORT RESULTS ━━━`);
  console.log(`  Pages processed : ${pagesProcessed}`);
  console.log(`  Titles found    : ${titlesFound}`);
  console.log(`  Titles imported : ${titlesImported}`);
  console.log(`  Failed pages    : ${failedPages.join(', ') || 'none'}`);
  console.log(`  Time taken      : ${elapsed} min`);

  // Update log
  log.totalImported = (log.totalImported || 0) + titlesImported;
  log.runs = log.runs || [];
  log.runs.push({ date: new Date().toISOString(), pages: pagesProcessed, found: titlesFound, imported: titlesImported, elapsed: `${elapsed}min` });
  if (!DRY_RUN) fs.writeFileSync(LOG_PATH, JSON.stringify(log, null, 2), 'utf8');

  if (!DRY_RUN && TARGET === 'appjs') {
    console.log('\n📋 Next steps:');
    console.log('   node test-suite.js');
    console.log('   git add app.js sync-log.json && git commit -m "feat(catalog): bulk import X manga from AniList" && git push origin main');
  }
})();
