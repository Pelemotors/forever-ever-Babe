-- Supabase Database Setup for Birthday Site (Fixed Version)
-- Run this in Supabase SQL Editor

-- 1. Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can create greetings" ON greetings;
DROP POLICY IF EXISTS "Anyone can view approved greetings" ON greetings;
DROP POLICY IF EXISTS "Admin can view all greetings" ON greetings;
DROP POLICY IF EXISTS "Admin can update greetings" ON greetings;
DROP POLICY IF EXISTS "Admin can delete greetings" ON greetings;

DROP POLICY IF EXISTS "Anyone can view media" ON media;
DROP POLICY IF EXISTS "Admin can create media" ON media;
DROP POLICY IF EXISTS "Admin can update media" ON media;
DROP POLICY IF EXISTS "Admin can delete media" ON media;

DROP POLICY IF EXISTS "Public read access" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload files" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update files" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete files" ON storage.objects;

-- 2. Create greetings table (if not exists)
CREATE TABLE IF NOT EXISTS greetings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT,
  content TEXT NOT NULL,
  post_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT
);

-- 3. Create media table (if not exists)
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  greeting_id UUID REFERENCES greetings(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_by TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_greetings_status ON greetings(status);
CREATE INDEX IF NOT EXISTS idx_greetings_created_at ON greetings(created_at);
CREATE INDEX IF NOT EXISTS idx_media_greeting_id ON media(greeting_id);

-- 5. Enable Row Level Security
ALTER TABLE greetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- 6. Create admin function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if current user email is in admin list
  RETURN auth.jwt() ->> 'email' IN ('gal@admin.com');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. RLS Policies for greetings
-- Anyone can insert (create) greetings
CREATE POLICY "Anyone can create greetings" ON greetings
  FOR INSERT WITH CHECK (true);

-- Only approved greetings are visible to everyone
CREATE POLICY "Anyone can view approved greetings" ON greetings
  FOR SELECT USING (status = 'approved');

-- Admin can view all greetings (including pending/rejected)
CREATE POLICY "Admin can view all greetings" ON greetings
  FOR SELECT USING (is_admin());

-- Admin can update greetings (approve/reject)
CREATE POLICY "Admin can update greetings" ON greetings
  FOR UPDATE USING (is_admin());

-- Admin can delete greetings
CREATE POLICY "Admin can delete greetings" ON greetings
  FOR DELETE USING (is_admin());

-- 8. RLS Policies for media
-- Anyone can view media (public access)
CREATE POLICY "Anyone can view media" ON media
  FOR SELECT USING (true);

-- Admin can insert media
CREATE POLICY "Admin can create media" ON media
  FOR INSERT WITH CHECK (is_admin());

-- Admin can update media
CREATE POLICY "Admin can update media" ON media
  FOR UPDATE USING (is_admin());

-- Admin can delete media
CREATE POLICY "Admin can delete media" ON media
  FOR DELETE USING (is_admin());

-- 9. Storage policies (run these after creating the bucket)
-- Allow public read access
CREATE POLICY "Public read access" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

-- Allow admin to upload files
CREATE POLICY "Admin can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'uploads' AND is_admin()
  );

-- Allow admin to update files
CREATE POLICY "Admin can update files" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'uploads' AND is_admin()
  );

-- Allow admin to delete files
CREATE POLICY "Admin can delete files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'uploads' AND is_admin()
  );
