
import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      transactions: {
        Row: {
          id: string;
          title: string;
          amount: number;
          type: 'income' | 'expense';
          category: string;
          date: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['transactions']['Row'], 'id' | 'created_at'>;
      };
      categories: {
        Row: {
          id: string;
          name: string;
          icon: string;
        };
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id'>;
      };
    };
  };
};
