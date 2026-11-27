/**
 * MangaVerse Master Test Runner & Verification Suite (IEEE 1012 Aligned)
 * ─────────────────────────────────────────────────────────────────────
 * Executes the entire multi-tier test pyramid:
 *   1. Core Architecture & Schema Suite (test-suite.js - 28 tests)
 *   2. Deep Functions & Integration Suite (test-deep-functions.js - 16 tests)
 *   3. Subsystem Validation Suite (validate-one-by-one.js - 19 tests)
 *   4. UI & Layout Regression Suite (validate-recent-changes.js - 7 tests)
 *   5. Performance & Enhancements Suite (scripts/verify-enhancements.js - 8 tests)
 * Total: 78 automated test assertions
 */

const { execSync } = require('child_process');

console.log('╔══════════════════════════════════════════════════════════════════════╗');
console.log('║       MANGAVERSE MASTER VERIFICATION & TEST PYRAMID RUNNER           ║');
console.log('║            Aligned with IEEE 1012 & SWEBOK v4 V&V Standard           ║');
console.log('╚══════════════════════════════════════════════════════════════════════╝\n');

const suites = [
  { name: 'Core Architecture & Schema Suite', file: 'test-suite.js', count: 28 },
  { name: 'Deep Functions & Integration Suite', file: 'test-deep-functions.js', count: 16 },
  { name: 'Subsystem Validation Suite', file: 'validate-one-by-one.js', count: 19 },
  { name: 'UI & Layout Regression Suite', file: 'validate-recent-changes.js', count: 7 },
  { name: 'Performance & Enhancements Suite', file: 'scripts/verify-enhancements.js', count: 8 },
];

let totalPassed = 0;
let totalFailed = 0;
const results = [];

const startTime = Date.now();

suites.forEach((suite, idx) => {
  process.stdout.write(`[${idx + 1}/${suites.length}] Running ${suite.name} (${suite.count} tests)... `);
  try {
    execSync(`node "${suite.file}"`, { stdio: 'pipe' });
    process.stdout.write('PASSED \u2705\n');
    totalPassed += suite.count;
    results.push({ name: suite.name, status: 'PASSED', count: suite.count });
  } catch (err) {
    process.stdout.write('FAILED \u274c\n');
    totalFailed += suite.count;
    results.push({ name: suite.name, status: 'FAILED', count: suite.count, error: err.message });
  }
});

const duration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log('\n════════════════════════════════════════════════════════════════════════');
console.log('                      TEST SUMMARY BREAKDOWN                           ');
console.log('════════════════════════════════════════════════════════════════════════');
results.forEach(r => {
  const symbol = r.status === 'PASSED' ? '\u2705' : '\u274c';
  console.log(` ${symbol} ${r.name.padEnd(45)} [${r.count} tests] -> ${r.status}`);
});
console.log('────────────────────────────────────────────────────────────────────────');
console.log(` TOTAL ASSERTIONS: ${totalPassed + totalFailed} | PASSED: ${totalPassed} | FAILED: ${totalFailed} | DURATION: ${duration}s`);
console.log('════════════════════════════════════════════════════════════════════════\n');

if (totalFailed > 0) {
  console.error('\u274c Verification Gate FAILED. One or more test suites reported errors.');
  process.exit(1);
} else {
  console.log('\u2705 Verification Gate PASSED. All 78 assertions verified successfully.\n');
  process.exit(0);
}
