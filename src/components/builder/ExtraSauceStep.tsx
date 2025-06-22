
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ExtraSauceStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: extraSauceOptions, loading } = useBuilderOptions(7); // step_id = 7 for Extra Sauce

  if (loading) {
    return (
      <BuilderStep title="Extra Sauce" subtitle="+€1 each">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

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
        {extraSauceOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.extraSauce.includes(option.name) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.extraSauce.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleExtraSauceToggle(option.name)}
            disabled={option.out_of_stock}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
