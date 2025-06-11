
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function ExtraGarnitureStep() {
  const { state, dispatch } = usePokeBuilder();

  const garnitureOptions = [
    'Avocat', 'Edamame', 'Concombre', 'Mangue', 'Carotte',
    'Oignons frits', 'Mais', 'Radis', 'Betterave',
    'Wakame', 'Ananas', 'Coriandre', 'Tomate', 'Chou rouge',
    'Oignons nouveaux', 'Courgette', 'Jalapeño'
  ];

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
        {garnitureOptions.map((garniture) => (
          <Button
            key={garniture}
            variant={state.extraGarniture.includes(garniture) ? "default" : "outline"}
            className={`h-auto py-3 px-4 text-sm ${
              state.extraGarniture.includes(garniture)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleExtraGarnitureToggle(garniture)}
          >
            {garniture}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
