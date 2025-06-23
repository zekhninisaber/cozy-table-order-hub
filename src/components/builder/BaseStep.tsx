
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
            className={`h-auto py-3 px-4 flex flex-col ${
              state.base.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.base.length >= 2 && !state.base.includes(option.name)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleBaseToggle(option)}
            disabled={option.out_of_stock || (state.base.length >= 2 && !state.base.includes(option.name))}
          >
            <span className="font-medium">{option.name}</span>
            {option.extra_price > 0 && (
              <span className="text-xs opacity-80">+€{option.extra_price.toFixed(2)}</span>
            )}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
