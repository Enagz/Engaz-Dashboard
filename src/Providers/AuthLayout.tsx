import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const isAuthenticated = true; // Replace with your authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthLayout;
