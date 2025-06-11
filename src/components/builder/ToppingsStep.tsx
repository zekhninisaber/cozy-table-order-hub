
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function ToppingsStep() {
  const { state, dispatch } = usePokeBuilder();

  const toppingOptions = [
    'Graines de sésame', 'Cacahuètes', 'Crispy oignons',
    'Furikake', 'Chips wonton', 'Menthe'
  ];

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
        {toppingOptions.map((topping) => (
          <Button
            key={topping}
            variant={state.toppings.includes(topping) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.toppings.includes(topping)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.toppings.length >= 2 && !state.toppings.includes(topping)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleToppingToggle(topping)}
            disabled={state.toppings.length >= 2 && !state.toppings.includes(topping)}
          >
            {topping}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
