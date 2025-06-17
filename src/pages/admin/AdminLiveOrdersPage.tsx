
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Printer, RefreshCw, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ordersManager, type Order } from '@/lib/ordersManager';
import { formatPrice } from '@/lib/utils';

const TIMEZONE = 'Europe/Brussels';

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

  const getStatusBadge = (status: Order['status'], printed: boolean) => {
    if (printed) {
      return <Badge variant="secondary">Imprimé</Badge>;
    }
    
    switch (status) {
      case 'pending':
        return <Badge variant="destructive">En attente</Badge>;
      case 'printed':
        return <Badge variant="secondary">Imprimé</Badge>;
      case 'completed':
        return <Badge variant="default">Terminé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatOrderTime = (date: Date) => {
    const brusselsTime = toZonedTime(date, TIMEZONE);
    return format(brusselsTime, 'HH:mm');
  };

  const pendingOrders = orders.filter(order => !order.printed);

  return (
    <>
      {/* Print styles - hidden on screen, shown when printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-primary">
              Commandes en Direct
            </h1>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAddMockOrder}
                variant="outline"
                size="sm"
                className="no-print"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter test
              </Button>
              
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={isRefreshing}
                className="no-print"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </div>
          
          <Card className="shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                Commandes d'aujourd'hui
                <Badge variant="secondary">{pendingOrders.length} en attente</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Aucune commande aujourd'hui
                </p>
              ) : (
                <div className="print-area">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Heure</TableHead>
                        <TableHead>Table</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="no-print">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {formatOrderTime(order.createdAt)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">TABLE {order.tableNumber}</Badge>
                          </TableCell>
                          <TableCell>{order.customerName}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {order.items.map((item, index) => (
                                <div key={index}>
                                  {item.quantity}x {item.name}
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatPrice(order.total)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(order.status, order.printed)}
                          </TableCell>
                          <TableCell className="no-print">
                            {!order.printed && (
                              <Button
                                onClick={() => handlePrint(order.id)}
                                variant="outline"
                                size="sm"
                              >
                                <Printer className="h-4 w-4 mr-2" />
                                Ré-imprimer
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
