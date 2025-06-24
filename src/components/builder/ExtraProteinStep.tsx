
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ExtraProteinStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: extraProteinOptions, loading } = useBuilderOptions(9); // step_id = 9 for Extra Protein

  if (loading) {
    return (
      <BuilderStep title="Extra Protein" subtitle="+€2 each">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

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
        {extraProteinOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.extraProtein.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
              ${state.extraProtein.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              }
            `}
            onClick={() => handleExtraProteinToggle(option.name)}
            disabled={option.out_of_stock}
          >
            <span className="whitespace-normal leading-tight text-center">{option.name}</span>
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
