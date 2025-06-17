
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Save, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DaySchedule {
  closed: boolean;
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

const defaultSchedule: WeekSchedule = {
  monday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  tuesday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  wednesday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  thursday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  friday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  saturday: { closed: false, openTime: '11:00', closeTime: '22:00' },
  sunday: { closed: true, openTime: '11:00', closeTime: '22:00' }
};

export function ScheduleSettings() {
  const [schedule, setSchedule] = useState<WeekSchedule>(defaultSchedule);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const dayNames = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche'
  };

  // Load schedule on component mount
  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      // TODO: Replace with Supabase query when integrated
      // const { data } = await supabase
      //   .from('settings')
      //   .select('opening_hours')
      //   .eq('key', 'opening_hours')
      //   .single();
      
      // For now, use localStorage
      const saved = localStorage.getItem('opening_hours');
      if (saved) {
        setSchedule(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading schedule:', error);
    }
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

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with Supabase mutation when integrated
      // await supabase
      //   .from('settings')
      //   .upsert({
      //     key: 'opening_hours',
      //     opening_hours: schedule
      //   });

      // For now, save to localStorage
      localStorage.setItem('opening_hours', JSON.stringify(schedule));
      
      toast({
        title: "Horaires sauvegardés",
        description: "Les horaires d'ouverture ont été mis à jour avec succès.",
      });
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder les horaires.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={daySchedule.closed}
                  onCheckedChange={(checked) => updateDay(day as keyof WeekSchedule, 'closed', !!checked)}
                />
                <Label className="text-sm">Fermé</Label>
              </div>
              
              {!daySchedule.closed && (
                <div className="flex items-center space-x-4">
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
              )}
            </div>
          ))}
          
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            className="bg-accent hover:bg-accent/90"
          >
            <Save className="h-4 w-4 mr-2" />
            {isLoading ? 'Sauvegarde...' : 'Sauvegarder les horaires'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
