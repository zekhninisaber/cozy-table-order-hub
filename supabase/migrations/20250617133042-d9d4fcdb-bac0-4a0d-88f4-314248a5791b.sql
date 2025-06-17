
-- Drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can upload menu photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update menu photos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete menu photos" ON storage.objects;

-- Create more permissive policies that allow public access for menu photos
CREATE POLICY "Anyone can upload menu photos" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'menu-photos');

CREATE POLICY "Anyone can update menu photos" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'menu-photos');

CREATE POLICY "Anyone can delete menu photos" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'menu-photos');
