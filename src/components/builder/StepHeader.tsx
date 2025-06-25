
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';

interface StepHeaderProps {
  onBack: () => void;
}

export function StepHeader({ onBack }: StepHeaderProps) {
  const { state, getStepTitle } = usePokeBuilder();

  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="p-2"
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
  );
}
