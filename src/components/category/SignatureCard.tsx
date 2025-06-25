
import { useState, useEffect } from 'react';
import { AddButton } from '@/components/ui/add-button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

interface SignatureItem {
  id: number;
  name: string;
  price: number;
  description: string;
  photo_url: string;
  out_of_stock: boolean;
}

interface SignatureCardProps {
  item: SignatureItem;
}

type BowlSize = 'Regular' | 'Large';

export function SignatureCard({ item }: SignatureCardProps) {
  const { language, addToCart } = useAppStore();
  const t = useTranslation(language);
  const [selectedSize, setSelectedSize] = useState<BowlSize | ''>('');
  const [currentItem, setCurrentItem] = useState(item);

  // Real-time price updates
  useEffect(() => {
    setCurrentItem(item);
    
    // Subscribe to real-time changes for this specific item
    const channel = supabase
      .channel(`menu_item_${item.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'menu_items',
          filter: `id=eq.${item.id}`
        },
        (payload) => {
          if (payload.new) {
            setCurrentItem(prev => ({
              ...prev,
              price: Number(payload.new.price),
              out_of_stock: payload.new.out_of_stock
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [item]);

  // Calculate prices based on database price
  const regularPrice = currentItem.price;
  const largePrice = regularPrice + 2;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    const finalPrice = selectedSize === 'Large' ? largePrice : regularPrice;
    
    addToCart({
      id: currentItem.id,
      name: currentItem.name,
      price: finalPrice,
      builderData: {
        size: selectedSize
      }
    });
  };

  return (
    <Card className="shadow-md border-0 w-full">
      <CardContent className="p-3 sm:p-4 relative flex flex-col gap-3 sm:gap-4 pt-3">
        {/* Image - positioned absolutely on mobile, static on desktop */}
        <div className="absolute top-2 right-2 sm:static sm:flex sm:justify-center">
          <img
            src={currentItem.photo_url}
            alt={currentItem.name}
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl shadow sm:shadow-none object-cover bg-gray-200 shrink-0"
          />
        </div>
        
        {/* Title - positioned absolutely on mobile, normal flow on desktop */}
        <h3 className="absolute top-2 left-3 font-semibold text-primary text-xl leading-tight max-w-[calc(100%-11rem)] sm:static sm:text-center sm:text-xl sm:max-w-none min-w-0 z-10">
          {currentItem.name}
        </h3>
        
        {/* Content - full width layout */}
        <div className="flex flex-col justify-start mt-16 sm:mt-0">
          {/* Size Choice Label */}
          <div className="text-sm font-medium text-primary mb-1 sm:text-center">
            {t('sizeChoice')}
          </div>
          
          {/* Size Selector with prices */}
          <div className="flex gap-3 mt-2 sm:mt-2 sm:justify-center text-base sm:text-lg">
            <button
              type="button"
              onClick={() => setSelectedSize('Regular')}
              className={`px-4 py-2 rounded-full font-medium transition-colors flex flex-col items-center ${
                selectedSize === 'Regular'
                  ? 'bg-[#F39720] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>Regular</span>
              <span className="text-xs font-normal">{formatPrice(regularPrice)}</span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedSize('Large')}
              className={`px-4 py-2 rounded-full font-medium transition-colors flex flex-col items-center ${
                selectedSize === 'Large'
                  ? 'bg-[#F39720] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>Large</span>
              <span className="text-xs font-normal">{formatPrice(largePrice)}</span>
            </button>
          </div>
          
          {/* Description from database - with more top margin on mobile */}
          <p className="text-xs text-primary whitespace-normal break-words mb-3 mt-8 sm:mt-3 sm:text-center">
            {currentItem.description}
          </p>
          
          {/* Add to Cart Button */}
          <div className="mt-auto">
            {currentItem.out_of_stock ? (
              <Badge variant="destructive" className="text-xs w-full justify-center py-2">
                {t('outOfStock')}
              </Badge>
            ) : (
              <AddButton
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`text-base sm:text-lg py-2 px-4 mt-3 ${
                  !selectedSize ? 'cursor-not-allowed' : ''
                }`}
                title={!selectedSize ? 'Choisissez une taille' : ''}
              >
                <div className="flex justify-between items-center w-full sm:justify-center">
                  <span className="sm:text-center">{t('addToCart')}</span>
                  {selectedSize && (
                    <span className="font-semibold sm:hidden">
                      {formatPrice(selectedSize === 'Large' ? largePrice : regularPrice)}
                    </span>
                  )}
                </div>
              </AddButton>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
