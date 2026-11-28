/**
 * MangaVerse Supabase PDF & Chapter Uploader
 * Scans local mangas directory and uploads PDFs to Supabase Storage & Database
 */

const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://muoqixvulkijdsqvehou.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_53Qo-Ht3ZpeqPTl_e4Em8w_08_aWfeq';
const BUCKET_NAME = 'manga-pdfs';

const MANGAS_DIR = path.join(__dirname, '..', 'mangas');

async function uploadFileToSupabase(filePath, storagePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${storagePath}`;

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/pdf',
      'x-upsert': 'true'
    },
    body: fileBuffer
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Upload failed (${res.status}): ${errorText}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${storagePath}`;
}

async function upsertChapterToDatabase(chapterData) {
  const dbUrl = `${SUPABASE_URL}/rest/v1/manga_chapters?on_conflict=manga_id,chapter_number`;
  
  const res = await fetch(dbUrl, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=representation'
    },
    body: JSON.stringify(chapterData)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DB upsert failed (${res.status}): ${errText}`);
  }

  return await res.json();
}

function findMangaDirs(dir, list = []) {
  if (!fs.existsSync(dir)) return list;
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory() && item.name !== 'covers') {
      if (fs.existsSync(path.join(fullPath, 'info.json'))) {
        list.push(fullPath);
      } else {
        findMangaDirs(fullPath, list);
      }
    }
  }
  return list;
}

async function main() {
  console.log('🚀 Starting MangaVerse Supabase Manga Ingestion...');
  console.log(`Connecting to: ${SUPABASE_URL}`);

  const mangaDirs = findMangaDirs(MANGAS_DIR);
  console.log(`Found ${mangaDirs.length} manga series directories with info.json.\n`);

  for (const mDir of mangaDirs) {
    const infoPath = path.join(mDir, 'info.json');
    const info = JSON.parse(fs.readFileSync(infoPath, 'utf8'));
    const mangaId = info.id;
    console.log(`\n📚 Processing: ${info.title} (${mangaId})`);

    const files = fs.readdirSync(mDir);
    const pdfFiles = files.filter(f => f.toLowerCase().endsWith('.pdf'));

    for (const pdfFile of pdfFiles) {
      const match = pdfFile.match(/ch[-_]?(\d+)/i);
      const chNum = match ? parseInt(match[1], 10) : 1;
      const localPdfPath = path.join(mDir, pdfFile);
      const storagePath = `${mangaId}/ch-${chNum}.pdf`;

      console.log(`  -> Uploading Chapter ${chNum} (${pdfFile})...`);
      try {
        const publicUrl = await uploadFileToSupabase(localPdfPath, storagePath);
        console.log(`     Uploaded: ${publicUrl}`);

        console.log(`  -> Registering in Supabase Database...`);
        await upsertChapterToDatabase({
          manga_id: mangaId,
          chapter_number: chNum,
          title: `Chapter ${chNum}`,
          pdf_url: publicUrl,
          total_pages: 1
        });
        console.log(`     ✅ Synced Chapter ${chNum} to database!`);
      } catch (err) {
        console.error(`     ❌ Error: ${err.message}`);
      }
    }
  }

  console.log('\n✨ Ingestion completed.');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { uploadFileToSupabase, upsertChapterToDatabase, findMangaDirs };
