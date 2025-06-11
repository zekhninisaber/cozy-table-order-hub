
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface PokeBuilderState {
  size: 'Regular' | 'Large' | null;
  base: string[];
  sauce: string[];
  garnitures: string[];
  protein: string | null;
  toppings: string[];
  extraSauce: string[];
  extraGarniture: string[];
  extraProtein: string[];
}

type PokeBuilderAction = 
  | { type: 'SET_SIZE'; payload: 'Regular' | 'Large' }
  | { type: 'ADD_BASE'; payload: string }
  | { type: 'REMOVE_BASE'; payload: string }
  | { type: 'ADD_SAUCE'; payload: string }
  | { type: 'REMOVE_SAUCE'; payload: string }
  | { type: 'ADD_GARNITURE'; payload: string }
  | { type: 'REMOVE_GARNITURE'; payload: string }
  | { type: 'SET_PROTEIN'; payload: string }
  | { type: 'REMOVE_PROTEIN' }
  | { type: 'ADD_TOPPING'; payload: string }
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
  extraProtein: []
};

function pokeBuilderReducer(state: PokeBuilderState, action: PokeBuilderAction): PokeBuilderState {
  switch (action.type) {
    case 'SET_SIZE':
      return { ...state, size: action.payload };
    case 'ADD_BASE':
      if (state.base.length < 2 && !state.base.includes(action.payload)) {
        return { ...state, base: [...state.base, action.payload] };
      }
      return state;
    case 'REMOVE_BASE':
      return { ...state, base: state.base.filter(item => item !== action.payload) };
    case 'ADD_SAUCE':
      if (state.sauce.length < 2 && !state.sauce.includes(action.payload)) {
        return { ...state, sauce: [...state.sauce, action.payload] };
      }
      return state;
    case 'REMOVE_SAUCE':
      return { ...state, sauce: state.sauce.filter(item => item !== action.payload) };
    case 'ADD_GARNITURE':
      if (state.garnitures.length < 5 && !state.garnitures.includes(action.payload)) {
        return { ...state, garnitures: [...state.garnitures, action.payload] };
      }
      return state;
    case 'REMOVE_GARNITURE':
      return { ...state, garnitures: state.garnitures.filter(item => item !== action.payload) };
    case 'SET_PROTEIN':
      return { ...state, protein: action.payload };
    case 'REMOVE_PROTEIN':
      return { ...state, protein: null };
    case 'ADD_TOPPING':
      if (state.toppings.length < 2 && !state.toppings.includes(action.payload)) {
        return { ...state, toppings: [...state.toppings, action.payload] };
      }
      return state;
    case 'REMOVE_TOPPING':
      return { ...state, toppings: state.toppings.filter(item => item !== action.payload) };
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
    
    // Base price
    let total = state.size === 'Regular' ? 12.90 : 14.90;
    
    // Extra pricing
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
