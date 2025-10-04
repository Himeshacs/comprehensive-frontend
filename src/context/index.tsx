// Re-export all contexts and hooks from a single entry point
export { AuthProvider, useAuth } from "./AuthContext";
export { ThemeProvider, useTheme } from "./ThemeContext";

// Export context types for better TypeScript support
export type { ThemeContextType } from "./ThemeContext";
export type { AuthContextType } from "./AuthContext";
