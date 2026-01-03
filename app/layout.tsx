import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import "antd/dist/reset.css"
import "./globals.css"
import { AntdRegistry } from "@/components/providers/AntdRegistry"
import { SessionProvider } from "@/components/providers/SessionProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/authOptions"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata = {
  title: "ResumeCraft",
  description: "Конструктор резюме с PDF-экспортом",
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="bg-slate-100 dark:bg-slate-900 transition-colors font-sans">
        <AntdRegistry>
          <SessionProvider session={session}>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
