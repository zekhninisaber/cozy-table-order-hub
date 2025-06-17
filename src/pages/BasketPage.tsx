
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

export function BasketPage() {
  const navigate = useNavigate();
  const { language, cart, updateCartQuantity, removeFromCart, getCartTotal } = useAppStore();
  const t = useTranslation(language);
  
  const total = getCartTotal();
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-peach-cream p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="flex items-center gap-3 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-display font-bold text-primary">
              {t('cart')}
            </h1>
          </div>
          
          <div className="text-center py-16">
            <p className="text-primary">{t('cart')} vide</p>
            <Button 
              onClick={() => navigate('/menu')} 
              className="mt-4"
            >
              Retour au menu
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-peach-cream p-4">
      <div className="max-w-md mx-auto pt-8 pb-32">
        <div className="flex items-center gap-3 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold text-primary">
            {t('cart')}
          </h1>
        </div>
        
        <div className="space-y-4 mb-8">
          {cart.map((item, index) => (
            <Card key={`${item.id}-${index}`} className="shadow-md border-0">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 pr-2">
                    <h3 className="font-semibold text-primary text-sm leading-tight">
                      {item.name}
                    </h3>
                    {item.builderData?.size && (
                      <p className="text-xs text-muted-foreground mt-1">
                        · Taille : {t(item.builderData.size === 'Regular' ? 'sizeRegular' : 'sizeLarge')}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="font-bold text-accent">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="shadow-xl border-0 bg-primary text-peach-cream">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">{t('total')}</span>
              <span className="text-2xl font-bold">{formatPrice(total)}</span>
            </div>
            <Button
              onClick={() => navigate('/summary')}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="lg"
            >
              {t('validateOrder')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
