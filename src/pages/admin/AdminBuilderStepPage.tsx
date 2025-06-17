
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

interface BuilderOption {
  id: string;
  names: {
    fr: string;
    en: string;
    nl: string;
  };
  extra_price: number;
  photo_url: string;
  is_visible: boolean;
  sort_order: number;
}

interface BuilderStep {
  id: string;
  names: {
    fr: string;
    en: string;
    nl: string;
  };
  max_select: number;
  included_count: number;
}

export function AdminBuilderStepPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<BuilderStep | null>(null);
  const [options, setOptions] = useState<BuilderOption[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState(0);
  const [newOptionPhoto, setNewOptionPhoto] = useState('');
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
    loadStepAndOptions();
  }, [id]);

  const loadStepAndOptions = async () => {
    // Mock data - replace with actual API call
    const mockStep: BuilderStep = {
      id: id || '1',
      names: { fr: 'Base', en: 'Base', nl: 'Basis' },
      max_select: 1,
      included_count: 1
    };

    const mockOptions: BuilderOption[] = [
      {
        id: '1',
        names: { fr: 'Riz blanc', en: 'White rice', nl: 'Witte rijst' },
        extra_price: 0,
        photo_url: '/placeholder.svg',
        is_visible: true,
        sort_order: 1
      },
      {
        id: '2',
        names: { fr: 'Riz complet', en: 'Brown rice', nl: 'Bruine rijst' },
        extra_price: 1.50,
        photo_url: '/placeholder.svg',
        is_visible: true,
        sort_order: 2
      },
      {
        id: '3',
        names: { fr: 'Quinoa', en: 'Quinoa', nl: 'Quinoa' },
        extra_price: 2.00,
        photo_url: '/placeholder.svg',
        is_visible: false,
        sort_order: 3
      }
    ];

    setStep(mockStep);
    setOptions(mockOptions);
  };

  const autoTranslate = (frenchName: string) => {
    // Simple mock translation - replace with actual translation service
    const translations: { [key: string]: { en: string; nl: string } } = {
      'Riz blanc': { en: 'White rice', nl: 'Witte rijst' },
      'Riz complet': { en: 'Brown rice', nl: 'Bruine rijst' },
      'Quinoa': { en: 'Quinoa', nl: 'Quinoa' },
      'Avocat': { en: 'Avocado', nl: 'Avocado' },
      'Concombre': { en: 'Cucumber', nl: 'Komkommer' }
    };
    
    return translations[frenchName] || { en: frenchName, nl: frenchName };
  };

  const handleAddOption = async () => {
    if (!newOptionName.trim()) {
      toast({
        title: "Erreur",
        description: "Le nom de l'option est requis",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const translations = autoTranslate(newOptionName);
      const newOption: BuilderOption = {
        id: Date.now().toString(),
        names: {
          fr: newOptionName,
          en: translations.en,
          nl: translations.nl
        },
        extra_price: newOptionPrice,
        photo_url: newOptionPhoto || '/placeholder.svg',
        is_visible: true,
        sort_order: options.length + 1
      };

      setOptions([...options, newOption]);
      setIsAddDialogOpen(false);
      setNewOptionName('');
      setNewOptionPrice(0);
      setNewOptionPhoto('');

      toast({
        title: "Succès",
        description: "Option ajoutée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter l'option",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleVisible = async (optionId: string) => {
    try {
      setOptions(options.map(option => 
        option.id === optionId 
          ? { ...option, is_visible: !option.is_visible }
          : option
      ));
      
      toast({
        title: "Succès",
        description: "Visibilité mise à jour"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la visibilité",
        variant: "destructive"
      });
    }
  };

  const handleDeleteOption = async (optionId: string) => {
    try {
      setOptions(options.filter(option => option.id !== optionId));
      toast({
        title: "Succès",
        description: "Option supprimée avec succès"
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'option",
        variant: "destructive"
      });
    }
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
                  {step.names.fr}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              Options - {step.names.fr}
            </h1>
            <p className="text-muted-foreground">
              Gérez les options disponibles pour cette étape
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
                  <Label htmlFor="optionName">Nom (Français)</Label>
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
                <div>
                  <Label htmlFor="thumbnail">URL de l'image</Label>
                  <Input
                    id="thumbnail"
                    value={newOptionPhoto}
                    onChange={(e) => setNewOptionPhoto(e.target.value)}
                    placeholder="https://example.com/image.jpg"
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
                <p className="text-muted-foreground">Aucune option configurée</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8"></TableHead>
                    <TableHead className="w-16">Image</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead className="w-32">Prix extra</TableHead>
                    <TableHead className="w-24">Visible</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {options
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((option) => (
                      <TableRow key={option.id} className="hover:bg-muted/50">
                        <TableCell>
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        </TableCell>
                        <TableCell>
                          <img
                            src={option.photo_url}
                            alt={option.names.fr}
                            className="w-10 h-10 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{option.names.fr}</div>
                            <div className="text-sm text-muted-foreground">
                              EN: {option.names.en} | NL: {option.names.nl}
                            </div>
                          </div>
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
                            checked={option.is_visible}
                            onCheckedChange={() => handleToggleVisible(option.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => {
                                toast({
                                  title: "Info",
                                  description: "Édition d'option à implémenter"
                                });
                              }}
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
                                    Êtes-vous sûr de vouloir supprimer l'option "{option.names.fr}" ? 
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
