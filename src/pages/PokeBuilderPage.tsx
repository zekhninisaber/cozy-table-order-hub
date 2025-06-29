
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PokeBuilderProvider } from '@/contexts/PokeBuilderContext';
import { StepHeader } from '@/components/builder/StepHeader';
import { BuilderStep } from '@/components/builder/BuilderStep';
import { StepFooter } from '@/components/builder/StepFooter';
import { ReviewBowlModal } from '@/components/builder/ReviewBowlModal';
import { useAppStore } from '@/lib/store';

export default function PokeBuilderPage() {
  const navigate = useNavigate();
  const { step } = useParams();
  const { addToCart, getCartItemCount } = useAppStore();
  
  const itemCount = getCartItemCount();
  const hasCartItems = itemCount > 0;
  
  useEffect(() => {
    // Redirect to step 1 if no step is specified
    if (!step) {
      navigate('/poke-builder/1', { replace: true });
    }
  }, [step, navigate]);

  const handleAddToCart = (cartItem: any) => {
    addToCart(cartItem);
    // Navigate to basket with state indicating we came from poke builder
    navigate('/basket', { state: { fromPokeBuilder: true } });
  };

  return (
    <div className="min-h-screen bg-peach-cream">
      <div className={`max-w-md mx-auto ${hasCartItems ? 'pt-20' : 'pt-8'}`}>
        <PokeBuilderProvider>
          <StepHeader />
          <BuilderStep />
          <StepFooter />
          <ReviewBowlModal onAddToCart={handleAddToCart} />
        </PokeBuilderProvider>
      </div>
    </div>
  );
}
