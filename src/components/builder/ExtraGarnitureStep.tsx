
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { useBuilderOptions } from '@/hooks/useMenu';

export function ExtraGarnitureStep() {
  const { state, dispatch } = usePokeBuilder();
  const { options: extraGarnitureOptions, loading } = useBuilderOptions(8); // step_id = 8 for Extra Garniture

  if (loading) {
    return (
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-primary">Extra Garniture</h3>
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

  const handleExtraGarnitureToggle = (garniture: string) => {
    if (state.extraGarniture.includes(garniture)) {
      dispatch({ type: 'REMOVE_EXTRA_GARNITURE', payload: garniture });
    } else {
      dispatch({ type: 'ADD_EXTRA_GARNITURE', payload: garniture });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-primary">Extra Garniture</h3>
        <p className="text-sm text-primary opacity-70">+€1 each</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {extraGarnitureOptions.map((option) => (
          <Button
            key={option.id}
            variant={state.extraGarniture.includes(option.name) ? "default" : "outline"}
            className={`
              min-w-[5.5rem] px-3 text-sm whitespace-normal
              flex items-center justify-center text-center
              max-sm:flex-col max-sm:py-1
              sm:flex-row sm:py-2 sm:gap-1
              ${state.extraGarniture.includes(option.name)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
              }
            `}
            onClick={() => handleExtraGarnitureToggle(option.name)}
            disabled={option.out_of_stock}
          >
            <span className="whitespace-normal leading-tight text-center">{option.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
