
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ToppingsStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: toppingOptions, loading } = useBuilderOptions(6); // step_id = 6 for Toppings

  if (loading) {
    return (
      <BuilderStep title="Toppings" subtitle="choose max 2">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleToppingToggle = (topping: string) => {
    if (state.toppings.includes(topping)) {
      dispatch({ type: 'REMOVE_TOPPING', payload: topping });
    } else {
      dispatch({ type: 'ADD_TOPPING', payload: topping });
    }
  };

  return (
    <BuilderStep title="Toppings" subtitle="choose max 2">
      <div className="grid grid-cols-2 gap-3">
        {toppingOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.toppings.includes(option.name) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.toppings.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.toppings.length >= 2 && !state.toppings.includes(option.name)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleToppingToggle(option.name)}
            disabled={option.out_of_stock || (state.toppings.length >= 2 && !state.toppings.includes(option.name))}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
