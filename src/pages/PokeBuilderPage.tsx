
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { PokeBuilderProvider, usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { SizeStep } from '@/components/builder/SizeStep';
import { BaseStep } from '@/components/builder/BaseStep';
import { SauceStep } from '@/components/builder/SauceStep';
import { GarnituresStep } from '@/components/builder/GarnituresStep';
import { BuilderStep } from '@/components/builder/BuilderStep';
import { useAppStore } from '@/lib/store';

function PokeBuilderContent() {
  const navigate = useNavigate();
  const { state, isValidForCart } = usePokeBuilder();
  const { addToCart } = useAppStore();

  const handleAddToCart = () => {
    if (!isValidForCart) return;
    
    // Add the custom poke bowl to cart
    addToCart({
      id: Date.now(), // Temporary ID for custom bowls
      name: `Custom Poke Bowl (${state.size})`,
      price: state.size === 'Large' ? 14.90 : 12.90,
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
    
    navigate('/basket');
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
        
        {/* Placeholder Steps */}
        <BuilderStep title="Protein" subtitle="coming soon">
          <p className="text-sm text-primary opacity-60">Step coming soon...</p>
        </BuilderStep>
        
        <BuilderStep title="Toppings" subtitle="coming soon">
          <p className="text-sm text-primary opacity-60">Step coming soon...</p>
        </BuilderStep>
        
        <BuilderStep title="Extra Sauce" subtitle="coming soon">
          <p className="text-sm text-primary opacity-60">Step coming soon...</p>
        </BuilderStep>
        
        <BuilderStep title="Extra Garniture" subtitle="coming soon">
          <p className="text-sm text-primary opacity-60">Step coming soon...</p>
        </BuilderStep>
        
        <BuilderStep title="Extra Protein" subtitle="coming soon">
          <p className="text-sm text-primary opacity-60">Step coming soon...</p>
        </BuilderStep>
      </div>

      {/* Add to Cart Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-peach-cream border-t border-primary/10 p-4">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleAddToCart}
            disabled={!isValidForCart}
            className={`w-full py-4 ${
              isValidForCart
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'opacity-50 cursor-not-allowed'
            }`}
            size="lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to cart
          </Button>
        </div>
      </div>
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
