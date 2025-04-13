import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type CV = {
  id: string;
  user_id: string;
  template_id: string;
  title: string;
  content: any;
  created_at: string;
  updated_at: string;
};

const handleSupabaseError = (error: any) => {
  console.error('Supabase operation failed:', error);
  
  // Check for specific error types and provide user-friendly messages
  if (error.code === 'PGRST301') {
    toast.error('Please sign in to continue');
    return new Error('Authentication required');
  }
  
  if (error.code === '23505') {
    toast.error('This record already exists');
    return new Error('Duplicate record');
  }
  
  if (error.code === '23503') {
    toast.error('Related record not found');
    return new Error('Foreign key violation');
  }

  // Default error message
  toast.error('Operation failed. Please try again');
  return error;
};

export async function saveCv(cv: Omit<CV, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .insert(cv)
      .select()
      .single();

    if (error) throw error;
    toast.success('CV saved successfully');
    return data;
  } catch (error) {
    throw handleSupabaseError(error);
  }
}

export async function updateCv(id: string, cv: Partial<CV>) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .update(cv)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    toast.success('CV updated successfully');
    return data;
  } catch (error) {
    throw handleSupabaseError(error);
  }
}

export async function deleteCv(id: string) {
  try {
    const { error } = await supabase
      .from('cvs')
      .delete()
      .eq('id', id);

    if (error) throw error;
    toast.success('CV deleted successfully');
  } catch (error) {
    throw handleSupabaseError(error);
  }
}

export async function getCvs() {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error);
  }
}

export async function getCv(id: string) {
  try {
    const { data, error } = await supabase
      .from('cvs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    throw handleSupabaseError(error);
  }
}