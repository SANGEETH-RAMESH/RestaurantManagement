import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userAccessToken");

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;