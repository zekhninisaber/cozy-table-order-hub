
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { resetMenu } from '@/lib/resetMenu';

export function MenuResetSettings() {
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();

  const handleResetMenu = async () => {
    const confirmed = window.confirm(
      'Êtes-vous sûr de vouloir réinitialiser complètement le menu ? Cette action supprimera toutes les modifications et restaurera les données d\'origine.'
    );
    
    if (!confirmed) return;
    
    setIsResetting(true);
    
    try {
      await resetMenu();
      toast({
        title: "Menu réimporté ✔",
        description: "Le menu a été réinitialisé avec succès.",
      });
      
      // Trigger a page reload to refresh all data
      window.location.reload();
    } catch (error) {
      console.error('Error resetting menu:', error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la réinitialisation du menu.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Réinitialisation du Menu
        </CardTitle>
        <CardDescription>
          Restaurer le menu aux données d'origine depuis les fichiers de configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-yellow-800 mb-1">Attention !</p>
            <p className="text-yellow-700">
              Cette action supprimera définitivement toutes les modifications apportées au menu 
              et restaurera les données d'origine. Cette opération ne peut pas être annulée.
            </p>
          </div>
        </div>
        
        <Button
          variant="destructive"
          onClick={handleResetMenu}
          disabled={isResetting}
          className="w-full"
        >
          {isResetting ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Réinitialisation en cours...
            </>
          ) : (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reimporter le menu
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
