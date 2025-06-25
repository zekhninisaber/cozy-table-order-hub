
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
          <div className="h-9 sm:h-10 bg-gray-200 animate-pulse rounded"></div>
          <div className="h-9 sm:h-10 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </BuilderStep>
    );
  }

  const handleSizeSelect = (optionName: string, extraPrice: number) => {
    dispatch({ type: 'SET_SIZE', payload: optionName, extraPrice });
  };

  return (
    <BuilderStep title="Taille" subtitle="choisir 1">
      <div className="grid grid-cols-2 gap-3">
        {sizeOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.size === option.name ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              flex-row gap-1
              max-sm:py-1 sm:py-2
              ${state.size === option.name 
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                : 'hover:bg-accent/10'
              }
            `}
            onClick={() => handleSizeSelect(option.name, option.extra_price)}
            disabled={option.out_of_stock}
          >
            <span className="font-medium truncate">{option.name}</span>
            {option.extra_price > 0 ? (
              <span className="text-xs font-medium text-gray-600">+€{option.extra_price.toFixed(2)}</span>
            ) : (
              <span className="text-xs font-medium text-gray-600">€12,90</span>
            )}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
