
import { categories as seedCategories, menuItems as seedMenuItems, builderSteps as seedBuilderSteps, builderOptions as seedBuilderOptions } from '@/data/menuSeed';
import type { Category, MenuItem, BuilderStep, BuilderOption } from '@/data/menuSeed';

const STORAGE_KEYS = {
  CATEGORIES: 'takeabowl_categories',
  MENU_ITEMS: 'takeabowl_menu_items',
  BUILDER_STEPS: 'takeabowl_builder_steps',
  BUILDER_OPTIONS: 'takeabowl_builder_options',
  INITIALIZED: 'takeabowl_db_initialized'
};

// Initialize database with seed data if not already done
export function initializeDatabase() {
  const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);
  
  if (!isInitialized) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(seedCategories));
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(seedMenuItems));
    localStorage.setItem(STORAGE_KEYS.BUILDER_STEPS, JSON.stringify(seedBuilderSteps));
    localStorage.setItem(STORAGE_KEYS.BUILDER_OPTIONS, JSON.stringify(seedBuilderOptions));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    console.log('Database initialized with seed data');
  }
}

// Categories
export function getCategories(): Category[] {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : [];
}

export function updateCategory(id: number, updates: Partial<Category>): void {
  const categories = getCategories();
  const index = categories.findIndex(cat => cat.id === id);
  if (index !== -1) {
    categories[index] = { ...categories[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }
}

export function createCategory(category: Omit<Category, 'id'>): Category {
  const categories = getCategories();
  const newId = Math.max(...categories.map(c => c.id), 0) + 1;
  const newCategory = { ...category, id: newId };
  categories.push(newCategory);
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  return newCategory;
}

// Menu Items
export function getMenuItems(categoryId?: number): MenuItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  const items = data ? JSON.parse(data) : [];
  return categoryId ? items.filter((item: MenuItem) => item.category_id === categoryId) : items;
}

export function updateMenuItem(id: number, updates: Partial<MenuItem>): void {
  const items = getMenuItems();
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  }
}

export function createMenuItem(item: Omit<MenuItem, 'id'>): MenuItem {
  const items = getMenuItems();
  const newId = Math.max(...items.map(i => i.id), 0) + 1;
  const newItem = { ...item, id: newId };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
  return newItem;
}

// Builder Steps
export function getBuilderSteps(): BuilderStep[] {
  const data = localStorage.getItem(STORAGE_KEYS.BUILDER_STEPS);
  return data ? JSON.parse(data) : [];
}

export function getBuilderOptions(stepId?: number): BuilderOption[] {
  const data = localStorage.getItem(STORAGE_KEYS.BUILDER_OPTIONS);
  const options = data ? JSON.parse(data) : [];
  return stepId ? options.filter((option: BuilderOption) => option.step_id === stepId) : options;
}

// Initialize on module load
initializeDatabase();
