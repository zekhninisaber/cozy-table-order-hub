import { PokeBuilderState, PokeBuilderAction, initialState } from '@/types/pokeBuilder';

export function pokeBuilderReducer(state: PokeBuilderState, action: PokeBuilderAction): PokeBuilderState {
  switch (action.type) {
    case 'SET_SIZE':
      const sizeKey = `size_${action.payload}`;
      const filteredOptions = Object.fromEntries(
        Object.entries(state.selectedOptions).filter(([_, option]) => option.stepId !== 1)
      );
      return { 
        ...state, 
        size: action.payload,
        selectedOptions: {
          ...filteredOptions,
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
    case 'NEXT_STEP':
      return { 
        ...state, 
        currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
      };
    case 'PREV_STEP':
      return { 
        ...state, 
        currentStep: Math.max(state.currentStep - 1, 1) 
      };
    case 'GO_TO_STEP':
      return { 
        ...state, 
        currentStep: Math.max(1, Math.min(action.payload, state.totalSteps)) 
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
