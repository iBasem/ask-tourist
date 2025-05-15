import { create } from 'zustand';
import { supabase } from '@/lib/supabaseClient';
import type { User, Session } from '@supabase/supabase-js';
import type { Profile } from '@/types/auth';

/**
 * Authentication state interface
 */
interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshProfile: (userId: string) => Promise<void>;
  init: () => Promise<void>;
}

/**
 * Authentication store using Zustand
 * Manages user session, profile data, and loading state
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,
  error: null,

  /**
   * Sign out the current user and reset state
   */
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set({ session: null, user: null, profile: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to sign out' });
    }
  },

  /**
   * Refresh the user's profile data
   * @param userId The user ID to fetch profile for
   */
  refreshProfile: async (userId: string) => {
    try {
      set({ loading: true });
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      set({ profile: data as Profile, error: null });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch profile' });
    } finally {
      set({ loading: false });
    }
  },

  /**
   * Initialize the auth store
   * Gets current session and sets up auth state change listener
   */
  init: async () => {
    try {
      // Set loading state
      set({ loading: true });

      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      // If user is authenticated, fetch their profile
      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profileError) throw profileError;
        set({ session, user: session.user, profile: profile as Profile, error: null });
      } else {
        set({ session: null, user: null, profile: null, error: null });
      }

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          set({ session, user: session?.user || null });

          // If user signed in, fetch their profile
          if (session?.user) {
            await get().refreshProfile(session.user.id);
          } else {
            set({ profile: null });
          }
        }
      );

      // Return cleanup function
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to initialize auth' });
    } finally {
      set({ loading: false });
    }
  }
}));
