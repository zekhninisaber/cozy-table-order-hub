
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Plus, Pencil, Trash2, GripVertical, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface BuilderOption {
  id: number;
  step_id: number;
  name: string;
  extra_price: number;
  out_of_stock: boolean;
}

interface BuilderStep {
  id: number;
  name: string;
  max_select: number;
  sort: number;
}

export function AdminBuilderStepPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<BuilderStep | null>(null);
  const [options, setOptions] = useState<BuilderOption[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState(0);
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
    if (id) {
      loadStepAndOptions();
    }
  }, [id]);

  const loadStepAndOptions = async () => {
    if (!id) return;
    
    try {
      // Load step details
      const { data: stepData, error: stepError } = await supabase
        .from('builder_steps')
        .select('*')
        .eq('id', parseInt(id))
        .single();
      
      if (stepError) {
        console.error('Error loading step:', stepError);
        toast({
          title: "Erreur",
          description: "Impossible de charger l'étape",
          variant: "destructive"
        });
        return;
      }
      
      setStep(stepData);

      // Load options for this step - FIXED: using correct step ID
      const { data: optionsData, error: optionsError } = await supabase
        .from('builder_options')
        .select('*')
        .eq('step_id', parseInt(id));
      
      if (optionsError) {
        console.error('Error loading options:', optionsError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les options",
          variant: "destructive"
        });
        return;
      }
      
      setOptions(optionsData || []);
    } catch (error) {
      console.error('Error loading step and options:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du chargement",
        variant: "destructive"
      });
    }
  };

  const handleAddOption = async () => {
    if (!newOptionName.trim() || !id) {
      toast({
        title: "Erreur",
        description: "Le nom de l'option est requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('builder_options')
        .insert({
          step_id: parseInt(id),
          name: newOptionName,
          extra_price: newOptionPrice,
          out_of_stock: false
        });

      if (error) {
        throw error;
      }

      await loadStepAndOptions();
      setIsAddDialogOpen(false);
      setNewOptionName('');
      setNewOptionPrice(0);

      toast({
        title: "Succès",
        description: "Option ajoutée avec succès"
      });
    } catch (error) {
      console.error('Error adding option:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'option",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStock = async (optionId: number) => {
    try {
      const option = options.find(o => o.id === optionId);
      if (!option) return;

      const { error } = await supabase
        .from('builder_options')
        .update({ out_of_stock: !option.out_of_stock })
        .eq('id', optionId);

      if (error) {
        throw error;
      }

      await loadStepAndOptions();
      toast({
        title: "Succès",
        description: "Stock mis à jour"
      });
    } catch (error) {
      console.error('Error updating stock:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le stock",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOption = async (optionId: number) => {
    try {
      const { error } = await supabase
        .from('builder_options')
        .delete()
        .eq('id', optionId);

      if (error) {
        throw error;
      }

      await loadStepAndOptions();
      toast({
        title: "Succès",
        description: "Option supprimée avec succès"
      });
    } catch (error) {
      console.error('Error deleting option:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'option",
        variant: "destructive"
      });
    }
  };

  const getMaxSelectLabel = (maxSelect: number) => {
    if (maxSelect === 0) return "Sélection illimitée";
    return `Maximum ${maxSelect} sélection${maxSelect > 1 ? 's' : ''}`;
  };

  if (!step) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  href="/admin/builder"
                  className="flex items-center gap-2 text-primary hover:text-primary/80"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Builder
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  {step.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Options - {step.name}
            </h1>
            <p className="text-muted-foreground">
              {getMaxSelectLabel(step.max_select)}
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#F39720] hover:bg-[#F39720]/90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Nouvelle option
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter une nouvelle option</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="optionName">Nom</Label>
                  <Input
                    id="optionName"
                    value={newOptionName}
                    onChange={(e) => setNewOptionName(e.target.value)}
                    placeholder="Ex: Riz blanc"
                  />
                </div>
                <div>
                  <Label htmlFor="extraPrice">Prix supplémentaire (€)</Label>
                  <Input
                    id="extraPrice"
                    type="number"
                    min="0"
                    step="0.50"
                    value={newOptionPrice}
                    onChange={(e) => setNewOptionPrice(parseFloat(e.target.value) || 0)}
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
                    onClick={handleAddOption}
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
            <CardTitle className="text-primary">Options disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            {options.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Aucune option configurée pour cette étape</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
                    <TableHead className="w-8 bg-gray-100 font-semibold text-gray-700"></TableHead>
                    <TableHead className="bg-gray-100 font-semibold text-gray-700">Nom</TableHead>
                    <TableHead className="w-32 bg-gray-100 font-semibold text-gray-700">Prix extra</TableHead>
                    <TableHead className="w-24 bg-gray-100 font-semibold text-gray-700">Disponible</TableHead>
                    <TableHead className="w-24 bg-gray-100 font-semibold text-gray-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {options.map((option) => (
                    <TableRow key={option.id} className="hover:bg-muted/50">
                      <TableCell>
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{option.name}</div>
                      </TableCell>
                      <TableCell>
                        {option.extra_price > 0 ? (
                          <Badge variant="secondary">+{option.extra_price.toFixed(2)}€</Badge>
                        ) : (
                          <Badge variant="outline">Inclus</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={!option.out_of_stock}
                          onCheckedChange={() => handleToggleStock(option.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
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
                                  Êtes-vous sûr de vouloir supprimer l'option "{option.name}" ? 
                                  Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteOption(option.id)}
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
