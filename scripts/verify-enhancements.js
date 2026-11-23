const fs = require("fs");

console.log("=== VERIFYING ENHANCEMENTS ===");

const app = fs.readFileSync("E:/Manga/app.js", "utf8");

// 1. Check CATALOG_PAGE_SIZE
if (app.includes("const CATALOG_PAGE_SIZE = 12;")) {
  console.log("[PASS] CATALOG_PAGE_SIZE is set to 12");
} else {
  console.error("[FAIL] CATALOG_PAGE_SIZE not 12");
  process.exit(1);
}

// 2. Check SERIES_CHAPTER_PAGE_SIZE
if (app.includes("const SERIES_CHAPTER_PAGE_SIZE = 16;")) {
  console.log("[PASS] SERIES_CHAPTER_PAGE_SIZE is set to 16");
} else {
  console.error("[FAIL] SERIES_CHAPTER_PAGE_SIZE not 16");
  process.exit(1);
}

// 3. Check getReaderPageSrc
if (app.includes("function getReaderPageSrc(")) {
  console.log("[PASS] getReaderPageSrc defined");
} else {
  console.error("[FAIL] getReaderPageSrc missing");
  process.exit(1);
}

// 4. Check scrollReaderToTop
if (app.includes("function scrollReaderToTop(")) {
  console.log("[PASS] scrollReaderToTop defined");
} else {
  console.error("[FAIL] scrollReaderToTop missing");
  process.exit(1);
}

// 5. Check seriesChapterPagination container
if (app.includes('id="seriesChapterPagination"')) {
  console.log("[PASS] seriesChapterPagination container present in series page");
} else {
  console.error("[FAIL] seriesChapterPagination container missing");
  process.exit(1);
}

// 6. Check quicknav in reader
if (app.includes("reader-chapter-quicknav")) {
  console.log("[PASS] reader-chapter-quicknav defined");
} else {
  console.error("[FAIL] reader-chapter-quicknav missing");
  process.exit(1);
}

// 7. Check scroll top button in reader
if (app.includes("readerScrollTopBtn")) {
  console.log("[PASS] readerScrollTopBtn defined");
} else {
  console.error("[FAIL] readerScrollTopBtn missing");
  process.exit(1);
}

// 8. Check CSS styles in styles.css
const css = fs.readFileSync("E:/Manga/styles.css", "utf8");
if (css.includes(".reader-chapter-quicknav") &&
    css.includes(".reader-scroll-top-btn") &&
    css.includes(".pager-container")) {
  console.log("[PASS] All new CSS rules present in styles.css");
} else {
  console.error("[FAIL] Missing CSS rules in styles.css");
  process.exit(1);
}

console.log("\nALL 8 ENHANCEMENT VERIFICATIONS PASSED!");
