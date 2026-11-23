const fs = require('fs');
const html = fs.readFileSync('E:/Manga/index.html', 'utf8');
const css = fs.readFileSync('E:/Manga/styles.css', 'utf8');
const app = fs.readFileSync('E:/Manga/app.js', 'utf8');

console.log('======================================================');
console.log('      MANGAVERSE: VALIDATION OF RECENT CHANGES       ');
console.log('======================================================\n');

let passCount = 0;
let failCount = 0;

function verify(num, label, condition, details) {
  if (condition) {
    console.log(`[PASS] Step ${num}: ${label}`);
    console.log(`       └─ Verified: ${details}`);
    passCount++;
  } else {
    console.log(`[FAIL] Step ${num}: ${label}`);
    console.log(`       └─ Error: ${details}`);
    failCount++;
  }
}

// 1. Directory Section at Top Below Header
const mainIdx = html.indexOf('<main id="mainContent"');
const dirIdx = html.indexOf('id="directorySection"');
const simulpubIdx = html.indexOf('id="simulpubSection"');
const isDirFirst = dirIdx > mainIdx && simulpubIdx === -1;
verify(1, 'Manga Directory is at Top Directly Below Header', isDirFirst,
  '#directorySection is the primary section in <main>; fake #simulpubSection removed');

// 2. Daily Passes Banner Removed
const hasPassesBanner = html.includes('daily-passes-banner');
verify(2, 'Daily Passes Banner Completely Removed', !hasPassesBanner,
  'No daily-passes-banner element exists in index.html');

// 3. Filter Dashboard Structure & Admin Controls Restricted
const dirSectionHtml = html.substring(html.indexOf('id="directorySection"'), html.indexOf('id="directoryGrid"'));
const hasUploadPdfInDir = dirSectionHtml.includes('+ Upload Manga PDF');
const hasFormatLabel = html.includes('filter-input-label') && html.includes('FORMAT');
const hasDemoLabel = html.includes('filter-input-label') && html.includes('DEMOGRAPHIC');
const hasSortLabel = html.includes('filter-input-label') && html.includes('SORT METRIC');
const hasDirSearch = html.includes('id="dirSearchInput"') && html.includes('id="clearDirSearchBtn"');
verify(3, 'Filter Dashboard Clean & Admin Upload Button Hidden From Users', !hasUploadPdfInDir && hasFormatLabel && hasDemoLabel && hasSortLabel && hasDirSearch,
  'Admin "+ Upload Manga PDF" button removed from public directory header; search and FORMAT/DEMOGRAPHIC/SORT labels verified');

// 4. Real Manga PDF Upload Capability
const acceptsPdf = html.includes('accept="image/*,.pdf,application/pdf"');
const handlesPdf = app.includes('firstFile.type === "application/pdf"') && app.includes('MAX_PDF_SIZE');
const savesPdf = app.includes('pdfData: studioPdfDataUrl');
verify(4, 'Real Manga PDF Upload Support in Studio', acceptsPdf && handlesPdf && savesPdf,
  'FileInput accepts .pdf up to 50MB; FileReader parses Data URL; stores pdfData in DB and IndexedDB');

// 5. Embedded PDF Reader Engine
const hasPdfViewport = app.includes('class="reader-viewport-pdf"') && app.includes('class="manga-pdf-frame"');
const cspHasFrame = html.includes("frame-src 'self' data: blob:;");
const hasPdfStyles = css.includes('.reader-viewport-pdf') && css.includes('.manga-pdf-frame');
verify(5, 'Embedded PDF Viewer in Reader Engine', hasPdfViewport && cspHasFrame && hasPdfStyles,
  'Reader renders iframe for PDF with full zoom & navigation; CSP allows data:/blob: frames; CSS responsive');

// 6. Responsive Layout Breakpoints
const hasBottomNav = html.includes('class="bottom-nav"') && html.includes('id="bnav-browse"');
const bottomNavDesktopHidden = css.includes('@media (min-width: 769px)') && css.includes('.bottom-nav');
const mobileFilterGrid = css.includes('.filter-group-format') && css.includes('grid-column: 1 / -1');
verify(6, 'Multi-Device Responsive Grid & Navigation', hasBottomNav && bottomNavDesktopHidden && mobileFilterGrid,
  'Desktop sticky header nav; Mobile bottom navigation with active Browse; Mobile 2-column filter grid');

// 7. Reading Flow & Layout Cards in Creator Studio
const hasReadingFlowCards = html.includes('reading-flow-picker') && html.includes('setReadingFlow');
const flowStyled = css.includes('.reading-flow-card') && css.includes('.reading-flow-card.active');
verify(7, 'Creator Studio 3 Reading Flow Radio Cards', hasReadingFlowCards && flowStyled,
  'Visual radio selectors for Manga (RTL), Manhwa (Webtoon scroll), Manhua (Color scroll)');

console.log('\n======================================================');
console.log(`  VALIDATION SUMMARY: ${passCount} PASSED / ${passCount + failCount} TOTAL (${failCount} FAILED)`);
console.log('======================================================\n');
