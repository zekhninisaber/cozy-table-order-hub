
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';

export function ClosedPage() {
  const { language } = useAppStore();
  const t = useTranslation(language);
  
  return (
    <div className="min-h-screen bg-dominant p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            <Clock className="h-16 w-16 text-accent mx-auto mb-6" />
            <h1 className="text-2xl font-serif font-bold text-secondary mb-4">
              Nous sommes fermés
            </h1>
            <p className="text-accent">
              {t('closedMessage')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
