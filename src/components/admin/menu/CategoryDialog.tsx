
import { useState } from 'react';
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
}

export function CategoryDialog({ categories, onCreateCategory }: CategoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', thumbnail: null as File | null });

  const handleCreate = () => {
    if (!newCategory.name.trim()) return;
    
    onCreateCategory(newCategory.name, newCategory.thumbnail);
    setNewCategory({ name: '', thumbnail: null });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreate}>
              Créer
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
