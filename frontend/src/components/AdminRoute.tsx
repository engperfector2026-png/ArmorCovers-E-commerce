import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const verificationToken = localStorage.getItem(`admin_verification_token_${user.id}`);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  if (!verificationToken) {
    return <Navigate to="/admin/verify" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;