
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function GarnituresStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: garnitureOptions, loading } = useBuilderOptions(4); // step_id = 4 for Garnitures

  if (loading) {
    return (
      <BuilderStep title="Garnitures" subtitle="choose max 5">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleGarnitureToggle = (option: any) => {
    if (state.garnitures.includes(option.name)) {
      dispatch({ type: 'REMOVE_GARNITURE', payload: option.name });
    } else {
      dispatch({ type: 'ADD_GARNITURE', payload: option.name, extraPrice: option.extra_price });
    }
  };

  return (
    <BuilderStep title="Garnitures" subtitle="choose max 5">
      <div className="grid grid-cols-2 gap-3">
        {garnitureOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.garnitures.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
              ${state.garnitures.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              } ${
                state.garnitures.length >= 5 && !state.garnitures.includes(option.name)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
            `}
            onClick={() => handleGarnitureToggle(option)}
            disabled={option.out_of_stock || (state.garnitures.length >= 5 && !state.garnitures.includes(option.name))}
          >
            <span className="whitespace-normal leading-tight text-center">{option.name}</span>
            {option.extra_price > 0 && (
              <span className="font-medium text-xs text-gray-600 leading-tight max-sm:mt-0 sm:ml-1">
                +€{option.extra_price.toFixed(2)}
              </span>
            )}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
