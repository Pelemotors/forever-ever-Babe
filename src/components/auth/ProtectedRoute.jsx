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
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

