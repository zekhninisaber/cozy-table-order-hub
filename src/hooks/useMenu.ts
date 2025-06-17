import { useState, useEffect } from 'react';
import { getCategories, getMenuItems, getBuilderSteps, getBuilderOptions, updateCategory, updateMenuItem } from '@/lib/database';
import type { Category, MenuItem, BuilderStep, BuilderOption } from '@/data/menuSeed';

// Custom event for localStorage changes
const STORAGE_CHANGE_EVENT = 'takeabowl_storage_change';

// Helper function to trigger storage change events
function triggerStorageChange() {
  window.dispatchEvent(new CustomEvent(STORAGE_CHANGE_EVENT));
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    setLoading(true);
    const data = getCategories();
    setCategories(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();

    // Listen for storage changes
    const handleStorageChange = () => {
      fetchCategories();
    };

    window.addEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const toggleVisibility = (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      updateCategory(id, { visible: !category.visible });
      triggerStorageChange();
    }
  };

  return {
    categories,
    loading,
    refetch: fetchCategories,
    toggleVisibility
  };
}

export function useMenuItems(categoryId?: number) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = () => {
    setLoading(true);
    const data = getMenuItems(categoryId);
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();

    // Listen for storage changes
    const handleStorageChange = () => {
      fetchItems();
    };

    window.addEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(STORAGE_CHANGE_EVENT, handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [categoryId]);

  const toggleStock = (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      updateMenuItem(id, { out_of_stock: !item.out_of_stock });
      triggerStorageChange();
    }
  };

  return {
    items,
    loading,
    refetch: fetchItems,
    toggleStock
  };
}

export function useBuilderSteps() {
  const [steps, setSteps] = useState<BuilderStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = getBuilderSteps();
    setSteps(data);
    setLoading(false);
  }, []);

  return { steps, loading };
}

export function useBuilderOptions(stepId?: number) {
  const [options, setOptions] = useState<BuilderOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const data = getBuilderOptions(stepId);
    setOptions(data);
    setLoading(false);
  }, [stepId]);

  return { options, loading };
}
