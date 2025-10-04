import { Theme } from "../types/theme";

export const lightTheme: Theme = {
  name: "light",
  colors: {
    // Primary colors - Blue
    primary: "#3498db",
    primaryLight: "#5dade2",
    primaryDark: "#2980b9",

    // Secondary colors - Purple
    secondary: "#9b59b6",
    secondaryLight: "#bb8fce",
    secondaryDark: "#8e44ad",

    // Status colors
    success: "#27ae60",
    warning: "#f39c12",
    error: "#e74c3c",
    info: "#3498db",

    // Neutral colors
    background: "#ffffff",
    surface: "#f8f9fa",
    surfaceVariant: "#e9ecef",
    onBackground: "#212529",
    onSurface: "#343a40",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",

    // Text colors
    textPrimary: "#212529",
    textSecondary: "#6c757d",
    textDisabled: "#adb5bd",

    // Border colors
    border: "#dee2e6",
    borderLight: "#e9ecef",
    borderDark: "#ced4da",

    // State colors
    hover: "rgba(52, 152, 219, 0.04)",
    focus: "rgba(52, 152, 219, 0.12)",
    active: "rgba(52, 152, 219, 0.16)",
    disabled: "#f8f9fa",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",

    fontSizeXs: "0.75rem", // 12px
    fontSizeSm: "0.875rem", // 14px
    fontSizeMd: "1rem", // 16px
    fontSizeLg: "1.125rem", // 18px
    fontSizeXl: "1.25rem", // 20px
    fontSizeXxl: "1.5rem", // 24px

    fontWeightLight: 300,
    fontWeightNormal: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,

    lineHeightTight: 1.25,
    lineHeightNormal: 1.5,
    lineHeightRelaxed: 1.75,
  },
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    xxl: "3rem", // 48px
  },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    full: "9999px",
  },
  breakpoints: {
    xs: "480px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    // Primary colors - Blue
    primary: "#3498db",
    primaryLight: "#5dade2",
    primaryDark: "#2980b9",

    // Secondary colors - Purple
    secondary: "#9b59b6",
    secondaryLight: "#bb8fce",
    secondaryDark: "#8e44ad",

    // Status colors
    success: "#27ae60",
    warning: "#f39c12",
    error: "#e74c3c",
    info: "#3498db",

    // Neutral colors (inverted for dark mode)
    background: "#121212",
    surface: "#1e1e1e",
    surfaceVariant: "#2d2d2d",
    onBackground: "#ffffff",
    onSurface: "#f8f9fa",
    onPrimary: "#ffffff",
    onSecondary: "#ffffff",

    // Text colors
    textPrimary: "#f8f9fa",
    textSecondary: "#adb5bd",
    textDisabled: "#6c757d",

    // Border colors
    border: "#404040",
    borderLight: "#2d2d2d",
    borderDark: "#4d4d4d",

    // State colors
    hover: "rgba(255, 255, 255, 0.04)",
    focus: "rgba(255, 255, 255, 0.12)",
    active: "rgba(255, 255, 255, 0.16)",
    disabled: "#2d2d2d",
  },
  typography: { ...lightTheme.typography },
  spacing: { ...lightTheme.spacing },
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  borderRadius: { ...lightTheme.borderRadius },
  breakpoints: { ...lightTheme.breakpoints },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
