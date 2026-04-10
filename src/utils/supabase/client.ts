/**
 * CIELO Agency - Supabase Client
 * Browser-side Supabase client for auth and queries
 * 
 * Note: This uses a CDN-loaded version of Supabase for browser compatibility
 */

import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Supabase client singleton - ensure only ONE instance globally
// Using window object to ensure true singleton across all imports
declare global {
  interface Window {
    __CIELO_SUPABASE_CLIENT__?: any;
    __CIELO_SUPABASE_INIT_PROMISE__?: Promise<any> | null;
  }
}

// Storage key to ensure single instance
const STORAGE_KEY = 'sb-ykinptyiytyenumlowaa-auth-token';

// Track if we've initialized
let clientInitialized = false;

// Load Supabase from CDN
async function loadSupabaseClient() {
  // Check global singleton first - return immediately without logging
  if (window.__CIELO_SUPABASE_CLIENT__) {
    return window.__CIELO_SUPABASE_CLIENT__;
  }
  
  // Return existing promise if initialization is in progress
  if (window.__CIELO_SUPABASE_INIT_PROMISE__) {
    return window.__CIELO_SUPABASE_INIT_PROMISE__;
  }

  // Only log on first initialization
  if (!clientInitialized) {
    console.log('🔄 Initializing Supabase client...');
    clientInitialized = true;
  }

  window.__CIELO_SUPABASE_INIT_PROMISE__ = new Promise(async (resolve, reject) => {
    try {
      // Check if already loaded globally
      if ((window as any).supabase) {
        window.__CIELO_SUPABASE_CLIENT__ = (window as any).supabase.createClient(supabaseUrl, publicAnonKey, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true,
            storage: window.localStorage,
            storageKey: STORAGE_KEY,
            flowType: 'pkce',
          },
        });
        console.log('✅ Supabase client ready');
        resolve(window.__CIELO_SUPABASE_CLIENT__);
        return;
      }

      // Load from CDN
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => {
        if ((window as any).supabase) {
          window.__CIELO_SUPABASE_CLIENT__ = (window as any).supabase.createClient(supabaseUrl, publicAnonKey, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true,
              storage: window.localStorage,
              storageKey: STORAGE_KEY,
              flowType: 'pkce',
            },
          });
          console.log('✅ Supabase client ready');
          resolve(window.__CIELO_SUPABASE_CLIENT__);
        } else {
          reject(new Error('Supabase failed to load from CDN'));
        }
      };
      script.onerror = () => reject(new Error('Failed to load Supabase script'));
      document.head.appendChild(script);
    } catch (error) {
      console.error('❌ Error initializing Supabase client:', error);
      reject(error);
    }
  });

  return window.__CIELO_SUPABASE_INIT_PROMISE__;
}

// Create and export client getter
export async function createClient() {
  return loadSupabaseClient();
}

// Auth helpers
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, fullName?: string) => {
    try {
      const client = await loadSupabaseClient();
      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'team',
          },
        },
      });
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    try {
      const client = await loadSupabaseClient();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // Sign in with magic link
  signInWithMagicLink: async (email: string) => {
    const client = await loadSupabaseClient();
    const { data, error } = await client.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/team-dashboard`,
      },
    });
    return { data, error };
  },

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    try {
      const client = await loadSupabaseClient();
      const { data, error } = await client.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/team-dashboard`,
        },
      });
      
      if (error) {
        return { data: null, error };
      }
      
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error };
    }
  },

  // Sign out
  signOut: async () => {
    const client = await loadSupabaseClient();
    const { error } = await client.auth.signOut();
    return { error };
  },

  // Get current session
  getSession: async () => {
    const client = await loadSupabaseClient();
    const { data, error } = await client.auth.getSession();
    return { data, error };
  },

  // Get current user
  getUser: async () => {
    const client = await loadSupabaseClient();
    const { data, error } = await client.auth.getUser();
    return { data, error };
  },

  // Reset password
  resetPassword: async (email: string) => {
    const client = await loadSupabaseClient();
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { data, error };
  },

  // Update password
  updatePassword: async (newPassword: string) => {
    const client = await loadSupabaseClient();
    const { data, error } = await client.auth.updateUser({
      password: newPassword,
    });
    return { data, error };
  },

  // Listen to auth state changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    loadSupabaseClient().then(client => {
      return client.auth.onAuthStateChange(callback);
    }).catch(err => {
      console.error('Failed to setup auth listener:', err);
    });
    
    // Return a dummy subscription object immediately
    return {
      data: {
        subscription: {
          unsubscribe: () => {},
        },
      },
    };
  },
};

// User profile helpers
export const profiles = {
  // Get user profile
  getProfile: async (userId: string) => {
    try {
      const client = await loadSupabaseClient();
      const { data, error } = await client
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();
      return { data, error };
    } catch (error: any) {
      console.warn('Profile table access error (non-critical):', error.message);
      // Return a graceful error instead of throwing
      return { data: null, error: { message: 'Profile table not accessible', code: 'PGRST116' } };
    }
  },

  // Update user profile
  updateProfile: async (userId: string, updates: any) => {
    try {
      const client = await loadSupabaseClient();
      const { data, error } = await client
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();
      return { data, error };
    } catch (error: any) {
      console.warn('Profile update error (non-critical):', error.message);
      return { data: null, error: { message: 'Profile table not accessible', code: 'PGRST116' } };
    }
  },
};

// Database query helper
export const db = {
  // Get Supabase client for direct queries
  getClient: async () => loadSupabaseClient(),
};