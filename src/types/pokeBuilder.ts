
export interface PokeBuilderState {
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

export type PokeBuilderAction = 
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

export const initialState: PokeBuilderState = {
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
