
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function SizeStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: sizeOptions, loading } = useBuilderOptions(1); // step_id = 1 for Size

  if (loading) {
    return (
      <BuilderStep title="Taille" subtitle="choisir 1">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-16 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </BuilderStep>
    );
  }

  return (
    <BuilderStep title="Taille" subtitle="choisir 1">
      <div className="grid grid-cols-2 gap-3">
        {sizeOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.size === option.name ? "default" : "outline"}
            className={`flex flex-col h-auto py-3 px-4 ${
              state.size === option.name 
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                : 'hover:bg-accent/10'
            }`}
            onClick={() => dispatch({ type: 'SET_SIZE', payload: option.name })}
            disabled={option.out_of_stock}
          >
            <span className="font-medium">{option.name}</span>
            <span className="text-sm opacity-80">
              {option.extra_price > 0 ? `+€${option.extra_price.toFixed(2)}` : '€12,90'}
            </span>
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
