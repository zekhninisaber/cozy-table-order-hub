
import { PokeBuilderState } from '@/types/pokeBuilder';

export function isValidForCart(state: PokeBuilderState): boolean {
  return state.size !== null && state.base.length >= 1;
}

export function getTotalPrice(state: PokeBuilderState): number {
  if (!state.size) {
    return 0;
  }
  
  // Find the size option to get the correct pricing
  const sizeOption = Object.values(state.selectedOptions).find(option => option.stepId === 1);
  
  // Base price is 12.90, and size can have extra price
  let total = 12.90;
  if (sizeOption && sizeOption.extraPrice > 0) {
    total += sizeOption.extraPrice;
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
}
