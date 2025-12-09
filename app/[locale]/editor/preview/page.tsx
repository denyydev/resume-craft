// app/[locale]/resume/editor/page.tsx
"use client"

import { useEffect, useState } from "react"
import { Layout, Typography, Drawer, Button } from "antd"
import { useParams, useSearchParams, useRouter } from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import type { Locale } from "@/lib/useCurrentLocale"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"
import { useResumeStore } from "@/store/useResumeStore"
import { Eye } from "lucide-react"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { TemplateSelector } from "@/components/resume/sections/TemplateSelector"


const { Title, Text } = Typography

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle: "Заполняйте формы — превью можно открыть сбоку или на отдельной странице.",
    previewTitle: "Превью резюме",
    openPreview: "Показать превью",
    openPreviewPage: "Открыть на отдельной странице",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill the form — open preview in a side drawer or on a separate page.",
    previewTitle: "Resume preview",
    openPreview: "Show preview",
    openPreviewPage: "Open as separate page",
  },
} as const

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const dict = messages[locale]

  const searchParams = useSearchParams()
  const resumeId = searchParams.get("resumeId")

  const router = useRouter()
  const loadResume = useResumeStore((s) => s.loadResume)

  const [openPreview, setOpenPreview] = useState(false)

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
        // логировать, если нужно
      }
    }

    fetchResume()
  }, [resumeId, loadResume])

  const handleOpenPreviewPage = () => {
    const query = resumeId ? `?resumeId=${resumeId}` : ""
    router.push(`/${locale}/resume/preview${query}`)
  }

  return (
    <Layout className="min-h-screen bg-slate-100">
      <TemplateSelector/>
      <ResumePreview/>
    </Layout>
  )
}
