
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PokeBuilderState {
  size: string | null;
  base: string[];
  sauce: string[];
  garnitures: string[];
  protein: string | null;
  toppings: string[];
  extraSauce: string[];
  extraGarniture: string[];
  extraProtein: string[];
  selectedOptions: Record<string, { name: string; extraPrice: number; stepId: number }>;
}

type PokeBuilderAction = 
  | { type: 'SET_SIZE'; payload: string; extraPrice?: number }
  | { type: 'ADD_BASE'; payload: string; extraPrice?: number }
  | { type: 'REMOVE_BASE'; payload: string }
  | { type: 'ADD_SAUCE'; payload: string; extraPrice?: number }
  | { type: 'REMOVE_SAUCE'; payload: string }
  | { type: 'ADD_GARNITURE'; payload: string; extraPrice?: number }
  | { type: 'REMOVE_GARNITURE'; payload: string }
  | { type: 'SET_PROTEIN'; payload: string; extraPrice?: number }
  | { type: 'REMOVE_PROTEIN' }
  | { type: 'ADD_TOPPING'; payload: string; extraPrice?: number }
  | { type: 'REMOVE_TOPPING'; payload: string }
  | { type: 'ADD_EXTRA_SAUCE'; payload: string }
  | { type: 'REMOVE_EXTRA_SAUCE'; payload: string }
  | { type: 'ADD_EXTRA_GARNITURE'; payload: string }
  | { type: 'REMOVE_EXTRA_GARNITURE'; payload: string }
  | { type: 'ADD_EXTRA_PROTEIN'; payload: string }
  | { type: 'REMOVE_EXTRA_PROTEIN'; payload: string }
  | { type: 'RESET' };

const initialState: PokeBuilderState = {
  size: null,
  base: [],
  sauce: [],
  garnitures: [],
  protein: null,
  toppings: [],
  extraSauce: [],
  extraGarniture: [],
  extraProtein: [],
  selectedOptions: {}
};

