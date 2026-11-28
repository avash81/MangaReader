/**
 * generate-static-sitemap.js
 * ──────────────────────────
 * Generates production-ready sitemap.xml with 1,000+ real manga URLs
 * complying with Google Search Central sitemap specifications (no URI fragments/hashes).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const appJsPath = path.join(__dirname, '..', 'app.js');
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');

const appJsCode = fs.readFileSync(appJsPath, 'utf8');

const domMock = {
  document: {
    title: '',
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {},
    createElement: () => ({ style: {}, classList: { add() {}, remove() {} } }),
    head: { appendChild() {} },
    body: { appendChild() {} }
  },
  navigator: { userAgent: 'NodeTest', serviceWorker: { register: () => Promise.resolve() } },
  location: { hash: '', search: '', pathname: '/', hostname: 'localhost' },
  localStorage: { getItem: () => null, setItem: () => {}, removeItem: () => {} },
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  setInterval: () => {},
  clearInterval: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  console: console
};
domMock.globalThis = domMock;
domMock.window = domMock;

const sandbox = vm.createContext(domMock);
const appScript = new vm.Script(appJsCode + '\n;globalThis.MANGA_DATABASE = MANGA_DATABASE;');
appScript.runInContext(sandbox);

const db = sandbox.MANGA_DATABASE || [];
console.log(`Loaded ${db.length} manga titles from MANGA_DATABASE.`);

const baseUrl = 'https://mangaverse.app';
const today = new Date().toISOString().split('T')[0];

const xml = [];
xml.push('<?xml version="1.0" encoding="UTF-8"?>');
xml.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

// Homepage
xml.push('  <url>');
xml.push(`    <loc>${baseUrl}/</loc>`);
xml.push(`    <lastmod>${today}</lastmod>`);
xml.push('    <changefreq>daily</changefreq>');
xml.push('    <priority>1.0</priority>');
xml.push('  </url>');

// Real individual manga series canonical URLs
for (const manga of db) {
  const slug = encodeURIComponent(manga.id);
  const loc = `${baseUrl}/?manga=${slug}`;
  xml.push('  <url>');
  xml.push(`    <loc>${loc}</loc>`);
  xml.push(`    <lastmod>${today}</lastmod>`);
  xml.push('    <changefreq>weekly</changefreq>');
  xml.push('    <priority>0.8</priority>');
  xml.push('  </url>');
}

xml.push('</urlset>');

fs.writeFileSync(sitemapPath, xml.join('\n') + '\n', 'utf8');
console.log(`Successfully generated sitemap.xml with ${db.length + 1} URLs at ${sitemapPath}`);
