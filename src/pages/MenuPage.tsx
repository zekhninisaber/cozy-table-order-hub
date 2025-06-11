
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { CartSummary } from '@/components/layout/CartSummary';

export function MenuPage() {
  const { language } = useAppStore();
  const t = useTranslation(language);
  const navigate = useNavigate();
  
  const categories = [
    { id: 1, name: t('sushiBurgerMenu'), icon: '🍔', color: 'bg-primary' },
    { id: 2, name: t('baoBunMenu'), icon: '🥟', color: 'bg-secondary' },
    { id: 3, name: t('pokeBowls'), icon: '🥣', color: 'bg-accent' },
    { id: 4, name: t('sides'), icon: '🍤', color: 'bg-olive' },
    { id: 5, name: t('drinks'), icon: '🥤', color: 'bg-mango' },
    { id: 6, name: t('desserts'), icon: '🍧', color: 'bg-dark-green' }
  ];
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 pb-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            {t('menu')}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-transform hover:scale-105 border-0 shadow-lg aspect-square md:aspect-auto"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <CardContent className="p-6 text-center flex flex-col justify-center items-center h-full md:block">
                {/* Image placeholder */}
                <div className="w-[88.5%] aspect-square md:w-full md:h-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Image</span>
                </div>
                
                <h3 className="font-semibold text-primary text-lg md:text-base leading-tight">
                  {category.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <CartSummary />
    </div>
  );
}
