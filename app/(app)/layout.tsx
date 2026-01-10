import { AppShell } from "@/components/layout/AppShell";
import "antd/dist/reset.css";
import type { ReactNode } from "react";
import "./globals.css";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
