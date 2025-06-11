
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Eye } from 'lucide-react';
import { PokeBuilderProvider, usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { SizeStep } from '@/components/builder/SizeStep';
import { BaseStep } from '@/components/builder/BaseStep';
import { SauceStep } from '@/components/builder/SauceStep';
import { GarnituresStep } from '@/components/builder/GarnituresStep';
import { ProteinStep } from '@/components/builder/ProteinStep';
import { ToppingsStep } from '@/components/builder/ToppingsStep';
import { ExtraSauceStep } from '@/components/builder/ExtraSauceStep';
import { ExtraGarnitureStep } from '@/components/builder/ExtraGarnitureStep';
import { ExtraProteinStep } from '@/components/builder/ExtraProteinStep';
import { ReviewBowlModal } from '@/components/builder/ReviewBowlModal';
import { useAppStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

function PokeBuilderContent() {
  const navigate = useNavigate();
  const { state, isValidForCart, getTotalPrice } = usePokeBuilder();
  const { addToCart } = useAppStore();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const totalPrice = getTotalPrice();

  const handleReviewBowl = () => {
    if (!isValidForCart) return;
    setShowReviewModal(true);
  };

  const handleConfirmAddToCart = () => {
    // Add the custom poke bowl to cart
    addToCart({
      id: Date.now(), // Temporary ID for custom bowls
      name: "Poke perso",
      price: totalPrice,
      builderData: {
        size: state.size,
        components: {
          base: state.base,
          sauce: state.sauce,
          garnitures: state.garnitures,
          protein: state.protein,
          toppings: state.toppings,
          extraSauce: state.extraSauce,
          extraGarniture: state.extraGarniture,
          extraProtein: state.extraProtein
        }
      }
    });
    
    setShowReviewModal(false);
    navigate('/basket');
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  return (
    <div className="min-h-screen bg-peach-cream">
      {/* Header */}
      <div className="sticky top-0 bg-peach-cream z-40 border-b border-primary/10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary">
              Compose your bowl
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-24">
        {/* Size Step */}
        <SizeStep />
        
        {/* Base Step */}
        <BaseStep />
        
        {/* Sauce Step */}
        <SauceStep />
        
        {/* Garnitures Step */}
        <GarnituresStep />
        
        {/* Protein Step */}
        <ProteinStep />
        
        {/* Toppings Step */}
        <ToppingsStep />
        
        {/* Extra Steps */}
        <ExtraSauceStep />
        
        <ExtraGarnitureStep />
        
        <ExtraProteinStep />
      </div>

      {/* Review Bowl Button with Price */}
      <div className="fixed bottom-0 left-0 right-0 bg-peach-cream border-t border-primary/10 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleReviewBowl}
            disabled={!isValidForCart}
            className={`w-full py-4 ${
              isValidForCart
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'opacity-50 cursor-not-allowed'
            }`}
            size="lg"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>Review bowl</span>
              </div>
              <span className="font-bold">{formatPrice(totalPrice)}</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Review Modal */}
      <ReviewBowlModal
        isOpen={showReviewModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAddToCart}
      />
    </div>
  );
}

export function PokeBuilderPage() {
  return (
    <PokeBuilderProvider>
      <PokeBuilderContent />
    </PokeBuilderProvider>
  );
}
