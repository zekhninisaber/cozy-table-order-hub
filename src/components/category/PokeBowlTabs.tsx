
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MenuItemCard } from './MenuItemCard';
import { MakeYourOwnCard } from './MakeYourOwnCard';

export function PokeBowlTabs() {
  // Mock data for Poke Bowl Signatures
  const signatureItems = Array.from({ length: 7 }, (_, index) => ({
    id: 100 + index,
    name: `Signature ${index + 1}`,
    price: 14.50,
    description: 'Premium poke bowl with selected ingredients',
    photo_url: '/placeholder.svg',
    out_of_stock: false
  }));

  return (
    <Tabs defaultValue="signatures" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="signatures">Signatures</TabsTrigger>
        <TabsTrigger value="make-your-own">Make Your Own Bowl</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signatures" className="space-y-4">
        {signatureItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </TabsContent>

      <TabsContent value="make-your-own">
        <MakeYourOwnCard />
      </TabsContent>
    </Tabs>
  );
}
