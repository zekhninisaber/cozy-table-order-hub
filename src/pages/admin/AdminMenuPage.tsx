
import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
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

  const [newCategory, setNewCategory] = useState({ name: '', thumbnail: null as File | null });
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    photo: null as File | null,
    tags: ''
  });

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

  const handleCreateCategory = () => {
    if (!newCategory.name.trim()) return;
    
    // In real app, this would make API call to translate and save
    const newCat: Category = {
      id: Math.max(...categories.map(c => c.id)) + 1,
      names: { 
        fr: newCategory.name,
        en: newCategory.name, // Would be translated via API
        nl: newCategory.name  // Would be translated via API
      },
      sort: categories.length + 1,
      visible: true,
      thumbnail_url: newCategory.thumbnail ? URL.createObjectURL(newCategory.thumbnail) : undefined
    };
    
    setCategories([...categories, newCat]);
    setNewCategory({ name: '', thumbnail: null });
    setShowCategoryDialog(false);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.names.fr,
      description: item.descriptions.fr,
      price: item.price.toString(),
      photo: null,
      tags: item.tags.join(', ')
    });
    setShowItemDialog(true);
  };

  const handleSaveItem = () => {
    if (!newItem.name.trim() || !selectedCategory) return;
    
    const itemData: MenuItem = {
      id: editingItem?.id || Math.max(...menuItems.map(i => i.id)) + 1,
      category_id: selectedCategory.id,
      names: {
        fr: newItem.name,
        en: newItem.name, // Would be translated via API
        nl: newItem.name  // Would be translated via API
      },
      descriptions: {
        fr: newItem.description,
        en: newItem.description, // Would be translated via API
        nl: newItem.description  // Would be translated via API
      },
      price: parseFloat(newItem.price) || 0,
      photo_url: newItem.photo ? URL.createObjectURL(newItem.photo) : editingItem?.photo_url,
      out_of_stock: editingItem?.out_of_stock || false,
      tags: newItem.tags.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    if (editingItem) {
      setMenuItems(items => items.map(item => item.id === editingItem.id ? itemData : item));
    } else {
      setMenuItems([...menuItems, itemData]);
    }
    
    setShowItemDialog(false);
    setEditingItem(null);
    setNewItem({ name: '', description: '', price: '', photo: null, tags: '' });
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
                    setNewItem({ name: '', description: '', price: '', photo: null, tags: '' });
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Photo</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>En stock</TableHead>
                      <TableHead>Tags</TableHead>
                      {canEdit && <TableHead>Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.photo_url ? (
                            <img 
                              src={item.photo_url} 
                              alt={item.names.fr}
                              className="w-12 h-12 rounded object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                              Photo
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{item.names.fr}</TableCell>
                        <TableCell>€{item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Switch
                            checked={!item.out_of_stock}
                            onCheckedChange={() => toggleItemStock(item.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {item.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        {canEdit && (
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleEditItem(item)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Edit Item Dialog */}
        <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Modifier le plat' : 'Nouveau plat'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="item-name">Nom (français)</Label>
                <Input
                  id="item-name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  placeholder="Nom du plat"
                />
              </div>
              <div>
                <Label htmlFor="item-description">Description (français)</Label>
                <Textarea
                  id="item-description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Description du plat"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="item-price">Prix (€)</Label>
                  <Input
                    id="item-price"
                    type="number"
                    step="0.01"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="item-tags">Tags (séparés par des virgules)</Label>
                  <Input
                    id="item-tags"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                    placeholder="populaire, épicé, vegan"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="item-photo">Photo</Label>
                <Input
                  id="item-photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewItem({...newItem, photo: e.target.files?.[0] || null})}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowItemDialog(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveItem}>
                  {editingItem ? 'Modifier' : 'Créer'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Nouvelle catégorie
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nouvelle catégorie</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="category-name">Nom (français)</Label>
                      <Input
                        id="category-name"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                        placeholder="Nom de la catégorie"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category-thumbnail">Mini-image</Label>
                      <Input
                        id="category-thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setNewCategory({...newCategory, thumbnail: e.target.files?.[0] || null})}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleCreateCategory}>
                        Créer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md border-0">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    {canEdit && <TableHead className="w-12"></TableHead>}
                    <TableHead>Mini-image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Ordre</TableHead>
                    <TableHead>Visible ?</TableHead>
                    {canEdit && <TableHead>Actions</TableHead>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow 
                      key={category.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {canEdit && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </TableCell>
                      )}
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        {category.thumbnail_url ? (
                          <img 
                            src={category.thumbnail_url} 
                            alt={category.names.fr}
                            className="w-10 h-10 rounded object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                            IMG
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{category.names.fr}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{category.sort}</Badge>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={category.visible}
                            onCheckedChange={() => toggleCategoryVisibility(category.id)}
                          />
                          {category.visible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                      {canEdit && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
