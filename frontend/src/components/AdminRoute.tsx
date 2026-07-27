import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute = ({ children }: AdminRouteProps) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong role
  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Temporarily allow access (verification can be added later)
  return <>{children}</>;
};

export default AdminRoute;