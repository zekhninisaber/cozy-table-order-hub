
import { useParams } from 'react-router-dom';
import { useAppStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { CartSummary } from '@/components/layout/CartSummary';
import { CategoryHeader } from '@/components/category/CategoryHeader';
import { MenuItemCard } from '@/components/category/MenuItemCard';
import { PokeBowlTabs } from '@/components/category/PokeBowlTabs';

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useAppStore();
  const t = useTranslation(language);
  
  // Mock data for regular categories
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
  const isPokeBowls = id === '3';
  
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
  
  return (
    <div className="min-h-screen bg-peach-cream p-4 pb-24">
      <div className="max-w-md mx-auto">
        <CategoryHeader categoryName={categoryName} />
        
        {isPokeBowls ? (
          <PokeBowlTabs />
        ) : (
          <div className="space-y-4">
            {categoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
      
      <CartSummary />
    </div>
  );
}
