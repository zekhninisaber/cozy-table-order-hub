
import { useNavigate } from 'react-router-dom';
import { AddButton } from '@/components/ui/add-button';
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
          <h3 className="text-lg font-serif font-semibold text-secondary">
            Create Your Perfect Bowl
          </h3>
          <p className="text-sm text-accent opacity-80">
            Choose your base, protein, vegetables, sauce and toppings
          </p>
          <AddButton 
            onClick={(e) => {
              e.stopPropagation();
              handleMakeYourOwn();
            }}
          >
            Start Building
          </AddButton>
        </div>
      </CardContent>
    </Card>
  );
}
