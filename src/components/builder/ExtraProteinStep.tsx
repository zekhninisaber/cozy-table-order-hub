
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function ExtraProteinStep() {
  const { state, dispatch } = usePokeBuilder();

  const proteinOptions = ['Saumon', 'Thon', 'Poulet', 'Crevettes', 'Tofu', 'Tempeh'];

  const handleExtraProteinToggle = (protein: string) => {
    if (state.extraProtein.includes(protein)) {
      dispatch({ type: 'REMOVE_EXTRA_PROTEIN', payload: protein });
    } else {
      dispatch({ type: 'ADD_EXTRA_PROTEIN', payload: protein });
    }
  };

  return (
    <BuilderStep title="Extra Protein" subtitle="+€2 each">
      <div className="grid grid-cols-2 gap-3">
        {proteinOptions.map((protein) => (
          <Button
            key={protein}
            variant={state.extraProtein.includes(protein) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.extraProtein.includes(protein)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleExtraProteinToggle(protein)}
          >
            {protein}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
