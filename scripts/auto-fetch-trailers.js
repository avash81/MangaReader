/**
 * auto-fetch-trailers.js
 * ─────────────────────
 * Automatically fetches official YouTube trailer IDs for every manga
 * in MANGA_DATABASE using free, key-less APIs:
 *
 *   1. AniList GraphQL API:
 *      - Checks `Media(id, type: MANGA).trailer`
 *      - Checks `relations` for official ANIME adaptations (`relationType == ADAPTATION`)
 *        and grabs the anime's official `trailer { id site }`!
 *      - If `anilistId` is missing, searches AniList by title first.
 *   2. Jikan v4 (MyAnimeList) fallback:
 *      - Searches for an official anime adaptation by title (with title-similarity check)
 *        and extracts `trailer.youtube_id`.
 *
 * Usage:
 *   node scripts/auto-fetch-trailers.js
 *   node scripts/auto-fetch-trailers.js --dry-run
 *   node scripts/auto-fetch-trailers.js --overwrite
 */

const fs    = require('fs');
const path  = require('path');
const https = require('https');

const DRY_RUN   = process.argv.includes('--dry-run');
const OVERWRITE = process.argv.includes('--overwrite');
const APP_PATH  = path.join(__dirname, '..', 'app.js');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function httpsGet(url, postData, headers) {
  return new Promise((resolve, reject) => {
    const isPost = !!postData;
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: isPost ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'MangaVerse-TrailerFetcher/2.0',
        ...headers
      }
    };
    if (isPost) options.headers['Content-Length'] = Buffer.byteLength(postData);

    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch (e) { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on('error', reject);
    if (isPost) req.write(postData);
    req.end();
  });
}

