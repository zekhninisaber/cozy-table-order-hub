
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from './i18n';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  builderData?: {
    size?: string;
    base?: string[];
    sauce?: string[];
    garnitures?: string[];
    protein?: string | null;
    toppings?: string[];
    extraSauce?: string[];
    extraGarniture?: string[];
    extraProtein?: string[];
    [key: string]: any;
  };
}

interface AppState {
  // Language & Table
  language: Language;
  tableNumber: string | null;
  
  // Cart
  cart: CartItem[];
  
  // User
  customerName: string;
  
  // Actions
  setLanguage: (lang: Language) => void;
  setTableNumber: (table: string) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  setCustomerName: (name: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      language: 'fr',
      tableNumber: null,
      cart: [],
      customerName: '',
      
      setLanguage: (lang) => set({ language: lang }),
      setTableNumber: (table) => set({ tableNumber: table }),
      
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => 
          cartItem.id === item.id && 
          JSON.stringify(cartItem.builderData) === JSON.stringify(item.builderData)
        );
        
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem === existingItem
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          };
        }
        
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        };
      }),
      
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      
      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: quantity > 0 
          ? state.cart.map(item => item.id === id ? { ...item, quantity } : item)
          : state.cart.filter(item => item.id !== id)
      })),
      
      clearCart: () => set({ cart: [] }),
      setCustomerName: (name) => set({ customerName: name }),
      
      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getCartItemCount: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: 'takeabowl-storage',
      partialize: (state) => ({
        language: state.language,
        tableNumber: state.tableNumber,
        cart: state.cart,
        customerName: state.customerName
      })
    }
  )
);
