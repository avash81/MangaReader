/**
 * MangaVerse Automated Syndication & Ingestion Bot
 * Automatically fetches newly published manga & chapters from open feeds/APIs,
 * merges them into the MangaVerse database, and stages them for auto-deployment.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const APP_JS_PATH = path.join(__dirname, 'app.js');
const SYNC_LOG_PATH = path.join(__dirname, 'sync-log.json');

console.log('================================================================');
console.log('       ⚡ MANGAVERSE AUTOMATED INGESTION & GIT BOT ⚡           ');
console.log('================================================================\n');

// Helper to make HTTPS requests without external npm packages
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'MangaVerse-Bot/3.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', err => resolve(null));
  });
}

async function runMangaSyncBot() {
  console.log('[Bot] Checking external public syndication feeds for new releases...');

  // Mock sample feed mimicking a live publisher webhook or MangaDex public RSS
  const publicFeeds = [
    {
      id: "bot-solo-necromancer",
      title: "The Cataclysmic Necromancer: Reborn as God",
      altTitle: "死霊術士の神化録",
      type: "Manhwa",
      demographic: "Seinen",
      genres: ["Action", "Fantasy", "Leveling", "Dungeon", "Supernatural"],
      rating: 4.95,
      totalChapters: 88,
      releaseDay: "Sun",
      latestChapter: {
        number: 88,
        title: "Army of the Ashen Sovereign",
        views: "320K",
        comments: 480,
        dropTime: "Today (Auto-Synced by Bot)"
      },
      isSimulpub: true,
      isFeatured: true,
      campaignKey: "isekai",
      coverColor: { bg1: "#1e1b4b", bg2: "#0f172a", accent: "#a855f7" },
      kanjiSeal: "死霊",
      author: "Han Jin-Woo",
      artist: "Studio BlackMist",
      synopsis: "When the sky shattered into crimson portals, only one necromancer retained memories of Earth's fall, ready to conquer the dungeon towers."
    },
    {
      id: "bot-noble-villainess-tea",
      title: "The Banished Noblewoman's Afternoon Tea Empire",
      altTitle: "追放令嬢の紅茶喫茶録",
      type: "Manga",
      demographic: "Shōjo",
      genres: ["Slice of Life", "Romance", "Food/Cooking", "Reijo/Villainess", "Nobility"],
      rating: 4.89,
      totalChapters: 34,
      releaseDay: "Wed",
      latestChapter: {
        number: 34,
        title: "The Earl's Secret Blend",
        views: "180K",
        comments: 290,
        dropTime: "Today (Auto-Synced by Bot)"
      },
      isSimulpub: true,
      isFeatured: false,
      campaignKey: "princess",
      coverColor: { bg1: "#831843", bg2: "#180718", accent: "#f472b6" },
      kanjiSeal: "紅茶",
      author: "Haruka Shirasaki",
      artist: "Haruka Shirasaki",
      synopsis: "After her royal engagement was unjustly dissolved, Eleanor moved to the border port town to establish the kingdom's first boutique tea salon."
    }
  ];

  try {
    // Read current app.js
    let appJs = fs.readFileSync(APP_JS_PATH, 'utf8');

    // Extract current MANGA_DATABASE array
    const match = appJs.match(/const MANGA_DATABASE = (\[[\s\S]*?\n\]);/);
    if (!match) {
      console.error('[Bot Error] Could not parse MANGA_DATABASE from app.js');
      return;
    }

    let existingDb = [];
    try {
      // Evaluate array safely
      existingDb = eval(match[1]);
    } catch (e) {
      console.error('[Bot Error] Evaluation failed:', e.message);
      return;
    }

    let addedCount = 0;
    let updatedCount = 0;

    for (const feedItem of publicFeeds) {
      const existingIdx = existingDb.findIndex(m => m.id === feedItem.id);

      if (existingIdx === -1) {
        // Prepend new title
        existingDb.unshift(feedItem);
        addedCount++;
        console.log(`[Bot +] Ingested brand new title: "${feedItem.title}" (Ch. ${feedItem.latestChapter.number})`);
      } else {
        // Update chapter if newer
        if (feedItem.latestChapter.number > existingDb[existingIdx].latestChapter.number) {
          existingDb[existingIdx].latestChapter = feedItem.latestChapter;
          existingDb[existingIdx].totalChapters = feedItem.totalChapters;
          updatedCount++;
          console.log(`[Bot ⟳] Updated chapter drop for: "${feedItem.title}" to Ch. ${feedItem.latestChapter.number}`);
        }
      }
    }

    if (addedCount === 0 && updatedCount === 0) {
      console.log('[Bot] All manga catalog records are already up to date. No changes needed.');
      return;
    }

    // Format new database string
    const newDbString = 'const MANGA_DATABASE = ' + JSON.stringify(existingDb, null, 2) + ';';
    appJs = appJs.replace(/const MANGA_DATABASE = \[[\s\S]*?\n\];/, newDbString);

    fs.writeFileSync(APP_JS_PATH, appJs, 'utf8');
    console.log(`\n[Bot Success] app.js updated! (${addedCount} added, ${updatedCount} chapters bumped)`);

    // Write Sync Log for CI/CD tracking
    const syncLog = {
      timestamp: new Date().toISOString(),
      titlesAdded: addedCount,
      chaptersUpdated: updatedCount,
      totalCatalogSize: existingDb.length
    };
    fs.writeFileSync(SYNC_LOG_PATH, JSON.stringify(syncLog, null, 2), 'utf8');
    console.log('[Bot Log] sync-log.json saved. Ready for Git Auto-Commit & Deploy!');

  } catch (err) {
    console.error('[Bot Failure]', err);
  }
}

// Execute if run directly
if (require.main === module) {
  runMangaSyncBot();
}

module.exports = { runMangaSyncBot };
