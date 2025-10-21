import { create } from 'zustand';
import { supabase } from '../lib/supabase';

const useSession = create((set, get) => {
  // Load from localStorage on init
  const stored = localStorage.getItem('session-storage');
  const initial = stored ? JSON.parse(stored) : { user: null, role: null, isAuthenticated: false };

  return {
    ...initial,

    // Login (for internal auth - guests and Ira)
    login: (username, role) => {
      const newState = {
        user: {
          username,
          loginAt: new Date().toISOString(),
        },
        role,
        isAuthenticated: true,
      };
      set(newState);
      localStorage.setItem('session-storage', JSON.stringify(newState));
    },

    // Supabase Auth login (for admin)
    loginWithSupabase: async (email, password) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        const newState = {
          user: {
            username: data.user.email,
            loginAt: new Date().toISOString(),
            supabaseUser: data.user,
          },
          role: 'admin',
          isAuthenticated: true,
        };
        set(newState);
        localStorage.setItem('session-storage', JSON.stringify(newState));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Logout
    logout: async () => {
      const { role } = get();
      
      // If admin, logout from Supabase too
      if (role === 'admin') {
        await supabase.auth.signOut();
      }
      
      const newState = {
        user: null,
        role: null,
        isAuthenticated: false,
      };
      set(newState);
      localStorage.removeItem('session-storage');
    },

    // Check if user has specific role
    hasRole: (requiredRole) => {
      const { role } = get();
      if (requiredRole === 'guest') {
        return role !== null; // Any authenticated user
      }
      return role === requiredRole;
    },

    // Check if user is admin
    isAdmin: () => {
      const { role } = get();
      return role === 'admin';
    },

    // Check if user is Ira
    isIra: () => {
      const { role } = get();
      return role === 'ira';
    },
  };
});

export default useSession;

