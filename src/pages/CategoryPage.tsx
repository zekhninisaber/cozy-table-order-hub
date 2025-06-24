
import { useParams } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { CartSummary } from '@/components/layout/CartSummary';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { MenuItemCard } from '@/components/category/MenuItemCard';
import { PokeBowlTabs } from '@/components/category/PokeBowlTabs';
import { useMenuItems, useCategories } from '@/hooks/useMenu';

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { language, getCartItemCount } = useAppStore();
  const t = useTranslation(language);
  
  const itemCount = getCartItemCount();
  const hasCartItems = itemCount > 0;
  
  const categoryId = parseInt(id || '1');
  const { items: categoryItems, loading: itemsLoading } = useMenuItems(categoryId);
  const { categories, loading: categoriesLoading } = useCategories();
  
  const category = categories.find(cat => cat.id === categoryId);
  const categoryName = category ? category.names[language] : t('menu');
  const isPokeBowls = categoryId === 3;

  if (itemsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-peach-cream">
        <CartSummary />
        <div className={`max-w-md mx-auto p-4 ${hasCartItems ? 'pt-20' : ''}`}>
          <CategoryHeader categoryName={t('loading')} />
          <div className="space-y-4">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-peach-cream">
      <CartSummary />
      <div className={`max-w-md mx-auto p-4 ${hasCartItems ? 'pt-20' : ''}`}>
        <CategoryHeader categoryName={categoryName} />
        
        {isPokeBowls ? (
          <PokeBowlTabs />
        ) : (
          <div className="space-y-4">
            {categoryItems
              .filter(item => !item.out_of_stock)
              .map((item) => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                />
              ))}
            {categoryItems.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {t('menu')}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
