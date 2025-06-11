
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SignatureCard } from './SignatureCard';
import { MakeYourOwnCard } from './MakeYourOwnCard';

export function PokeBowlTabs() {
  // Mock data for Poke Bowl Signatures with structured components
  const signatureItems = [
    {
      id: 100,
      name: 'Signature 1',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Riz blanc', 'Salade'],
        sauce: ['Sauce soja', 'Mayo épicée'],
        garnitures: ['Avocat', 'Concombre', 'Edamame'],
        protein: ['Saumon'],
        toppings: ['Graines de sésame']
      }
    },
    {
      id: 101,
      name: 'Signature 2',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Riz brun'],
        sauce: ['Sauce teriyaki'],
        garnitures: ['Mangue', 'Carottes', 'Chou rouge'],
        protein: ['Thon'],
        toppings: ['Algues nori', 'Gingembre']
      }
    },
    {
      id: 102,
      name: 'Signature 3',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Quinoa'],
        sauce: ['Sauce ponzu'],
        garnitures: ['Radis', 'Pousses de bambou'],
        protein: ['Tofu grillé'],
        toppings: ['Noix de coco râpée']
      }
    },
    {
      id: 103,
      name: 'Signature 4',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Riz blanc', 'Nouilles soba'],
        sauce: ['Sauce sriracha mayo'],
        garnitures: ['Avocat', 'Ananas', 'Poivrons'],
        protein: ['Crevettes tempura'],
        toppings: ['Oignons frits']
      }
    },
    {
      id: 104,
      name: 'Signature 5',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Salade mixte'],
        sauce: ['Vinaigrette sésame'],
        garnitures: ['Tomates cerises', 'Concombre'],
        protein: ['Poulet teriyaki'],
        toppings: ['Amandes effilées']
      }
    },
    {
      id: 105,
      name: 'Signature 6',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Riz noir'],
        sauce: ['Sauce yuzu'],
        garnitures: ['Avocat', 'Wakame'],
        protein: ['Saumon fumé'],
        toppings: ['Caviar de poisson volant']
      }
    },
    {
      id: 106,
      name: 'Signature 7',
      price: 14.50,
      description: 'Premium poke bowl with selected ingredients',
      photo_url: '/placeholder.svg',
      out_of_stock: false,
      components: {
        base: ['Riz blanc', 'Vermicelles'],
        sauce: ['Sauce chimichurri', 'Mayo citron'],
        garnitures: ['Maïs', 'Haricots noirs', 'Jalapeños'],
        protein: ['Bœuf grillé'],
        toppings: ['Coriandre fraîche']
      }
    }
  ];

  return (
    <Tabs defaultValue="signatures" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="signatures">Signatures</TabsTrigger>
        <TabsTrigger value="make-your-own">Make Your Own Bowl</TabsTrigger>
      </TabsList>
      
      <TabsContent value="signatures" className="space-y-4">
        {signatureItems.map((item) => (
          <SignatureCard key={item.id} item={item} />
        ))}
      </TabsContent>

      <TabsContent value="make-your-own">
        <MakeYourOwnCard />
      </TabsContent>
    </Tabs>
  );
}
