import { Navigate } from "react-router-dom";

interface SellerRouteProps {
  children: React.ReactNode;
}

const SellerRoute = ({ children }: SellerRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
<<<<<<< HEAD

  // Not logged in
=======
  const verificationToken = localStorage.getItem(`seller_verification_token_${user.id}`);

  // Check both login token and verification token
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  if (!token) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  // Wrong role
=======
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  if (user.role !== "seller" && user.role !== "vendor") {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  // Temporarily allow access (verification can be added later)
=======
  // If verification token is missing, redirect to verification page
  if (!verificationToken) {
    return <Navigate to="/seller/verify" replace />;
  }

>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  return <>{children}</>;
};

export default SellerRoute;