
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Eye, EyeOff, GripVertical, Trash2 } from 'lucide-react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Category {
  id: number;
  names: { fr: string; en: string; nl: string };
  sort: number;
  visible: boolean;
  thumbnail_url?: string;
}

interface CategoryListProps {
  categories: Category[];
  canEdit: boolean;
  onSelectCategory: (category: Category) => void;
  onToggleVisibility: (id: number) => void;
  onReorderCategories?: (categories: Category[]) => void;
}

export function CategoryList({ 
  categories, 
  canEdit, 
  onSelectCategory, 
  onToggleVisibility,
  onReorderCategories 
}: CategoryListProps) {
  
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !onReorderCategories) {
      return;
    }

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update sort order based on new positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      sort: index + 1
    }));

    onReorderCategories(updatedItems);
  };

  if (!canEdit) {
    // Non-draggable version for staff users
    return (
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Mini-image</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Ordre</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Visible ?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow 
              key={category.id}
              className="cursor-pointer hover:bg-gray-50"
              onClick={() => onSelectCategory(category)}
            >
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
                    onCheckedChange={() => onToggleVisibility(category.id)}
                  />
                  {category.visible ? (
                    <Eye className="h-4 w-4 text-green-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  // Draggable version for admin users
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
            <TableHead className="w-12 bg-gray-100 font-semibold text-gray-700"></TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Mini-image</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Ordre</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Visible ?</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <Droppable droppableId="categories">
          {(provided) => (
            <TableBody {...provided.droppableProps} ref={provided.innerRef}>
              {categories.map((category, index) => (
                <Draggable 
                  key={category.id.toString()} 
                  draggableId={category.id.toString()} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <TableRow 
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        snapshot.isDragging ? 'bg-blue-50 shadow-lg' : ''
                      }`}
                      onClick={() => onSelectCategory(category)}
                    >
                      <TableCell 
                        {...provided.dragHandleProps}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-grab active:cursor-grabbing"
                      >
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </TableCell>
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
                            onCheckedChange={() => onToggleVisibility(category.id)}
                          />
                          {category.visible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </TableCell>
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
