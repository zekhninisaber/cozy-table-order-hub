
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
    <div className="fixed top-0 left-0 right-0 z-40 bg-peach-cream border-b border-primary/10 shadow-md">
      <div className="max-w-md mx-auto px-4 py-3">
        <Button
          onClick={() => navigate('/basket')}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground h-12 sm:h-14 shadow-sm"
          size="lg"
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base">{itemCount} {t('items')}</span>
            </div>
            <span className="font-semibold text-sm sm:text-base">{formatPrice(total)}</span>
          </div>
        </Button>
      </div>
    </div>
  );
}
