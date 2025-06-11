
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function GarnituresStep() {
  const { state, dispatch } = usePokeBuilder();

  const garnitureOptions = [
    'Avocat', 'Edamame', 'Concombre', 'Mangue', 'Carotte',
    'Oignons frits', 'Mais', 'Radis', 'Betterave',
    'Wakame', 'Ananas', 'Coriandre', 'Tomate', 'Chou rouge',
    'Oignons nouveaux', 'Courgette', 'Jalapeño'
  ];

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
        {garnitureOptions.map((garniture) => (
          <Button
            key={garniture}
            variant={state.garnitures.includes(garniture) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.garnitures.includes(garniture)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.garnitures.length >= 5 && !state.garnitures.includes(garniture)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleGarnitureToggle(garniture)}
            disabled={state.garnitures.length >= 5 && !state.garnitures.includes(garniture)}
          >
            {garniture}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
