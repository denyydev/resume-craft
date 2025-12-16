"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import type { Locale } from "@/lib/useCurrentLocale"
import { useResumeStore } from "@/store/useResumeStore"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { TemplateSelector } from "@/components/resume/sections/TemplateSelector"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { ArrowLeft } from "lucide-react"
import { Button } from "antd"

const messages = {
  ru: {
    previewTitle: "Превью резюме",
    backToEditor: "Вернуться к редактору",
  },
  en: {
    previewTitle: "Resume Preview",
    backToEditor: "Back to editor",
  },
} as const

export default function PreviewPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const t = messages[locale]

  const searchParams = useSearchParams()
  const resumeId = searchParams.get("resumeId")
  const router = useRouter()
  const loadResume = useResumeStore((s) => s.loadResume)

  useEffect(() => {
    if (!resumeId) return

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes?id=${resumeId}`)
        if (!res.ok) return

        const json = await res.json()
        const data = json.resume?.data
        if (!data) return

        loadResume(data)
      } catch {
        return
      }
    }

    fetchResume()
  }, [resumeId, loadResume])

  const handleBack = () => {
    const query = resumeId ? `?resumeId=${resumeId}` : ""
    router.push(`/${locale}/editor${query}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {t.backToEditor}
              </Button>
              <div className="h-6 w-px bg-slate-200" />
              <h1 className="text-lg font-semibold text-slate-900">
                {t.previewTitle}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <DownloadPdfButton locale={locale} />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <TemplateSelector />
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 overflow-auto">
              <ResumePreview />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
