
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

type BowlSize = 'Regular' | 'Large';

const BOWL_PRICES = {
  Regular: 12.90,
  Large: 14.90
};

export function SignatureCard({ item }: SignatureCardProps) {
  const { language, addToCart } = useAppStore();
  const t = useTranslation(language);
  const [selectedSize, setSelectedSize] = useState<BowlSize | ''>('');

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addToCart({
      id: item.id,
      name: item.name,
      price: BOWL_PRICES[selectedSize],
      builderData: {
        size: selectedSize,
        components: item.components
      }
    });
  };

  const renderComponentLine = (label: string, items?: string[]) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="text-xs text-primary leading-tight whitespace-normal break-words">
        <span className="font-medium">{label}:&nbsp;</span>{items.join(', ')}
      </div>
    );
  };

  return (
    <Card className="shadow-md border-0 w-full">
      <CardContent className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Image and Size Selector - Mobile: stacked, Desktop: left column */}
          <div className="flex flex-col items-center sm:items-start">
            <img
              src={item.photo_url}
              alt={item.name}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-28 md:h-28 rounded-lg object-cover bg-gray-200 shrink-0"
            />
            
            {/* Size Selector */}
            <div className="mt-3 w-full max-w-48">
              <RadioGroup 
                value={selectedSize} 
                onValueChange={(value) => setSelectedSize(value as BowlSize)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Regular" id="regular" />
                  <Label htmlFor="regular" className="text-xs cursor-pointer">
                    Regular — {formatPrice(BOWL_PRICES.Regular)}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Large" id="large" />
                  <Label htmlFor="large" className="text-xs cursor-pointer">
                    Large — {formatPrice(BOWL_PRICES.Large)}
                  </Label>
                </div>
              </RadioGroup>
            </div>
            
            {/* Add to Cart Button */}
            <div className="mt-3 w-full max-w-48">
              {item.out_of_stock ? (
                <Badge variant="destructive" className="text-xs w-full justify-center py-2">
                  {t('outOfStock')}
                </Badge>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xs sm:text-sm disabled:opacity-50"
                  title={!selectedSize ? 'Choisissez une taille' : ''}
                >
                  {t('addToCart')}
                </Button>
              )}
            </div>
          </div>
          
          {/* Content - Mobile: below image, Desktop: right column */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-primary text-sm leading-tight flex-1 pr-2">
                {item.name}
              </h3>
            </div>
            
            {/* Components List */}
            {item.components ? (
              <div className="space-y-0.5">
                {renderComponentLine(t('componentsBase'), item.components.base)}
                {renderComponentLine(t('componentsSauce'), item.components.sauce)}
                {renderComponentLine(t('componentsGarnitures'), item.components.garnitures)}
                {renderComponentLine(t('componentsProtein'), item.components.protein)}
                {renderComponentLine(t('componentsToppings'), item.components.toppings)}
              </div>
            ) : (
              <p className="text-xs text-primary whitespace-normal break-words">
                {item.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
