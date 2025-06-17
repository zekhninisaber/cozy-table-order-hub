
import { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AdminMenuPage() {
  const [categories] = useState([
    { id: 1, name: 'Sushi Burger Menu', sort: 1 },
    { id: 2, name: 'Bao Bun Menu', sort: 2 },
    { id: 3, name: 'Poke Bowls', sort: 3 },
    { id: 4, name: 'Sides', sort: 4 },
    { id: 5, name: 'Drinks', sort: 5 },
    { id: 6, name: 'Desserts', sort: 6 }
  ]);
  
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary">
            Gestion du Menu
          </h1>
          <Button className="bg-accent hover:bg-accent/90">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle catégorie
          </Button>
        </div>
        
        <div className="grid gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="shadow-md border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-primary">{category.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <Badge variant="secondary">Ordre: {category.sort}</Badge>
                  <Button size="sm" className="bg-accent hover:bg-accent/90">
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un plat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
