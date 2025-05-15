import { supabase } from '@/lib/supabaseClient';
import type { SignUpForm, LoginForm } from '@/types/auth';

/**
 * Signs up a new user and creates their profile
 * @param params Sign-up form data including name, email, password, and vendor status
 * @returns The newly created user
 */
export async function signUp({ name, email, password, isVendor, company_name, location, social_links }: SignUpForm) {
  // Create the auth user
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      data: {
        name,
        is_vendor: isVendor
      }
    }
  });
  
  if (signUpError) throw signUpError;
  if (!user) throw new Error('User creation failed');

  // Determine role based on isVendor flag
  const role = isVendor ? 'vendor' : 'customer';
  
  // Create the profile record
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ 
      user_id: user.id, 
      name, 
      role, 
      is_vendor: isVendor,
      is_approved: !isVendor, // Customers are auto-approved, vendors need admin approval
      company_name,
      location,
      social_links
    }]);
  
  if (profileError) throw profileError;
  
  return user;
}

/**
 * Logs in a user with email and password
 * @param params Login form data including email and password
 * @returns The authenticated session
 */
export async function logIn({ email, password }: LoginForm) {
  const { data: { session }, error } = await supabase.auth.signInWithPassword({ 
    email, 
    password 
  });
  
  if (error) throw error;
  if (!session) throw new Error('Authentication failed');
  
  return session;
}

/**
 * Signs out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Gets the currently logged-in user's profile
 * @param userId User ID to fetch profile for
 * @returns The user's profile or null if not found
 */
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (error) throw error;
  return data;
}

/**
 * Checks if the current session is valid
 * @returns The current session and user, or null if not authenticated
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}
