"use client"

import { ConfigProvider, theme } from "antd"
import { useThemeStore } from "@/store/useThemeStore"
import { useEffect, type ReactNode } from "react"

const lightTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    // 🎯 Brand
    colorPrimary: "#2563eb", // насыщенный blue-600
    colorInfo: "#2563eb",

    // 🌤 Backgrounds
    colorBgBase: "#ffffff",
    colorBgLayout: "#f8fafc", // slate-50
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",

    // 🖤 Text
    colorText: "#0f172a", // slate-900
    colorTextSecondary: "#475569", // slate-600
    colorTextTertiary: "#64748b", // slate-500
    colorTextQuaternary: "#94a3b8", // slate-400

    // 🧱 Borders
    colorBorder: "#e2e8f0", // slate-200
    colorBorderSecondary: "#f1f5f9", // slate-100

    // 🧘‍♂️ Shape
    borderRadius: 10,
    borderRadiusLG: 14,
    lineWidth: 1,

    // 💨 Motion
    motionDurationFast: "0.15s",
    motionDurationMid: "0.25s",
    motionEaseOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  components: {
    Button: {
      borderRadius: 10,
      controlHeight: 40,
      fontWeight: 500,
      primaryShadow:
        "0 8px 24px rgba(37, 99, 235, 0.25)", // glow для primary
    },
    Input: {
      borderRadius: 10,
      controlHeight: 40,
      colorBgContainer: "#ffffff",
      activeShadow:
        "0 0 0 3px rgba(37, 99, 235, 0.15)",
    },
    Select: {
      borderRadius: 10,
      controlHeight: 40,
    },
    Dropdown: {
      borderRadius: 14,
      paddingBlock: 8,
    },
    Card: {
      borderRadius: 16,
      boxShadow:
        "0 10px 30px rgba(15, 23, 42, 0.06)",
    },
    Switch: {
      colorPrimary: "#2563eb",
      colorPrimaryHover: "#1d4ed8",
    },
  },
}

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    // 🎯 Brand
    colorPrimary: "#60a5fa", // blue-400
    colorInfo: "#60a5fa",

    // 🌑 Backgrounds
    colorBgBase: "#020617", // slate-950
    colorBgLayout: "#020617",
    colorBgContainer: "#020617",
    colorBgElevated: "#020617",

    // 🪐 Text
    colorText: "#e5e7eb", // gray-200
    colorTextSecondary: "#9ca3af", // gray-400
    colorTextTertiary: "#6b7280", // gray-500
    colorTextQuaternary: "#4b5563", // gray-600

    // 🧱 Borders
    colorBorder: "#1e293b", // slate-800
    colorBorderSecondary: "#0f172a", // slate-900

    // 🧘‍♂️ Shape
    borderRadius: 10,
    borderRadiusLG: 14,
    lineWidth: 1,

    // 💨 Motion
    motionDurationFast: "0.15s",
    motionDurationMid: "0.25s",
    motionEaseOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  },
  components: {
    Button: {
      borderRadius: 10,
      controlHeight: 40,
      fontWeight: 500,
      primaryShadow:
        "0 8px 24px rgba(96, 165, 250, 0.35)",
    },
    Input: {
      borderRadius: 10,
      controlHeight: 40,
      colorBgContainer: "#020617",
      activeShadow:
        "0 0 0 3px rgba(96, 165, 250, 0.25)",
    },
    Select: {
      borderRadius: 10,
      controlHeight: 40,
    },
    Dropdown: {
      borderRadius: 14,
      paddingBlock: 8,
    },
    Card: {
      borderRadius: 16,
      boxShadow:
        "0 12px 36px rgba(0, 0, 0, 0.6)",
    },
    Switch: {
      colorPrimary: "#60a5fa",
      colorPrimaryHover: "#93c5fd",
    },
  },
}

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
      theme={currentTheme === "dark" ? darkTheme : lightTheme}
    >
      {children}
    </ConfigProvider>
  )
}
