"use client"

import { ConfigProvider, theme } from "antd"
import { useThemeStore } from "@/store/useThemeStore"
import { useEffect } from "react"
import type { ReactNode } from "react"

export function ThemeProvider({ children }: { children: ReactNode }) {
  const currentTheme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement
    if (currentTheme === "dark") {
      root.classList.add("dark")
    } else {
      root.classList.remove("dark")
    }
  }, [currentTheme])

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: currentTheme === "dark" ? "#3b82f6" : "#0f172a",
          borderRadius: 8,
        },
        components: {
          Button: {
            borderRadius: 6,
          },
          Input: {
            borderRadius: 6,
          },
          Dropdown: {
            borderRadius: 8,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

