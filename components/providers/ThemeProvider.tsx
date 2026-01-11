"use client";

import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

const tokens = {
  fontFamily:
    'Rubik, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  borderRadius: 14,
  borderRadiusLG: 20,
  borderRadiusSM: 10,
  controlHeight: 40,

  colorInfo: "#0A84FF",

  colorBgLayout: "#f8fafc",
  colorBgBase: "#ffffff",
  colorBgContainer: "#ffffff",

  colorBorder: "#e2e8f0",
  colorBorderSecondary: "#e2e8f0",

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
} as const;

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: tokens,
        components: {
          Layout: {
            headerBg: "#ffffff",
            footerBg: "transparent",
            siderBg: "#ffffff",
            bodyBg: "#f1f5f9",
          },
          Menu: {
            itemColor: "#0f172a",
            itemHoverColor: "#020617",
            itemSelectedColor: "#020617",
            itemSelectedBg: "rgba(2,6,23,0.06)",
            horizontalItemHoverBg: "transparent",
            horizontalItemSelectedBg: "transparent",
            borderRadius: 999,
            itemMarginInline: 8,
          },
          Card: {
            colorBgContainer: "#ffffff",
            colorBorderSecondary: "rgba(148,163,184,0.25)",
            borderRadius: 18,
            boxShadow: "0 18px 45px rgba(15,23,42,0.08)",
            headerFontSize: 16,
            paddingLG: 20,
          },
          Button: {
            borderRadius: 12,
            controlHeight: 40,

            colorPrimary: "transparent",
            colorPrimaryHover: "transparent",
            colorPrimaryActive: "transparent",

            colorTextLightSolid: "#e5e7eb",
            colorText: "#e5e7eb",

            defaultBorderColor: "rgba(255,255,255,0.12)",
          },
          Input: {
            controlHeight: 40,
            colorBgContainer: "#ffffff",
            colorBorder: "#d1d5db",
            colorText: "#0f172a",
            activeBorderColor: "#0A84FF",
            hoverBorderColor: "#0A84FF",
            borderRadius: 5,
          },
          InputNumber: {
            borderRadius: 999,
            controlHeight: 40,
          },
          Modal: {
            borderRadiusLG: 22,
            colorBgElevated: "#ffffff",
            paddingContentHorizontalLG: 24,
            paddingContentVerticalLG: 20,
          },
          Table: {
            headerBg: "#f9fafb",
            headerColor: "#0f172a",
            rowHoverBg: "#f1f5f9",
          },
          Dropdown: {
            borderRadiusLG: 16,
            colorBgElevated: "#ffffff",
            boxShadowSecondary: "0 18px 45px rgba(15,23,42,0.12)",
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
