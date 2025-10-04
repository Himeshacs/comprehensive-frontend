import React from "react";
import { useTheme } from "../../context/ThemeContext";

export const ThemeToggle: React.FC = () => {
  const { themeName, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      style={{
        padding: "var(--spacing-sm)",
        borderRadius: "var(--radius-full)",
        minWidth: "auto",
      }}
    >
      {isDark ? <span style={{ fontSize: "1.2rem" }}>☀️</span> : <span style={{ fontSize: "1.2rem" }}>🌙</span>}
    </button>
  );
};
