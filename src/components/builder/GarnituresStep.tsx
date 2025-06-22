
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

  const handleGarnitureToggle = (garniture: string) => {
    if (state.garnitures.includes(garniture)) {
      dispatch({ type: 'REMOVE_GARNITURE', payload: garniture });
    } else {
      dispatch({ type: 'ADD_GARNITURE', payload: garniture });
    }
  };

  return (
    <BuilderStep title="Garnitures" subtitle="choose max 5">
      <div className="grid grid-cols-2 gap-3">
        {garnitureOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.garnitures.includes(option.name) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.garnitures.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.garnitures.length >= 5 && !state.garnitures.includes(option.name)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleGarnitureToggle(option.name)}
            disabled={option.out_of_stock || (state.garnitures.length >= 5 && !state.garnitures.includes(option.name))}
          >
            {option.name}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
