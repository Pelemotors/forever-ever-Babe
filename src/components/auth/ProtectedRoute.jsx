import { Navigate } from 'react-router-dom';
import useSession from '../../state/useSession';

const ProtectedRoute = ({ children, requireRole = null, allowGuest = false }) => {
  const { isAuthenticated, role } = useSession();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user is a guest and this route doesn't allow guests, redirect to guestbook
  if (role === 'guest' && !allowGuest) {
    return <Navigate to="/guestbook" replace />;
  }

  // Check if specific role is required (for admin-only routes)
  if (requireRole && role !== requireRole && role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

