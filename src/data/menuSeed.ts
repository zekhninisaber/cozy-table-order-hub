export interface Category {
  id: number;
  names: { fr: string; en: string; nl: string };
  sort: number;
  visible: boolean;
  thumbnail_url?: string;
}

export interface MenuItem {
  id: number;
  category_id: number;
  names: { fr: string; en: string; nl: string };
  descriptions: { fr: string; en: string; nl: string };
  price: number;
  photo_url?: string;
  out_of_stock: boolean;
  tags: string[];
  sort?: number;
}

export interface BuilderStep {
  id: number;
  name: string;
  sort: number;
  max_select: number;
}

export interface BuilderOption {
  id: number;
  step_id: number;
  name: string;
  extra_price: number;
  out_of_stock: boolean;
}

export const categories: Category[] = [
  { 
    id: 1, 
    names: { fr: 'Sushi Burger Menu', en: 'Sushi Burger Menu', nl: 'Sushi Burger Menu' },
    sort: 1, 
    visible: true,
    thumbnail_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=100&h=100&fit=crop'
  },
  { 
    id: 2, 
    names: { fr: 'Menu Bao Bun', en: 'Bao Bun Menu', nl: 'Bao Bun Menu' },
    sort: 2, 
    visible: true,
    thumbnail_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=100&h=100&fit=crop'
  },
  { 
    id: 3, 
    names: { fr: 'Poke Bowls', en: 'Poke Bowls', nl: 'Poke Bowls' },
    sort: 3, 
    visible: true,
    thumbnail_url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=100&h=100&fit=crop'
  },
  { 
    id: 4, 
    names: { fr: 'Accompagnements', en: 'Sides', nl: 'Bijgerechten' },
    sort: 4, 
    visible: true 
  },
  { 
    id: 5, 
    names: { fr: 'Boissons', en: 'Drinks', nl: 'Drankjes' },
    sort: 5, 
    visible: true 
  },
  { 
    id: 6, 
    names: { fr: 'Desserts', en: 'Desserts', nl: 'Desserts' },
    sort: 6, 
    visible: true 
  }
];

export const menuItems: MenuItem[] = [
  {
    id: 1,
    category_id: 1,
    names: { fr: 'Sushi Burger Crispy Chicken', en: 'Crispy Chicken Sushi Burger', nl: 'Crispy Chicken Sushi Burger' },
    descriptions: { fr: 'Délicieux burger sushi au poulet croustillant', en: 'Delicious crispy chicken sushi burger', nl: 'Heerlijke crispy chicken sushi burger' },
    price: 12.50,
    photo_url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=150&fit=crop',
    out_of_stock: false,
    tags: ['populaire']
  },
  {
    id: 2,
    category_id: 1,
    names: { fr: 'Sushi Burger Saumon Crémeux', en: 'Creamy Salmon Sushi Burger', nl: 'Romige Zalm Sushi Burger' },
    descriptions: { fr: 'Burger sushi au saumon avec sauce crémeuse', en: 'Sushi burger with salmon and creamy sauce', nl: 'Sushi burger met zalm en romige saus' },
    price: 14.00,
    photo_url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=150&fit=crop',
    out_of_stock: false,
    tags: ['premium']
  },
  {
    id: 3,
    category_id: 2,
    names: { fr: 'Bao Bun Teriyaki Beef', en: 'Teriyaki Beef Bao Bun', nl: 'Teriyaki Rundvlees Bao Bun' },
    descriptions: { fr: 'Bao bun au bœuf teriyaki savoureux', en: 'Savory teriyaki beef bao bun', nl: 'Smaakvolle teriyaki rundvlees bao bun' },
    price: 11.00,
    out_of_stock: false,
    tags: []
  },
  {
    id: 4,
    category_id: 2,
    names: { fr: 'Bao Bun Chicken', en: 'Chicken Bao Bun', nl: 'Kip Bao Bun' },
    descriptions: { fr: 'Bao bun au poulet tendre', en: 'Tender chicken bao bun', nl: 'Malse kip bao bun' },
    price: 10.50,
    out_of_stock: false,
    tags: []
  },
  {
    id: 5,
    category_id: 4,
    names: { fr: 'Crispy Chicken', en: 'Crispy Chicken', nl: 'Crispy Chicken' },
    descriptions: { fr: 'Poulet croustillant parfaitement assaisonné', en: 'Perfectly seasoned crispy chicken', nl: 'Perfect gekruid crispy chicken' },
    price: 6.50,
    out_of_stock: false,
    tags: ['populaire']
  },
  {
    id: 6,
    category_id: 4,
    names: { fr: 'Nachos Chicken', en: 'Chicken Nachos', nl: 'Kip Nachos' },
    descriptions: { fr: 'Nachos garnis de poulet épicé', en: 'Nachos topped with spicy chicken', nl: 'Nachos met pittige kip' },
    price: 8.00,
    out_of_stock: false,
    tags: ['épicé']
  },
  {
    id: 7,
    category_id: 4,
    names: { fr: 'Scampi Tempura', en: 'Scampi Tempura', nl: 'Scampi Tempura' },
    descriptions: { fr: 'Délicieuses crevettes en tempura croustillante', en: 'Delicious crispy tempura prawns', nl: 'Heerlijke krokante tempura garnalen' },
    price: 7.50,
    out_of_stock: false,
    tags: []
  },
  {
    id: 8,
    category_id: 4,
    names: { fr: 'Falafels', en: 'Falafels', nl: 'Falafels' },
    descriptions: { fr: 'Falafels croustillants aux épices du Moyen-Orient', en: 'Crispy Middle Eastern spiced falafels', nl: 'Krokante Midden-Oosterse gekruide falafels' },
    price: 6.00,
    out_of_stock: false,
    tags: ['végétarien']
  },
  {
    id: 9,
    category_id: 4,
    names: { fr: 'Gyozas Crevettes', en: 'Prawn Gyozas', nl: 'Garnalen Gyozas' },
    descriptions: { fr: 'Raviolis japonais aux crevettes', en: 'Japanese prawn dumplings', nl: 'Japanse garnalen dumplings' },
    price: 8.50,
    out_of_stock: false,
    tags: []
  },
  {
    id: 10,
    category_id: 4,
    names: { fr: 'Gyozas Légumes', en: 'Vegetable Gyozas', nl: 'Groenten Gyozas' },
    descriptions: { fr: 'Raviolis japonais aux légumes', en: 'Japanese vegetable dumplings', nl: 'Japanse groenten dumplings' },
    price: 7.50,
    out_of_stock: false,
    tags: ['végétarien']
  },
  {
    id: 11,
    category_id: 5,
    names: { fr: 'Soft Drinks', en: 'Soft Drinks', nl: 'Frisdranken' },
    descriptions: { fr: 'Sélection de boissons rafraîchissantes', en: 'Selection of refreshing drinks', nl: 'Selectie van verfrissende drankjes' },
    price: 2.50,
    out_of_stock: false,
    tags: []
  },
  {
    id: 12,
    category_id: 5,
    names: { fr: 'Eau SPA', en: 'SPA Water', nl: 'SPA Water' },
    descriptions: { fr: 'Eau plate ou pétillante SPA', en: 'Still or sparkling SPA water', nl: 'Plat of bruisend SPA water' },
    price: 2.00,
    out_of_stock: false,
    tags: []
  },
  {
    id: 13,
    category_id: 6,
    names: { fr: 'Iced Mochis (2 pcs)', en: 'Iced Mochis (2 pcs)', nl: 'IJsmochi (2 stuks)' },
    descriptions: { fr: 'Délicieux mochis glacés, 2 pièces', en: 'Delicious iced mochis, 2 pieces', nl: 'Heerlijke ijsmochi, 2 stuks' },
    price: 5.50,
    out_of_stock: false,
    tags: ['dessert']
  },
  {
    id: 14,
    category_id: 6,
    names: { fr: 'Iced Mochis (4 pcs)', en: 'Iced Mochis (4 pcs)', nl: 'IJsmochi (4 stuks)' },
    descriptions: { fr: 'Délicieux mochis glacés, 4 pièces', en: 'Delicious iced mochis, 4 pieces', nl: 'Heerlijke ijsmochi, 4 stuks' },
    price: 9.50,
    out_of_stock: false,
    tags: ['dessert']
  }
];

