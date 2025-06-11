
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  description: string;
  photo_url: string;
  out_of_stock: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { language, addToCart } = useAppStore();
  const t = useTranslation(language);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price
    });
  };

  return (
    <Card className="shadow-md border-0 min-h-[100px] sm:min-h-[120px]">
      <CardContent className="p-3 sm:p-4 h-full">
        <div className="flex gap-3 sm:gap-4 h-full">
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-24 h-24 rounded-lg object-cover bg-gray-200 shrink-0"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2">
                <h3 className="font-semibold text-primary text-sm leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-xs text-primary mb-2">
                  {item.description}
                </p>
              </div>
              <span className="font-bold text-accent shrink-0 text-sm sm:text-base">
                {formatPrice(item.price)}
              </span>
            </div>
            <div className="flex justify-between items-center mt-auto">
              {item.out_of_stock ? (
                <Badge variant="destructive" className="text-xs">
                  {t('outOfStock')}
                </Badge>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm px-2 sm:px-3"
                >
                  {t('addToCart')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
