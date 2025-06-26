
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryHeaderProps {
  categoryName: string;
}

export function CategoryHeader({ categoryName }: CategoryHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 mb-6 pt-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate(-1)}
        className="shrink-0"
      >
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <h1 className="text-2xl font-serif font-bold text-secondary">
        {categoryName}
      </h1>
    </div>
  );
}
