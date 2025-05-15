import { createClient } from '@supabase/supabase-js';

// Environment variable validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type-safe database interfaces
export interface Profile {
  id: string;
  user_id: string;
  role: 'customer' | 'vendor' | 'admin';
  email: string;
  full_name?: string;
  company_name?: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  is_approved?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Package {
  id: string;
  vendor_id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  duration_days: number;
  max_travelers: number;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Export database types
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Profile, 'id'>>;
      };
      packages: {
        Row: Package;
        Insert: Omit<Package, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Package, 'id'>>;
      };
    };
  };
};
