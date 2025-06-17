
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ordersManager, type Order } from '@/lib/ordersManager';
import { PrintStyles } from '@/components/admin/PrintStyles';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { OrdersTable } from '@/components/admin/OrdersTable';

export function AdminLiveOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Initial load
    loadOrders();

    // Subscribe to updates
    const unsubscribe = ordersManager.subscribe(() => {
      loadOrders();
    });

    // Set up auto-refresh every 30 seconds
    const interval = setInterval(loadOrders, 30000);

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const loadOrders = () => {
    setOrders(ordersManager.getTodaysOrders());
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    loadOrders();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handlePrint = (orderId: string) => {
    // Mark as printed first
    ordersManager.markAsPrinted(orderId);
    
    // Trigger print
    window.print();
  };

  const handleAddMockOrder = () => {
    ordersManager.addMockOrder();
  };

  const pendingOrders = orders.filter(order => !order.printed);

  return (
    <>
      <PrintStyles />

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <AdminPageHeader
            onRefresh={handleRefresh}
            onAddMockOrder={handleAddMockOrder}
            isRefreshing={isRefreshing}
          />
          
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                Commandes d'aujourd'hui
                <Badge variant="secondary">{pendingOrders.length} en attente</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <OrdersTable orders={orders} onPrint={handlePrint} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
