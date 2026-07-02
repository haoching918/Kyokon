-- Auth + RLS foundation for multi-user data isolation (ADR-001, issue #1).
--
-- 1. recipes: add user_id / is_public, backfill existing rows as public showcase
-- 2. recipes: enable RLS with owner-scoped policies (public rows readable by all)
-- 3. profiles: mirror of auth.users with auto-insert trigger on signup
--
-- NOTE: user_id stays NULLABLE, deviating from the original spec. The live DB
-- already holds showcase recipes and auth has no users yet, so SET NOT NULL
-- would fail on push. NULL-owner rows are safe under RLS: auth.uid() = user_id
-- is never true when user_id IS NULL, so nobody can update/delete/insert them
-- through the API — they are read-only showcase content. A follow-up migration
-- can add the NOT NULL constraint once showcase rows are assigned an owner.

-- ---------------------------------------------------------------------------
-- 1. recipes: ownership + visibility columns
-- ---------------------------------------------------------------------------

ALTER TABLE public.recipes
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS is_public boolean NOT NULL DEFAULT false;

-- Pre-existing rows (created before auth existed) become public showcase content.
UPDATE public.recipes SET is_public = true WHERE user_id IS NULL;

CREATE INDEX IF NOT EXISTS recipes_user_id_idx ON public.recipes (user_id);

-- ---------------------------------------------------------------------------
-- 2. recipes: row-level security
-- ---------------------------------------------------------------------------

-- Drop the legacy permissive policies from the pre-auth era.
DROP POLICY IF EXISTS "Enable read access for all users" ON public.recipes;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.recipes;
DROP POLICY IF EXISTS "Enable update for anon users" ON public.recipes;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.recipes;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.recipes;

ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_policy" ON public.recipes FOR SELECT
  USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "insert_policy" ON public.recipes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_policy" ON public.recipes FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "delete_policy" ON public.recipes FOR DELETE
  USING (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- 3. profiles: public user metadata mirrored from auth.users
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.profiles (
  id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username   text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select" ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- Auto-create a profile row on signup. SECURITY DEFINER: the trigger fires as
-- supabase_auth_admin, which has no INSERT grant on public.profiles.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
