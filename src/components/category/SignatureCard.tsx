
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
      <CardContent className="p-3 sm:p-4 relative flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3">
        {/* Image - positioned absolutely on mobile, static on desktop */}
        <div className="absolute top-2 right-2 sm:static sm:flex sm:justify-start">
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-36 h-36 sm:w-28 sm:h-28 rounded-xl shadow sm:shadow-none object-cover bg-gray-200 shrink-0"
          />
        </div>
        
        {/* Title - positioned absolutely on mobile to align with image top-left */}
        <h3 className="absolute top-2 left-3 font-semibold text-primary text-xl leading-tight max-w-[calc(100%-11rem)] sm:static sm:text-lg sm:max-w-none sm:truncate sm:whitespace-nowrap sm:overflow-hidden min-w-0 flex-1 z-10">
          {item.name}
        </h3>
        
        {/* Content - right column on desktop, full width on mobile */}
        <div className="flex-1 flex flex-col justify-start mt-12 sm:mt-0">
          {/* Size Selector - positioned below title on mobile */}
          <div className="flex gap-3 mt-4 sm:mt-2 text-base sm:text-lg">
            <button
              type="button"
              onClick={() => setSelectedSize('Regular')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedSize === 'Regular'
                  ? 'bg-[#F39720] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Regular
            </button>
            <button
              type="button"
              onClick={() => setSelectedSize('Large')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedSize === 'Large'
                  ? 'bg-[#F39720] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Large
            </button>
            {/* Price inline on desktop only */}
            {selectedSize && (
              <span className="ml-auto font-semibold text-[#F39720] text-base sm:text-lg hidden sm:block">
                {formatPrice(BOWL_PRICES[selectedSize])}
              </span>
            )}
          </div>
          
          {/* Components List */}
          {item.components ? (
            <div className="space-y-0.5 mb-3 mt-3">
              {renderComponentLine(t('componentsBase'), item.components.base)}
              {renderComponentLine(t('componentsSauce'), item.components.sauce)}
              {renderComponentLine(t('componentsGarnitures'), item.components.garnitures)}
              {renderComponentLine(t('componentsProtein'), item.components.protein)}
              {renderComponentLine(t('componentsToppings'), item.components.toppings)}
            </div>
          ) : (
            <p className="text-xs text-primary whitespace-normal break-words mb-3 mt-3">
              {item.description}
            </p>
          )}
          
          {/* Add to Cart Button */}
          <div className="mt-auto">
            {item.out_of_stock ? (
              <Badge variant="destructive" className="text-xs w-full justify-center py-2">
                {t('outOfStock')}
              </Badge>
            ) : (
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                size="sm"
                className={`w-full text-base sm:text-lg py-2 px-4 mt-3 font-medium ${
                  !selectedSize 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                }`}
                title={!selectedSize ? 'Choisissez une taille' : ''}
              >
                <div className="flex justify-between items-center w-full sm:justify-center">
                  <span className="sm:text-center">{t('addToCart')}</span>
                  {selectedSize && (
                    <span className="font-semibold sm:hidden">
                      {formatPrice(BOWL_PRICES[selectedSize])}
                    </span>
                  )}
                </div>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
