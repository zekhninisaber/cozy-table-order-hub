
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

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

interface ItemListProps {
  items: MenuItem[];
  canEdit: boolean;
  onEditItem: (item: MenuItem) => void;
  onToggleStock: (id: number) => void;
  onReorderItems?: (items: MenuItem[]) => void;
}

export function ItemList({ items, canEdit, onEditItem, onToggleStock, onReorderItems }: ItemListProps) {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorderItems) {
      return;
    }

    const reorderedItems = Array.from(items);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    // Update sort order based on new positions
    const updatedItems = reorderedItems.map((item, index) => ({
      ...item,
      sort: index + 1
    }));

    onReorderItems(updatedItems);
  };

  if (!canEdit || !onReorderItems) {
    // Non-draggable version for staff users or when reordering is not supported
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

  // Draggable version for admin users with reordering support
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12"></TableHead>
            <TableHead>Photo</TableHead>
            <TableHead>Nom</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>En stock</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Droppable droppableId="menu-items">
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable 
                  key={item.id.toString()} 
                  draggableId={item.id.toString()} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <TableRow 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        snapshot.isDragging ? 'bg-blue-50 shadow-lg' : ''
                      }`}
                    >
                      <TableCell 
                        {...provided.dragHandleProps}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </TableCell>
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
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </TableBody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
}
