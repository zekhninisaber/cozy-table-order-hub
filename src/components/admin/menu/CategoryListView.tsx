
import { Card, CardContent } from '@/components/ui/card';
import { CategoryList } from './CategoryList';
import { CategoryDialog } from './CategoryDialog';
import { useCategories } from '@/hooks/useMenu';
import { createSupabaseCategory } from '@/lib/supabase-database';
import type { Category } from '@/data/menuSeed';

interface CategoryListViewProps {
  canEdit: boolean;
  onSelectCategory: (category: Category) => void;
}

export function CategoryListView({ canEdit, onSelectCategory }: CategoryListViewProps) {
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

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-display font-bold text-primary">
              Gestion du Menu
            </h1>
            {canEdit && (
              <CategoryDialog
                categories={categories}
                onCreateCategory={handleCreateCategory}
              />
            )}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md border-0">
            <CardContent className="p-0">
              <CategoryList
                categories={categories}
                canEdit={canEdit}
                onSelectCategory={onSelectCategory}
                onToggleVisibility={toggleVisibility}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
