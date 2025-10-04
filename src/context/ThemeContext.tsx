import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Theme } from "../types/theme";
import { lightTheme, themes } from "../theme";

export interface ThemeContextType {
  theme: Theme;
  themeName: string;
  toggleTheme: () => void;
  setTheme: (themeName: string) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: string;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultTheme = "light" }) => {
  const [themeName, setThemeName] = useState<string>(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }

    return defaultTheme;
  });

  const theme = themes[themeName as keyof typeof themes] || lightTheme;

  const toggleTheme = () => {
    setThemeName((prev) => (prev === "light" ? "dark" : "light"));
  };

  const setTheme = (name: string) => {
    if (themes[name as keyof typeof themes]) {
      setThemeName(name);
    }
  };

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;

    // Set CSS variables for colors
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Set CSS variables for typography
    Object.entries(theme.typography).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value.toString());
    });

    // Set CSS variables for spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      root.style.setProperty(`--spacing-${key}`, value);
    });

    // Set CSS variables for shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });

    // Set CSS variables for border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });

    // Set CSS variables for breakpoints
    Object.entries(theme.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });

    // Save theme preference to localStorage
    localStorage.setItem("theme", themeName);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", theme.colors.background);
    }
  }, [theme, themeName]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        setThemeName(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const value: ThemeContextType = {
    theme,
    themeName,
    toggleTheme,
    setTheme,
    isDark: themeName === "dark",
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
