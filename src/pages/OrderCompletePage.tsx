
import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';

export function OrderCompletePage() {
  const { language, customerName } = useAppStore();
  const t = useTranslation(language);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Auto-redirect to menu after 10 seconds
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-display font-bold text-primary mb-2">
                {t('orderComplete')}
              </h1>
              <p className="text-muted-foreground">
                {t('thankYou')}
              </p>
              {customerName && (
                <p className="text-primary font-medium mt-2">
                  Merci {customerName} !
                </p>
              )}
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Votre commande a été envoyée en cuisine.
                Vous serez servi dans quelques minutes.
              </p>
              
              <Button
                onClick={() => navigate('/menu')}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Retour au menu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
