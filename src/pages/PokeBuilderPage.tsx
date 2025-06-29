
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokeBuilderProvider, usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { StepHeader } from '@/components/builder/StepHeader';
import { StepFooter } from '@/components/builder/StepFooter';
import { ReviewBowlModal } from '@/components/builder/ReviewBowlModal';
import { useAppStore } from '@/lib/store';

// Import all step components
import { SizeStep } from '@/components/builder/SizeStep';
import { BaseStep } from '@/components/builder/BaseStep';
import { SauceStep } from '@/components/builder/SauceStep';
import { GarnituresStep } from '@/components/builder/GarnituresStep';
import { ProteinStep } from '@/components/builder/ProteinStep';
import { ToppingsStep } from '@/components/builder/ToppingsStep';
import { ExtraSauceStep } from '@/components/builder/ExtraSauceStep';
import { ExtraGarnitureStep } from '@/components/builder/ExtraGarnitureStep';
import { ExtraProteinStep } from '@/components/builder/ExtraProteinStep';

function PokeBuilderContent() {
  const navigate = useNavigate();
  const { step } = useParams();
  const { addToCart, getCartItemCount } = useAppStore();
  const { state, dispatch, getTotalPrice, isValidForCart } = usePokeBuilder();
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  const itemCount = getCartItemCount();
  const hasCartItems = itemCount > 0;

  useEffect(() => {
    // Redirect to step 1 if no step is specified
    if (!step) {
      navigate('/poke-builder/1', { replace: true });
      return;
    }
    
    // Update current step based on URL
    const stepNumber = parseInt(step, 10);
    if (stepNumber && stepNumber !== state.currentStep) {
      dispatch({ type: 'GO_TO_STEP', payload: stepNumber });
    }
  }, [step, navigate, state.currentStep, dispatch]);

  const handleBack = () => {
    navigate('/category/3', { replace: true });
  };

  const handlePrevious = () => {
    if (state.currentStep > 1) {
      dispatch({ type: 'PREV_STEP' });
      navigate(`/poke-builder/${state.currentStep - 1}`, { replace: true });
    }
  };

  const handleNext = () => {
    if (state.currentStep < state.totalSteps) {
      dispatch({ type: 'NEXT_STEP' });
      navigate(`/poke-builder/${state.currentStep + 1}`, { replace: true });
    }
  };

  const handleAddToCart = () => {
    if (isValidForCart) {
      setShowReviewModal(true);
    }
  };

  const handleConfirmAdd = () => {
    const cartItem = {
      id: Date.now(), // Simple ID generation
      name: `Poke Bowl Personnalisé`,
      price: getTotalPrice(),
      quantity: 1,
      builderData: {
        size: state.size,
        base: state.base,
        sauce: state.sauce,
        garnitures: state.garnitures,
        protein: state.protein,
        toppings: state.toppings,
        extraSauce: state.extraSauce,
        extraGarniture: state.extraGarniture,
        extraProtein: state.extraProtein
      }
    };
    
    addToCart(cartItem);
    setShowReviewModal(false);
    navigate('/basket', { state: { fromPokeBuilder: true } });
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
      <div className={`max-w-md mx-auto ${hasCartItems ? 'pt-20' : 'pt-8'}`}>
        <StepHeader onBack={handleBack} />
        <div className="px-4 py-4">
          {renderCurrentStep()}
        </div>
        <StepFooter 
          onPrevious={handlePrevious}
          onNext={handleNext}
          onAddToCart={handleAddToCart}
        />
        <ReviewBowlModal 
          isOpen={showReviewModal}
          onClose={() => setShowReviewModal(false)}
          onConfirm={handleConfirmAdd}
        />
      </div>
    </div>
  );
}

export default function PokeBuilderPage() {
  return (
    <PokeBuilderProvider>
      <PokeBuilderContent />
    </PokeBuilderProvider>
  );
}
