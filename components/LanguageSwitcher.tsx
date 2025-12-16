"use client"

import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { useState } from "react"

type Locale = "ru" | "en"

export function LanguageSwitcher({ currentLocale }: { currentLocale?: Locale }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const locale = currentLocale || (pathname?.split("/")[1] === "en" ? "en" : "ru")

  const handleChange = (nextLocale: Locale) => {
    if (!pathname) return
    const segments = pathname.split("/")
    segments[1] = nextLocale
    const nextPath = segments.join("/") || "/"
    router.push(nextPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
      >
        <Globe className="h-4 w-4 opacity-70" />
        <span className="text-xs font-semibold">{locale.toUpperCase()}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 z-20 w-32 rounded-xl border border-slate-200/60 dark:border-slate-700 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xl shadow-xl shadow-slate-200/20 dark:shadow-slate-900/50 overflow-hidden p-1">
            <button
              onClick={() => handleChange("ru")}
              className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 ${locale === "ru"
                  ? "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
            >
              <span className="text-base">🇷🇺</span> Русский
            </button>
            <button
              onClick={() => handleChange("en")}
              className={`w-full px-3 py-2 text-left text-sm rounded-lg transition-colors flex items-center gap-2 ${locale === "en"
                  ? "bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-slate-100 font-medium"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100"
                }`}
            >
              <span className="text-base">🇺🇸</span> English
            </button>
          </div>
        </>
      )}
    </div>
  )
}
