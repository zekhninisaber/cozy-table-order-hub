
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { menuSync } from '@/lib/menuSync';

export function MenuSyncSettings() {
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  const handleMenuSync = async () => {
    setIsSyncing(true);
    
    try {
      await menuSync();
      toast({
        title: "Menu synchronisé ✔",
        description: "Les données du menu ont été synchronisées depuis les fichiers de configuration.",
      });
    } catch (error) {
      console.error('Error syncing menu:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la synchronisation du menu.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Synchronisation du Menu
        </CardTitle>
        <CardDescription>
          Importer les nouvelles données depuis les fichiers de configuration sans écraser les modifications existantes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-1">Synchronisation sécurisée</p>
            <p className="text-blue-700">
              Cette opération ajoute uniquement les nouvelles données depuis les fichiers de configuration. 
              Vos modifications existantes ne seront pas affectées.
            </p>
          </div>
        </div>
        
        <Button
          onClick={handleMenuSync}
          disabled={isSyncing}
          className="w-full"
        >
          {isSyncing ? (
            <>
              <Download className="h-4 w-4 mr-2 animate-pulse" />
              Synchronisation en cours...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Synchroniser le menu
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
