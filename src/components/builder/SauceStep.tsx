
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';
import { useBuilderOptions } from '@/hooks/useMenu';

export function SauceStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: sauceOptions, loading } = useBuilderOptions(3); // step_id = 3 for Sauce

  if (loading) {
    return (
      <BuilderStep title="Sauce" subtitle="choose max 2">
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </BuilderStep>
    );
  }

  const handleSauceToggle = (option: any) => {
    if (state.sauce.includes(option.name)) {
      dispatch({ type: 'REMOVE_SAUCE', payload: option.name });
    } else {
      dispatch({ type: 'ADD_SAUCE', payload: option.name, extraPrice: option.extra_price });
    }
  };

  return (
    <BuilderStep title="Sauce" subtitle="choose max 2">
      <div className="grid grid-cols-2 gap-3">
        {sauceOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.sauce.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] py-3 px-3 whitespace-normal text-sm
              flex items-center justify-center
              max-sm:flex-col max-sm:space-y-0.5 max-sm:h-auto max-sm:min-h-[3rem]
              sm:flex-row sm:gap-1 sm:h-12
              ${state.sauce.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              } ${
                state.sauce.length >= 2 && !state.sauce.includes(option.name)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }
            `}
            onClick={() => handleSauceToggle(option)}
            disabled={option.out_of_stock || (state.sauce.length >= 2 && !state.sauce.includes(option.name))}
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
