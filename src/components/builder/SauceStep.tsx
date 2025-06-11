
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function SauceStep() {
  const { state, dispatch } = usePokeBuilder();

  const sauceOptions = ['Sésame', 'Teriyaki', 'Soja', 'Ponzu', 'Miso', 'Épicée'];

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
        {sauceOptions.map((sauce) => (
          <Button
            key={sauce}
            variant={state.sauce.includes(sauce) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.sauce.includes(sauce)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.sauce.length >= 2 && !state.sauce.includes(sauce)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleSauceToggle(sauce)}
            disabled={state.sauce.length >= 2 && !state.sauce.includes(sauce)}
          >
            {sauce}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
