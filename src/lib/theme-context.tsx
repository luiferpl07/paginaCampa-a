'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the available themes
export type ThemeName = 'default' | 'alternate' | 'dark';

interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  blue: string;
  red: string;
  yellow: {
    default: string;
    secondary: string;
  };
  gray: {
    default: string;
    medium: string;
    light: string;
  };
}

// Define the theme presets
const themes: Record<ThemeName, ThemeColors> = {
  default: {
    primary: '#f7c112',
    primaryForeground: '#ffffff',
    secondary: '#4f4f4f',
    secondaryForeground: '#ffffff',
    accent: '#FFBF00',
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#4f4f4f',
    muted: '#A8A8A8',
    mutedForeground: '#747473',
    blue: '#254494',
    red: '#E30613',
    yellow: {
      default: '#f7c112',
      secondary: '#FFBF00',
    },
    gray: {
      default: '#4f4f4f',
      medium: '#747473',
      light: '#A8A8A8',
    },
  },
  alternate: {
    primary: '#254494', // Blue as primary
    primaryForeground: '#ffffff',
    secondary: '#E30613', // Red as secondary
    secondaryForeground: '#ffffff',
    accent: '#f7c112', // Yellow as accent
    accentForeground: '#000000',
    background: '#ffffff',
    foreground: '#4f4f4f',
    muted: '#A8A8A8',
    mutedForeground: '#747473',
    blue: '#254494',
    red: '#E30613',
    yellow: {
      default: '#f7c112',
      secondary: '#FFBF00',
    },
    gray: {
      default: '#4f4f4f',
      medium: '#747473',
      light: '#A8A8A8',
    },
  },
  dark: {
    primary: '#f7c112',
    primaryForeground: '#000000',
    secondary: '#A8A8A8',
    secondaryForeground: '#ffffff',
    accent: '#FFBF00',
    accentForeground: '#000000',
    background: '#121212',
    foreground: '#ffffff',
    muted: '#333333',
    mutedForeground: '#999999',
    blue: '#254494',
    red: '#E30613',
    yellow: {
      default: '#f7c112',
      secondary: '#FFBF00',
    },
    gray: {
      default: '#4f4f4f',
      medium: '#747473',
      light: '#A8A8A8',
    },
  },
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  colors: ThemeColors;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme provider component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('default');
  const [mounted, setMounted] = useState(false);

  // Apply the theme to CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const colors = themes[theme];

    // Set CSS variables
    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-foreground', colors.primaryForeground);
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-foreground', colors.secondaryForeground);
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-foreground', colors.accentForeground);
    root.style.setProperty('--background', colors.background);
    root.style.setProperty('--foreground', colors.foreground);
    root.style.setProperty('--muted', colors.muted);
    root.style.setProperty('--muted-foreground', colors.mutedForeground);
    root.style.setProperty('--blue', colors.blue);
    root.style.setProperty('--red', colors.red);

    // Save the theme preference in local storage
    localStorage.setItem('hector-olimpo-theme', theme);
  }, [theme, mounted]);

  // Load the theme from local storage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('hector-olimpo-theme') as ThemeName | null;
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme);
    }
  }, []);

  // Return null during SSR to prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colors: themes[theme]
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
