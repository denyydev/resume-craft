import type { ReactNode } from "react"
import "antd/dist/reset.css"
import "./globals.css"
import { SessionProvider } from "@/components/SessionProvider"
import Link from "next/link"
import { cookies } from "next/headers"

export const metadata = {
  title: "Next resume builder",
  description: "Конструктор резюме с PDF-экспортом",
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = params?.locale ?? "ru"

  return (
    <html lang={locale}>
      <body className="bg-slate-100">
        <SessionProvider>
          {/* GLOBAL HEADER */}
          <header className="bg-white border-b border-slate-200">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
              <Link
                href={`/${locale}`}
                className="text-lg font-semibold text-slate-800"
              >
                ResumeBuilder
              </Link>

              <nav className="flex items-center gap-4 text-sm">
                <Link
                  href={`/${locale}/resumes`}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Мои резюме
                </Link>

                <Link
                  href={`/${locale}/editor`}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Редактор
                </Link>
                                <Link
                  href={`/${locale}/profile`}
                  className="text-slate-600 hover:text-slate-900"
                >
                  Профиль
                </Link>
              </nav>
            </div>
          </header>

          {/* PAGE CONTENT */}
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
