
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Info } from 'lucide-react';

export function ScheduleSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Horaires d'ouverture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">
                Service 24/7 activé
              </h4>
              <p className="text-sm text-blue-700">
                Les horaires d'ouverture ont été désactivés. Le menu est maintenant accessible 24 heures sur 24, 7 jours sur 7.
              </p>
              <p className="text-xs text-blue-600 mt-2">
                (Configuration d'horaires - Legacy, non utilisée)
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
