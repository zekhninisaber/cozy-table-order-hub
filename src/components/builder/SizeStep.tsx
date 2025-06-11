
import { Button } from '@/components/ui/button';
import { usePokeBuilder } from '@/contexts/PokeBuilderContext';
import { BuilderStep } from './BuilderStep';

export function SizeStep() {
  const { state, dispatch } = usePokeBuilder();

  const sizeOptions = [
    { size: 'Regular', price: '€12,90' },
    { size: 'Large', price: '€14,90' }
  ] as const;

  return (
    <BuilderStep title="Size" subtitle="choose 1">
      <div className="grid grid-cols-2 gap-3">
        {sizeOptions.map(({ size, price }) => (
          <Button
            key={size}
            variant={state.size === size ? "default" : "outline"}
            className={`flex flex-col h-auto py-3 px-4 ${
              state.size === size 
                ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                : 'hover:bg-accent/10'
            }`}
            onClick={() => dispatch({ type: 'SET_SIZE', payload: size })}
          >
            <span className="font-medium">{size}</span>
            <span className="text-sm opacity-80">{price}</span>
          </Button>
        ))}
      </div>
    </BuilderStep>
  );
}
