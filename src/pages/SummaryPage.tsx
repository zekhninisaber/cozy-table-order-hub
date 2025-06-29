
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice, checkWiFiConnection } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { renderBowlLines } from '@/utils/renderBowlLines';

export function SummaryPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language, cart, customerName, setCustomerName, getCartTotal, clearCart, getCartItemCount } = useAppStore();
  const t = useTranslation(language);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const itemCount = getCartItemCount();
  const hasCartItems = itemCount > 0;
  const total = getCartTotal();
  
  const handleConfirm = async () => {
    if (!customerName.trim()) {
      toast({
        title: t('error'),
        description: 'Veuillez entrer votre nom',
        variant: 'destructive'
      });
      return;
    }
    
    if (!checkWiFiConnection()) {
      toast({
        title: t('wifiRequired'),
        description: t('wifiRequired'),
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate order submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and navigate to success
      clearCart();
      navigate('/order-complete');
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Erreur lors de la commande',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-peach-cream p-4">
      <div className={`max-w-md mx-auto pb-8 ${hasCartItems ? 'pt-20' : 'pt-8'}`}>
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold text-primary">
            Résumé de commande
          </h1>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-md border-0">
            <CardContent className="p-4">
              <h2 className="font-semibold text-primary mb-4">Votre commande</h2>
              <div className="space-y-3">
                {cart.map((item, index) => {
                  console.log(`Summary item ${index}:`, item);
                  console.log(`Summary item builderData:`, item.builderData);
                  
                  const sizeLabel = item.builderData?.size ? ` (${item.builderData.size})` : '';
                  const bowlLines = item.builderData ? renderBowlLines(item.builderData) : [];
                  
                  console.log(`Summary bowl lines for item ${index}:`, bowlLines);
                  
                  return (
                    <div key={`${item.id}-${index}`} className="space-y-1">
                      <div className="flex justify-between items-center text-sm">
                        <span>{item.quantity}x {item.name}{sizeLabel}</span>
                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                      {bowlLines.length > 0 && (
                        <div className="pl-4 space-y-0.5">
                          {bowlLines.map((line, lineIndex) => (
                            <div key={lineIndex} className="text-xs text-primary/70">
                              · {line}
                            </div>
                          ))}
                        </div>
                      )}
                      {item.builderData?.size && bowlLines.length === 0 && (
                        <div className="text-xs text-primary/70 pl-4">
                          · Taille : {t(item.builderData.size === 'Regular' ? 'sizeRegular' : 'sizeLarge')}
                        </div>
                      )}
                    </div>
                  );
                })}
                <div className="border-t pt-3 flex justify-between items-center font-bold">
                  <span>{t('total')}</span>
                  <span className="text-accent">{formatPrice(total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-0">
            <CardContent className="p-4">
              <Label htmlFor="customer-name" className="text-primary font-semibold">
                {t('customerName')}
              </Label>
              <Input
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Entrez votre nom"
                className="mt-2"
              />
            </CardContent>
          </Card>
          
          <Button
            onClick={handleConfirm}
            disabled={isSubmitting || !customerName.trim()}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            {isSubmitting ? 'Confirmation...' : t('confirmOrder')}
          </Button>
        </div>
      </div>
    </div>
  );
}
