
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ItemList } from './ItemList';
import { ItemDialog } from './ItemDialog';
import { useMenuItems } from '@/hooks/useMenu';
import { createSupabaseMenuItem, updateSupabaseMenuItem } from '@/lib/supabase';
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
    
    let photoUrl = editingItem?.photo_url;
    
    if (editingItem) {
      // Update existing item
      await updateSupabaseMenuItem(editingItem.id, newItemData);
      
      // Handle photo upload for existing item
      if (itemData.photo) {
        const { uploadMenuItemPhoto } = await import('@/lib/storage');
        const uploadedUrl = await uploadMenuItemPhoto(itemData.photo, editingItem.id);
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
          await updateSupabaseMenuItem(editingItem.id, { photo_url: photoUrl });
        }
      }
    } else {
      // Create new item
      const createdItem = await createSupabaseMenuItem(newItemData);
      
      // Handle photo upload for new item
      if (createdItem && itemData.photo) {
        const { uploadMenuItemPhoto } = await import('@/lib/storage');
        const uploadedUrl = await uploadMenuItemPhoto(itemData.photo, createdItem.id);
        if (uploadedUrl) {
          await updateSupabaseMenuItem(createdItem.id, { photo_url: uploadedUrl });
        }
      }
    }
    
    setShowItemDialog(false);
    setEditingItem(null);
    refetchItems();
  };

  // Check if this is a builder category (we don't want reordering for builder categories)
  const isBuilderCategory = category.names.fr.toLowerCase().includes('poke') && 
                           category.names.fr.toLowerCase().includes('your own');

  return (
    <div className="flex flex-col h-full">
      {/* Fixed Header */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour aux catégories
            </Button>
            <h1 className="text-3xl font-display font-bold text-primary">
              {category.names.fr}
            </h1>
            {canEdit && (
              <Button 
                onClick={() => {
                  setEditingItem(null);
                  setShowItemDialog(true);
                }}
                className="bg-accent hover:bg-accent/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Nouveau plat
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-6xl mx-auto">
          <Card className="shadow-md border-0">
            <CardContent className="p-0">
              <ItemList
                items={categoryItems}
                canEdit={canEdit}
                onEditItem={handleEditItem}
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
