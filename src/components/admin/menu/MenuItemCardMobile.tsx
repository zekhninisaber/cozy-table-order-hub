
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface MenuItem {
  id: number;
  category_id: number;
  names: { fr: string; en: string; nl: string };
  descriptions: { fr: string; en: string; nl: string };
  price: number;
  photo_url?: string;
  out_of_stock: boolean;
  tags: string[];
  sort?: number;
}

interface MenuItemCardMobileProps {
  item: MenuItem;
  onEditItem: (item: MenuItem) => void;
  onToggleStock: (id: number) => void;
  onDeleteItem?: (id: number) => void;
  dragHandleProps?: any;
}

export function MenuItemCardMobile({ 
  item, 
  onEditItem, 
  onToggleStock, 
  onDeleteItem,
  dragHandleProps
}: MenuItemCardMobileProps) {
  return (
    <div className="w-full bg-white rounded-xl p-3 shadow-sm space-y-1 relative">
      {/* Drag Handle - positioned absolute top-right */}
      {dragHandleProps && (
        <div 
          {...dragHandleProps}
          className="absolute top-2 right-2 cursor-grab active:cursor-grabbing p-1"
        >
          <GripVertical className="h-4 w-4 text-gray-400" />
        </div>
      )}

      {/* Main Content Row */}
      <div className="flex gap-3">
        {/* Thumbnail */}
        <div className="flex-shrink-0">
          {item.photo_url ? (
            <img 
              src={item.photo_url} 
              alt={item.names.fr}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-xs text-gray-400">Photo</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-1">
          {/* Line 1: Name and Price */}
          <div className="flex justify-between items-start pr-6">
            <div>
              <h3 className="font-medium text-gray-900">{item.names.fr}</h3>
              <p className="text-sm text-gray-600">€{item.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Line 2: Stock Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">En stock</span>
            <Switch
              checked={!item.out_of_stock}
              onCheckedChange={() => onToggleStock(item.id)}
            />
          </div>

          {/* Line 3: Tags */}
          {item.tags.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {item.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Line 4: Action Bar */}
          <div className="flex gap-2 pt-1">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onEditItem(item)}
              className="h-8 w-8 p-0"
            >
              <Edit className="h-4 w-4" />
            </Button>
            {onDeleteItem && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer le plat</AlertDialogTitle>
                    <AlertDialogDescription>
                      Êtes-vous sûr de vouloir supprimer "{item.names.fr}" ? Cette action ne peut pas être annulée.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onDeleteItem(item.id)}>
                      Supprimer
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
