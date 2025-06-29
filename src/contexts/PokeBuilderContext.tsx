
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

// Define which steps are required
const REQUIRED_STEPS = [1, 2]; // Size and Base only

export function PokeBuilderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(pokeBuilderReducer, initialState);
  
  const isValid = isValidForCart(state);
  const totalPrice = () => getTotalPrice(state);

  const canProceedToNext = () => {
    // Only check requirements for required steps
    if (!REQUIRED_STEPS.includes(state.currentStep)) {
      return true; // Optional steps can always be skipped
    }

    switch (state.currentStep) {
      case 1: // Size - required
        return state.size !== null;
      case 2: // Base - required (at least 1)
        return state.base.length >= 1;
      default:
        return true;
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
