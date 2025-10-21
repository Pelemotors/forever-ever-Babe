import { create } from 'zustand';
import { greetingsApi } from '../lib/supabase';

const useGreetings = create((set, get) => {
  return {
    greetings: [],
    loading: false,
    error: null,

    // Add new greeting (for guests)
    addGreeting: async (greetingData) => {
      set({ loading: true, error: null });
      try {
        const newGreeting = await greetingsApi.createGreeting(greetingData);
        set((state) => ({
          greetings: [...state.greetings, newGreeting],
          loading: false
        }));
        return newGreeting;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Load approved greetings (for public display)
    loadApprovedGreetings: async () => {
      set({ loading: true, error: null });
      try {
        const greetings = await greetingsApi.getApprovedGreetings();
        set({ greetings, loading: false });
        return greetings;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Load all greetings (for admin)
    loadAllGreetings: async () => {
      set({ loading: true, error: null });
      try {
        const greetings = await greetingsApi.getAllGreetings();
        set({ greetings, loading: false });
        return greetings;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Load pending greetings (for admin)
    loadPendingGreetings: async () => {
      set({ loading: true, error: null });
      try {
        const greetings = await greetingsApi.getPendingGreetings();
        set({ greetings, loading: false });
        return greetings;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Approve greeting (for admin)
    approveGreeting: async (id) => {
      set({ loading: true, error: null });
      try {
        const updatedGreeting = await greetingsApi.approveGreeting(id);
        set((state) => ({
          greetings: state.greetings.map((g) =>
            g.id === id ? updatedGreeting : g
          ),
          loading: false
        }));
        return updatedGreeting;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Reject greeting (for admin)
    rejectGreeting: async (id) => {
      set({ loading: true, error: null });
      try {
        const updatedGreeting = await greetingsApi.rejectGreeting(id);
        set((state) => ({
          greetings: state.greetings.map((g) =>
            g.id === id ? updatedGreeting : g
          ),
          loading: false
        }));
        return updatedGreeting;
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Delete greeting (for admin)
    deleteGreeting: async (id) => {
      set({ loading: true, error: null });
      try {
        await greetingsApi.deleteGreeting(id);
        set((state) => ({
          greetings: state.greetings.filter((g) => g.id !== id),
          loading: false
        }));
      } catch (error) {
        set({ error: error.message, loading: false });
        throw error;
      }
    },

    // Get greetings by status
    getByStatus: (status) => {
      const { greetings } = get();
      return greetings.filter((g) => g.status === status);
    },

    // Get approved greetings only
    getApproved: () => {
      const { greetings } = get();
      return greetings.filter((g) => g.status === 'approved');
    },

    // Get pending greetings
    getPending: () => {
      const { greetings } = get();
      return greetings.filter((g) => g.status === 'pending');
    },

    // Get greeting by ID
    getById: (id) => {
      const { greetings } = get();
      return greetings.find((g) => g.id === id);
    },

    // Count by status
    countByStatus: () => {
      const { greetings } = get();
      return {
        total: greetings.length,
        pending: greetings.filter((g) => g.status === 'pending').length,
        approved: greetings.filter((g) => g.status === 'approved').length,
        rejected: greetings.filter((g) => g.status === 'rejected').length,
      };
    },
  };
});

export default useGreetings;

