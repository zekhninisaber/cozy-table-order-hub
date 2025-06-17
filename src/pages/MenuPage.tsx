
import { Card, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { useNavigate } from 'react-router-dom';
import { CartSummary } from '@/components/layout/CartSummary';
import { useCategories } from '@/hooks/useMenu';

export function MenuPage() {
  const { language } = useAppStore();
  const t = useTranslation(language);
  const navigate = useNavigate();
  const { categories, loading } = useCategories();
  
  // Filter only visible categories and sort by sort order
  const visibleCategories = categories
    .filter(cat => cat.visible)
    .sort((a, b) => a.sort - b.sort);

  if (loading) {
    return (
      <div className="min-h-screen bg-peach-cream p-4 pb-24">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 pt-4">
            <h1 className="text-3xl font-display font-bold text-primary mb-2">
              {t('menu')}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1,2,3,4,5,6].map((i) => (
              <Card key={i} className="aspect-square md:aspect-auto animate-pulse">
                <CardContent className="p-6">
                  <div className="w-full h-24 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <CartSummary />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 pb-24">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8 pt-4">
          <h1 className="text-3xl font-display font-bold text-primary mb-2">
            {t('menu')}
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleCategories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer transition-transform hover:scale-105 border-0 shadow-lg aspect-square md:aspect-auto"
              onClick={() => navigate(`/category/${category.id}`)}
            >
              <CardContent className="p-6 text-center flex flex-col justify-center items-center h-full md:block">
                {/* Image from database or placeholder */}
                <div className="w-[88.5%] aspect-square md:w-full md:h-24 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {category.thumbnail_url ? (
                    <img 
                      src={category.thumbnail_url} 
                      alt={category.names[language]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">Image</span>
                  )}
                </div>
                
                <h3 className="font-semibold text-primary text-lg md:text-base leading-tight">
                  {category.names[language]}
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
