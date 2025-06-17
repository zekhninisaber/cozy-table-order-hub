
import { supabase } from '@/integrations/supabase/client';
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

export async function updateSupabaseMenuItem(id: number, updates: Partial<MenuItem>): Promise<void> {
  const { error } = await supabase
    .from('menu_items')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating menu item:', error);
  }
}
