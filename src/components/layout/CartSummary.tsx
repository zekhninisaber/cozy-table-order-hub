
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

export function CartSummary() {
  const { language, cart, getCartTotal, getCartItemCount } = useAppStore();
  const t = useTranslation(language);
  const navigate = useNavigate();
  
  const itemCount = getCartItemCount();
  const total = getCartTotal();
  
  if (itemCount === 0) return null;
  
  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <Button
        onClick={() => navigate('/basket')}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 shadow-lg"
        size="lg"
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>{itemCount} {t('items')}</span>
          </div>
          <span className="font-semibold">{formatPrice(total)}</span>
        </div>
      </Button>
    </div>
  );
}
