
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignatureCard } from './SignatureCard';
import { MakeYourOwnCard } from './MakeYourOwnCard';
import { useMenuItems } from '@/hooks/useMenu';

export function PokeBowlTabs() {
  // Fetch real menu items for the Poke Bowls category (ID 3)
  const { items: pokeItems, loading } = useMenuItems(3);
  
  // Filter items by tags to separate signatures from make-your-own
  const signatureItems = pokeItems
    .filter(item => item.tags.includes('signature') && !item.out_of_stock)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0))
    .map(item => ({
      id: item.id,
      name: item.names.fr, // Using French names for consistency
      price: item.price,
      description: item.descriptions.fr,
      photo_url: item.photo_url || '/placeholder.svg',
      out_of_stock: item.out_of_stock,
      // For now, we'll use mock components data since the database doesn't store component details
      // This could be enhanced later to store component details in the database
      components: getDefaultComponents(item.id)
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

// Helper function to provide default components for existing signatures
// This maintains the existing component data while using real database items
function getDefaultComponents(itemId: number) {
  const componentMap: Record<number, any> = {
    100: {
      base: ['Riz blanc', 'Salade'],
      sauce: ['Sauce soja', 'Mayo épicée'],
      garnitures: ['Avocat', 'Concombre', 'Edamame'],
      protein: ['Saumon'],
      toppings: ['Graines de sésame']
    },
    101: {
      base: ['Riz brun'],
      sauce: ['Sauce teriyaki'],
      garnitures: ['Mangue', 'Carottes', 'Chou rouge'],
      protein: ['Thon'],
      toppings: ['Algues nori', 'Gingembre']
    },
    102: {
      base: ['Quinoa'],
      sauce: ['Sauce ponzu'],
      garnitures: ['Radis', 'Pousses de bambou'],
      protein: ['Tofu grillé'],
      toppings: ['Noix de coco râpée']
    },
    103: {
      base: ['Riz blanc', 'Nouilles soba'],
      sauce: ['Sauce sriracha mayo'],
      garnitures: ['Avocat', 'Ananas', 'Poivrons'],
      protein: ['Crevettes tempura'],
      toppings: ['Oignons frits']
    },
    104: {
      base: ['Salade mixte'],
      sauce: ['Vinaigrette sésame'],
      garnitures: ['Tomates cerises', 'Concombre'],
      protein: ['Poulet teriyaki'],
      toppings: ['Amandes effilées']
    },
    105: {
      base: ['Riz noir'],
      sauce: ['Sauce yuzu'],
      garnitures: ['Avocat', 'Wakame'],
      protein: ['Saumon fumé'],
      toppings: ['Caviar de poisson volant']
    },
    106: {
      base: ['Riz blanc', 'Vermicelles'],
      sauce: ['Sauce chimichurri', 'Mayo citron'],
      garnitures: ['Maïs', 'Haricots noirs', 'Jalapeños'],
      protein: ['Bœuf grillé'],
      toppings: ['Coriandre fraîche']
    }
  };

  return componentMap[itemId] || {
    base: ['Riz blanc'],
    sauce: ['Sauce soja'],
    garnitures: ['Avocat', 'Concombre'],
    protein: ['Saumon'],
    toppings: ['Graines de sésame']
  };
}
