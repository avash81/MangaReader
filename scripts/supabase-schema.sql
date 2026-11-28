-- =========================================================================
-- MangaVerse Supabase Storage & Database Initialization Script
-- Run this directly in Supabase Dashboard -> SQL Editor -> Click "Run"
-- =========================================================================

-- 1. Create the 'manga-pdfs' public storage bucket if not already present
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('manga-pdfs', 'manga-pdfs', true, 52428800, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. Storage Policies for 'manga-pdfs' bucket
-- Allow public viewing and downloading of manga PDFs
DROP POLICY IF EXISTS "Public PDF Access" ON storage.objects;
CREATE POLICY "Public PDF Access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'manga-pdfs');

-- Allow uploading manga PDFs (with anon or authenticated role)
DROP POLICY IF EXISTS "Public PDF Upload" ON storage.objects;
CREATE POLICY "Public PDF Upload"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'manga-pdfs');

-- Allow updating manga PDFs
DROP POLICY IF EXISTS "Public PDF Update" ON storage.objects;
CREATE POLICY "Public PDF Update"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'manga-pdfs');

-- 3. Create 'manga_chapters' table for database chapter catalog & direct PDF links
CREATE TABLE IF NOT EXISTS public.manga_chapters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  manga_id TEXT NOT NULL,
  chapter_number NUMERIC NOT NULL,
  title TEXT,
  pdf_url TEXT NOT NULL,
  total_pages INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT unique_manga_chapter UNIQUE (manga_id, chapter_number)
);

-- Enable Row Level Security (RLS) on manga_chapters
ALTER TABLE public.manga_chapters ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies for manga_chapters table
-- Allow anyone to read chapter listings
DROP POLICY IF EXISTS "Allow Public Read Manga Chapters" ON public.manga_chapters;
CREATE POLICY "Allow Public Read Manga Chapters"
  ON public.manga_chapters FOR SELECT
  USING (true);

-- Allow inserting chapters from frontend or upload script
DROP POLICY IF EXISTS "Allow Public Insert Manga Chapters" ON public.manga_chapters;
CREATE POLICY "Allow Public Insert Manga Chapters"
  ON public.manga_chapters FOR INSERT
  WITH CHECK (true);

-- Allow updating chapters
DROP POLICY IF EXISTS "Allow Public Update Manga Chapters" ON public.manga_chapters;
CREATE POLICY "Allow Public Update Manga Chapters"
  ON public.manga_chapters FOR UPDATE
  USING (true);

-- Create fast lookup index
CREATE INDEX IF NOT EXISTS idx_manga_chapters_lookup ON public.manga_chapters (manga_id, chapter_number);