export const builderSteps: BuilderStep[] = [
  { id: 1, name: 'Base', sort: 1, max_select: 1 },
  { id: 2, name: 'Sauce', sort: 2, max_select: 2 },
  { id: 3, name: 'Vegetables', sort: 3, max_select: 5 },
  { id: 4, name: 'Protein', sort: 4, max_select: 1 },
  { id: 5, name: 'Toppings', sort: 5, max_select: 2 }
];

export const builderOptions: BuilderOption[] = [
  // Base options
  { id: 1, step_id: 1, name: 'Riz blanc', extra_price: 0, out_of_stock: false },
  { id: 2, step_id: 1, name: 'Riz brun', extra_price: 0.50, out_of_stock: false },
  { id: 3, step_id: 1, name: 'Salade mixte', extra_price: 0, out_of_stock: false },
  
  // Sauce options
  { id: 4, step_id: 2, name: 'Sauce soja', extra_price: 0, out_of_stock: false },
  { id: 5, step_id: 2, name: 'Sauce épicée', extra_price: 0, out_of_stock: false },
  { id: 6, step_id: 2, name: 'Sauce teriyaki', extra_price: 0.50, out_of_stock: false },
  
  // Vegetables
  { id: 7, step_id: 3, name: 'Concombre', extra_price: 0, out_of_stock: false },
  { id: 8, step_id: 3, name: 'Carotte', extra_price: 0, out_of_stock: false },
  { id: 9, step_id: 3, name: 'Avocat', extra_price: 1.00, out_of_stock: false },
  { id: 10, step_id: 3, name: 'Radis', extra_price: 0, out_of_stock: false },
  { id: 11, step_id: 3, name: 'Maïs', extra_price: 0, out_of_stock: false },
  
  // Proteins
  { id: 12, step_id: 4, name: 'Saumon', extra_price: 3.00, out_of_stock: false },
  { id: 13, step_id: 4, name: 'Thon', extra_price: 2.50, out_of_stock: false },
  { id: 14, step_id: 4, name: 'Poulet', extra_price: 2.00, out_of_stock: false },
  { id: 15, step_id: 4, name: 'Tofu', extra_price: 1.50, out_of_stock: false },
  
  // Toppings
  { id: 16, step_id: 5, name: 'Graines de sésame', extra_price: 0, out_of_stock: false },
  { id: 17, step_id: 5, name: 'Algues nori', extra_price: 0.50, out_of_stock: false },
  { id: 18, step_id: 5, name: 'Gingembre mariné', extra_price: 0, out_of_stock: false }
];
