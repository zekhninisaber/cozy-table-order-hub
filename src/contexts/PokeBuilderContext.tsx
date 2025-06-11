
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
