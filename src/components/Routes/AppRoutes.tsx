import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./Routes";
import { ProtectedRoute } from "./ProtectedRoutes";
import { PublicRoute } from "./PublicRoutes";

const LoadingFallback = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "200px",
    }}
  >
    <div>Loading...</div>
  </div>
);

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {routes.map((route) => {
          const RouteComponent = route.component;

          if (route.protected) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute requiredRoles={route.requiredRoles}>
                    <RouteComponent />
                  </ProtectedRoute>
                }
              />
            );
          } else {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <PublicRoute restricted={route.path === "/login"}>
                    <RouteComponent />
                  </PublicRoute>
                }
              />
            );
          }
        })}

        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
