/**
 * MangaVerse High-Speed Search & Filter Web Worker
 * Runs off-main-thread. Computes 3-state tag queries in <5ms across huge catalogs.
 */

let mangaIndex = [];
let invertedIndex = new Map();

function tokenize(text) {
  if (!text) return [];
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\ud800-\udbff\udc00-\udfff]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 0);
}

function buildIndex(database) {
  mangaIndex = database;
  invertedIndex.clear();

  for (let i = 0; i < database.length; i++) {
    const item = database[i];
    const words = new Set([
      ...tokenize(item.title),
      ...tokenize(item.altTitle || ''),
      ...tokenize(item.author || ''),
      ...tokenize(item.artist || ''),
      ...tokenize(item.demographic || ''),
      ...tokenize(item.type || ''),
      ...(item.genres || []).map(g => g.toLowerCase())
    ]);

    words.forEach(word => {
      if (!invertedIndex.has(word)) {
        invertedIndex.set(word, new Set());
      }
      invertedIndex.get(word).add(i);
    });
  }
}

function executeFilter(payload) {
  const { query, type, demographic, sort, includedTags, excludedTags } = payload;
  let candidateIndices = null;

  // 1. Text Search via Inverted Index
  if (query && query.trim().length > 0) {
    const tokens = tokenize(query);
    if (tokens.length > 0) {
      candidateIndices = new Set();
      let isFirst = true;

      for (const token of tokens) {
        let matchingForToken = new Set();
        for (const [key, indices] of invertedIndex.entries()) {
          if (key.includes(token)) {
            indices.forEach(idx => matchingForToken.add(idx));
          }
        }

        if (isFirst) {
          candidateIndices = new Set(matchingForToken);
          isFirst = false;
        } else {
          // AND intersection
          candidateIndices = new Set(
            [...candidateIndices].filter(x => matchingForToken.has(x))
          );
        }
      }
    }
  }

  // Convert to candidate array
  let results = candidateIndices !== null
    ? [...candidateIndices].map(i => mangaIndex[i])
    : [...mangaIndex];

  // 2. Format / Type Filter
  if (type && type !== 'All') {
    results = results.filter(m => m.type.toLowerCase() === type.toLowerCase());
  }

  // 3. Demographic Filter
  if (demographic && demographic !== 'All') {
    results = results.filter(m => m.demographic.toLowerCase() === demographic.toLowerCase());
  }

  // 4. Anime-Planet 3-State Tag Algebra:
  // Must include ALL includedTags, and must NOT have any excludedTags
  if (includedTags && includedTags.length > 0) {
    results = results.filter(m => {
      const mangaTags = (m.genres || []).map(g => g.toLowerCase());
      return includedTags.every(inc => mangaTags.includes(inc.toLowerCase()));
    });
  }

  if (excludedTags && excludedTags.length > 0) {
    results = results.filter(m => {
      const mangaTags = (m.genres || []).map(g => g.toLowerCase());
      return !excludedTags.some(exc => mangaTags.includes(exc.toLowerCase()));
    });
  }

  // 5. Sorting
  switch (sort) {
    case 'rating':
      results.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      results.sort((a, b) => (b.latestChapter?.number || 0) - (a.latestChapter?.number || 0));
      break;
    case 'chapters':
      results.sort((a, b) => (b.totalChapters || 0) - (a.totalChapters || 0));
      break;
    case 'alphabetical':
      results.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'popularity':
    default:
      // Weight rating + views
      results.sort((a, b) => {
        const getV = (v) => {
          if (!v) return 0;
          const num = parseFloat(v);
          if (v.includes('M')) return num * 1000000;
          if (v.includes('K')) return num * 1000;
          return num;
        };
        const aScore = (a.rating * 10000) + getV(a.latestChapter?.views);
        const bScore = (b.rating * 10000) + getV(b.latestChapter?.views);
        return bScore - aScore;
      });
      break;
  }

  return results;
}

self.onmessage = function(e) {
  const { action, payload } = e.data;

  if (action === 'INIT_DATABASE') {
    buildIndex(payload);
    self.postMessage({ action: 'INITIALIZED', count: payload.length });
  } else if (action === 'FILTER_QUERY') {
    const filtered = executeFilter(payload);
    self.postMessage({ action: 'FILTER_RESULTS', results: filtered, total: filtered.length });
  }
};
