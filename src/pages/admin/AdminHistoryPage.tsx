
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

export function AdminHistoryPage() {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold text-primary">
            Order History
          </h1>
          <Button className="bg-accent hover:bg-accent/90">
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
        </div>
        
        <Card className="shadow-md border-0">
          <CardHeader>
            <CardTitle className="text-primary">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Order history and export functionality will be displayed here.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
