import React, { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute:React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userAccessToken");

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
