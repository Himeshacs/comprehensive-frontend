import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children, restricted = false }) => {
  const { isAuthenticated } = useAuth();

  // If route is restricted and user is authenticated, redirect to home
  if (restricted && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