function normalizeTitle(s) {
  return (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function titlesMatch(a, b) {
  const na = normalizeTitle(a);
  const nb = normalizeTitle(b);
  if (!na || !nb) return false;
  return na === nb || na.includes(nb) || nb.includes(na);
}

// ─── Source 1: AniList GraphQL (Manga trailer + Official Anime Adaptation) ────

function extractTrailerFromMedia(media) {
  if (!media) return null;
  if (media.trailer && media.trailer.site === 'youtube' && media.trailer.id) {
    return { videoId: media.trailer.id, source: 'AniList Manga' };
  }
  const edges = media.relations?.edges || [];
  // Strictly require relationType === 'ADAPTATION' and exclude MUSIC videos so every trailer matches the actual manga's official anime
  const animeEdges = edges.filter(
    e => e.relationType === 'ADAPTATION' &&
         e.node?.type === 'ANIME' &&
         e.node?.format !== 'MUSIC' &&
         e.node?.trailer?.site === 'youtube' &&
         e.node?.trailer?.id
  );
  const tvEdge = animeEdges.find(e => e.node.format === 'TV') || animeEdges[0];
  if (tvEdge) {
    return { videoId: tvEdge.node.trailer.id, source: `AniList Anime (${tvEdge.node.format || 'ANIME'})` };
  }
  return null;
}

async function fetchAniListById(anilistId) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: MANGA) {
        trailer { id site }
        relations {
          edges {
            relationType
            node {
              id
              type
              format
              trailer { id site }
            }
          }
        }
      }
    }`;
  try {
    const res = await httpsGet(
      'https://graphql.anilist.co',
      JSON.stringify({ query, variables: { id: anilistId } })
    );
    if (res.status === 429) return { retry: true };
    return extractTrailerFromMedia(res.body?.data?.Media);
  } catch { return null; }
}

async function fetchAniListByTitle(title) {
  const query = `
    query ($search: String) {
      Media(search: $search, type: MANGA) {
        id
        title { romaji english }
        trailer { id site }
        relations {
          edges {
            relationType
            node {
              id
              type
              format
              trailer { id site }
            }
          }
        }
      }
    }`;
  try {
    const res = await httpsGet(
      'https://graphql.anilist.co',
      JSON.stringify({ query, variables: { search: title } })
    );
    if (res.status === 429) return { retry: true };
    const media = res.body?.data?.Media;
    if (!media) return null;
    if (!titlesMatch(title, media.title?.english) && !titlesMatch(title, media.title?.romaji)) {
      return null;
    }
    return extractTrailerFromMedia(media);
  } catch { return null; }
}

// ─── Source 2: Jikan v4 (MyAnimeList) ─────────────────────────────────────────

async function fetchJikanTrailer(title) {
  try {
    const encoded = encodeURIComponent(title);
    const res = await httpsGet(`https://api.jikan.moe/v4/anime?q=${encoded}&limit=3`);
    if (res.status === 429) return { retry: true };
    const list = res.body?.data || [];
    for (const anime of list) {
      const candidates = [anime.title, anime.title_english, ...(anime.title_synonyms || [])].filter(Boolean);
      if (candidates.some(c => titlesMatch(title, c)) && anime?.trailer?.youtube_id) {
        return { videoId: anime.trailer.youtube_id, source: 'Jikan/MAL Anime' };
      }
    }
    return null;
  } catch { return null; }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  const src = fs.readFileSync(APP_PATH, 'utf8');
  const regex = /const MANGA_DATABASE = (\[[\s\S]*?\n\]);/;
  const match = src.match(regex);
  if (!match) { console.error('❌ MANGA_DATABASE not found'); process.exit(1); }
  const db = eval(match[1]);
  console.log(`📚 Loaded ${db.length} titles. DRY_RUN=${DRY_RUN} OVERWRITE=${OVERWRITE}\n`);

  const targets = db.filter(m => OVERWRITE ? true : !m.trailerUrl);
  console.log(`🎯 Need trailers: ${targets.length}\n`);

  let found = 0;

  console.log('━━━ Pass 1: AniList (Manga + Official Anime Adaptations) ━━━');
  for (const manga of targets) {
    process.stdout.write(`  ${manga.title.substring(0, 48).padEnd(48)} → `);

    let result = null;
    let attempts = 0;
    while (attempts < 3) {
      result = manga.anilistId
        ? await fetchAniListById(manga.anilistId)
        : await fetchAniListByTitle(manga.title);
      if (result?.retry) {
        process.stdout.write(`[429 wait 60s] `);
        await sleep(60000);
        attempts++;
      } else { break; }
    }

    if (result?.videoId) {
      process.stdout.write(`✅ ${result.videoId} (${result.source})\n`);
      if (!DRY_RUN) manga.trailerUrl = result.videoId;
      found++;
    } else {
      process.stdout.write(`— not on AniList\n`);
    }

    await sleep(700);
  }

  // Pass 2: Jikan/MAL fallback (opt-in via --jikan)
  if (process.argv.includes('--jikan')) {
  const stillMissing = db.filter(m => !m.trailerUrl);
  console.log(`\n━━━ Pass 2: Jikan/MAL Anime Fallback (${stillMissing.length} remaining) ━━━`);
  for (const manga of stillMissing) {
    process.stdout.write(`  ${manga.title.substring(0, 48).padEnd(48)} → `);

    let result = null;
    let attempts = 0;
    while (attempts < 3) {
      result = await fetchJikanTrailer(manga.title);
      if (result?.retry) {
        process.stdout.write(`[429 wait 4s] `);
        await sleep(4000);
        attempts++;
      } else { break; }
    }

    if (result?.videoId) {
      process.stdout.write(`✅ ${result.videoId} (${result.source})\n`);
      if (!DRY_RUN) manga.trailerUrl = result.videoId;
      found++;
    } else {
      process.stdout.write(`— no anime trailer\n`);
    }

    await sleep(450);
  }
  }

  const totalWithTrailer = db.filter(m => m.trailerUrl).length;
  console.log(`\n━━━ RESULTS ━━━`);
  console.log(`✅ Newly found: ${found}`);
  console.log(`📊 Total with trailers: ${totalWithTrailer}/${db.length}`);

  if (DRY_RUN) {
    console.log('\n🔍 DRY RUN — no files written.');
    return;
  }

  const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + JSON.stringify(db, null, 2) + ';');

  const checkLines = newSrc.split('\n');
  for (let i = 0; i < checkLines.length - 1; i++) {
    if (checkLines[i].trim() === ']' && checkLines[i + 1].trim() === '];') {
      console.error('❌ Double-bracket detected! Aborting write.');
      process.exit(1);
    }
  }

  fs.writeFileSync(APP_PATH, newSrc, 'utf8');
  console.log(`\n💾 Saved to app.js — ${totalWithTrailer}/${db.length} titles now have trailers.`);
})();
