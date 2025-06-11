
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

export function PokeBuilderPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-peach-cream p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-primary text-center">
            Compose your bowl
          </h1>
        </div>
        
        <Card className="shadow-md border-0">
          <CardContent className="p-6 text-center">
            <p className="text-primary mb-6">Builder coming soon…</p>
            <Button 
              onClick={() => navigate(-1)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to menu
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
