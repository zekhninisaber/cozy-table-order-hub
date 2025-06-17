
import { supabase } from '@/integrations/supabase/client';
import type { BuilderStep, BuilderOption } from '@/data/menuSeed';

export async function getSupabaseBuilderSteps(): Promise<BuilderStep[]> {
  const { data, error } = await supabase
    .from('builder_steps')
    .select('*')
    .order('sort', { ascending: true });
  
  if (error) {
    console.error('Error fetching builder steps:', error);
    return [];
  }
  
  return data || [];
}

export async function getSupabaseBuilderOptions(stepId?: number): Promise<BuilderOption[]> {
  let query = supabase
    .from('builder_options')
    .select('*');
  
  if (stepId) {
    query = query.eq('step_id', stepId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Error fetching builder options:', error);
    return [];
  }
  
  return (data || []).map(row => ({
    ...row,
    extra_price: Number(row.extra_price)
  }));
}
