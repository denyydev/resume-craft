"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import type { Locale } from "@/lib/useCurrentLocale"
import { useResumeStore } from "@/store/useResumeStore"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { TemplateSelector } from "@/components/resume/sections/TemplateSelector"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import { ArrowLeft } from "lucide-react"
import { Button, Card, Divider, Typography } from "antd"
import AccentColorPicker from "@/components/resume/AccentColorPicker"
import { PhotoExportToggle } from "@/components/resume/PhotoExportToggle"

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
    <div className="min-h-screen ">
      <header className="">
        <div className="px-5">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button
                type="primary"
                onClick={handleBack}
                className="gap-2"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {t.backToEditor}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <DownloadPdfButton locale={locale} />
            </div>
          </div>
        </div>
      </header>

      <div className="py-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <aside className="lg:w-80 flex-shrink-0">
            <Card>
              <TemplateSelector />
              <Divider/>
          <AccentColorPicker/>
                 <Divider/>
                 <PhotoExportToggle/>
            </Card>
          </aside>
          <main className="flex-1 min-w-0">
              <ResumePreview />
          </main>
        </div>
      </div>
    </div>
  )
}
