
import { supabase } from '@/integrations/supabase/client';

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
