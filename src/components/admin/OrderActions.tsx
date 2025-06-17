
import { Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OrderActionsProps {
  orderId: string;
  printed: boolean;
  onPrint: (orderId: string) => void;
}

export function OrderActions({ orderId, printed, onPrint }: OrderActionsProps) {
  if (printed) {
    return null;
  }

  return (
    <Button
      onClick={() => onPrint(orderId)}
      variant="outline"
      size="sm"
    >
      <Printer className="h-4 w-4 mr-2" />
      Ré-imprimer
    </Button>
  );
}
