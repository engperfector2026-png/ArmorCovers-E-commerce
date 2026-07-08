import { Navigate } from "react-router-dom";

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: SellerRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || (user.role !== "seller" && user.role !== "vendor")) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default SellerRoute;