import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute({ requiredRole }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  let user;

  try {
    user = userString ? JSON.parse(userString) : null;
  } catch {
    return <Navigate to="/login" replace />;
  }

  // Redirect if the user is not logged in
  if (!token || !user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Restrict access based on role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}