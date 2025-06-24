
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ProteinStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: proteinOptions, loading } = useBuilderOptions(5); // step_id = 5 for Protein

  if (loading) {
    return (
      <BuilderStep title="Protein" subtitle="choose max 1">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleProteinSelect = (option: any) => {
    if (state.protein === option.name) {
      dispatch({ type: 'REMOVE_PROTEIN' });
    } else {
      dispatch({ type: 'SET_PROTEIN', payload: option.name, extraPrice: option.extra_price });
    }
  };

  return (
    <BuilderStep title="Protein" subtitle="choose max 1">
      <div className="grid grid-cols-2 gap-3">
        {proteinOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.protein === option.name ? "default" : "outline"}
            className={`
              min-w-[5.5rem] py-3 px-3 whitespace-normal text-sm
              flex items-center justify-center
              max-sm:flex-col max-sm:space-y-0.5 max-sm:h-auto max-sm:min-h-[3rem]
              sm:flex-row sm:gap-1 sm:h-12
              ${state.protein === option.name
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              }
            `}
            onClick={() => handleProteinSelect(option)}
            disabled={option.out_of_stock}
          >
            <span className="font-medium text-center max-sm:text-xs">{option.name}</span>
            {option.extra_price > 0 && (
              <span className="font-semibold text-xs max-sm:text-[11px] text-accent">
                +€{option.extra_price.toFixed(2)}
              </span>
            )}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
