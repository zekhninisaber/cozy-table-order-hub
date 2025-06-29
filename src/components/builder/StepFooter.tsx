
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ShoppingCart } from 'lucide-react';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { formatPrice } from '@/lib/utils';

interface StepFooterProps {
  onPrevious: () => void;
  onNext: () => void;
  onAddToCart: () => void;
}

export function StepFooter({ onPrevious, onNext, onAddToCart }: StepFooterProps) {
  const { 
    state, 
    canProceedToNext, 
    isFirstStep, 
    isLastStep, 
    getTotalPrice,
    isValidForCart 
  } = usePokeBuilder();
  
  const totalPrice = getTotalPrice();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-peach-cream border-t border-primary/10 p-4">
      <div className="max-w-md mx-auto">
        {isLastStep ? (
          // Final step - show both Previous and Add to Cart buttons
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className="flex-shrink-0 py-3"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={onAddToCart}
              disabled={!isValidForCart}
              className={`flex-1 py-3 ${
                isValidForCart
                  ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              size="lg"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </div>
                <span className="font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </Button>
          </div>
        ) : (
          // Navigation steps
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstStep}
              className="flex-1 py-3"
              size="lg"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={!canProceedToNext()}
              className={`flex-1 py-3 ${
                canProceedToNext()
                  ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                  : 'opacity-50 cursor-not-allowed'
              }`}
              size="lg"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
        
        {/* Price display for non-final steps */}
        {!isLastStep && totalPrice > 0 && (
          <div className="text-center mt-2">
            <span className="text-sm text-primary font-medium">
              Current total: {formatPrice(totalPrice)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
