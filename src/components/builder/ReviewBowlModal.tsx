
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { formatPrice } from '@/lib/utils';
import { ArrowLeft, Check } from 'lucide-react';

interface ReviewBowlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReviewBowlModal({ isOpen, onClose, onConfirm }: ReviewBowlModalProps) {
  const { state, getTotalPrice } = usePokeBuilder();

  const getSummaryItems = () => {
    const items: Array<{ label: string; value: string }> = [];

    if (state.size) {
      items.push({ label: 'Taille', value: state.size });
    }

    if (state.base.length > 0) {
      items.push({ label: 'Base', value: state.base.join(', ') });
    }

    if (state.sauce.length > 0) {
      items.push({ label: 'Sauce', value: state.sauce.join(', ') });
    }

    if (state.garnitures.length > 0) {
      items.push({ label: 'Garnitures', value: state.garnitures.join(', ') });
    }

    if (state.protein) {
      items.push({ label: 'Protéine', value: state.protein });
    }

    if (state.toppings.length > 0) {
      items.push({ label: 'Toppings', value: state.toppings.join(', ') });
    }

    // Combine extras into one line
    const extras: string[] = [];
    if (state.extraSauce.length > 0) {
      extras.push(`Extra sauce ×${state.extraSauce.length}`);
    }
    if (state.extraGarniture.length > 0) {
      extras.push(`Extra garniture ×${state.extraGarniture.length}`);
    }
    if (state.extraProtein.length > 0) {
      extras.push(`Extra protéine ×${state.extraProtein.length}`);
    }

    if (extras.length > 0) {
      items.push({ label: 'Extras', value: extras.join(', ') });
    }

    return items;
  };

  const summaryItems = getSummaryItems();
  const totalPrice = getTotalPrice();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-0 left-0 right-0 w-full max-h-[85vh] rounded-t-2xl bg-peach-cream shadow-xl sm:fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:bottom-auto sm:w-auto sm:max-w-md sm:rounded-xl overflow-y-auto border-0 sm:border p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold text-primary">
            Votre bowl personnalisé
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Summary Items */}
          <div className="space-y-0.5 text-sm">
            {summaryItems.map((item, index) => (
              <div key={index} className="flex gap-2">
                <span className="font-medium text-primary min-w-20">
                  {item.label} :
                </span>
                <span className="text-primary/80">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="border-t border-primary/10 pt-3">
            <div className="text-lg font-bold text-primary">
              Total : {formatPrice(totalPrice)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-primary/20 hover:bg-primary/5"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Check className="w-4 h-4 mr-2" />
              Add to cart
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
