
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignatureCard } from './SignatureCard';
import { MakeYourOwnCard } from './MakeYourOwnCard';
import { useMenuItems } from '@/hooks/useMenu';
import { useAppStore } from '@/lib/store';

export function PokeBowlTabs() {
  const { language } = useAppStore();
  
  // Fetch real menu items for the Poke Bowls category (ID 3)
  const { items: pokeItems, loading } = useMenuItems(3);
  
  // Filter items by tags to separate signatures from make-your-own
  // Accept items that either have 'signature' tag OR have no tags (for backwards compatibility)
  const signatureItems = pokeItems
    .filter(item => {
      const hasSignatureTag = item.tags && item.tags.includes('signature');
      const hasNoTags = !item.tags || item.tags.length === 0;
      // Include items that are not out of stock and either have signature tag or no tags
      return !item.out_of_stock && (hasSignatureTag || hasNoTags);
    })
    .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    .map(item => ({
      id: item.id,
      name: item.names[language] || item.names.fr, // Use current language, fallback to French
      price: item.price,
      description: item.descriptions[language] || item.descriptions.fr, // Use database description
      photo_url: item.photo_url || '/placeholder.svg',
      out_of_stock: item.out_of_stock
      // Removed the hardcoded components - now using database descriptions
    }));

  if (loading) {
    return (
      <div className="space-y-4">
        {[1,2,3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
            <div className="w-full h-32 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Tabs defaultValue="signatures" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="signatures">Signatures</TabsTrigger>
        <TabsTrigger value="make-your-own">Make Your Own Bowl</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signatures" className="flex flex-col gap-6 w-full">
        {signatureItems.length > 0 ? (
          signatureItems.map((item) => (
            <SignatureCard key={item.id} item={item} />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            Aucune signature disponible
          </div>
        )}
      </TabsContent>

      <TabsContent value="make-your-own">
        <MakeYourOwnCard />
      </TabsContent>
    </Tabs>
  );
}
