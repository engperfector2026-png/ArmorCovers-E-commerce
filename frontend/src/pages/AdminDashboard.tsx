import { Navigate } from 'react-router-dom';
import React from 'react';

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const role = localStorage.getItem('role');
  
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default AdminRoute;