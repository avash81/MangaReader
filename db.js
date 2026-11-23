/**
 * MangaVerse IndexedDB High-Capacity Storage Engine
 * Manages millions of records safely with zero UI blocking.
 */

const MangaDB = (function() {
  const DB_NAME = 'MangaVerseDB';
  const DB_VERSION = 1;
  let dbInstance = null;

  function init() {
    return new Promise((resolve, reject) => {
      if (dbInstance) return resolve(dbInstance);

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Store 1: Reading History & Progress
        if (!db.objectStoreNames.contains('reading_history')) {
          const historyStore = db.createObjectStore('reading_history', { keyPath: 'mangaId' });
          historyStore.createIndex('lastRead', 'lastRead', { unique: false });
        }

        // Store 2: User Library Shelves
        if (!db.objectStoreNames.contains('user_library')) {
          const libStore = db.createObjectStore('user_library', { keyPath: 'mangaId' });
          libStore.createIndex('shelf', 'shelf', { unique: false });
          libStore.createIndex('updatedAt', 'updatedAt', { unique: false });
        }

        // Store 3: Rewards, Passes & Event Wallet
        if (!db.objectStoreNames.contains('wallet_passes')) {
          db.createObjectStore('wallet_passes', { keyPath: 'passId' });
        }

        // Store 4: Offline Cached Chapters
        if (!db.objectStoreNames.contains('offline_chapters')) {
          const chStore = db.createObjectStore('offline_chapters', { keyPath: 'chapterKey' });
          chStore.createIndex('mangaId', 'mangaId', { unique: false });
        }

        // Store 5: Custom User Reviews & Comments
        if (!db.objectStoreNames.contains('user_discussions')) {
          const comStore = db.createObjectStore('user_discussions', { keyPath: 'id', autoIncrement: true });
          comStore.createIndex('chapterKey', 'chapterKey', { unique: false });
        }
      };

      request.onsuccess = (event) => {
        dbInstance = event.target.result;
        resolve(dbInstance);
      };

      request.onerror = (event) => {
        console.error('[IndexedDB] Init error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  // --- Reading History Operations ---
  async function saveProgress(mangaId, chapterNumber, pageNumber, totalPages) {
    const db = await init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('reading_history', 'readwrite');
      const store = tx.objectStore('reading_history');
      const record = {
        mangaId,
        chapterNumber,
        pageNumber,
        currentPage: pageNumber,
        totalPages,
        percentage: Math.min(100, Math.round((pageNumber / (totalPages || 1)) * 100)),
        lastRead: Date.now(),
        savedAt: Date.now()
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function getProgress(mangaId) {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('reading_history', 'readonly');
      const store = tx.objectStore('reading_history');
      const req = store.get(mangaId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  }

  async function getAllHistory() {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('reading_history', 'readonly');
      const store = tx.objectStore('reading_history');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  // --- Library Operations ---
  async function setLibraryShelf(mangaId, shelf, title, cover) {
    const db = await init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('user_library', 'readwrite');
      const store = tx.objectStore('user_library');
      if (shelf === 'none') {
        const req = store.delete(mangaId);
        req.onsuccess = () => resolve(null);
        req.onerror = (e) => reject(e.target.error);
      } else {
        const record = {
          mangaId,
          shelf, // reading, want_to_read, completed, on_hold, favorites
          title,
          cover,
          updatedAt: Date.now()
        };
        const req = store.put(record);
        req.onsuccess = () => resolve(record);
        req.onerror = (e) => reject(e.target.error);
      }
    });
  }

  async function getLibrary() {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('user_library', 'readonly');
      const store = tx.objectStore('user_library');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  // --- Wallet & Passes Operations ---
  async function claimPass(pass) {
    const db = await init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('wallet_passes', 'readwrite');
      const store = tx.objectStore('wallet_passes');
      const req = store.put(pass);
      req.onsuccess = () => resolve(pass);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function getPasses() {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('wallet_passes', 'readonly');
      const store = tx.objectStore('wallet_passes');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  // --- Comments & Community Discussions ---
  async function addDiscussion(comment) {
    const db = await init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('user_discussions', 'readwrite');
      const store = tx.objectStore('user_discussions');
      const req = store.add({
        ...comment,
        timestamp: Date.now(),
        upvotes: 0
      });
      req.onsuccess = () => resolve(req.result);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function getDiscussionsByChapter(chapterKey) {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('user_discussions', 'readonly');
      const store = tx.objectStore('user_discussions');
      const index = store.index('chapterKey');
      const req = index.getAll(chapterKey);
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  // --- Offline Chapters Operations ---
  async function saveOfflineChapter(chapterKey, mangaId, chapterNumber, pages) {
    const db = await init();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('offline_chapters', 'readwrite');
      const store = tx.objectStore('offline_chapters');
      const record = {
        chapterKey,
        mangaId,
        chapterNumber,
        pages,
        savedAt: Date.now()
      };
      const req = store.put(record);
      req.onsuccess = () => resolve(record);
      req.onerror = (e) => reject(e.target.error);
    });
  }

  async function getOfflineChapter(chapterKey) {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('offline_chapters', 'readonly');
      const store = tx.objectStore('offline_chapters');
      const req = store.get(chapterKey);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  }

  async function getAllOfflineChapters() {
    const db = await init();
    return new Promise((resolve) => {
      const tx = db.transaction('offline_chapters', 'readonly');
      const store = tx.objectStore('offline_chapters');
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  }

  return {
    init,
    saveProgress,
    getProgress,
    getAllHistory,
    setLibraryShelf,
    getLibrary,
    claimPass,
    getPasses,
    addDiscussion,
    getDiscussionsByChapter,
    saveOfflineChapter,
    getOfflineChapter,
    getAllOfflineChapters
  };
})();
