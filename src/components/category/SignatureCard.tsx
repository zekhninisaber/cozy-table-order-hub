
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';

interface Components {
  base?: string[];
  sauce?: string[];
  garnitures?: string[];
  protein?: string[];
  toppings?: string[];
}

interface SignatureItem {
  id: number;
  name: string;
  price: number;
  description: string;
  photo_url: string;
  out_of_stock: boolean;
  components?: Components;
}

interface SignatureCardProps {
  item: SignatureItem;
}

export function SignatureCard({ item }: SignatureCardProps) {
  const { language, addToCart } = useAppStore();
  const t = useTranslation(language);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price
    });
  };

  const renderComponentLine = (label: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="text-xs text-primary leading-tight whitespace-nowrap truncate md:whitespace-nowrap sm:whitespace-normal">
        <span className="font-medium">{label}:&nbsp;</span>{items.join(', ')}
      </div>
    );
  };

  return (
    <Card className="shadow-md border-0 min-h-[140px] sm:min-h-[160px] w-full sm:basis-full md:basis-[22rem] lg:basis-[24rem] overflow-hidden">
      <CardContent className="p-3 sm:p-4 h-full">
        <div className="flex gap-3 sm:gap-4 h-full">
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 lg:w-28 lg:h-28 rounded-lg object-cover bg-gray-200 shrink-0"
          />
          <div className="flex-auto flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-2 overflow-hidden">
                <h3 className="font-semibold text-primary text-sm leading-tight mb-1 truncate">
                  {item.name}
                </h3>
                {item.components ? (
                  <div className="mt-1 space-y-0.5 overflow-hidden">
                    {renderComponentLine(t('componentsBase'), item.components.base)}
                    {renderComponentLine(t('componentsSauce'), item.components.sauce)}
                    {renderComponentLine(t('componentsGarnitures'), item.components.garnitures)}
                    {renderComponentLine(t('componentsProtein'), item.components.protein)}
                    {renderComponentLine(t('componentsToppings'), item.components.toppings)}
                  </div>
                ) : (
                  <p className="text-xs text-primary mb-2 truncate">
                    {item.description}
                  </p>
                )}
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
