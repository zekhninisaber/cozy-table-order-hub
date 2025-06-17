
import { categories, menuItems, builderSteps, builderOptions } from '@/data/menuSeed';
import type { Category, MenuItem, BuilderStep, BuilderOption } from '@/data/menuSeed';

const STORAGE_KEYS = {
  CATEGORIES: 'takeabowl_categories',
  MENU_ITEMS: 'takeabowl_menu_items',
  BUILDER_STEPS: 'takeabowl_builder_steps',
  BUILDER_OPTIONS: 'takeabowl_builder_options',
  INITIALIZED: 'takeabowl_db_initialized'
};

function upsertArray<T extends { id: number }>(storageKey: string, seedData: T[]): void {
  const existingData = localStorage.getItem(storageKey);
  const currentData: T[] = existingData ? JSON.parse(existingData) : [];
  
  // Create a map of existing items by ID for quick lookup
  const existingMap = new Map(currentData.map(item => [item.id, item]));
  
  // Upsert each seed item - only add if it doesn't exist
  const updatedData = [...currentData];
  
  seedData.forEach(seedItem => {
    if (!existingMap.has(seedItem.id)) {
      updatedData.push(seedItem);
      console.log(`Added new ${storageKey} item with ID: ${seedItem.id}`);
    }
  });
  
  // Save the updated data
  localStorage.setItem(storageKey, JSON.stringify(updatedData));
}

export async function importMissingMenuItems(): Promise<void> {
  return new Promise((resolve) => {
    console.log('Importing missing menu items from seed data...');
    
    // Upsert all seed data into localStorage
    upsertArray(STORAGE_KEYS.CATEGORIES, categories);
    upsertArray(STORAGE_KEYS.MENU_ITEMS, menuItems);
    upsertArray(STORAGE_KEYS.BUILDER_STEPS, builderSteps);
    upsertArray(STORAGE_KEYS.BUILDER_OPTIONS, builderOptions);
    
    // Mark as initialized
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    
    console.log('Menu import complete - all missing items added');
    resolve();
  });
}

// Auto-import on module load to ensure admin has all customer menu items
importMissingMenuItems();

export default importMissingMenuItems;
