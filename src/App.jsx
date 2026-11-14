import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import useSession from './state/useSession'

// Pages
import Home from './pages/Home'
import Story from './pages/Story'
import Stories from './pages/Stories'
import StoryView from './pages/StoryView'
import Guestbook from './pages/Guestbook'
import Timeline from './pages/Timeline'
import Gallery from './pages/Gallery'
import Playlist from './pages/Playlist'
import Admin from './pages/Admin'
import MemoryBook from './pages/MemoryBook'

// Components
import ProtectedRoute from './components/auth/ProtectedRoute'
import FloatingResearchNudge from './components/addons/FloatingResearchNudge'

function App() {
  const { ready, refresh } = useSession()
  useEffect(() => { refresh() }, [refresh])
  if (!ready) return null

  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#FFF8F0',
            color: '#8B4556',
            padding: '16px',
            borderRadius: '12px',
            border: '2px solid #FFE5E5',
          },
        }}
      />

      <Routes>
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Protected Routes - Admin/Ira only */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/story"
          element={
            <ProtectedRoute>
              <Story />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stories"
          element={
            <ProtectedRoute>
              <Stories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stories/:id"
          element={
            <ProtectedRoute>
              <StoryView />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timeline"
          element={
            <ProtectedRoute>
              <Timeline />
            </ProtectedRoute>
          }
        />
        <Route path="/memories" element={<ProtectedRoute><MemoryBook /></ProtectedRoute>} />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlist"
          element={
            <ProtectedRoute>
              <Playlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Guestbook - accessible to all authenticated users (including guests) */}
        <Route
          path="/guestbook"
          element={
            <ProtectedRoute allowGuest={true}>
              <Guestbook />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* Research Cards Popup - רק לאירה */}
      <FloatingResearchNudge />
    </Router>
  )
}

export default App

