
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryList } from '@/components/admin/menu/CategoryList';
import { ItemList } from '@/components/admin/menu/ItemList';
import { CategoryDialog } from '@/components/admin/menu/CategoryDialog';
import { ItemDialog } from '@/components/admin/menu/ItemDialog';
import { useCategories, useMenuItems } from '@/hooks/useMenu';
import { createCategory, createMenuItem, updateMenuItem } from '@/lib/database';
import type { Category, MenuItem } from '@/data/menuSeed';

export function AdminMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Mock user role - in real app this would come from auth context
  const userRole = 'admin'; // or 'staff'
  
  const { categories, toggleVisibility, refetch: refetchCategories } = useCategories();
  const { items: categoryItems, toggleStock, refetch: refetchItems } = useMenuItems(selectedCategory?.id);

  const handleCreateCategory = (name: string, thumbnail: File | null) => {
    const newCat = createCategory({
      names: { 
        fr: name,
        en: name, // Would be translated via API
        nl: name  // Would be translated via API
      },
      sort: categories.length + 1,
      visible: true,
      thumbnail_url: thumbnail ? URL.createObjectURL(thumbnail) : undefined
    });
    
    refetchCategories();
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setShowItemDialog(true);
  };

  const handleSaveItem = (itemData: {
    name: string;
    description: string;
    price: string;
    photo: File | null;
    tags: string;
  }) => {
    if (!itemData.name.trim() || !selectedCategory) return;
    
    const newItemData = {
      category_id: selectedCategory.id,
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
      photo_url: itemData.photo ? URL.createObjectURL(itemData.photo) : editingItem?.photo_url,
      out_of_stock: editingItem?.out_of_stock || false,
      tags: itemData.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    if (editingItem) {
      updateMenuItem(editingItem.id, newItemData);
    } else {
      createMenuItem(newItemData);
    }
    
    setShowItemDialog(false);
    setEditingItem(null);
    refetchItems();
  };

  const canEdit = userRole === 'admin';

  if (selectedCategory) {
    return (
      <div className="flex flex-col h-full">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour aux catégories
              </Button>
              <h1 className="text-3xl font-display font-bold text-primary">
                {selectedCategory.names.fr}
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
                onSelectCategory={setSelectedCategory}
                onToggleVisibility={toggleVisibility}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
