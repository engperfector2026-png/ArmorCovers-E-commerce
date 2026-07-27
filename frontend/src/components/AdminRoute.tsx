import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
<<<<<<< HEAD

  // Not logged in
=======
  const verificationToken = localStorage.getItem(`admin_verification_token_${user.id}`);

>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  if (!token) {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  // Wrong role
=======
>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

<<<<<<< HEAD
  // Temporarily allow access (verification can be added later)
=======
  if (!verificationToken) {
    return <Navigate to="/admin/verify" replace />;
  }

>>>>>>> cbfa4a1c5f0c8a894f3e86903e97080616510176
  return <>{children}</>;
};

export default AdminRoute;