// app/layout.tsx
import type { ReactNode } from "react"
import Link from "next/link"
import "antd/dist/reset.css"
import "./globals.css"
import { SessionProvider } from "@/components/SessionProvider"
import { AuthButton } from "@/components/AuthButton"

export const metadata = {
  title: "Next resume builder",
  description: "Конструктор резюме с PDF-экспортом",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <SessionProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
              <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30">
                    <span className="text-xs font-bold text-neutral-950">CV</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      ResumeCraft
                    </span>
                    <span className="hidden text-[11px] text-neutral-400 sm:inline">
                      Create, edit and export PDF resumes
                    </span>
                  </div>
                </div>

                <nav className="hidden items-center gap-4 text-xs text-neutral-300 sm:flex">
                  <Link
                    href="/"
                    className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white"
                  >
                    Landing
                  </Link>
                  <Link
                    href="/ru/editor"
                    className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white"
                  >
                    Редактор
                  </Link>
                  <Link
                    href="/ru/resumes"
                    className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white"
                  >
                    Мои резюме
                  </Link>
                </nav>

                <div className="flex items-center gap-3">
                  <nav className="flex items-center gap-3 text-xs text-neutral-300 sm:hidden">
                    <Link
                      href="/ru/editor"
                      className="rounded-full px-3 py-1 transition hover:bg-white/5 hover:text-white"
                    >
                      Редактор
                    </Link>
                  </nav>
                  <AuthButton />
                </div>
              </div>
            </header>

            <main className="flex-1">
              {children}
            </main>
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}
