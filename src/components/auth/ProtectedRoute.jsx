import { Navigate } from 'react-router-dom';
import useSession from '../../state/useSession';

const ProtectedRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, role } = useSession();

  // Allow guest route to be publicly accessible via login button
  // All routes still require authentication flag; the guest button sets it
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if specific role is required
  if (requireRole && role !== requireRole) {
    // If guest tries to access admin-only content, redirect to guestbook
    if (role === 'guest') {
      return <Navigate to="/guestbook" replace />;
    }
    // For other roles, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

