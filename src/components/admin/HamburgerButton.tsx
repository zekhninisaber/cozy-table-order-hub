
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HamburgerButtonProps {
  onClick: () => void;
}

export function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className="fixed top-2 left-2 z-30 max-sm:block hidden bg-white shadow-md hover:bg-gray-50"
    >
      <Menu className="h-5 w-5" />
    </Button>
  );
}
