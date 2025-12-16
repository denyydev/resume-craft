"use client"

import { Moon, Sun } from "lucide-react"
import { useThemeStore } from "@/store/useThemeStore"
import { motion } from "framer-motion"

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="flex items-center justify-center w-8 h-8 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </motion.button>
  )
}

