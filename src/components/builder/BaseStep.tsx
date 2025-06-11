
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function BaseStep() {
  const { state, dispatch } = usePokeBuilder();

  const baseOptions = ['Riz blanc', 'Riz sushi', 'Quinoa', 'Salade'];

  const handleBaseToggle = (base: string) => {
    if (state.base.includes(base)) {
      dispatch({ type: 'REMOVE_BASE', payload: base });
    } else {
      dispatch({ type: 'ADD_BASE', payload: base });
    }
  };

  return (
    <BuilderStep title="Base" subtitle="choose max 2">
      <div className="grid grid-cols-2 gap-3">
        {baseOptions.map((base) => (
          <Button
            key={base}
            variant={state.base.includes(base) ? "default" : "outline"}
            className={`h-auto py-3 px-4 ${
              state.base.includes(base)
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground'
                : 'hover:bg-accent/10'
            } ${
              state.base.length >= 2 && !state.base.includes(base)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onClick={() => handleBaseToggle(base)}
            disabled={state.base.length >= 2 && !state.base.includes(base)}
          >
            {base}
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
