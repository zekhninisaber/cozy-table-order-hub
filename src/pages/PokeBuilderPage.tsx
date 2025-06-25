
import { useNavigate } from 'react-router-dom';
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
import { StepHeader } from '@/components/builder/StepHeader';
import { StepFooter } from '@/components/builder/StepFooter';
import { ReviewBowlModal } from '@/components/builder/ReviewBowlModal';
import { CartSummary } from '@/components/layout/CartSummary';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

function PokeBuilderContent() {
  const navigate = useNavigate();
  const { state, dispatch, getTotalPrice } = usePokeBuilder();
  const { addToCart, getCartItemCount } = useAppStore();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const itemCount = getCartItemCount();
  const hasCartItems = itemCount > 0;
  const totalPrice = getTotalPrice();

  const handleBack = () => {
    if (state.currentStep === 1) {
      navigate(-1);
    } else {
      dispatch({ type: 'PREV_STEP' });
    }
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrevious = () => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleAddToCart = () => {
    setShowReviewModal(true);
  };

  const handleConfirmAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: "Poke perso",
      price: totalPrice,
      builderData: {
        size: state.size || '',
        base: state.base,
        sauce: state.sauce,
        garnitures: state.garnitures,
        protein: state.protein,
        toppings: state.toppings,
        extraSauce: state.extraSauce,
        extraGarniture: state.extraGarniture,
        extraProtein: state.extraProtein
      }
    });
    
    setShowReviewModal(false);
    navigate('/basket');
  };

  const handleCloseModal = () => {
    setShowReviewModal(false);
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <SizeStep />;
      case 2:
        return <BaseStep />;
      case 3:
        return <SauceStep />;
      case 4:
        return <GarnituresStep />;
      case 5:
        return <ProteinStep />;
      case 6:
        return <ToppingsStep />;
      case 7:
        return <ExtraSauceStep />;
      case 8:
        return <ExtraGarnitureStep />;
      case 9:
        return <ExtraProteinStep />;
      default:
        return <SizeStep />;
    }
  };

  return (
    <div className="min-h-screen bg-peach-cream">
      <CartSummary />
      
      {/* Header positioned below cart bar when cart has items */}
      <StepHeader onBack={handleBack} />

      {/* Content with proper spacing for both cart and header */}
      <main className={`${hasCartItems ? 'pt-[calc(var(--cart-bar-h)+80px)]' : 'pt-20'} max-w-md mx-auto p-4 pb-32`}>
        {renderCurrentStep()}
      </main>

      {/* Footer Navigation */}
      <StepFooter
        onPrevious={handlePrevious}
        onNext={handleNext}
        onAddToCart={handleAddToCart}
      />

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
