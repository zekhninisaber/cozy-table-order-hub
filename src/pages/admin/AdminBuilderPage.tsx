
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BuilderStep {
  id: string;
  names: {
    fr: string;
    en: string;
    nl: string;
  };
  max_select: number;
  included_count: number;
  sort_order: number;
}

export function AdminBuilderPage() {
  const navigate = useNavigate();
  const [steps, setSteps] = useState<BuilderStep[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newStepName, setNewStepName] = useState('');
  const [newStepMax, setNewStepMax] = useState(1);
  const [newStepIncluded, setNewStepIncluded] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Check if user is staff (staff role has no access)
  const userRole = localStorage.getItem('admin-role') || 'admin';
  
  if (userRole === 'staff') {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-md border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-red-600 mb-2">Accès refusé</h2>
              <p className="text-muted-foreground">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadSteps();
  }, []);

  const loadSteps = async () => {
    // Mock data - replace with actual API call
    const mockSteps: BuilderStep[] = [
      {
        id: '1',
        names: { fr: 'Base', en: 'Base', nl: 'Basis' },
        max_select: 1,
        included_count: 1,
        sort_order: 1
      },
      {
        id: '2',
        names: { fr: 'Sauce', en: 'Sauce', nl: 'Saus' },
        max_select: 2,
        included_count: 1,
        sort_order: 2
      },
      {
        id: '3',
        names: { fr: 'Garnitures', en: 'Vegetables', nl: 'Groenten' },
        max_select: 5,
        included_count: 3,
        sort_order: 3
      },
      {
        id: '4',
        names: { fr: 'Protéine', en: 'Protein', nl: 'Proteïne' },
        max_select: 1,
        included_count: 1,
        sort_order: 4
      },
      {
        id: '5',
        names: { fr: 'Toppings', en: 'Toppings', nl: 'Toppings' },
        max_select: 2,
        included_count: 0,
        sort_order: 5
      }
    ];
    setSteps(mockSteps);
  };

  const autoTranslate = (frenchName: string) => {
    // Simple mock translation - replace with actual translation service
    const translations: { [key: string]: { en: string; nl: string } } = {
      'Base': { en: 'Base', nl: 'Basis' },
      'Sauce': { en: 'Sauce', nl: 'Saus' },
      'Garnitures': { en: 'Vegetables', nl: 'Groenten' },
      'Protéine': { en: 'Protein', nl: 'Proteïne' },
      'Toppings': { en: 'Toppings', nl: 'Toppings' }
    };
    
    return translations[frenchName] || { en: frenchName, nl: frenchName };
  };

  const handleAddStep = async () => {
    if (!newStepName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de l'étape est requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const translations = autoTranslate(newStepName);
      const newStep: BuilderStep = {
        id: Date.now().toString(),
        names: {
          fr: newStepName,
          en: translations.en,
          nl: translations.nl
        },
        max_select: newStepMax,
        included_count: newStepIncluded,
        sort_order: steps.length + 1
      };

      setSteps([...steps, newStep]);
      setIsAddDialogOpen(false);
      setNewStepName('');
      setNewStepMax(1);
      setNewStepIncluded(0);

      toast({
        title: "Succès",
        description: "Étape ajoutée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'étape",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteStep = async (stepId: string) => {
    try {
      setSteps(steps.filter(step => step.id !== stepId));
      toast({
        title: "Succès",
        description: "Étape supprimée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'étape",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Configuration du Builder
            </h1>
            <p className="text-muted-foreground">
              Gérez les étapes du constructeur de poke bowls
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F39720] hover:bg-[#F39720]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle étape
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle étape</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="stepName">Nom (Français)</Label>
                  <Input
                    id="stepName"
                    value={newStepName}
                    onChange={(e) => setNewStepName(e.target.value)}
                    placeholder="Ex: Garnitures"
                  />
                </div>
                <div>
                  <Label htmlFor="maxSelect">Sélection maximum</Label>
                  <Input
                    id="maxSelect"
                    type="number"
                    min="1"
                    value={newStepMax}
                    onChange={(e) => setNewStepMax(parseInt(e.target.value) || 1)}
                  />
                </div>
                <div>
                  <Label htmlFor="includedCount">Quantité incluse</Label>
                  <Input
                    id="includedCount"
                    type="number"
                    min="0"
                    value={newStepIncluded}
                    onChange={(e) => setNewStepIncluded(parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleAddStep}
                    disabled={isLoading}
                    className="bg-[#F39720] hover:bg-[#F39720]/90"
                  >
                    {isLoading ? 'Ajout...' : 'Ajouter'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-primary">Étapes du Builder</CardTitle>
          </CardHeader>
          <CardContent>
            {steps.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucune étape configurée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
                    <TableHead className="w-8 bg-gray-100 font-semibold text-gray-700"></TableHead>
                    <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
                    <TableHead className="w-32 bg-gray-100 font-semibold text-gray-700">Max select</TableHead>
                    <TableHead className="w-32 bg-gray-100 font-semibold text-gray-700">Inclus</TableHead>
                    <TableHead className="w-24 bg-gray-100 font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {steps
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((step) => (
                      <TableRow key={step.id} className="hover:bg-muted/50">
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{step.names.fr}</div>
                            <div className="text-sm text-muted-foreground">
                              EN: {step.names.en} | NL: {step.names.nl}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{step.max_select}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{step.included_count}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => navigate(`/admin/builder/step/${step.id}`)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Êtes-vous sûr de vouloir supprimer l'étape "{step.names.fr}" ? 
                                    Cette action est irréversible.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeleteStep(step.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Supprimer
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
