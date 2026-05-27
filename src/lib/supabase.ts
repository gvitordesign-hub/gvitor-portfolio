import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://sua-url-aqui.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'seu-token-anon-key-aqui';

// Inicializar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper para verificar se as credenciais do Supabase foram preenchidas de forma válida
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl &&
    supabaseUrl !== 'https://sua-url-aqui.supabase.co' &&
    supabaseAnonKey &&
    supabaseAnonKey !== 'seu-token-anon-key-aqui'
  );
};
