
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdminBuilderPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          Poke Builder Configuration
        </h1>
        
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-primary">Builder Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Configure poke bowl builder options, steps, and ingredients here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
