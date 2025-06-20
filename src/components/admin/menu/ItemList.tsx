import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
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
import { MenuItemCardMobile } from './MenuItemCardMobile';

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
  onDeleteItem?: (id: number) => void;
  onReorderItems?: (items: MenuItem[]) => void;
}

export function ItemList({ items, canEdit, onEditItem, onToggleStock, onDeleteItem, onReorderItems }: ItemListProps) {
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

  // Mobile Card Layout (drag-and-drop enabled for admin)
  const renderMobileCards = () => {
    if (canEdit && onReorderItems) {
      return (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="menu-items-mobile">
            {(provided) => (
              <div 
                {...provided.droppableProps} 
                ref={provided.innerRef}
                className="flex flex-col gap-3 w-full px-4 overflow-x-hidden"
              >
                {items.map((item, index) => (
                  <Draggable 
                    key={item.id.toString()} 
                    draggableId={item.id.toString()} 
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`w-full ${snapshot.isDragging ? 'opacity-50' : ''}`}
                      >
                        <MenuItemCardMobile
                          item={item}
                          onEditItem={onEditItem}
                          onToggleStock={onToggleStock}
                          onDeleteItem={onDeleteItem}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }

    // Non-draggable mobile cards for staff
    return (
      <div className="flex flex-col gap-3 w-full px-4 overflow-x-hidden">
        {items.map((item) => (
          <MenuItemCardMobile
            key={item.id}
            item={item}
            onEditItem={onEditItem}
            onToggleStock={onToggleStock}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Layout - visible only on small screens */}
      <div className="sm:hidden w-full overflow-x-hidden">
        {renderMobileCards()}
      </div>

      {/* Desktop Table Layout - hidden on small screens */}
      <div className="hidden sm:block w-full overflow-x-auto">
        {!canEdit || !onReorderItems ? (
          // Non-draggable version for staff users or when reordering is not supported
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
                <TableHead className="bg-gray-100 font-semibold text-gray-700">Photo</TableHead>
                <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
                <TableHead className="bg-gray-100 font-semibold text-gray-700">Prix</TableHead>
                <TableHead className="bg-gray-100 font-semibold text-gray-700">En stock</TableHead>
                <TableHead className="bg-gray-100 font-semibold text-gray-700">Tags</TableHead>
                {canEdit && <TableHead className="bg-gray-100 font-semibold text-gray-700">Actions</TableHead>}
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
                        {onDeleteItem && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
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
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          // Draggable version for admin users with reordering support
          <DragDropContext onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
                  <TableHead className="w-12 bg-gray-100 font-semibold text-gray-700"></TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">Photo</TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">Prix</TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">En stock</TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">Tags</TableHead>
                  <TableHead className="bg-gray-100 font-semibold text-gray-700">Actions</TableHead>
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
                                {onDeleteItem && (
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="outline" size="sm">
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
        )}
      </div>
    </>
  );
}
