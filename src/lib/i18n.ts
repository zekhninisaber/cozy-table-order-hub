export type Language = 'fr' | 'en' | 'nl';

interface Translations {
  home: string;
  menu: string;
  cart: string;
  total: string;
  addToCart: string;
  outOfStock: string;
  customerName: string;
  validateOrder: string;
  confirmOrder: string;
  orderComplete: string;
  orderCompleteMessage: string;
  newOrder: string;
  backToMenu: string;
  wifiRequired: string;
  error: string;
  loading: string;
  pokeBowls: string;
  signatures: string;
  makeYourOwn: string;
  sizeChoice: string;
  sizeRegular: string;
  sizeLarge: string;
  base: string;
  sauce: string;
  garnitures: string;
  protein: string;
  toppings: string;
  extraSauce: string;
  extraGarniture: string;
  extraProtein: string;
  next: string;
  previous: string;
  reviewOrder: string;
  modifyBowl: string;
  from: string;
}

const translations: Record<Language, Translations> = {
  fr: {
    home: 'Accueil',
    menu: 'Menu',
    cart: 'Panier',
    total: 'Total',
    addToCart: 'Ajouter au panier',
    outOfStock: 'Rupture de stock',
    customerName: 'Nom du client',
    validateOrder: 'Valider la commande',
    confirmOrder: 'Confirmer la commande',
    orderComplete: 'Commande terminée',
    orderCompleteMessage: 'Votre commande a été envoyée en cuisine !',
    newOrder: 'Nouvelle commande',
    backToMenu: 'Retour au menu',
    wifiRequired: 'Connexion WiFi requise',
    error: 'Erreur',
    loading: 'Chargement...',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Compose ton bowl',
    sizeChoice: 'Choix de la taille',
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    base: 'Base',
    sauce: 'Sauce',
    garnitures: 'Garnitures',
    protein: 'Protéine',
    toppings: 'Toppings',
    extraSauce: 'Sauce supplémentaire',
    extraGarniture: 'Garniture supplémentaire',
    extraProtein: 'Protéine supplémentaire',
    next: 'Suivant',
    previous: 'Précédent',
    reviewOrder: 'Voir ma commande',
    modifyBowl: 'Modifier',
    from: 'À partir de'
  },
  en: {
    home: 'Home',
    menu: 'Menu',
    cart: 'Cart',
    total: 'Total',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    customerName: 'Customer Name',
    validateOrder: 'Validate Order',
    confirmOrder: 'Confirm Order',
    orderComplete: 'Order Complete',
    orderCompleteMessage: 'Your order has been sent to the kitchen!',
    newOrder: 'New Order',
    backToMenu: 'Back to Menu',
    wifiRequired: 'WiFi Connection Required',
    error: 'Error',
    loading: 'Loading...',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Make Your Own',
    sizeChoice: 'Size Choice',
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    base: 'Base',
    sauce: 'Sauce',
    garnitures: 'Toppings',
    protein: 'Protein',
    toppings: 'Toppings',
    extraSauce: 'Extra Sauce',
    extraGarniture: 'Extra Topping',
    extraProtein: 'Extra Protein',
    next: 'Next',
    previous: 'Previous',
    reviewOrder: 'Review Order',
    modifyBowl: 'Modify',
    from: 'From'
  },
  nl: {
    home: 'Home',
    menu: 'Menu',
    cart: 'Winkelwagen',
    total: 'Totaal',
    addToCart: 'Toevoegen',
    outOfStock: 'Uitverkocht',
    customerName: 'Klantnaam',
    validateOrder: 'Bestelling Valideren',
    confirmOrder: 'Bestelling Bevestigen',
    orderComplete: 'Bestelling Voltooid',
    orderCompleteMessage: 'Uw bestelling is naar de keuken gestuurd!',
    newOrder: 'Nieuwe Bestelling',
    backToMenu: 'Terug naar Menu',
    wifiRequired: 'WiFi Verbinding Vereist',
    error: 'Fout',
    loading: 'Laden...',
    pokeBowls: 'Poke Bowls',
    signatures: 'Signatures',
    makeYourOwn: 'Maak Je Eigen',
    sizeChoice: 'Keuze van Grootte',
    sizeRegular: 'Regular',
    sizeLarge: 'Large',
    base: 'Basis',
    sauce: 'Saus',
    garnitures: 'Garnituur',
    protein: 'Proteïne',
    toppings: 'Toppings',
    extraSauce: 'Extra Saus',
    extraGarniture: 'Extra Garnituur',
    extraProtein: 'Extra Proteïne',
    next: 'Volgende',
    previous: 'Vorige',
    reviewOrder: 'Bestelling Bekijken',
    modifyBowl: 'Wijzigen',
    from: 'Vanaf'
  }
};

export function useTranslation(language: Language) {
  return (key: keyof Translations): string => {
    return translations[language][key] || key;
  };
}
