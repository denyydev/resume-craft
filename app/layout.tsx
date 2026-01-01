import type { ReactNode } from "react"
import "antd/dist/reset.css"
import "./globals.css"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

export const metadata = {
  title: "ResumeCraft",
  description: "Конструктор резюме с PDF-экспортом",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-100 dark:bg-slate-900 transition-colors">
        <SessionProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
