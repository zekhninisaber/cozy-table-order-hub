
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { formatPrice } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ArrowLeft, Check } from 'lucide-react';

interface ReviewBowlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ReviewBowlModal({ isOpen, onClose, onConfirm }: ReviewBowlModalProps) {
  const { state, getTotalPrice } = usePokeBuilder();
  const isMobile = useIsMobile();

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

  const content = (
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
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 mt-4">
        <Button
          variant="outline"
          onClick={onClose}
          className="w-full sm:flex-1 min-w-0 border-primary/20 hover:bg-primary/5"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Modifier
        </Button>
        <Button
          onClick={onConfirm}
          className="w-full sm:flex-1 min-w-0 bg-[#F39720] text-white hover:bg-[#E07E29] disabled:opacity-50"
        >
          <Check className="w-4 h-4 mr-2" />
          Ajouter au panier
        </Button>
      </div>
    </div>
  );

  // Handle loading state for mobile detection
  if (isMobile === undefined) {
    return null;
  }

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent 
          side="bottom" 
          className="h-auto max-h-[90vh] p-6 z-[100]"
        >
          <SheetHeader className="text-left pb-4">
            <SheetTitle className="text-xl font-bold text-primary">
              Votre bowl personnalisé
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto max-h-[70vh]">
            {content}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-peach-cream max-w-md p-6">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold text-primary">
            Votre bowl personnalisé
          </DialogTitle>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
