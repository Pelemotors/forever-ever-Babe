// Auth utility functions for MVP (client-side only)

// Validate credentials against ENV variables
export const validateCredentials = (username, password) => {
  const adminUsername = import.meta.env.VITE_ADMIN_USERNAME || 'gal';
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
  const iraUsername = import.meta.env.VITE_IRA_USERNAME || 'ira';
  const iraPassword = import.meta.env.VITE_IRA_PASSWORD || 'ira123';
  const guestUsername = import.meta.env.VITE_GUEST_USERNAME || 'family';
  const guestPassword = import.meta.env.VITE_GUEST_PASSWORD || 'family123';


  // Check admin
  if (username === adminUsername && password === adminPassword) {
    return { valid: true, role: 'admin', username };
  }

  // Check Ira
  if (username === iraUsername && password === iraPassword) {
    return { valid: true, role: 'ira', username };
  }

  // Check guest
  if (username === guestUsername && password === guestPassword) {
    return { valid: true, role: 'guest', username };
  }

  return { valid: false, role: null, username: null };
};

// Check if user has permission to view content
export const canViewContent = (userRole, contentRole = 'guest') => {
  if (!userRole) return false;
  
  const roleHierarchy = {
    admin: 3,
    ira: 2,
    guest: 1,
  };

  return roleHierarchy[userRole] >= roleHierarchy[contentRole];
};

// Check if user can moderate (admin only)
export const canModerate = (userRole) => {
  return userRole === 'admin';
};

// Check if user can view locked content (admin only)
export const canViewLocked = (userRole) => {
  return userRole === 'admin';
};

