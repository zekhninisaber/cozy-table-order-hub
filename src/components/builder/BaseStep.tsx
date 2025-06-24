
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function BaseStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: baseOptions, loading } = useBuilderOptions(2); // step_id = 2 for Base

  if (loading) {
    return (
      <BuilderStep title="Base" subtitle="choose max 2">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleBaseToggle = (option: any) => {
    if (state.base.includes(option.name)) {
      dispatch({ type: 'REMOVE_BASE', payload: option.name });
    } else {
      dispatch({ type: 'ADD_BASE', payload: option.name, extraPrice: option.extra_price });
    }
  };

  return (
    <BuilderStep title="Base" subtitle="choose max 2">
      <div className="grid grid-cols-2 gap-3">
        {baseOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.base.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
              ${state.base.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              } ${
                state.base.length >= 2 && !state.base.includes(option.name)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
            `}
            onClick={() => handleBaseToggle(option)}
            disabled={option.out_of_stock || (state.base.length >= 2 && !state.base.includes(option.name))}
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
