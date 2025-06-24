import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ItemList } from './ItemList';
import { ItemDialog } from './ItemDialog';
import { useMenuItems } from '@/hooks/useMenu';
import { createSupabaseMenuItem, updateSupabaseMenuItem } from '@/lib/supabase';
import { supabase } from '@/integrations/supabase/client';
import type { Category, MenuItem } from '@/data/menuSeed';

interface CategoryViewProps {
  category: Category;
  canEdit: boolean;
  onBack: () => void;
}

export function CategoryView({ category, canEdit, onBack }: CategoryViewProps) {
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  const { items: categoryItems, toggleStock, refetch: refetchItems } = useMenuItems(category.id);

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowItemDialog(true);
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      // Use the new delete function that handles photo cleanup
      const { deleteSupabaseMenuItem } = await import('@/lib/supabase');
      await deleteSupabaseMenuItem(itemId);
      
      // Refresh the items list
      refetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleReorderItems = async (reorderedItems: MenuItem[]) => {
    // Update all items with new sort order
    for (const item of reorderedItems) {
      await updateSupabaseMenuItem(item.id, { sort: item.sort });
    }
    
    // Refresh the items list
    refetchItems();
  };

  const handleSaveItem = async (itemData: {
    name: string;
    description: string;
    price: string;
    photo: File | null;
    tags: string;
  }) => {
    if (!itemData.name.trim()) return;
    
    const newItemData = {
      category_id: category.id,
      names: {
        fr: itemData.name,
        en: itemData.name, // Would be translated via API
        nl: itemData.name  // Would be translated via API
      },
      descriptions: {
        fr: itemData.description,
        en: itemData.description, // Would be translated via API
        nl: itemData.description  // Would be translated via API
      },
      price: parseFloat(itemData.price) || 0,
      out_of_stock: editingItem?.out_of_stock || false,
      tags: itemData.tags.split(',').map(t => t.trim()).filter(Boolean),
      sort: editingItem?.sort || categoryItems.length + 1
    };
    
    if (editingItem) {
      // Update existing item using the new photo handling function
      const { updateSupabaseMenuItemWithPhoto } = await import('@/lib/supabase');
      await updateSupabaseMenuItemWithPhoto(editingItem.id, newItemData, itemData.photo);
    } else {
      // Create new item using the existing photo handling function
      const { createSupabaseMenuItemWithPhoto } = await import('@/lib/supabase');
      await createSupabaseMenuItemWithPhoto(newItemData, itemData.photo);
    }
    
    setShowItemDialog(false);
    setEditingItem(null);
    refetchItems();
  };

  // Check if this is a builder category (we don't want reordering for builder categories)
  const isBuilderCategory = category.names.fr.toLowerCase().includes('poke') && 
                           category.names.fr.toLowerCase().includes('your own');

  return (
    <div className="flex flex-col h-full w-full overflow-x-hidden">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-4 sm:p-6 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Retour aux catégories</span>
              <span className="sm:hidden">Retour</span>
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-primary pl-14 sm:pl-0 truncate">
              {category.names.fr}
            </h1>
            {canEdit && (
              <Button 
                onClick={() => {
                  setEditingItem(null);
                  setShowItemDialog(true);
                }}
                className="bg-accent hover:bg-accent/90 shrink-0"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Nouveau plat</span>
                <span className="sm:hidden">Nouveau</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-0 sm:p-6 w-full">
        <div className="max-w-6xl mx-auto w-full">
          <Card className="shadow-md border-0 w-full">
            <CardContent className="p-0 w-full">
              <ItemList
                items={categoryItems}
                canEdit={canEdit}
                onEditItem={handleEditItem}
                onDeleteItem={canEdit ? handleDeleteItem : undefined}
                onToggleStock={toggleStock}
                onReorderItems={!isBuilderCategory ? handleReorderItems : undefined}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <ItemDialog
        open={showItemDialog}
        onOpenChange={setShowItemDialog}
        editingItem={editingItem}
        onSaveItem={handleSaveItem}
      />
    </div>
  );
}
