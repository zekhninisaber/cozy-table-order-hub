export type Language = 'fr' | 'en' | 'nl';

interface TranslationKeys {
  // Common
  loading: string;
  error: string;
  back: string;
  next: string;
  confirm: string;
  cancel: string;
  
  // Splash
  welcome: string;
  
  // Home/Language
  selectLanguage: string;
  french: string;
  english: string;
  dutch: string;
  
  // Menu
  menu: string;
  outOfStock: string;
  addToCart: string;
  noItemsAvailable: string;
  
  // Categories
  sushiBurgerMenu: string;
  baoBunMenu: string;
  pokeBowls: string;
  signatures: string;
  makeYourOwn: string;
  sides: string;
  drinks: string;
  desserts: string;
  
  // Cart
  cart: string;
  items: string;
  total: string;
  validateOrder: string;
  
  // Order
  customerName: string;
  confirmOrder: string;
  orderComplete: string;
  thankYou: string;
  alreadyOrdered: string;
  createNewOrder: string;
  
  // Admin
  login: string;
  password: string;
  admin: string;
  liveOrders: string;
  orderHistory: string;
  
  // Components
  componentsBase: string;
  componentsSauce: string;
  componentsGarnitures: string;
  componentsProtein: string;
  componentsToppings: string;
  
  // Sizes
  sizeRegular: string;
  sizeLarge: string;
  
  // Errors
  closedMessage: string;
  wifiRequired: string;
}

const translations: Record<Language, TranslationKeys> = {
  fr: {
    loading: 'Chargement...',
    error: 'Erreur',
    back: 'Retour',
    next: 'Suivant',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    
    welcome: 'Bienvenue chez Take A Bowl',
    
    selectLanguage: 'Choisissez votre langue',
    french: 'Français',
    english: 'English',
    dutch: 'Nederlands',
    
    menu: 'Menu',
    outOfStock: 'Rupture de stock',
    addToCart: 'Ajouter au panier',
    noItemsAvailable: 'Aucun article disponible',
    
    sushiBurgerMenu: 'Menu Sushi Burger',
    baoBunMenu: 'Menu Bao Bun',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Créez le vôtre',
    sides: 'Accompagnements',
    drinks: 'Boissons',
    desserts: 'Desserts',
    
    cart: 'Panier',
    items: 'articles',
    total: 'Total',
    validateOrder: 'Valider la commande',
    
    customerName: 'Nom du client',
    confirmOrder: 'Confirmer la commande',
    orderComplete: 'Commande terminée',
    thankYou: 'Merci pour votre commande !',
    alreadyOrdered: 'Commande déjà passée pour cette table',
    createNewOrder: 'Créer une nouvelle commande ?',
    
    login: 'Connexion',
    password: 'Mot de passe',
    admin: 'Administration',
    liveOrders: 'Commandes en cours',
    orderHistory: 'Historique des commandes',
    
    componentsBase: 'Base',
    componentsSauce: 'Sauce',
    componentsGarnitures: 'Garnitures',
    componentsProtein: 'Protéine',
    componentsToppings: 'Toppings',
    
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    
    closedMessage: 'Nous sommes fermés. Horaires : Lundi-Samedi 11h-22h, Dimanche fermé.',
    wifiRequired: 'Veuillez vous connecter au Wi-Fi TakeABowl-WiFi pour confirmer votre commande.'
  },
  en: {
    loading: 'Loading...',
    error: 'Error',
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm',
    cancel: 'Cancel',
    
    welcome: 'Welcome to Take A Bowl',
    
    selectLanguage: 'Choose your language',
    french: 'Français',
    english: 'English',
    dutch: 'Nederlands',
    
    menu: 'Menu',
    outOfStock: 'Out of stock',
    addToCart: 'Add to cart',
    noItemsAvailable: 'No items available',
    
    sushiBurgerMenu: 'Sushi Burger Menu',
    baoBunMenu: 'Bao Bun Menu',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Make Your Own',
    sides: 'Sides',
    drinks: 'Drinks',
    desserts: 'Desserts',
    
    cart: 'Cart',
    items: 'items',
    total: 'Total',
    validateOrder: 'Validate order',
    
    customerName: 'Customer name',
    confirmOrder: 'Confirm order',
    orderComplete: 'Order complete',
    thankYou: 'Thank you for your order!',
    alreadyOrdered: 'Order already placed for this table',
    createNewOrder: 'Create new order?',
    
    login: 'Login',
    password: 'Password',
    admin: 'Administration',
    liveOrders: 'Live Orders',
    orderHistory: 'Order History',
    
    componentsBase: 'Base',
    componentsSauce: 'Sauce',
    componentsGarnitures: 'Vegetables',
    componentsProtein: 'Protein',
    componentsToppings: 'Toppings',
    
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    
    closedMessage: 'We are closed. Hours: Monday-Saturday 11am-10pm, Sunday closed.',
    wifiRequired: 'Please connect to TakeABowl-WiFi to confirm your order.'
  },
  nl: {
    loading: 'Laden...',
    error: 'Fout',
    back: 'Terug',
    next: 'Volgende',
    confirm: 'Bevestigen',
    cancel: 'Annuleren',
    
    welcome: 'Welkom bij Take A Bowl',
    
    selectLanguage: 'Kies je taal',
    french: 'Français',
    english: 'English',
    dutch: 'Nederlands',
    
    menu: 'Menu',
    outOfStock: 'Uitverkocht',
    addToCart: 'Toevoegen aan winkelwagen',
    noItemsAvailable: 'Geen items beschikbaar',
    
    sushiBurgerMenu: 'Sushi Burger Menu',
    baoBunMenu: 'Bao Bun Menu',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Maak je eigen',
    sides: 'Bijgerechten',
    drinks: 'Drankjes',
    desserts: 'Desserts',
    
    cart: 'Winkelwagen',
    items: 'items',
    total: 'Totaal',
    validateOrder: 'Bestelling valideren',
    
    customerName: 'Klantnaam',
    confirmOrder: 'Bestelling bevestigen',
    orderComplete: 'Bestelling voltooid',
    thankYou: 'Bedankt voor je bestelling!',
    alreadyOrdered: 'Bestelling al geplaatst voor deze tafel',
    createNewOrder: 'Nieuwe bestelling maken?',
    
    login: 'Inloggen',
    password: 'Wachtwoord',
    admin: 'Beheer',
    liveOrders: 'Live bestellingen',
    orderHistory: 'Bestelgeschiedenis',
    
    componentsBase: 'Basis',
    componentsSauce: 'Saus',
    componentsGarnitures: 'Groenten',
    componentsProtein: 'Proteïne',
    componentsToppings: 'Toppings',
    
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    
    closedMessage: 'We zijn gesloten. Openingstijden: Maandag-Zaterdag 11u-22u, Zondag gesloten.',
    wifiRequired: 'Verbind met TakeABowl-WiFi om je bestelling te bevestigen.'
  }
};

export const useTranslation = (language: Language) => {
  return (key: keyof TranslationKeys): string => {
    return translations[language][key] || translations.fr[key];
  };
};

export const getDefaultLanguage = (): Language => 'fr';
