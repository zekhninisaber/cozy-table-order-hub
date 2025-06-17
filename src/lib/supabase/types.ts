
import type { Database } from '@/integrations/supabase/types';

// Type helpers for casting Supabase Json to our expected types
export type SupabaseCategory = Database['public']['Tables']['categories']['Row'];
export type SupabaseMenuItem = Database['public']['Tables']['menu_items']['Row'];

// Helper function to safely cast Json to multilingual object
export function castToMultilingual(json: any): { fr: string; en: string; nl: string; } {
  if (typeof json === 'object' && json !== null) {
    return {
      fr: json.fr || '',
      en: json.en || '',
      nl: json.nl || ''
    };
  }
  return { fr: '', en: '', nl: '' };
}
