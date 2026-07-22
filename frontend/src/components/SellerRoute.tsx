import { Navigate } from "react-router-dom";

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: SellerRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const verificationToken = localStorage.getItem(`seller_verification_token_${user.id}`);

  // Check both login token and verification token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "seller" && user.role !== "vendor") {
    return <Navigate to="/login" replace />;
  }

  // If verification token is missing, redirect to verification page
  if (!verificationToken) {
    return <Navigate to="/seller/verify" replace />;
  }

  return <>{children}</>;
};

export default SellerRoute;