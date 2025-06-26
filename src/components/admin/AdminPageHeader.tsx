
import { RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminPageHeaderProps {
  onRefresh: () => void;
  onAddMockOrder: () => void;
  isRefreshing: boolean;
}

export function AdminPageHeader({ onRefresh, onAddMockOrder, isRefreshing }: AdminPageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-serif font-bold text-secondary">
        Commandes en Direct
      </h1>
      
      <div className="flex gap-3">
        <Button
          onClick={onAddMockOrder}
          variant="outline"
          size="sm"
          className="no-print"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter test
        </Button>
        
        <Button
          onClick={onRefresh}
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
  );
}
