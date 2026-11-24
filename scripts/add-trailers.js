// Patch trailerUrl into MANGA_DATABASE for popular titles
// YouTube video IDs sourced from official channels
const fs = require('fs');

const TRAILER_MAP = {
  // ID in DB : YouTube video ID (official anime/manga PV trailers)
  'berserk':                   'GFm7jH8HjSE',
  'vagabond':                  'o7BrkSGJGEA',
  'one-piece':                 'S8_YwFLCh4U',
  'fullmetal-alchemist':       'WQiE9taZEAw',
  'attack-on-titan':           'MGRm4IzK1SQ',
  'demon-slayer':              'VQGCKyvzIM4',
  'death-note':                'NlJZ-YgAt-c',
  'naruto':                    '4TXF9hm3V7Q',
  'solo-leveling':             'PKmnXrDlhEQ',
  'tower-of-god':              'FhcbdEdvHr4',
  'vinland-saga':              'o6JNeqjJQKs',
  'dungeon-meshi':             'ySqR68jcHxY',
  'spy-x-family':              'tq8pEuVN_qE',
  'jujutsu-kaisen':            'pkKu9hLT-t8',
  'chainsaw-man':              'q9GpIJKPMGk',
  'my-hero-academia':          '70bFsPoS1Hg',
  'blue-period':               'DFSEivlCRTo',
  'frieren':                   'Rp1g7FVBX2Y',
  'skip-and-loafer':           'dWqy_6o-DXM',
  'dungeon-meshi-2':           'ySqR68jcHxY',
  'omniscient-reader':         'PKmnXrDlhEQ',
};

const appPath = require('path').join(__dirname, '..', 'app.js');
let src = fs.readFileSync(appPath, 'utf8');
const regex = /const MANGA_DATABASE = (\[[\s\S]*?\n\]);/;
const match = src.match(regex);
if (!match) { console.error('DB not found'); process.exit(1); }

const db = eval(match[1]);
let patched = 0;

db.forEach(entry => {
  const ytId = TRAILER_MAP[entry.id];
  if (ytId && !entry.trailerUrl) {
    entry.trailerUrl = ytId;
    patched++;
    console.log('Added trailer to:', entry.title, '->', ytId);
  }
});

console.log(`Patched ${patched} entries with trailers.`);

// JSON.stringify already wraps in [...] — just append semicolon directly, no extra ];
const newDBStr = JSON.stringify(db, null, 2); // produces [ ... ]
const newSrc = src.replace(regex, 'const MANGA_DATABASE = ' + newDBStr + ';');
fs.writeFileSync(appPath, newSrc, 'utf8');
console.log('Done. DB size:', db.length);
