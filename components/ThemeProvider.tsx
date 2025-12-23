"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { ConfigProvider, theme as antdTheme } from "antd";
import { type ReactNode } from "react";

const commonTokens = {
  fontFamily:
    'Rubik, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  borderRadius: 14,
  borderRadiusLG: 20,
  borderRadiusSM: 10,
  controlHeight: 40,
  colorPrimary: "#0A84FF",
  colorInfo: "#0A84FF",
};

const lightTokens = {
  ...commonTokens,
  colorBgLayout: "#f1f5f9",
  colorBgBase: "#ffffff",
  colorBgContainer: "#f9fafb",
  colorBorder: "#e5e7eb",
  colorBorderSecondary: "#e5e7eb",
  colorTextBase: "#0f172a",
  colorTextSecondary: "#64748b",
};

const darkTokens = {
  ...commonTokens,
  colorBgLayout: "#020617",
  colorBgBase: "#020617",
  colorBgContainer: "#020617",
  colorBorder: "#1e293b",
  colorBorderSecondary: "#1f2937",
  colorTextBase: "#e5e7eb",
  colorTextSecondary: "#94a3b8",
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const currentTheme = useThemeStore((s) => s.theme);
  const isDark = currentTheme === "dark";

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
        token: isDark ? darkTokens : lightTokens,
        components: {
          Layout: {
            headerBg: isDark ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.94)",
            footerBg: "transparent",
            siderBg: isDark ? "#020617" : "#ffffff",
            bodyBg: isDark ? "#020617" : "#f1f5f9",
          },
          Menu: {
            itemColor: isDark ? "#e5e7eb" : "#0f172a",
            itemHoverColor: "#0A84FF",
            itemSelectedColor: "#0A84FF",
            itemSelectedBg: isDark
              ? "rgba(10,132,255,0.08)"
              : "rgba(10,132,255,0.08)",
            horizontalItemHoverBg: "transparent",
            horizontalItemSelectedBg: "transparent",
            borderRadius: 999,
            itemMarginInline: 8,
          },
          Card: {
            colorBgContainer: isDark ? "rgba(15,23,42,0.96)" : "#ffffff",
            colorBorderSecondary: "rgba(148,163,184,0.25)",
            borderRadius: 18,
            boxShadow: isDark
              ? "0 18px 45px rgba(15,23,42,0.85)"
              : "0 18px 45px rgba(15,23,42,0.08)",
            headerFontSize: 16,
            paddingLG: 20,
          },
          Button: {
            borderRadius: 999,
            controlHeight: 40,
            colorPrimary: "#0A84FF",
            colorPrimaryHover: "#0060df",
            colorPrimaryActive: "#0047b3",
            colorText: isDark ? "#e5e7eb" : "#0f172a",
            colorTextLightSolid: "#0b1120",
          },
          Input: {
            borderRadius: 999,
            controlHeight: 40,
            colorBgContainer: isDark ? "#020617" : "#ffffff",
            colorBorder: isDark ? "#1e293b" : "#d1d5db",
            colorText: isDark ? "#e5e7eb" : "#0f172a",
            activeBorderColor: "#0A84FF",
            hoverBorderColor: "#0A84FF",
          },
          Modal: {
            borderRadiusLG: 22,
            colorBgElevated: isDark ? "rgba(15,23,42,0.98)" : "#ffffff",
            paddingContentHorizontalLG: 24,
            paddingContentVerticalLG: 20,
          },
          Table: {
            headerBg: isDark ? "#020617" : "#f9fafb",
            headerColor: isDark ? "#e5e7eb" : "#0f172a",
            rowHoverBg: isDark ? "rgba(15,23,42,0.9)" : "#f1f5f9",
          },
          Dropdown: {
            borderRadiusLG: 16,
            colorBgElevated: isDark ? "#020617" : "#ffffff",
            boxShadowSecondary: isDark
              ? "0 18px 45px rgba(15,23,42,0.9)"
              : "0 18px 45px rgba(15,23,42,0.12)",
          },
          Tag: {
            borderRadiusSM: 999,
          },
          Pagination: {
            borderRadius: 999,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
