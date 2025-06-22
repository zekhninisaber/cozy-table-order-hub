
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ExtraGarnitureStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: extraGarnitureOptions, loading } = useBuilderOptions(8); // step_id = 8 for Extra Garniture

  if (loading) {
    return (
      <BuilderStep title="Extra Garniture" subtitle="+€1 each">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleExtraGarnitureToggle = (garniture: string) => {
    if (state.extraGarniture.includes(garniture)) {
      dispatch({ type: 'REMOVE_EXTRA_GARNITURE', payload: garniture });
    } else {
      dispatch({ type: 'ADD_EXTRA_GARNITURE', payload: garniture });
    }
  };

  return (
    <BuilderStep title="Extra Garniture" subtitle="+€1 each">
      <div className="grid grid-cols-2 gap-3">
        {extraGarnitureOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.extraGarniture.includes(option.name) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.extraGarniture.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleExtraGarnitureToggle(option.name)}
            disabled={option.out_of_stock}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
