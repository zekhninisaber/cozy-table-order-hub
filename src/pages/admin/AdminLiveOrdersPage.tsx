
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AdminLiveOrdersPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-primary mb-8">
          Live Orders
        </h1>
        
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              Current Orders
              <Badge variant="secondary">0 pending</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Live orders will appear here when the printer is offline.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
