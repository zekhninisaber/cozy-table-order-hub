
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function ExtraSauceStep() {
  const { state, dispatch } = usePokeBuilder();

  const sauceOptions = ['Sésame', 'Teriyaki', 'Soja', 'Ponzu', 'Miso', 'Épicée'];

  const handleExtraSauceToggle = (sauce: string) => {
    if (state.extraSauce.includes(sauce)) {
      dispatch({ type: 'REMOVE_EXTRA_SAUCE', payload: sauce });
    } else {
      dispatch({ type: 'ADD_EXTRA_SAUCE', payload: sauce });
    }
  };

  return (
    <BuilderStep title="Extra Sauce" subtitle="+€1 each">
      <div className="grid grid-cols-2 gap-3">
        {sauceOptions.map((sauce) => (
          <Button
            key={sauce}
            variant={state.extraSauce.includes(sauce) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.extraSauce.includes(sauce)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleExtraSauceToggle(sauce)}
          >
            {sauce}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
