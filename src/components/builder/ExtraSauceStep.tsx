
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ExtraSauceStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: extraSauceOptions, loading } = useBuilderOptions(7); // step_id = 7 for Extra Sauce

  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary">Extra Sauce</h3>
          <p className="text-sm text-primary opacity-70">+€1 each</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
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
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary">Extra Sauce</h3>
        <p className="text-sm text-primary opacity-70">+€1 each</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {extraSauceOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.extraSauce.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
              ${state.extraSauce.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              }
            `}
            onClick={() => handleExtraSauceToggle(option.name)}
            disabled={option.out_of_stock}
          >
            <span className="whitespace-normal leading-tight text-center">{option.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
