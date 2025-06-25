
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { PokeBuilderState, PokeBuilderAction, initialState } from '@/types/pokeBuilder';
import { pokeBuilderReducer } from './pokeBuilderReducer';
import { isValidForCart, getTotalPrice } from '@/utils/pokeBuilderUtils';

interface PokeBuilderContextValue {
  state: PokeBuilderState;
  dispatch: React.Dispatch<PokeBuilderAction>;
  isValidForCart: boolean;
  getTotalPrice: () => number;
  canProceedToNext: () => boolean;
  getStepTitle: () => string;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const PokeBuilderContext = createContext<PokeBuilderContextValue | undefined>(undefined);

const stepTitles = [
  '', // Index 0 unused
  'Choose Size',
  'Choose Base',
  'Choose Sauce',
  'Choose Garnitures',
  'Choose Protein',
  'Choose Toppings',
  'Extra Sauce',
  'Extra Garniture',
  'Extra Protein'
];

export function PokeBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokeBuilderReducer, initialState);
  
  const isValid = isValidForCart(state);
  const totalPrice = () => getTotalPrice(state);

  const canProceedToNext = () => {
    switch (state.currentStep) {
      case 1: // Size - required
        return state.size !== null;
      case 2: // Base - required (at least 1)
        return state.base.length >= 1;
      case 3: // Sauce - required (at least 1)
        return state.sauce.length >= 1;
      case 4: // Garnitures - required (at least 1)
        return state.garnitures.length >= 1;
      case 5: // Protein - required
        return state.protein !== null;
      case 6: // Toppings - optional
      case 7: // Extra Sauce - optional
      case 8: // Extra Garniture - optional
      case 9: // Extra Protein - optional
        return true;
      default:
        return false;
    }
  };

  const getStepTitle = () => {
    return stepTitles[state.currentStep] || 'Unknown Step';
  };

  const isFirstStep = state.currentStep === 1;
  const isLastStep = state.currentStep === state.totalSteps;

  return (
    <PokeBuilderContext.Provider value={{ 
      state, 
      dispatch, 
      isValidForCart: isValid, 
      getTotalPrice: totalPrice,
      canProceedToNext,
      getStepTitle,
      isFirstStep,
      isLastStep
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
