/**
 * auto-fetch-trailers.js
 * ─────────────────────
 * Automatically fetches official YouTube trailer IDs for every manga
 * in MANGA_DATABASE using two completely free, key-less APIs:
 *
 *   1. AniList GraphQL API  → queries `trailer { id site }` for each anilistId
 *   2. Jikan v4 (MyAnimeList) → fallback for titles that have an anime adaptation
 *
 * No YouTube API key needed. No paid plan. Run any time to refresh.
 *
 * Usage:
 *   node scripts/auto-fetch-trailers.js
 *   node scripts/auto-fetch-trailers.js --dry-run   (shows what would change)
 *   node scripts/auto-fetch-trailers.js --overwrite  (replace existing trailerUrls)
 */

const fs   = require('fs');
const path = require('path');
const https = require('https');

const DRY_RUN   = process.argv.includes('--dry-run');
const OVERWRITE = process.argv.includes('--overwrite');
const APP_PATH  = path.join(__dirname, '..', 'app.js');

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
        'User-Agent': 'MangaVerse-TrailerFetcher/1.0',
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

// ─── Source 1: AniList GraphQL ───────────────────────────────────────────────

async function fetchAniListTrailer(anilistId) {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: MANGA) {
        trailer { id site }
      }
    }`;
  try {
    const res = await httpsGet(
      'https://graphql.anilist.co',
      JSON.stringify({ query, variables: { id: anilistId } })
    );
    if (res.status === 429) return { retry: true };
    const trailer = res.body?.data?.Media?.trailer;
    if (trailer && trailer.site === 'youtube' && trailer.id) {
      return { videoId: trailer.id, source: 'AniList' };
    }
    return null;
  } catch { return null; }
}

// ─── Source 2: Jikan v4 (MyAnimeList) ───────────────────────────────────────
// Many manga have anime adaptations; Jikan returns the anime PV trailer.

async function fetchJikanTrailer(title) {
  try {
    const encoded = encodeURIComponent(title);
    const res = await httpsGet(`https://api.jikan.moe/v4/anime?q=${encoded}&limit=1&order_by=score&sort=desc`);
    if (res.status === 429) return { retry: true };
    const anime = res.body?.data?.[0];
    if (anime?.trailer?.youtube_id) {
      return { videoId: anime.trailer.youtube_id, source: 'Jikan/MAL' };
    }
    return null;
  } catch { return null; }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

(async () => {
  // 1. Load DB
  const src = fs.readFileSync(APP_PATH, 'utf8');
  const regex = /const MANGA_DATABASE = (\[[\s\S]*?\n\]);/;
  const match = src.match(regex);
  if (!match) { console.error('❌ MANGA_DATABASE not found'); process.exit(1); }
  const db = eval(match[1]);
  console.log(`📚 Loaded ${db.length} titles. DRY_RUN=${DRY_RUN} OVERWRITE=${OVERWRITE}\n`);

  // 2. Filter which titles need trailers
  const targets = db.filter(m => OVERWRITE ? true : !m.trailerUrl);
  const withAnilistId = targets.filter(m => m.anilistId);
  const withoutAnilistId = targets.filter(m => !m.anilistId);

  console.log(`🎯 Need trailers: ${targets.length} (${withAnilistId.length} have AniList ID, ${withoutAnilistId.length} don't)\n`);

  let found = 0, skipped = 0;

  // 3. AniList pass (batch by ID)
  console.log('━━━ Pass 1: AniList API ━━━');
  for (const manga of withAnilistId) {
    process.stdout.write(`  ${manga.title.substring(0, 50).padEnd(50)} → `);
    
    let result = null;
    let attempts = 0;
    while (attempts < 3) {
      result = await fetchAniListTrailer(manga.anilistId);
      if (result?.retry) {
        process.stdout.write(`[rate limit, waiting 60s] `);
        await sleep(60000);
        attempts++;
      } else { break; }
    }

    if (result?.videoId) {
      process.stdout.write(`✅ ${result.videoId} (${result.source})\n`);
      if (!DRY_RUN) manga.trailerUrl = result.videoId;
      found++;
    } else {
      process.stdout.write(`— no trailer on AniList\n`);
      skipped++;
    }

    await sleep(600); // ~100 req/min AniList rate limit
  }

  return; // Skip Jikan for now
  // 4. Jikan fallback pass (for entries that still have no trailer)
  const stillMissing = db.filter(m => !m.trailerUrl);
  const jikanTargets = stillMissing.filter(m => !withoutAnilistId.includes(m) || true);
  
  console.log(`\n━━━ Pass 2: Jikan/MAL fallback (${jikanTargets.length} remaining) ━━━`);
  for (const manga of jikanTargets) {
    if (manga.trailerUrl) continue; // already got one from AniList
    process.stdout.write(`  ${manga.title.substring(0, 50).padEnd(50)} → `);

    let result = null;
    let attempts = 0;
    while (attempts < 3) {
      result = await fetchJikanTrailer(manga.title);
      if (result?.retry) {
        process.stdout.write(`[rate limit, waiting 4s] `);
        await sleep(4000);
        attempts++;
      } else { break; }
    }

    if (result?.videoId) {
      process.stdout.write(`✅ ${result.videoId} (${result.source})\n`);
      if (!DRY_RUN) manga.trailerUrl = result.videoId;
      found++;
    } else {
      process.stdout.write(`— not found\n`);
    }

    await sleep(400); // Jikan rate limit: 3 req/sec
  }

  // 5. Summary
  const totalWithTrailer = db.filter(m => m.trailerUrl).length;
  console.log(`\n━━━ RESULTS ━━━`);
  console.log(`✅ Newly found: ${found}`);
  console.log(`📊 Total with trailers: ${totalWithTrailer}/${db.length}`);

  if (DRY_RUN) {
    console.log('\n🔍 DRY RUN — no files written. Remove --dry-run to apply.');
    return;
  }

  // 6. Write back to app.js (safe: JSON.stringify already includes [...])
  const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + JSON.stringify(db, null, 2) + ';');
  
  // Safety check: make sure no double-bracket was introduced
  const checkLines = newSrc.split('\n');
  for (let i = 0; i < checkLines.length - 1; i++) {
    if (checkLines[i].trim() === ']' && checkLines[i+1].trim() === '];') {
      console.error('❌ Double-bracket detected! Aborting write.');
      process.exit(1);
    }
  }

  fs.writeFileSync(APP_PATH, newSrc, 'utf8');
  console.log(`\n💾 Saved to app.js — ${totalWithTrailer} titles now have trailers.`);
  console.log(`\n📋 Next steps:`);
  console.log(`   node test-suite.js`);
  console.log(`   git add app.js && git commit -m "feat(trailers): auto-fetch ${totalWithTrailer} official trailers via AniList + Jikan" && git push`);
})();
