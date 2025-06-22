
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function SauceStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: sauceOptions, loading } = useBuilderOptions(3); // step_id = 3 for Sauce

  if (loading) {
    return (
      <BuilderStep title="Sauce" subtitle="choose max 2">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleSauceToggle = (sauce: string) => {
    if (state.sauce.includes(sauce)) {
      dispatch({ type: 'REMOVE_SAUCE', payload: sauce });
    } else {
      dispatch({ type: 'ADD_SAUCE', payload: sauce });
    }
  };

  return (
    <BuilderStep title="Sauce" subtitle="choose max 2">
      <div className="grid grid-cols-2 gap-3">
        {sauceOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.sauce.includes(option.name) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.sauce.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.sauce.length >= 2 && !state.sauce.includes(option.name)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleSauceToggle(option.name)}
            disabled={option.out_of_stock || (state.sauce.length >= 2 && !state.sauce.includes(option.name))}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
