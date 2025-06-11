
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { CartSummary } from '@/components/layout/CartSummary';

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, addToCart } = useAppStore();
  const t = useTranslation(language);
  
  // Mock data - replace with actual data fetching
  const categoryItems = [
    {
      id: 1,
      name: 'Sushi Burger Crispy Chicken',
      price: 12.50,
      description: 'Delicious sushi burger with crispy chicken',
      photo_url: '/placeholder.svg',
      out_of_stock: false
    },
    {
      id: 2,
      name: 'Sushi Burger Creamy Salmon',
      price: 14.50,
      description: 'Fresh salmon sushi burger',
      photo_url: '/placeholder.svg',
      out_of_stock: false
    }
  ];
  
  const categoryName = getCategoryName(id || '1');
  
  function getCategoryName(categoryId: string): string {
    const names: Record<string, string> = {
      '1': t('sushiBurgerMenu'),
      '2': t('baoBunMenu'),
      '3': t('pokeBowls'),
      '4': t('sides'),
      '5': t('drinks'),
      '6': t('desserts')
    };
    return names[categoryId] || t('menu');
  }
  
  const handleAddToCart = (item: typeof categoryItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price
    });
  };
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-display font-bold text-primary">
            {categoryName}
          </h1>
        </div>
        
        <div className="space-y-4">
          {categoryItems.map((item) => (
            <Card key={item.id} className="shadow-md border-0 h-32">
              <CardContent className="p-4 h-full">
                <div className="flex gap-4 h-full">
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
                        <p className="text-xs text-primary mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <span className="font-bold text-accent shrink-0">
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
                          onClick={() => handleAddToCart(item)}
                          size="sm"
                          className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        >
                          {t('addToCart')}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <CartSummary />
    </div>
  );
}
