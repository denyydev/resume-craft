"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { Moon, Sun } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={[
        "flex h-6 w-6 items-center justify-center",
        "text-text2 hover:text-text",
        "transition-colors duration-150 cursor-pointer",
      ].join(" ")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

