
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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

interface ItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingItem: MenuItem | null;
  onSaveItem: (itemData: {
    name: string;
    description: string;
    price: string;
    photo: File | null;
    tags: string;
  }) => void;
}

export function ItemDialog({ open, onOpenChange, editingItem, onSaveItem }: ItemDialogProps) {
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    photo: null as File | null,
    tags: ''
  });

  useEffect(() => {
    if (editingItem) {
      setNewItem({
        name: editingItem.names.fr,
        description: editingItem.descriptions.fr,
        price: editingItem.price.toString(),
        photo: null,
        tags: editingItem.tags.join(', ')
      });
    } else {
      setNewItem({ name: '', description: '', price: '', photo: null, tags: '' });
    }
  }, [editingItem]);

  const handleSave = () => {
    if (!newItem.name.trim()) return;
    onSaveItem(newItem);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              {editingItem ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
