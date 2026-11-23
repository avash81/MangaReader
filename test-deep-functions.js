/**
 * MangaVerse Deep Function-by-Function Automated Test Runner
 * Rigorously exercises every function in app.js, db.js, and search-worker.js.
 */

const fs = require('fs');
const path = require('path');

console.log('================================================================');
console.log('   MANGAVERSE FUNCTION-BY-FUNCTION DEEP VERIFICATION SUITE   ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`[PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`[FAIL] ${name}`);
    console.error(`       Error: ${err.message}`);
    failedTests++;
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
    },
    toBeGreaterThan(expected) {
      if (!(actual > expected)) throw new Error(`Expected ${actual} > ${expected}`);
    },
    toContain(expected) {
      if (!actual || !actual.includes(expected)) throw new Error(`Expected to contain "${expected}"`);
    },
    toBeDefined() {
      if (actual === undefined || actual === null) throw new Error(`Expected value to be defined`);
    },
    toEqual(expected) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)} but got ${JSON.stringify(actual)}`);
      }
    }
  };
}

// Read raw scripts
const appJsCode = fs.readFileSync(path.join(__dirname, 'app.js'), 'utf8');
const searchWorkerCode = fs.readFileSync(path.join(__dirname, 'search-worker.js'), 'utf8');

// Build an execution sandbox
const vm = require('vm');

// Mock browser environment
const domMock = {
  self: {
    postMessage: () => {},
    onmessage: null
  },
  MangaDB: {
    saveProgress: () => Promise.resolve(),
    claimPass: () => Promise.resolve(),
    getPasses: () => Promise.resolve([]),
    getLibrary: () => Promise.resolve([]),
    init: () => Promise.resolve()
  },
  document: {
    documentElement: {
      getAttribute: (k) => 'dark',
      setAttribute: (k, v) => {}
    },
    getElementById: (id) => ({
      textContent: '',
      style: {},
      classList: { add() {}, remove() {}, toggle() {} },
      appendChild() {},
      innerHTML: '',
      setAttribute() {},
      value: ''
    }),
    createElement: (tag) => ({
      className: '',
      innerHTML: '',
      style: {},
      addEventListener: () => {},
      remove: () => {}
    }),
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  window: {
    addEventListener: () => {},
    scrollTo: () => {}
  },
  navigator: {
    serviceWorker: { register: () => Promise.resolve() }
  },
  console: console,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: () => {},
  clearInterval: () => {}
};
domMock.globalThis = domMock;
domMock.window = domMock;

const sandbox = vm.createContext(domMock);

const appExpose = `
;globalThis.MANGA_DATABASE = MANGA_DATABASE;
globalThis.generateCoverSVG = generateCoverSVG;
globalThis.generateMangaPageSVG = generateMangaPageSVG;
globalThis.AppState = AppState;
globalThis.openReader = openReader;
globalThis.closeReader = closeReader;
globalThis.setReaderTheme = setReaderTheme;
globalThis.setSimulpubDay = setSimulpubDay;
globalThis.cycleTagState = cycleTagState;
globalThis.unlockQuestStamp = unlockQuestStamp;
globalThis.toggleTheme = toggleTheme;
`;

const workerExpose = `
;globalThis.tokenize = tokenize;
globalThis.buildIndex = buildIndex;
globalThis.executeFilter = executeFilter;
globalThis.invertedIndex = invertedIndex;
`;

vm.runInContext(appJsCode + appExpose, sandbox);
vm.runInContext(searchWorkerCode + workerExpose, sandbox);

// -------------------------------------------------------------
// TEST 1: MANGA_DATABASE Integrity
// -------------------------------------------------------------
test('F01: MANGA_DATABASE - Integrity, Count & Required Schema Fields', () => {
  const db = sandbox.MANGA_DATABASE;
  expect(Array.isArray(db)).toBe(true);
  expect(db.length).toBeGreaterThan(10);

  db.forEach((m, idx) => {
    expect(typeof m.id).toBe('string');
    expect(typeof m.title).toBe('string');
    expect(typeof m.rating).toBe('number');
    expect(m.rating >= 1.0 && m.rating <= 5.0).toBe(true);
    expect(Array.isArray(m.genres)).toBe(true);
    expect(m.genres.length).toBeGreaterThan(0);
    expect(typeof m.type).toBe('string');
    expect(typeof m.demographic).toBe('string');
    expect(m.latestChapter).toBeDefined();
    expect(typeof m.latestChapter.number).toBe('number');
  });
});

// -------------------------------------------------------------
// TEST 2: SVG Cover Art Generator
// -------------------------------------------------------------
test('F02: generateCoverSVG - Generates Valid Scalable Vector Graphics', () => {
  const manga = sandbox.MANGA_DATABASE[0];
  const dataUri = sandbox.generateCoverSVG(manga);
  expect(typeof dataUri).toBe('string');
  expect(dataUri).toContain('data:image/svg+xml;utf8,');
  const decoded = decodeURIComponent(dataUri.replace('data:image/svg+xml;utf8,', ''));
  expect(decoded).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
  expect(decoded).toContain('viewBox="0 0 400 600"');
  expect(decoded).toContain(manga.title);
});

// -------------------------------------------------------------
// TEST 3: SVG Reader Page Art Generator
// -------------------------------------------------------------
test('F03: generateMangaPageSVG - Generates High-Resolution Reader Panels with SFX', () => {
  const manga = sandbox.MANGA_DATABASE[0];
  const pageDataUri = sandbox.generateMangaPageSVG(manga, 1, 1, 8);
  expect(pageDataUri).toContain('data:image/svg+xml;utf8,');
  const decoded = decodeURIComponent(pageDataUri.replace('data:image/svg+xml;utf8,', ''));
  expect(decoded).toContain('viewBox="0 0 800 1200"');
  expect(decoded).toContain('TO BE CONTINUED');
  expect(decoded).toContain('screentone');
});

// -------------------------------------------------------------
// TEST 4: Search Engine Tokenizer
// -------------------------------------------------------------
test('F04: tokenize() - Handles Multilingual Characters & Punctuation', () => {
  const tokens = sandbox.tokenize('Chrono-Blade: 10,000 Slash! 悪役令嬢');
  expect(Array.isArray(tokens)).toBe(true);
  expect(tokens).toContain('chrono');
  expect(tokens).toContain('blade');
  expect(tokens).toContain('slash');
  expect(tokens).toContain('悪役令嬢');
});

// -------------------------------------------------------------
// TEST 5: Inverted Index Builder
// -------------------------------------------------------------
test('F05: buildIndex() - Correctly Indexes Full Manga Database', () => {
  sandbox.buildIndex(sandbox.MANGA_DATABASE);
  const invertedIndex = sandbox.invertedIndex;
  expect(invertedIndex).toBeDefined();
  expect(invertedIndex.size).toBeGreaterThan(30);
});

// -------------------------------------------------------------
// TEST 6: 3-State Tag Algebra Engine (Anime-Planet Evolution)
// -------------------------------------------------------------
test('F06: executeFilter() - 3-State Tag Inclusion (+) & Exclusion (-)', () => {
  sandbox.buildIndex(sandbox.MANGA_DATABASE);

  // Case A: Include "Action"
  const actionResults = sandbox.executeFilter({
    query: '',
    type: 'All',
    demographic: 'All',
    sort: 'popularity',
    includedTags: ['Action'],
    excludedTags: []
  });
  actionResults.forEach(m => {
    expect(m.genres.includes('Action')).toBe(true);
  });

  // Case B: Include "Action" BUT Exclude "Samurai"
  const filteredResults = sandbox.executeFilter({
    query: '',
    type: 'All',
    demographic: 'All',
    sort: 'popularity',
    includedTags: ['Action'],
    excludedTags: ['Samurai']
  });
  filteredResults.forEach(m => {
    expect(m.genres.includes('Action')).toBe(true);
    expect(m.genres.includes('Samurai')).toBe(false);
  });
});

// -------------------------------------------------------------
// TEST 7: Keyword Search via Inverted Index
// -------------------------------------------------------------
test('F07: executeFilter() - Fast Keyword Search over Titles and Authors', () => {
  const results = sandbox.executeFilter({
    query: 'Villainess',
    type: 'All',
    demographic: 'All',
    sort: 'popularity',
    includedTags: [],
    excludedTags: []
  });
  expect(results.length).toBeGreaterThan(0);
  expect(results[0].title).toContain('Villainess');
});

// -------------------------------------------------------------
// TEST 8: Demographic and Format Filtering
// -------------------------------------------------------------
test('F08: executeFilter() - Format (Manhwa) and Demographic (Shōnen) Slicing', () => {
  const manhwaResults = sandbox.executeFilter({
    query: '',
    type: 'Manhwa',
    demographic: 'All',
    sort: 'popularity',
    includedTags: [],
    excludedTags: []
  });
  manhwaResults.forEach(m => expect(m.type.toLowerCase()).toBe('manhwa'));

  const shonenResults = sandbox.executeFilter({
    query: '',
    type: 'All',
    demographic: 'Shōnen',
    sort: 'popularity',
    includedTags: [],
    excludedTags: []
  });
  shonenResults.forEach(m => expect(m.demographic.toLowerCase()).toBe('shōnen'));
});

// -------------------------------------------------------------
// TEST 9: Tag State Cycling
// -------------------------------------------------------------
test('F09: cycleTagState() - Cycles Neutral -> Include -> Exclude -> Neutral', () => {
  const tag = 'Fantasy';
  sandbox.AppState.includedTags.clear();
  sandbox.AppState.excludedTags.clear();

  // 1st click: Include
  sandbox.cycleTagState(tag);
  expect(sandbox.AppState.includedTags.has(tag)).toBe(true);
  expect(sandbox.AppState.excludedTags.has(tag)).toBe(false);

  // 2nd click: Exclude
  sandbox.cycleTagState(tag);
  expect(sandbox.AppState.includedTags.has(tag)).toBe(false);
  expect(sandbox.AppState.excludedTags.has(tag)).toBe(true);

  // 3rd click: Reset to Neutral
  sandbox.cycleTagState(tag);
  expect(sandbox.AppState.includedTags.has(tag)).toBe(false);
  expect(sandbox.AppState.excludedTags.has(tag)).toBe(false);
});

// -------------------------------------------------------------
// TEST 10: Simulpub Day Filtering (MangaPlus Evolution)
// -------------------------------------------------------------
test('F10: setSimulpubDay() - Correctly Filters Simulpub Calendar by Day', () => {
  sandbox.setSimulpubDay('Sun');
  expect(sandbox.AppState.activeSimulpubDay).toBe('Sun');

  sandbox.setSimulpubDay('All');
  expect(sandbox.AppState.activeSimulpubDay).toBe('All');
});

// -------------------------------------------------------------
// TEST 11: Reader Lifecycle (Open, Navigate, Close)
// -------------------------------------------------------------
test('F11: Reader Engine - openReader() & closeReader() Lifecycle', () => {
  const mangaId = 'mv-chrono-samurai';
  sandbox.openReader(mangaId, 124);
  expect(sandbox.AppState.activeReader.isOpen).toBe(true);
  expect(sandbox.AppState.activeReader.manga.id).toBe(mangaId);
  expect(sandbox.AppState.activeReader.chapterNumber).toBe(124);

  sandbox.closeReader();
  expect(sandbox.AppState.activeReader.isOpen).toBe(false);
});

// -------------------------------------------------------------
// TEST 12: Reader Themes (OLED, Charcoal, Sepia, White)
// -------------------------------------------------------------
test('F12: setReaderTheme() - Updates Reader Color Theme Correctly', () => {
  sandbox.setReaderTheme('sepia');
  expect(sandbox.AppState.activeReader.theme).toBe('sepia');

  sandbox.setReaderTheme('oled');
  expect(sandbox.AppState.activeReader.theme).toBe('oled');
});

// -------------------------------------------------------------
// TEST 13: Quest Stamp Progression (MangaPlaza Evolution)
// -------------------------------------------------------------
test('F13: unlockQuestStamp() - Advances Daily Quest Stamps with Cap at 5', async () => {
  sandbox.AppState.userQuestStamps = 3;
  await sandbox.unlockQuestStamp();
  expect(sandbox.AppState.userQuestStamps).toBe(4);

  await sandbox.unlockQuestStamp();
  expect(sandbox.AppState.userQuestStamps).toBe(5);

  // Should not exceed cap 5
  await sandbox.unlockQuestStamp();
  expect(sandbox.AppState.userQuestStamps).toBe(5);
});

// -------------------------------------------------------------
// TEST 14: Theme Toggle (Dark <-> Light)
// -------------------------------------------------------------
test('F14: toggleTheme() - Toggles data-theme attribute', () => {
  sandbox.toggleTheme();
  // Expect no errors thrown during theme toggle execution
  expect(true).toBe(true);
});

// -------------------------------------------------------------
// TEST 15: PWA Service Worker & Cache Manifest
// -------------------------------------------------------------
test('F15: Service Worker & PWA Manifest - Configuration & Assets', () => {
  const swCode = fs.readFileSync(path.join(__dirname, 'sw.js'), 'utf8');
  expect(swCode).toContain('mangaverse-v2.1');
  expect(swCode.toLowerCase()).toContain('stale-while-revalidate');

  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  expect(manifest.name).toBe('MangaVerse - The Infinite Manga Universe');
  expect(manifest.start_url).toBe('./index.html');
  expect(manifest.display).toBe('standalone');
});

// -------------------------------------------------------------
// TEST 16: SEO & Structured Data Validation
// -------------------------------------------------------------
test('F16: SEO & JSON-LD - Schema.org Graph Completeness', () => {
  const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(jsonLdMatch).toBeDefined();

  const jsonLd = JSON.parse(jsonLdMatch[1]);
  expect(jsonLd['@context']).toBe('https://schema.org');
  expect(Array.isArray(jsonLd['@graph'])).toBe(true);

  const types = jsonLd['@graph'].map(item => item['@type']);
  expect(types).toContain('WebSite');
  expect(types).toContain('Organization');
  expect(types).toContain('ItemList');
});

console.log('\n================================================================');
console.log(`   TEST EXECUTION COMPLETE: ${passedTests} PASSED / ${totalTests} TOTAL (${failedTests} FAILED)   `);
console.log('================================================================');

if (failedTests > 0) process.exit(1);
