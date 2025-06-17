
import { useState, useEffect } from 'react';
import { 
  getSupabaseCategories, 
  getSupabaseMenuItems, 
  getSupabaseBuilderSteps, 
  getSupabaseBuilderOptions,
  updateSupabaseCategory,
  updateSupabaseMenuItem,
  migrateLocalStorageToSupabase
} from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import type { Category, MenuItem, BuilderStep, BuilderOption } from '@/data/menuSeed';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await getSupabaseCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Run migration on first load
    const runMigration = async () => {
      const migrated = localStorage.getItem('takeabowl_migrated_to_supabase');
      if (!migrated) {
        await migrateLocalStorageToSupabase();
        localStorage.setItem('takeabowl_migrated_to_supabase', 'true');
      }
      await fetchCategories();
    };

    runMigration();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('categories_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'categories' },
        () => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleVisibility = async (id: number) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      await updateSupabaseCategory(id, { visible: !category.visible });
      await fetchCategories();
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

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await getSupabaseMenuItems(categoryId);
      setItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('menu_items_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'menu_items' },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [categoryId]);

  const toggleStock = async (id: number) => {
    const item = items.find(i => i.id === id);
    if (item) {
      await updateSupabaseMenuItem(id, { out_of_stock: !item.out_of_stock });
      await fetchItems();
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
    const fetchSteps = async () => {
      setLoading(true);
      try {
        const data = await getSupabaseBuilderSteps();
        setSteps(data);
      } catch (error) {
        console.error('Error fetching builder steps:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSteps();
  }, []);

  return { steps, loading };
}

export function useBuilderOptions(stepId?: number) {
  const [options, setOptions] = useState<BuilderOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const data = await getSupabaseBuilderOptions(stepId);
        setOptions(data);
      } catch (error) {
        console.error('Error fetching builder options:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [stepId]);

  return { options, loading };
}
