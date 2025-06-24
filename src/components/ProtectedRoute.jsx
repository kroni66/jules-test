import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * Protects a route by requiring an authenticated user.
 */
const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    // Optionally show a spinner, but main spinner handled on consuming pages.
    return null;
  }
  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;