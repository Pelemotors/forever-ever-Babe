import { Navigate } from 'react-router-dom';
import useSession from '../../state/useSession';

const ProtectedRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, role } = useSession();

  // Check if user is authenticated
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

