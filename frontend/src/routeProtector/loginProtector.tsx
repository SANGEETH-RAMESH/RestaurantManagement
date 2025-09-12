import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userAccessToken");

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