function pokeBuilderReducer(state: PokeBuilderState, action: PokeBuilderAction): PokeBuilderState {
  switch (action.type) {
    case 'SET_SIZE':
      const sizeKey = `size_${action.payload}`;
      return { 
        ...state, 
        size: action.payload,
        selectedOptions: {
          ...state.selectedOptions,
          [sizeKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 1 }
        }
      };
    case 'ADD_BASE':
      if (state.base.length < 2 && !state.base.includes(action.payload)) {
        const baseKey = `base_${action.payload}`;
        return { 
          ...state, 
          base: [...state.base, action.payload],
          selectedOptions: {
            ...state.selectedOptions,
            [baseKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 2 }
          }
        };
      }
      return state;
    case 'REMOVE_BASE':
      const baseKeyToRemove = `base_${action.payload}`;
      const { [baseKeyToRemove]: removedBase, ...restOptionsBase } = state.selectedOptions;
      return { 
        ...state, 
        base: state.base.filter(item => item !== action.payload),
        selectedOptions: restOptionsBase
      };
    case 'ADD_SAUCE':
      if (state.sauce.length < 2 && !state.sauce.includes(action.payload)) {
        const sauceKey = `sauce_${action.payload}`;
        return { 
          ...state, 
          sauce: [...state.sauce, action.payload],
          selectedOptions: {
            ...state.selectedOptions,
            [sauceKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 3 }
          }
        };
      }
      return state;
    case 'REMOVE_SAUCE':
      const sauceKeyToRemove = `sauce_${action.payload}`;
      const { [sauceKeyToRemove]: removedSauce, ...restOptionsSauce } = state.selectedOptions;
      return { 
        ...state, 
        sauce: state.sauce.filter(item => item !== action.payload),
        selectedOptions: restOptionsSauce
      };
    case 'ADD_GARNITURE':
      if (state.garnitures.length < 5 && !state.garnitures.includes(action.payload)) {
        const garnitureKey = `garniture_${action.payload}`;
        return { 
          ...state, 
          garnitures: [...state.garnitures, action.payload],
          selectedOptions: {
            ...state.selectedOptions,
            [garnitureKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 4 }
          }
        };
      }
      return state;
    case 'REMOVE_GARNITURE':
      const garnitureKeyToRemove = `garniture_${action.payload}`;
      const { [garnitureKeyToRemove]: removedGarniture, ...restOptionsGarniture } = state.selectedOptions;
      return { 
        ...state, 
        garnitures: state.garnitures.filter(item => item !== action.payload),
        selectedOptions: restOptionsGarniture
      };
    case 'SET_PROTEIN':
      const proteinKey = `protein_${action.payload}`;
      return { 
        ...state, 
        protein: action.payload,
        selectedOptions: {
          ...state.selectedOptions,
          [proteinKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 5 }
        }
      };
    case 'REMOVE_PROTEIN':
      const proteinKeyToRemove = state.protein ? `protein_${state.protein}` : '';
      const { [proteinKeyToRemove]: removedProtein, ...restOptionsProtein } = state.selectedOptions;
      return { 
        ...state, 
        protein: null,
        selectedOptions: restOptionsProtein
      };
    case 'ADD_TOPPING':
      if (state.toppings.length < 2 && !state.toppings.includes(action.payload)) {
        const toppingKey = `topping_${action.payload}`;
        return { 
          ...state, 
          toppings: [...state.toppings, action.payload],
          selectedOptions: {
            ...state.selectedOptions,
            [toppingKey]: { name: action.payload, extraPrice: action.extraPrice || 0, stepId: 6 }
          }
        };
      }
      return state;
    case 'REMOVE_TOPPING':
      const toppingKeyToRemove = `topping_${action.payload}`;
      const { [toppingKeyToRemove]: removedTopping, ...restOptionsTopping } = state.selectedOptions;
      return { 
        ...state, 
        toppings: state.toppings.filter(item => item !== action.payload),
        selectedOptions: restOptionsTopping
      };
    case 'ADD_EXTRA_SAUCE':
      if (!state.extraSauce.includes(action.payload)) {
        return { ...state, extraSauce: [...state.extraSauce, action.payload] };
      }
      return state;
    case 'REMOVE_EXTRA_SAUCE':
      return { ...state, extraSauce: state.extraSauce.filter(item => item !== action.payload) };
    case 'ADD_EXTRA_GARNITURE':
      if (!state.extraGarniture.includes(action.payload)) {
        return { ...state, extraGarniture: [...state.extraGarniture, action.payload] };
      }
      return state;
    case 'REMOVE_EXTRA_GARNITURE':
      return { ...state, extraGarniture: state.extraGarniture.filter(item => item !== action.payload) };
    case 'ADD_EXTRA_PROTEIN':
      if (!state.extraProtein.includes(action.payload)) {
        return { ...state, extraProtein: [...state.extraProtein, action.payload] };
      }
      return state;
    case 'REMOVE_EXTRA_PROTEIN':
      return { ...state, extraProtein: state.extraProtein.filter(item => item !== action.payload) };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

interface PokeBuilderContextValue {
  state: PokeBuilderState;
  dispatch: React.Dispatch<PokeBuilderAction>;
  isValidForCart: boolean;
  getTotalPrice: () => number;
}

const PokeBuilderContext = createContext<PokeBuilderContextValue | undefined>(undefined);

export function PokeBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokeBuilderReducer, initialState);
  
  const isValidForCart = state.size !== null && state.base.length >= 1;

  const getTotalPrice = () => {
    if (!state.size) return 0;
    
    // Find the size option to get the actual base price
    const sizeOption = Object.values(state.selectedOptions).find(option => option.stepId === 1);
    let total = sizeOption ? sizeOption.extraPrice : 12.90; // Fallback to 12.90 if no size option found
    
    // If the size has no extra price, it means it's the base price (12.90)
    if (sizeOption && sizeOption.extraPrice === 0) {
      total = 12.90;
    }
    
    // Add extra pricing from all other selected options (excluding size)
    Object.values(state.selectedOptions).forEach(option => {
      if (option.stepId !== 1) { // Skip size step since we already handled it
        total += option.extraPrice;
      }
    });
    
    // Extra steps pricing (still hardcoded as these are always +1€ or +2€)
    total += state.extraSauce.length * 1; // +€1 each
    total += state.extraGarniture.length * 1; // +€1 each
    total += state.extraProtein.length * 2; // +€2 each
    
    return total;
  };

  return (
    <PokeBuilderContext.Provider value={{ state, dispatch, isValidForCart, getTotalPrice }}>
      {children}
    </PokeBuilderContext.Provider>
  );
}

export function usePokeBuilder() {
  const context = useContext(PokeBuilderContext);
  if (context === undefined) {
    throw new Error('usePokeBuilder must be used within a PokeBuilderProvider');
  }
  return context;
}
