
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function AdminSettingsPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary">
            Paramètres
          </h1>
          <Button className="bg-accent hover:bg-accent/90">
            <Settings className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
        
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-primary">Configuration générale</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Les paramètres du restaurant et de l'application seront affichés ici.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
