
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { type Order } from '@/lib/ordersManager';
import { formatPrice } from '@/lib/utils';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderActions } from './OrderActions';

const TIMEZONE = 'Europe/Brussels';

interface OrdersTableProps {
  orders: Order[];
  onPrint: (orderId: string) => void;
}

export function OrdersTable({ orders, onPrint }: OrdersTableProps) {
  const formatOrderTime = (date: Date) => {
    const brusselsTime = toZonedTime(date, TIMEZONE);
    return format(brusselsTime, 'HH:mm');
  };

  if (orders.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        Aucune commande aujourd'hui
      </p>
    );
  }

  return (
    <div className="print-area">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-b">
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Heure</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Table</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Client</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Articles</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Total</TableHead>
            <TableHead className="bg-gray-100 font-semibold text-gray-700">Statut</TableHead>
            <TableHead className="no-print bg-gray-100 font-semibold text-gray-700">Actions</TableHead>
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
                <OrderStatusBadge status={order.status} printed={order.printed} />
              </TableCell>
              <TableCell className="no-print">
                <OrderActions 
                  orderId={order.id} 
                  printed={order.printed} 
                  onPrint={onPrint} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
