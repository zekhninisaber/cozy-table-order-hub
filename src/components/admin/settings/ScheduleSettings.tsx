
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Clock } from 'lucide-react';
import { useState } from 'react';

interface DaySchedule {
  enabled: boolean;
  openTime: string;
  closeTime: string;
}

interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export function ScheduleSettings() {
  const [schedule, setSchedule] = useState<WeekSchedule>({
    monday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    tuesday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    wednesday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    thursday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    friday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    saturday: { enabled: true, openTime: '11:00', closeTime: '22:00' },
    sunday: { enabled: false, openTime: '11:00', closeTime: '22:00' }
  });

  const dayNames = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };

  const updateDay = (day: keyof WeekSchedule, field: keyof DaySchedule, value: boolean | string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    console.log('Saving schedule:', schedule);
    // TODO: Implement schedule save logic
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-primary flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Horaires d'ouverture
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(schedule).map(([day, daySchedule]) => (
            <div key={day} className="flex items-center space-x-4 p-4 border rounded-md">
              <div className="w-24">
                <Label className="font-medium">{dayNames[day as keyof typeof dayNames]}</Label>
              </div>
              
              <Switch
                checked={daySchedule.enabled}
                onCheckedChange={(checked) => updateDay(day as keyof WeekSchedule, 'enabled', checked)}
              />
              
              {daySchedule.enabled ? (
                <div className="flex items-center space-x-2">
                  <div>
                    <Label className="text-sm text-muted-foreground">Ouverture</Label>
                    <Input
                      type="time"
                      value={daySchedule.openTime}
                      onChange={(e) => updateDay(day as keyof WeekSchedule, 'openTime', e.target.value)}
                      className="w-32"
                    />
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Fermeture</Label>
                    <Input
                      type="time"
                      value={daySchedule.closeTime}
                      onChange={(e) => updateDay(day as keyof WeekSchedule, 'closeTime', e.target.value)}
                      className="w-32"
                    />
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground italic">Fermé</span>
              )}
            </div>
          ))}
          
          <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder les horaires
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
