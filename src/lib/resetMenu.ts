
import { categories, menuItems, builderSteps, builderOptions } from '@/data/menuSeed';

const STORAGE_KEYS = {
  CATEGORIES: 'takeabowl_categories',
  MENU_ITEMS: 'takeabowl_menu_items',
  BUILDER_STEPS: 'takeabowl_builder_steps',
  BUILDER_OPTIONS: 'takeabowl_builder_options',
  INITIALIZED: 'takeabowl_db_initialized'
};

export function resetMenu(): Promise<void> {
  return new Promise((resolve) => {
    // Clear all existing data
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.MENU_ITEMS);
    localStorage.removeItem(STORAGE_KEYS.BUILDER_STEPS);
    localStorage.removeItem(STORAGE_KEYS.BUILDER_OPTIONS);
    localStorage.removeItem(STORAGE_KEYS.INITIALIZED);
    
    // Re-seed with fresh data from menuSeed.ts
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(menuItems));
    localStorage.setItem(STORAGE_KEYS.BUILDER_STEPS, JSON.stringify(builderSteps));
    localStorage.setItem(STORAGE_KEYS.BUILDER_OPTIONS, JSON.stringify(builderOptions));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    
    console.log('Menu reset completed - all data re-seeded from menuSeed.ts');
    resolve();
  });
}
