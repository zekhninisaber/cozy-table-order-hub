
import { supabase } from '@/integrations/supabase/client';
import { uploadMenuItemPhoto, deleteMenuItemPhoto } from '@/lib/storage';
import type { MenuItem } from '@/data/menuSeed';
import { castToMultilingual, type SupabaseMenuItem } from './types';

export async function getSupabaseMenuItems(categoryId?: number): Promise<MenuItem[]> {
  let query = supabase
    .from('menu_items')
    .select('*')
    .order('sort', { ascending: true });
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  
  return (data || []).map((row: SupabaseMenuItem): MenuItem => ({
    id: row.id,
    category_id: row.category_id || 0,
    names: castToMultilingual(row.names),
    descriptions: castToMultilingual(row.descriptions),
    price: Number(row.price),
    photo_url: row.photo_url || undefined,
    out_of_stock: row.out_of_stock,
    tags: row.tags || [],
    sort: row.sort || 0
  }));
}

export async function createSupabaseMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> {
  const { data, error } = await supabase
    .from('menu_items')
    .insert([item])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating menu item:', error);
    return null;
  }
  
  return {
    id: data.id,
    category_id: data.category_id || 0,
    names: castToMultilingual(data.names),
    descriptions: castToMultilingual(data.descriptions),
    price: Number(data.price),
    photo_url: data.photo_url || undefined,
    out_of_stock: data.out_of_stock,
    tags: data.tags || [],
    sort: data.sort || 0
  };
}

export async function createSupabaseMenuItemWithPhoto(
  item: Omit<MenuItem, 'id' | 'photo_url'>, 
  photo: File | null
): Promise<MenuItem | null> {
  // First create the menu item without photo
  const newItem = await createSupabaseMenuItem({ ...item, photo_url: undefined });
  
  if (newItem && photo) {
    // Upload photo and update item with URL
    const photoUrl = await uploadMenuItemPhoto(photo, newItem.id);
    if (photoUrl) {
      await updateSupabaseMenuItem(newItem.id, { photo_url: photoUrl });
      newItem.photo_url = photoUrl;
    }
  }
  
  return newItem;
}

export async function updateSupabaseMenuItem(id: number, updates: Partial<MenuItem>): Promise<void> {
  const { error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating menu item:', error);
  }
}

export async function updateSupabaseMenuItemWithPhoto(
  id: number, 
  updates: Partial<MenuItem>, 
  photo: File | null
): Promise<void> {
  // Get current item data to access existing photo URL
  if (photo) {
    const { data: currentItem } = await supabase
      .from('menu_items')
      .select('photo_url')
      .eq('id', id)
      .single();
    
    // Delete old photo if it exists
    if (currentItem?.photo_url) {
      await deleteMenuItemPhoto(currentItem.photo_url);
    }
    
    // Upload new photo
    const photoUrl = await uploadMenuItemPhoto(photo, id);
    if (photoUrl) {
      updates.photo_url = photoUrl;
    }
  }
  
  // Update the item with all changes
  await updateSupabaseMenuItem(id, updates);
}

export async function deleteSupabaseMenuItem(id: number): Promise<void> {
  try {
    // Get the item to delete its photo
    const { data: item } = await supabase
      .from('menu_items')
      .select('photo_url')
      .eq('id', id)
      .single();
    
    // Delete the photo if it exists
    if (item?.photo_url) {
      await deleteMenuItemPhoto(item.photo_url);
    }
    
    // Delete the item from database
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting menu item:', error);
    }
  } catch (error) {
    console.error('Error in deleteSupabaseMenuItem:', error);
  }
}
