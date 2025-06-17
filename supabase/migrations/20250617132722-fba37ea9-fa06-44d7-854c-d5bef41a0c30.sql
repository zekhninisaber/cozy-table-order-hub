
-- Create storage bucket for menu item photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-photos', 'menu-photos', true);

-- Create policy to allow public read access to menu photos
CREATE POLICY "Public read access for menu photos" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'menu-photos');

-- Create policy to allow authenticated users to upload menu photos
CREATE POLICY "Authenticated users can upload menu photos" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'menu-photos');

-- Create policy to allow authenticated users to update menu photos
CREATE POLICY "Authenticated users can update menu photos" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'menu-photos');

-- Create policy to allow authenticated users to delete menu photos
CREATE POLICY "Authenticated users can delete menu photos" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'menu-photos');
