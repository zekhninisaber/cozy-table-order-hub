
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
}

const PokeBuilderContext = createContext<PokeBuilderContextValue | undefined>(undefined);

export function PokeBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokeBuilderReducer, initialState);
  
  const isValidForCart = state.size !== null && state.base.length >= 1;

  return (
    <PokeBuilderContext.Provider value={{ state, dispatch, isValidForCart }}>
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
