/**
 * seed-to-mysql.js
 * ────────────────
 * Seeds the existing 126-title MANGA_DATABASE from app.js into MySQL
 * via the PHP admin import API endpoint.
 *
 * Usage:
 *   node scripts/seed-to-mysql.js
 *   node scripts/seed-to-mysql.js --api-url=https://yourdomain.com/api/v1
 *   node scripts/seed-to-mysql.js --dry-run
 */

const fs    = require('fs');
const path  = require('path');
const http  = require('http');
const https = require('https');

const ARGS    = process.argv.slice(2);
const DRY_RUN = ARGS.includes('--dry-run');
const API_URL = (ARGS.find(a => a.startsWith('--api-url=')) || '--api-url=http://localhost:7890/backend/public/v1').split('=')[1];
const API_KEY = (ARGS.find(a => a.startsWith('--api-key=')) || '--api-key=mv_adm_secret_key_change_in_production').split('=')[1];
const APP_PATH = path.join(__dirname, '..', 'app.js');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function post(url, data, apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const opts = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'X-API-Key': apiKey,
        'User-Agent': 'MangaVerse-Seeder/1.0'
      }
    };
    const proto = isHttps ? https : http;
    const req = proto.request(opts, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, body: d }); }
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

(async () => {
  console.log('\n🌱 MangaVerse MySQL Seeder');
  console.log(`   API: ${API_URL} | Dry-run: ${DRY_RUN}\n`);

  // Load database from app.js
  const src = fs.readFileSync(APP_PATH, 'utf8');
  const match = src.match(/const MANGA_DATABASE = (\[[\s\S]*?\n\]);/);
  if (!match) { console.error('❌ MANGA_DATABASE not found in app.js'); process.exit(1); }
  const db = eval(match[1]);
  console.log(`📚 Loaded ${db.length} titles from app.js\n`);

  let inserted = 0, updated = 0, failed = 0;

  for (let i = 0; i < db.length; i++) {
    const m = db[i];
    const payload = {
      slug: m.id,
      title: m.title,
      original_title: m.altTitle || null,
      synopsis: m.synopsis || null,
      author: m.author || null,
      artist: m.artist || null,
      demographic: m.demographic || 'Unknown',
      content_type: m.type || 'Manga',
      publication_status: m.isSimulpub ? 'ongoing' : 'completed',
      reading_direction: (m.type === 'Manhwa' || m.type === 'Webtoon') ? 'ltr' : 'rtl',
      cover_url: m.coverUrl || null,
      mangadex_id: m.mangadexId || null,
      anilist_id: m.anilistId || null,
      trailer_id: m.trailerUrl || null,
      trailer_source: m.trailerUrl ? 'AniList' : null,
      release_day: m.releaseDay || null,
      rating: m.rating || 4.5,
      is_featured: m.isFeatured ? 1 : 0,
      genres: m.genres || [],
      total_chapters: m.totalChapters || 0,
      pdf_path: m.pdfData || null
    };

    process.stdout.write(`  [${String(i+1).padStart(3)}/${db.length}] ${m.title.substring(0, 45).padEnd(45)} → `);

    if (DRY_RUN) {
      process.stdout.write('DRY RUN\n');
      continue;
    }

    try {
      const res = await post(`${API_URL}/admin/manga/import`, payload, API_KEY);
      if (res.status === 201) { process.stdout.write('✅ inserted\n'); inserted++; }
      else if (res.status === 200) { process.stdout.write('↩ updated\n'); updated++; }
      else { process.stdout.write(`❌ ${res.status}: ${JSON.stringify(res.body).substring(0, 60)}\n`); failed++; }
    } catch (e) {
      process.stdout.write(`❌ Error: ${e.message}\n`);
      failed++;
    }

    await sleep(100); // Don't hammer your own API
  }

  console.log(`\n━━━ SEED RESULTS ━━━`);
  console.log(`✅ Inserted : ${inserted}`);
  console.log(`↩  Updated  : ${updated}`);
  console.log(`❌ Failed   : ${failed}`);
  console.log(`📊 Total    : ${db.length}`);
})();
