
import { supabase } from '@/integrations/supabase/client';
import type { Category } from '@/data/menuSeed';
import { castToMultilingual, type SupabaseCategory } from './types';

export async function getSupabaseCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return (data || []).map((row: SupabaseCategory): Category => ({
    id: row.id,
    names: castToMultilingual(row.names),
    sort: row.sort,
    visible: row.visible,
    thumbnail_url: row.thumbnail_url || undefined
  }));
}

export async function createSupabaseCategory(category: Omit<Category, 'id'>): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .insert([category])
    .select()
    .single();
  
  if (error) {
    console.error('Error creating category:', error);
    return null;
  }
  
  return {
    id: data.id,
    names: castToMultilingual(data.names),
    sort: data.sort,
    visible: data.visible,
    thumbnail_url: data.thumbnail_url || undefined
  };
}

export async function updateSupabaseCategory(id: number, updates: Partial<Category>): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id);
  
  if (error) {
    console.error('Error updating category:', error);
  }
}
