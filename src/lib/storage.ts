
import { supabase } from '@/integrations/supabase/client';

export async function uploadMenuItemPhoto(file: File, itemId: number): Promise<string | null> {
  try {
    // Create a unique filename with timestamp and item ID
    const fileExt = file.name.split('.').pop();
    const fileName = `menu-item-${itemId}-${Date.now()}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('menu-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('menu-photos')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadMenuItemPhoto:', error);
    return null;
  }
}

export async function deleteMenuItemPhoto(photoUrl: string): Promise<void> {
  try {
    // Extract filename from URL
    const fileName = photoUrl.split('/').pop();
    if (!fileName) return;
    
    await supabase.storage
      .from('menu-photos')
      .remove([fileName]);
  } catch (error) {
    console.error('Error deleting photo:', error);
  }
}
