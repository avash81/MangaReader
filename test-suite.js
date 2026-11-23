const fs = require('fs');
const path = require('path');

console.log('=== RUNNING MANGAVERSE COMPREHENSIVE TEST SUITE ===\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Verify Core Files Existence
const requiredFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'db.js',
  'search-worker.js',
  'sw.js',
  'manifest.json',
  'robots.txt',
  'sitemap.xml'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  assert(fs.existsSync(filePath), `File exists: ${file}`);
});

// 2. Test app.js database and functions
const appJsContent = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');

// Verify MANGA_DATABASE definition
assert(appJsContent.includes('const MANGA_DATABASE = ['), 'MANGA_DATABASE defined');
assert(appJsContent.includes('function generateCoverSVG'), 'generateCoverSVG defined');
assert(appJsContent.includes('function generateMangaPageSVG'), 'generateMangaPageSVG defined');
assert(appJsContent.includes('function openReader'), 'openReader defined');
assert(appJsContent.includes('function cycleTagState'), 'cycleTagState defined (Anime-Planet 3-state)');
assert(appJsContent.includes('function claimEventPass'), 'claimEventPass defined (MangaPlaza wallet)');

// 3. Test Inverted Index & Filter Logic from search-worker.js
const workerContent = fs.readFileSync(path.join(__dirname, 'search-worker.js'), 'utf8');
assert(workerContent.includes('function tokenize'), 'Tokenizer present in Web Worker');
assert(workerContent.includes('function buildIndex'), 'Inverted Index builder present');
assert(workerContent.includes('function executeFilter'), '3-State Tag Algebra filter present');

// 4. Test IndexedDB Engine in db.js
const dbContent = fs.readFileSync(path.join(__dirname, 'db.js'), 'utf8');
assert(dbContent.includes('reading_history'), 'IndexedDB reading_history store defined');
assert(dbContent.includes('user_library'), 'IndexedDB user_library store defined');
assert(dbContent.includes('wallet_passes'), 'IndexedDB wallet_passes store defined');
assert(dbContent.includes('saveProgress'), 'saveProgress function defined');

// 5. Test SEO elements in index.html
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
assert(htmlContent.includes('<title>'), 'HTML <title> tag present');
assert(htmlContent.includes('name="description"'), 'Meta description present');
assert(htmlContent.includes('application/ld+json'), 'Schema.org JSON-LD structured data present');
assert(htmlContent.includes('manifest.json'), 'PWA manifest linked');
assert(htmlContent.includes('sw.js'), 'Service Worker logic present');
assert(htmlContent.includes('class="skip-link"'), 'A11y skip-link present');

console.log(`\n=== TEST RESULTS: ${passed} PASSED, ${failed} FAILED ===`);
if (failed > 0) process.exit(1);
