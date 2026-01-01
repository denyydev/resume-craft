"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { ConfigProvider, theme as antdTheme } from "antd";
import type { ReactNode } from "react";

const commonTokens = {
  fontFamily:
    'Rubik, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  borderRadius: 14,
  borderRadiusLG: 20,
  borderRadiusSM: 10,
  controlHeight: 40,
  colorInfo: "#0A84FF",
};

const lightTokens = {
  ...commonTokens,
  colorBgLayout: "#f1f5f9",
  colorBgBase: "#ffffff",
  colorBgContainer: "#ffffff",
  colorBorder: "#e5e7eb",
  colorBorderSecondary: "#e5e7eb",
  colorTextBase: "#0f172a",
  colorTextSecondary: "#64748b",
  colorPrimary: "#020617",
  colorPrimaryHover: "#020617",
  colorPrimaryActive: "#000000",
  colorPrimaryBg: "rgba(2,6,23,0.06)",
  colorPrimaryBgHover: "rgba(2,6,23,0.10)",
  colorPrimaryBorder: "rgba(2,6,23,0.20)",
  colorPrimaryText: "#020617",
  colorPrimaryTextHover: "#000000",
  colorTextLightSolid: "#ffffff",
};

const darkTokens = {
  ...commonTokens,
  colorBgLayout: "#020617",
  colorBgBase: "#020617",
  colorBgContainer: "rgba(15,23,42,0.96)",
  colorBorder: "#1e293b",
  colorBorderSecondary: "#1f2937",
  colorTextBase: "#e5e7eb",
  colorTextSecondary: "#94a3b8",
  colorPrimary: "#0A84FF",
  colorPrimaryHover: "#0060df",
  colorPrimaryActive: "#0047b3",
  colorPrimaryBg: "rgba(10,132,255,0.12)",
  colorPrimaryBgHover: "rgba(10,132,255,0.18)",
  colorPrimaryBorder: "rgba(10,132,255,0.35)",
  colorPrimaryText: "#9ecbff",
  colorPrimaryTextHover: "#c7e2ff",
  colorTextLightSolid: "#ffffff",
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
            headerBg: isDark ? "rgba(15,23,42,0.96)" : "#ffffff",
            footerBg: "transparent",
            siderBg: isDark ? "rgba(15,23,42,0.96)" : "#ffffff",
            bodyBg: isDark ? "#020617" : "#f1f5f9",
          },
          Menu: {
            itemColor: isDark ? "#e5e7eb" : "#0f172a",
            itemHoverColor: isDark ? "#0A84FF" : "#020617",
            itemSelectedColor: isDark ? "#0A84FF" : "#020617",
            itemSelectedBg: isDark
              ? "rgba(10,132,255,0.10)"
              : "rgba(2,6,23,0.06)",
            horizontalItemHoverBg: "transparent",
            horizontalItemSelectedBg: "transparent",
            borderRadius: 999,
            itemMarginInline: 8,
          },
          Card: {
            colorBgContainer: isDark ? "rgba(15,23,42,0.96)" : "#ffffff",
            colorBorderSecondary: isDark
              ? "rgba(148,163,184,0.20)"
              : "rgba(148,163,184,0.25)",
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
            colorPrimary: isDark ? "#0A84FF" : "#020617",
            colorPrimaryHover: isDark ? "#0060df" : "#020617",
            colorPrimaryActive: isDark ? "#0047b3" : "#000000",
            colorTextLightSolid: "#ffffff",
            colorText: isDark ? "#e5e7eb" : "#0f172a",
          },
          Input: {
            controlHeight: 40,
            colorBgContainer: isDark ? "#020617" : "#ffffff",
            colorBorder: isDark ? "#1e293b" : "#d1d5db",
            colorText: isDark ? "#e5e7eb" : "#0f172a",
            activeBorderColor: "#0A84FF",
            hoverBorderColor: "#0A84FF",
          },
          InputNumber: {
            borderRadius: 999,
            controlHeight: 40,
          },
          TextArea: {
            borderRadius: 14,
            borderRadiusLG: 16,
          },
          Modal: {
            borderRadiusLG: 22,
            colorBgElevated: isDark ? "rgba(15,23,42,0.98)" : "#ffffff",
            paddingContentHorizontalLG: 24,
            paddingContentVerticalLG: 20,
          },
          Table: {
            headerBg: isDark ? "rgba(15,23,42,0.96)" : "#f9fafb",
            headerColor: isDark ? "#e5e7eb" : "#0f172a",
            rowHoverBg: isDark ? "rgba(15,23,42,0.9)" : "#f1f5f9",
          },
          Dropdown: {
            borderRadiusLG: 16,
            colorBgElevated: isDark ? "rgba(15,23,42,0.98)" : "#ffffff",
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

