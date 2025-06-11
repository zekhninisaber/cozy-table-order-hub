
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function MakeYourOwnCard() {
  const navigate = useNavigate();

  const handleMakeYourOwn = () => {
    navigate('/poke-builder');
  };

  return (
    <Card className="shadow-md border-0 cursor-pointer hover:shadow-lg transition-shadow" onClick={handleMakeYourOwn}>
      <CardContent className="p-6 text-center">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary">
            Create Your Perfect Bowl
          </h3>
          <p className="text-sm text-primary opacity-80">
            Choose your base, protein, vegetables, sauce and toppings
          </p>
          <Button 
            className="bg-accent hover:bg-accent/90 text-accent-foreground w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleMakeYourOwn();
            }}
          >
            Start Building
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
