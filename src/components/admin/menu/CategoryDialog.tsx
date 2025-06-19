
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

interface Category {
  id: number;
  names: { fr: string; en: string; nl: string };
  sort: number;
  visible: boolean;
  thumbnail_url?: string;
}

interface CategoryDialogProps {
  categories: Category[];
  onCreateCategory: (name: string, thumbnail: File | null) => void;
  editingCategory?: Category | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CategoryDialog({ 
  categories, 
  onCreateCategory, 
  editingCategory = null,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange
}: CategoryDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', thumbnail: null as File | null });

  // Use controlled or internal state for dialog open/close
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange || setInternalOpen;

  // Update form when editing category changes
  useEffect(() => {
    if (editingCategory) {
      setNewCategory({ 
        name: editingCategory.names.fr, 
        thumbnail: null 
      });
    } else {
      setNewCategory({ name: '', thumbnail: null });
    }
  }, [editingCategory]);

  const handleCreate = () => {
    if (!newCategory.name.trim()) return;
    
    onCreateCategory(newCategory.name, newCategory.thumbnail);
    setNewCategory({ name: '', thumbnail: null });
    setOpen(false);
  };

  const handleCancel = () => {
    setNewCategory({ name: '', thumbnail: null });
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {!controlledOpen && (
        <DialogTrigger asChild>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
          </DialogTitle>
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
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button onClick={handleCreate}>
              {editingCategory ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
