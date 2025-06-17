
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

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

interface ItemListProps {
  items: MenuItem[];
  canEdit: boolean;
  onEditItem: (item: MenuItem) => void;
  onToggleStock: (id: number) => void;
}

export function ItemList({ items, canEdit, onEditItem, onToggleStock }: ItemListProps) {
  return (
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
        {items.map((item) => (
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
                onCheckedChange={() => onToggleStock(item.id)}
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
                    onClick={() => onEditItem(item)}
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
  );
}
