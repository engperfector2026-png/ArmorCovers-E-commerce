import { Navigate } from 'react-router-dom';
import React from 'react';

interface BuyerRouteProps {
  children: React.ReactNode;
}

const BuyerRoute: React.FC<BuyerRouteProps> = ({ children }) => {
  const role = localStorage.getItem('role');
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default BuyerRoute;