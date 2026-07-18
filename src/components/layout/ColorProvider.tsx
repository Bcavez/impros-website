"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useTheme } from "next-themes";
import { ACCENT_COLORS, DEFAULT_COLOR_ID, type AccentColor } from "@/lib/colors";

type ColorContextType = {
  colorId: string;
  setColorId: (id: string) => void;
  currentColor: AccentColor;
};

const ColorContext = createContext<ColorContextType | null>(null);

function applyColor(color: AccentColor) {
  const root = document.documentElement;
  const { oklch, foregroundOklch } = color;
  root.style.setProperty("--primary", `oklch(${oklch})`);
  root.style.setProperty("--primary-foreground", `oklch(${foregroundOklch})`);
  root.style.setProperty("--ring", `oklch(${oklch})`);
  root.style.setProperty("--sidebar-primary", `oklch(${oklch})`);
  root.style.setProperty("--sidebar-ring", `oklch(${oklch})`);
  // Glow intensity variables used by CSS utilities
  root.style.setProperty("--glow-primary-soft", `oklch(${oklch} / 12%)`);
  root.style.setProperty("--glow-primary-subtle", `oklch(${oklch} / 8%)`);
  root.style.setProperty("--glow-primary-18", `oklch(${oklch} / 18%)`);
  root.style.setProperty("--glow-primary-20", `oklch(${oklch} / 20%)`);
  root.style.setProperty("--glow-primary-35", `oklch(${oklch} / 35%)`);
}

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [colorId, setColorIdState] = useState(DEFAULT_COLOR_ID);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("accent-color");
    if (saved && ACCENT_COLORS.find((c) => c.id === saved)) {
      setColorIdState(saved);
    }
    setMounted(true);
  }, []);

  const currentColor =
    ACCENT_COLORS.find((c) => c.id === colorId) ?? ACCENT_COLORS[0];

  // Apply CSS variables whenever color or theme changes
  useEffect(() => {
    if (!mounted) return;
    applyColor(currentColor);
  }, [currentColor, mounted, resolvedTheme]);

  const setColorId = useCallback((id: string) => {
    setColorIdState(id);
    localStorage.setItem("accent-color", id);
  }, []);

  return (
    <ColorContext.Provider value={{ colorId, setColorId, currentColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useAccentColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error("useAccentColor must be used within ColorProvider");
  return ctx;
}
