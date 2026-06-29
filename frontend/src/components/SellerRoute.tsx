import { Navigate } from "react-router-dom";

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: SellerRouteProps) => {
  const role = localStorage.getItem("role")?.toLowerCase();
  const token = localStorage.getItem("token");

  // If not logged in or not a seller/vendor/admin → redirect to login
  if (!token || !role || (role !== "seller" && role !== "vendor" && role !== "admin")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default SellerRoute;