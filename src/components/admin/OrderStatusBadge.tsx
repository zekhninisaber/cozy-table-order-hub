
import { Badge } from '@/components/ui/badge';
import { type Order } from '@/lib/ordersManager';

interface OrderStatusBadgeProps {
  status: Order['status'];
  printed: boolean;
}

export function OrderStatusBadge({ status, printed }: OrderStatusBadgeProps) {
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
}
