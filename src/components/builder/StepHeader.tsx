
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { useAppStore } from '@/lib/store';

interface StepHeaderProps {
  onBack: () => void;
}

export function StepHeader({ onBack }: StepHeaderProps) {
  const { state, getStepTitle } = usePokeBuilder();
  const { getCartItemCount } = useAppStore();
  
  const hasCartItems = getCartItemCount() > 0;

  return (
    <div className="sticky top-0 z-50 bg-peach-cream border-b border-primary/10">
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 hover:bg-primary/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl font-bold text-primary">
            {getStepTitle()}
          </h1>
          <p className="text-sm text-primary opacity-70">
            Step {state.currentStep} of {state.totalSteps}
          </p>
        </div>
        
        <div className="w-9" /> {/* Spacer for centering */}
      </div>
    </div>
  );
}
