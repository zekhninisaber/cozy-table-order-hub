
import { useState } from 'react';
import { CategoryView } from '@/components/admin/menu/CategoryView';
import { CategoryListView } from '@/components/admin/menu/CategoryListView';
import type { Category } from '@/data/menuSeed';

export function AdminMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Mock user role - in real app this would come from auth context
  const userRole = 'admin'; // or 'staff'
  const canEdit = userRole === 'admin';

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-dominant">
        <CategoryView
          category={selectedCategory}
          canEdit={canEdit}
          onBack={() => setSelectedCategory(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dominant">
      <CategoryListView
        canEdit={canEdit}
        onSelectCategory={setSelectedCategory}
      />
    </div>
  );
}
