
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PokeBuilderState, PokeBuilderAction, initialState } from '@/types/pokeBuilder';
import { pokeBuilderReducer } from './pokeBuilderReducer';
import { isValidForCart, getTotalPrice } from '@/utils/pokeBuilderUtils';

interface PokeBuilderContextValue {
  state: PokeBuilderState;
  dispatch: React.Dispatch<PokeBuilderAction>;
  isValidForCart: boolean;
  getTotalPrice: () => number;
}

const PokeBuilderContext = createContext<PokeBuilderContextValue | undefined>(undefined);

export function PokeBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokeBuilderReducer, initialState);
  
  const isValid = isValidForCart(state);
  const totalPrice = () => getTotalPrice(state);

  return (
    <PokeBuilderContext.Provider value={{ 
      state, 
      dispatch, 
      isValidForCart: isValid, 
      getTotalPrice: totalPrice 
    }}>
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
