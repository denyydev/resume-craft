"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AuthButton } from "@/components/AuthButton"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ThemeSwitcher } from "@/components/ThemeSwitcher"
import { FileText, Edit, FolderOpen } from "lucide-react"

export default function AppLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const currentLocale = pathname?.split("/")[1] === "en" ? "en" : "ru"

    const isActive = (path: string) => {
        if (!pathname) return false
        return pathname.includes(path)
    }

    return (
        <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-900 transition-colors">
            <header className="sticky top-0 z-50 border-b border-slate-200/60 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 transition-colors">
                <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4">
                    <Link href={`/${currentLocale}/editor`} className="flex items-center gap-2.5 group">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-slate-700 shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform">
                            <FileText className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                            ResumeCraft
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-6 sm:flex">
                        <Link
                            href={`/${currentLocale}/editor`}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/editor") && !isActive("/resumes")
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                        >
                            <span>Редактор</span>
                        </Link>
                        <Link
                            href={`/${currentLocale}/resumes`}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/resumes")
                                ? "text-slate-900 dark:text-slate-100"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                                }`}
                        >
                            <span>Мои резюме</span>
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {/* Mobile Nav */}
                        <nav className="flex items-center gap-1 sm:hidden mr-2">
                            <Link
                                href={`/${currentLocale}/editor`}
                                className={`p-2 rounded-md transition-colors ${isActive("/editor") && !isActive("/resumes")
                                    ? "bg-slate-100/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <Edit className="h-4 w-4" />
                            </Link>
                            <Link
                                href={`/${currentLocale}/resumes`}
                                className={`p-2 rounded-md transition-colors ${isActive("/resumes")
                                    ? "bg-slate-100/80 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                    }`}
                            >
                                <FolderOpen className="h-4 w-4" />
                            </Link>
                        </nav>

                        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

                        <ThemeSwitcher />
                        <LanguageSwitcher currentLocale={currentLocale} />
                        <AuthButton />
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-[1440px] mx-auto">
                {children}
            </main>
        </div>
    )
}

