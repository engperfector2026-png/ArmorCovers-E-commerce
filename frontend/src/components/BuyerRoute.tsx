import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface BuyerRouteProps {
  children: React.ReactNode;
}

const BuyerRoute = ({ children }: BuyerRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow only buyers
  if (user?.role !== 'buyer') {
    return <Navigate to="/seller-dashboard" replace />;
  }

  return <>{children}</>;
};

export default BuyerRoute;