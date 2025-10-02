import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navigation: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "1rem 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo/Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            Comprehensive System
          </Link>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              <Link
                to="/"
                style={{
                  color: location.pathname === "/" ? "#3498db" : "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  backgroundColor: location.pathname === "/" ? "rgba(255,255,255,0.1)" : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                Users
              </Link>
              <Link
                to="/dashboard"
                style={{
                  color: location.pathname === "/dashboard" ? "#3498db" : "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  backgroundColor: location.pathname === "/dashboard" ? "rgba(255,255,255,0.1)" : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                style={{
                  color: location.pathname === "/settings" ? "#3498db" : "white",
                  textDecoration: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  backgroundColor: location.pathname === "/settings" ? "rgba(255,255,255,0.1)" : "transparent",
                  transition: "all 0.3s ease",
                }}
              >
                Settings
              </Link>
            </div>
          )}
        </div>

        {/* User Info & Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {isAuthenticated && user ? (
            <>
              <span style={{ color: "white", fontSize: "0.9rem" }}>
                Welcome,{" "}
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
                {user.roles.includes("admin") && (
                  <span
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      padding: "2px 6px",
                      borderRadius: "12px",
                      fontSize: "0.7rem",
                      marginLeft: "8px",
                    }}
                  >
                    Admin
                  </span>
                )}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c0392b")}
                onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e74c3c")}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              style={{
                color: "white",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                backgroundColor: "#3498db",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e: { currentTarget: { style: { backgroundColor: string } } }) => (e.currentTarget.style.backgroundColor = "#2980b9")}
              onMouseOut={(e: { currentTarget: { style: { backgroundColor: string } } }) => (e.currentTarget.style.backgroundColor = "#3498db")}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};
