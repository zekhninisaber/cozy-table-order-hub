
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { useBuilderOptions } from '@/hooks/useMenu';

export function SauceStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: sauceOptions, loading } = useBuilderOptions(3); // step_id = 3 for Sauce

  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary">Sauce</h3>
          <p className="text-sm text-primary opacity-70">choose max 2</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
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
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary">Sauce</h3>
        <p className="text-sm text-primary opacity-70">choose max 2</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {sauceOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.sauce.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
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
            <span className="whitespace-normal leading-tight text-center">{option.name}</span>
            {option.extra_price > 0 && (
              <span className="font-medium text-xs text-gray-600 leading-tight max-sm:mt-0 sm:ml-1">
                +€{option.extra_price.toFixed(2)}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
