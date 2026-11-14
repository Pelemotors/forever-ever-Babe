import { create } from 'zustand'

const useSession = create((set, get) => ({
  user: null,
  role: null,
  isAuthenticated: false,
  ready: false,
  refresh: async () => {
    try {
      const response = await fetch('/api/session')
      if (!response.ok) throw new Error('session')
      const { name } = await response.json()
      set({ user: { username: name === 'ira' ? 'אירה' : name }, role: name === 'ira' ? 'ira' : 'admin', isAuthenticated: true, ready: true })
    } catch { set({ user: null, role: null, isAuthenticated: false, ready: true }) }
  },
  logout: async () => { await fetch('/api/logout', { method: 'POST' }); set({ user: null, role: null, isAuthenticated: false }); window.location.assign('/') },
  hasRole: role => get().role === role,
  isAdmin: () => ['admin', 'ira'].includes(get().role),
  isIra: () => get().role === 'ira',
}))

export default useSession

