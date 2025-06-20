
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryList } from './CategoryList';
import { CategoryDialog } from './CategoryDialog';
import { useCategories } from '@/hooks/useMenu';
import { createSupabaseCategory, updateSupabaseCategory } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import type { Category } from '@/data/menuSeed';

interface CategoryListViewProps {
  canEdit: boolean;
  onSelectCategory: (category: Category) => void;
}

export function CategoryListView({ canEdit, onSelectCategory }: CategoryListViewProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const { categories, toggleVisibility, refetch: refetchCategories } = useCategories();

  const handleCreateCategory = async (name: string, thumbnail: File | null) => {
    const newCat = await createSupabaseCategory({
      names: { 
        fr: name,
        en: name, // Would be translated via API
        nl: name  // Would be translated via API
      },
      sort: categories.length + 1,
      visible: true,
      thumbnail_url: thumbnail ? URL.createObjectURL(thumbnail) : undefined
    });
    
    if (newCat) {
      refetchCategories();
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setShowCategoryDialog(true);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      // First delete all menu items in this category
      const { error: itemsError } = await supabase
        .from('menu_items')
        .delete()
        .eq('category_id', categoryId);
      
      if (itemsError) {
        console.error('Error deleting menu items:', itemsError);
        return;
      }

      // Then delete the category
      const { error: categoryError } = await supabase
        .from('categories')
        .delete()
        .eq('id', categoryId);
      
      if (categoryError) {
        console.error('Error deleting category:', categoryError);
        return;
      }
      
      // Refresh the categories list
      refetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleReorderCategories = async (reorderedCategories: Category[]) => {
    // Update all categories with new sort order
    for (const category of reorderedCategories) {
      await updateSupabaseCategory(category.id, { sort: category.sort });
    }
    
    // Refresh the categories list
    refetchCategories();
  };

  const handleSaveCategory = async (name: string, thumbnail: File | null) => {
    if (editingCategory) {
      // Update existing category
      await updateSupabaseCategory(editingCategory.id, {
        names: { 
          fr: name,
          en: name, // Would be translated via API
          nl: name  // Would be translated via API
        }
      });
      
      // Handle thumbnail upload if provided
      if (thumbnail) {
        // In a real app, you would upload the thumbnail to storage
        const thumbnailUrl = URL.createObjectURL(thumbnail);
        await updateSupabaseCategory(editingCategory.id, { thumbnail_url: thumbnailUrl });
      }
      
      setEditingCategory(null);
    } else {
      // Create new category
      await handleCreateCategory(name, thumbnail);
    }
    
    setShowCategoryDialog(false);
    refetchCategories();
  };

  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-4 sm:p-6 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-primary pl-14 sm:pl-0">
              Gestion du Menu
            </h1>
            {canEdit && (
              <CategoryDialog
                categories={categories}
                onCreateCategory={handleSaveCategory}
                editingCategory={editingCategory}
                open={showCategoryDialog}
                onOpenChange={setShowCategoryDialog}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-4 sm:p-6 w-full">
        <div className="max-w-4xl mx-auto w-full">
          <Card className="shadow-md border-0 w-full">
            <CardContent className="p-0 w-full">
              <CategoryList
                categories={categories}
                canEdit={canEdit}
                onSelectCategory={onSelectCategory}
                onToggleVisibility={toggleVisibility}
                onReorderCategories={handleReorderCategories}
                onEditCategory={canEdit ? handleEditCategory : undefined}
                onDeleteCategory={canEdit ? handleDeleteCategory : undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
