"use client"

import { useEffect } from "react"
import { Layout, Typography, Button } from "antd"
import {
  useParams,
  useSearchParams,
  usePathname,
  useRouter,
} from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import type { Locale } from "@/lib/useCurrentLocale"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"
import { useResumeStore } from "@/store/useResumeStore"
import { Eye } from "lucide-react"

const { Title, Text } = Typography

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle:
      "Заполняй блоки по порядку — превью можно открыть на отдельной странице.",
    previewTitle: "Превью резюме",
    openPreview: "Открыть превью",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle:
      "Fill the sections step by step — open preview on a separate page.",
    previewTitle: "Resume preview",
    openPreview: "Open preview",
  },
} as const

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const dict = messages[locale]

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const resumeId = searchParams.get("resumeId") || undefined

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

  const handleOpenPreview = () => {
    const basePath = pathname.endsWith("/preview")
      ? pathname.replace(/\/preview$/, "")
      : pathname

    const queryString = searchParams.toString()
    const suffix = queryString ? `?${queryString}` : ""

    router.push(`${basePath}/preview${suffix}`)
  }

  return (
    <Layout className="min-h-screen bg-slate-100">
      <Layout.Content className="py-6">
        <div className="mx-auto max-w-6xl px-6 space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Title level={4} className="!mb-0">
                {dict.editorTitle}
              </Title>
              <Text type="secondary" className="text-xs">
                {dict.editorSubtitle}
              </Text>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                size="small"
                icon={<Eye size={14} />}
                onClick={handleOpenPreview}
              >
                {dict.openPreview}
              </Button>

              <SaveResumeButton />
              <DownloadPdfButton locale={locale} />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          <div className="w-full">
            <EditorShell />
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}
