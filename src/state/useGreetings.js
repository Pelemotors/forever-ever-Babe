import { create } from 'zustand';

const useGreetings = create((set, get) => {
  // Load from localStorage on init
  const stored = localStorage.getItem('greetings-storage');
  const initial = stored ? JSON.parse(stored) : { greetings: [] };

  // Save to localStorage helper
  const saveToStorage = (greetings) => {
    localStorage.setItem('greetings-storage', JSON.stringify({ greetings }));
  };

  return {
    greetings: initial.greetings,

    // Add new greeting
    addGreeting: (greeting) => {
      const newGreeting = {
        id: `greeting-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...greeting,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      set((state) => {
        const newGreetings = [...state.greetings, newGreeting];
        saveToStorage(newGreetings);
        return { greetings: newGreetings };
      });

      return newGreeting;
    },

    // Get all greetings
    getAll: () => {
      return get().greetings;
    },

    // Get greetings by status
    getByStatus: (status) => {
      const { greetings } = get();
      return greetings.filter((g) => g.status === status);
    },

    // Get approved greetings only
    getApproved: () => {
      const { greetings } = get();
      return greetings
        .filter((g) => g.status === 'approved')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Get pending greetings
    getPending: () => {
      const { greetings } = get();
      return greetings
        .filter((g) => g.status === 'pending')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    // Approve greeting
    approveGreeting: (id) => {
      set((state) => {
        const newGreetings = state.greetings.map((g) =>
          g.id === id ? { ...g, status: 'approved' } : g
        );
        saveToStorage(newGreetings);
        return { greetings: newGreetings };
      });
    },

    // Reject greeting
    rejectGreeting: (id) => {
      set((state) => {
        const newGreetings = state.greetings.map((g) =>
          g.id === id ? { ...g, status: 'rejected' } : g
        );
        saveToStorage(newGreetings);
        return { greetings: newGreetings };
      });
    },

    // Delete greeting
    deleteGreeting: (id) => {
      set((state) => {
        const newGreetings = state.greetings.filter((g) => g.id !== id);
        saveToStorage(newGreetings);
        return { greetings: newGreetings };
      });
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

