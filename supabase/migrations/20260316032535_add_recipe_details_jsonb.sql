-- Add JSONB columns for Recipe Detail extended information
ALTER TABLE recipes
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS nutrition jsonb,
  ADD COLUMN IF NOT EXISTS ingredients jsonb,
  ADD COLUMN IF NOT EXISTS steps jsonb;
