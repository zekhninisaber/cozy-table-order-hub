
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Printer, Wifi, Settings, TestTube } from 'lucide-react';
import { useState } from 'react';

export function PrinterSettings() {
  const [printerStatus, setPrinterStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryInterval, setRetryInterval] = useState('30');

  const testPrint = () => {
    console.log('Testing printer...');
    // TODO: Implement test print functionality
  };

  const reconnectPrinter = () => {
    console.log('Reconnecting printer...');
    setPrinterStatus('connected');
    // TODO: Implement printer reconnection logic
  };

  const getStatusBadge = () => {
    switch (printerStatus) {
      case 'connected':
        return <Badge variant="default" className="bg-green-500">Connectée</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Déconnectée</Badge>;
      case 'error':
        return <Badge variant="destructive">Erreur</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center">
            <Printer className="h-5 w-5 mr-2" />
            État de l'imprimante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Imprimante thermique ESC/POS</p>
                <p className="text-sm text-muted-foreground">Statut de connexion</p>
              </div>
              {getStatusBadge()}
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={testPrint} variant="outline">
                <TestTube className="h-4 w-4 mr-2" />
                Test d'impression
              </Button>
              <Button onClick={reconnectPrinter} variant="outline">
                <Wifi className="h-4 w-4 mr-2" />
                Reconnecter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Configuration d'impression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-medium">Tentatives automatiques</Label>
                <p className="text-sm text-muted-foreground">
                  Réessayer automatiquement en cas d'échec d'impression
                </p>
              </div>
              <Switch
                checked={autoRetry}
                onCheckedChange={setAutoRetry}
              />
            </div>
            
            {autoRetry && (
              <div>
                <Label htmlFor="retry-interval">Intervalle de tentative (secondes)</Label>
                <Input
                  id="retry-interval"
                  type="number"
                  value={retryInterval}
                  onChange={(e) => setRetryInterval(e.target.value)}
                  className="w-32 mt-1"
                  min="10"
                  max="300"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Format du ticket</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">Largeur (mm)</Label>
                  <Input type="number" defaultValue="80" className="w-20" />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">Marge (mm)</Label>
                  <Input type="number" defaultValue="5" className="w-20" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
