import { create } from 'zustand';

const useSession = create((set, get) => {
  // Load from localStorage on init
  const stored = localStorage.getItem('session-storage');
  const initial = stored ? JSON.parse(stored) : { user: null, role: null, isAuthenticated: false };

  return {
    ...initial,

    // Login
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

    // Logout
    logout: () => {
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

