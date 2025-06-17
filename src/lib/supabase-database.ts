
import { supabase } from '@/integrations/supabase/client';
import type { Category, MenuItem, BuilderStep, BuilderOption } from '@/data/menuSeed';

// Categories
export async function getSupabaseCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  
  return data || [];
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
  
  return data;
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

// Menu Items
export async function getSupabaseMenuItems(categoryId?: number): Promise<MenuItem[]> {
  let query = supabase
    .from('menu_items')
    .select('*');
  
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
  
  return data || [];
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
  
  return data;
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

// Builder Steps
export async function getSupabaseBuilderSteps(): Promise<BuilderStep[]> {
  const { data, error } = await supabase
    .from('builder_steps')
    .select('*')
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching builder steps:', error);
    return [];
  }
  
  return data || [];
}

// Builder Options
export async function getSupabaseBuilderOptions(stepId?: number): Promise<BuilderOption[]> {
  let query = supabase
    .from('builder_options')
    .select('*');
  
  if (stepId) {
    query = query.eq('step_id', stepId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching builder options:', error);
    return [];
  }
  
  return data || [];
}

// Migration function to copy localStorage data to Supabase
export async function migrateLocalStorageToSupabase(): Promise<void> {
  console.log('Starting migration from localStorage to Supabase...');
  
  // Get data from localStorage
  const categoriesData = localStorage.getItem('takeabowl_categories');
  const menuItemsData = localStorage.getItem('takeabowl_menu_items');
  const builderStepsData = localStorage.getItem('takeabowl_builder_steps');
  const builderOptionsData = localStorage.getItem('takeabowl_builder_options');
  
  try {
    // Migrate categories
    if (categoriesData) {
      const categories = JSON.parse(categoriesData);
      for (const category of categories) {
        const { id, ...categoryData } = category;
        await supabase
          .from('categories')
          .upsert({ id, ...categoryData });
      }
      console.log('Categories migrated successfully');
    }
    
    // Migrate menu items
    if (menuItemsData) {
      const menuItems = JSON.parse(menuItemsData);
      for (const item of menuItems) {
        const { id, ...itemData } = item;
        await supabase
          .from('menu_items')
          .upsert({ id, ...itemData });
      }
      console.log('Menu items migrated successfully');
    }
    
    // Migrate builder steps
    if (builderStepsData) {
      const builderSteps = JSON.parse(builderStepsData);
      for (const step of builderSteps) {
        const { id, ...stepData } = step;
        await supabase
          .from('builder_steps')
          .upsert({ id, ...stepData });
      }
      console.log('Builder steps migrated successfully');
    }
    
    // Migrate builder options
    if (builderOptionsData) {
      const builderOptions = JSON.parse(builderOptionsData);
      for (const option of builderOptions) {
        const { id, ...optionData } = option;
        await supabase
          .from('builder_options')
          .upsert({ id, ...optionData });
      }
      console.log('Builder options migrated successfully');
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}
