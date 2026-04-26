INSERT INTO storage.buckets (id, name, public) 
VALUES ('recipes', 'recipes', true)
ON CONFLICT (id) DO NOTHING;

-- Allows public to view files
CREATE POLICY "Anyone can view recipes bucket" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'recipes');

-- Allows public to insert files
CREATE POLICY "Anyone can upload to recipes bucket" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'recipes');

-- Allows public to update files
CREATE POLICY "Anyone can update recipes bucket" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'recipes');

-- Allows public to delete files
CREATE POLICY "Anyone can delete recipes bucket" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'recipes');
