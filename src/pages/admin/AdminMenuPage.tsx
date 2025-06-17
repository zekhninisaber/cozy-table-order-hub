
import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CategoryList } from '@/components/admin/menu/CategoryList';
import { ItemList } from '@/components/admin/menu/ItemList';
import { CategoryDialog } from '@/components/admin/menu/CategoryDialog';
import { ItemDialog } from '@/components/admin/menu/ItemDialog';

interface Category {
  id: number;
  names: { fr: string; en: string; nl: string };
  sort: number;
  visible: boolean;
  thumbnail_url?: string;
}

interface MenuItem {
  id: number;
  category_id: number;
  names: { fr: string; en: string; nl: string };
  descriptions: { fr: string; en: string; nl: string };
  price: number;
  photo_url?: string;
  out_of_stock: boolean;
  tags: string[];
}

export function AdminMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  
  // Mock user role - in real app this would come from auth context
  const userRole = 'admin'; // or 'staff'
  
  const [categories, setCategories] = useState<Category[]>([
    { 
      id: 1, 
      names: { fr: 'Sushi Burger Menu', en: 'Sushi Burger Menu', nl: 'Sushi Burger Menu' },
      sort: 1, 
      visible: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop'
    },
    { 
      id: 2, 
      names: { fr: 'Menu Bao Bun', en: 'Bao Bun Menu', nl: 'Bao Bun Menu' },
      sort: 2, 
      visible: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop'
    },
    { 
      id: 3, 
      names: { fr: 'Poke Bowls', en: 'Poke Bowls', nl: 'Poke Bowls' },
      sort: 3, 
      visible: true,
      thumbnail_url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop'
    },
    { 
      id: 4, 
      names: { fr: 'Accompagnements', en: 'Sides', nl: 'Bijgerechten' },
      sort: 4, 
      visible: true 
    },
    { 
      id: 5, 
      names: { fr: 'Boissons', en: 'Drinks', nl: 'Drankjes' },
      sort: 5, 
      visible: false 
    },
    { 
      id: 6, 
      names: { fr: 'Desserts', en: 'Desserts', nl: 'Desserts' },
      sort: 6, 
      visible: true 
    }
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      category_id: 1,
      names: { fr: 'Sushi Burger Crispy Chicken', en: 'Crispy Chicken Sushi Burger', nl: 'Crispy Chicken Sushi Burger' },
      descriptions: { fr: 'Délicieux burger sushi au poulet croustillant', en: 'Delicious crispy chicken sushi burger', nl: 'Heerlijke crispy chicken sushi burger' },
      price: 12.50,
      photo_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=150&fit=crop',
      out_of_stock: false,
      tags: ['populaire']
    },
    {
      id: 2,
      category_id: 1,
      names: { fr: 'Sushi Burger Saumon Crémeux', en: 'Creamy Salmon Sushi Burger', nl: 'Romige Zalm Sushi Burger' },
      descriptions: { fr: 'Burger sushi au saumon avec sauce crémeuse', en: 'Sushi burger with salmon and creamy sauce', nl: 'Sushi burger met zalm en romige saus' },
      price: 14.00,
      photo_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=150&fit=crop',
      out_of_stock: true,
      tags: ['premium']
    }
  ]);

  const toggleCategoryVisibility = (id: number) => {
    setCategories(cats => cats.map(cat => 
      cat.id === id ? { ...cat, visible: !cat.visible } : cat
    ));
  };

  const toggleItemStock = (id: number) => {
    setMenuItems(items => items.map(item => 
      item.id === id ? { ...item, out_of_stock: !item.out_of_stock } : item
    ));
  };

  const handleCreateCategory = (name: string, thumbnail: File | null) => {
    const newCat: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      names: { 
        fr: name,
        en: name, // Would be translated via API
        nl: name  // Would be translated via API
      },
      sort: categories.length + 1,
      visible: true,
      thumbnail_url: thumbnail ? URL.createObjectURL(thumbnail) : undefined
    };
    
    setCategories([...categories, newCat]);
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
    
    const newItemData: MenuItem = {
      id: editingItem?.id || Math.max(...menuItems.map(i => i.id)) + 1,
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
      setMenuItems(items => items.map(item => item.id === editingItem.id ? newItemData : item));
    } else {
      setMenuItems([...menuItems, newItemData]);
    }
    
    setShowItemDialog(false);
    setEditingItem(null);
  };

  const categoryItems = selectedCategory 
    ? menuItems.filter(item => item.category_id === selectedCategory.id)
    : [];

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
                  onToggleStock={toggleItemStock}
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
                onToggleVisibility={toggleCategoryVisibility}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
