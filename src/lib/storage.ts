
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

export async function uploadCategoryThumbnail(file: File, categoryId: number): Promise<string | null> {
  try {
    // Create a unique filename with timestamp and category ID
    const fileExt = file.name.split('.').pop();
    const fileName = `category-${categoryId}-${Date.now()}.${fileExt}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('menu-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading category thumbnail:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('menu-photos')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadCategoryThumbnail:', error);
    return null;
  }
}

export async function deleteImageFromUrl(imageUrl: string): Promise<void> {
  try {
    if (!imageUrl) return;
    
    // Extract filename from Supabase Storage URL
    // URL format: https://project.supabase.co/storage/v1/object/public/bucket/filename
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    if (!fileName) {
      console.warn('Could not extract filename from URL:', imageUrl);
      return;
    }
    
    const { error } = await supabase.storage
      .from('menu-photos')
      .remove([fileName]);
    
    if (error) {
      console.error('Error deleting image:', error);
    } else {
      console.log('Successfully deleted image:', fileName);
    }
  } catch (error) {
    console.error('Error in deleteImageFromUrl:', error);
  }
}

export async function deleteMenuItemPhoto(photoUrl: string): Promise<void> {
  await deleteImageFromUrl(photoUrl);
}

export async function deleteCategoryThumbnail(thumbnailUrl: string): Promise<void> {
  await deleteImageFromUrl(thumbnailUrl);
}
