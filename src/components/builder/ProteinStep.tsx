
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function ProteinStep() {
  const { state, dispatch } = usePokeBuilder();

  const proteinOptions = ['Saumon', 'Thon', 'Poulet', 'Crevettes', 'Tofu', 'Tempeh'];

  const handleProteinSelect = (protein: string) => {
    if (state.protein === protein) {
      dispatch({ type: 'REMOVE_PROTEIN' });
    } else {
      dispatch({ type: 'SET_PROTEIN', payload: protein });
    }
  };

  return (
    <BuilderStep title="Protein" subtitle="choose max 1">
      <div className="grid grid-cols-2 gap-3">
        {proteinOptions.map((protein) => (
          <Button
            key={protein}
            variant={state.protein === protein ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.protein === protein
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            }`}
            onClick={() => handleProteinSelect(protein)}
          >
            {protein}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
