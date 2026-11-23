/**
 * MangaVerse Cover Downloader
 * Downloads real manga covers from MangaDex and saves them locally to mangas/covers/
 * so they are served directly from Vercel without hotlinking restrictions.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const APP_JS_PATH = path.join(__dirname, '..', 'app.js');
const COVERS_DIR = path.join(__dirname, '..', 'mangas', 'covers');

console.log('================================================================');
console.log('       MANGAVERSE: DOWNLOADING REAL COVERS LOCALLY              ');
console.log('================================================================\n');

if (!fs.existsSync(COVERS_DIR)) {
  fs.mkdirSync(COVERS_DIR, { recursive: true });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, { headers: { 'User-Agent': 'MangaVerse-Ingestor/2.0' } }, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        return resolve(null);
      }
      res.pipe(file);
      file.on('finish', () => file.close(() => resolve(destPath)));
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      resolve(null);
    });
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  const appJs = fs.readFileSync(APP_JS_PATH, 'utf8');
  const match = appJs.match(/const MANGA_DATABASE = (\[[\s\S]*?\n\]);/);
  if (!match) { console.error('[Error] Cannot find MANGA_DATABASE'); return; }
  
  let db = eval(match[1]);

  // Remove duplicates: keep only entries with coverUrl (real ones) or ones with pdfData (vault ones)
  // The solo-necromancer and villainess-tea-empire from the vault were added twice
  // Keep the vault versions (they have chapters/pdfData) and remove if already in real catalog with same title
  const realTitles = new Set();
  const cleanDb = [];
  
  for (const entry of db) {
    const titleKey = entry.title.toLowerCase().trim();
    if (!realTitles.has(titleKey)) {
      realTitles.add(titleKey);
      cleanDb.push(entry);
    } else {
      console.log(`[Remove Duplicate] "${entry.title}" (id: ${entry.id})`);
    }
  }

  console.log(`[*] Database: ${db.length} entries -> ${cleanDb.length} after dedup\n`);
  console.log('[*] Downloading covers for all real manga titles...\n');

  for (const manga of cleanDb) {
    if (!manga.coverUrl) continue;

    const ext = manga.coverUrl.includes('.png') ? '.png' : '.jpg';
    const fileName = `${manga.id}${ext}`;
    const destPath = path.join(COVERS_DIR, fileName);
    const localPath = `mangas/covers/${fileName}`;

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      console.log(`[Skip] Already downloaded: ${manga.title.slice(0,40)}`);
      manga.coverUrl = localPath;
      continue;
    }

    process.stdout.write(`[Downloading] ${manga.title.slice(0,40)}... `);
    const result = await downloadFile(manga.coverUrl, destPath);
    
    if (result && fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      manga.coverUrl = localPath;
      console.log(`OK (${Math.round(fs.statSync(destPath).size/1024)}KB)`);
    } else {
      console.log('FAILED - keeping remote URL as fallback');
    }

    // Rate limit: be polite to MangaDex API
    await sleep(300);
  }

  // Write updated database back to app.js
  const newDbString = 'const MANGA_DATABASE = ' + JSON.stringify(cleanDb, null, 2) + ';';
  const newAppJs = appJs.replace(/const MANGA_DATABASE = \[[\s\S]*?\n\];/, newDbString);
  fs.writeFileSync(APP_JS_PATH, newAppJs, 'utf8');

  console.log(`\n[Done] ${cleanDb.length} entries in database. Covers saved to mangas/covers/`);
}

main();
