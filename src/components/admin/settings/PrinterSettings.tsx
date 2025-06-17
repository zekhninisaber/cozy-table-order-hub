
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Printer, Wifi, Settings, TestTube, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface PrinterConfig {
  nom: string;
  ipAddress: string;
  port: string;
  type: 'wifi' | 'bluetooth';
}

const defaultConfig: PrinterConfig = {
  nom: '',
  ipAddress: '',
  port: '9100',
  type: 'wifi'
};

export function PrinterSettings() {
  const [printerStatus, setPrinterStatus] = useState<'connected' | 'disconnected' | 'error'>('disconnected');
  const [autoRetry, setAutoRetry] = useState(true);
  const [retryInterval, setRetryInterval] = useState('30');
  const [config, setConfig] = useState<PrinterConfig>(defaultConfig);
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const { toast } = useToast();

  // Load printer config on component mount
  useEffect(() => {
    loadPrinterConfig();
  }, []);

  const loadPrinterConfig = async () => {
    try {
      // TODO: Replace with Supabase query when integrated
      // const { data } = await supabase
      //   .from('settings')
      //   .select('printer')
      //   .eq('key', 'printer')
      //   .single();
      
      // For now, use localStorage
      const saved = localStorage.getItem('printer_config');
      if (saved) {
        setConfig(JSON.parse(saved));
        setPrinterStatus('connected');
      }
    } catch (error) {
      console.error('Error loading printer config:', error);
    }
  };

  const updateConfig = (field: keyof PrinterConfig, value: string) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with Supabase mutation when integrated
      // await supabase
      //   .from('settings')
      //   .upsert({
      //     key: 'printer',
      //     printer: config
      //   });

      // For now, save to localStorage
      localStorage.setItem('printer_config', JSON.stringify(config));
      setPrinterStatus('connected');
      
      toast({
        title: "Configuration sauvegardée",
        description: "Les paramètres de l'imprimante ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Error saving printer config:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder la configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testPrint = async () => {
    setIsTesting(true);
    try {
      // TODO: Replace with actual API call when backend is integrated
      // const response = await fetch('/api/print-test', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(config)
      // });

      // For demo purposes, simulate the test
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Testing printer with config:', config);
      setPrinterStatus('connected');
      
      toast({
        title: "Test d'impression réussi",
        description: "L'imprimante a correctement imprimé le ticket de test.",
      });
    } catch (error) {
      console.error('Error testing printer:', error);
      setPrinterStatus('error');
      toast({
        title: "Échec du test",
        description: "Impossible de communiquer avec l'imprimante.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const reconnectPrinter = () => {
    console.log('Reconnecting printer...');
    setPrinterStatus('connected');
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
            Configuration de l'imprimante
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="printer-name">Nom de l'imprimante</Label>
              <Input
                id="printer-name"
                value={config.nom}
                onChange={(e) => updateConfig('nom', e.target.value)}
                placeholder="Ex: Imprimante Cuisine"
                className="mt-1"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ip-address">Adresse IP</Label>
                <Input
                  id="ip-address"
                  value={config.ipAddress}
                  onChange={(e) => updateConfig('ipAddress', e.target.value)}
                  placeholder="192.168.1.100"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  type="number"
                  value={config.port}
                  onChange={(e) => updateConfig('port', e.target.value)}
                  placeholder="9100"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="printer-type">Type de connexion</Label>
              <Select
                value={config.type}
                onValueChange={(value: 'wifi' | 'bluetooth') => updateConfig('type', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wifi">Wi-Fi</SelectItem>
                  <SelectItem value="bluetooth">Bluetooth</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-accent hover:bg-accent/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
              </Button>
              <Button
                onClick={testPrint}
                disabled={isTesting || !config.nom || !config.ipAddress}
                variant="outline"
              >
                <TestTube className="h-4 w-4 mr-2" />
                {isTesting ? 'Test en cours...' : "Tester l'impression"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                <p className="font-medium">
                  {config.nom || 'Imprimante thermique ESC/POS'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {config.ipAddress ? `${config.ipAddress}:${config.port}` : 'Non configurée'}
                </p>
              </div>
              {getStatusBadge()}
            </div>
            
            <div className="flex space-x-2">
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
