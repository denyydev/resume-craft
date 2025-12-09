"use client"

import { useEffect, useState } from "react"
import { Layout, Typography, Drawer, Button } from "antd"
import { useParams, useSearchParams } from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { ResumePreview } from "@/components/resume/ResumePreview"
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
    editorSubtitle: "Заполняйте формы — превью можно открыть сбоку.",
    previewTitle: "Превью резюме",
    openPreview: "Показать превью",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill the form — you can open preview on the side.",
    previewTitle: "Resume preview",
    openPreview: "Show preview",
  },
} as const

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const dict = messages[locale]

  const searchParams = useSearchParams()
  const resumeId = searchParams.get("resumeId")

  const loadResume = useResumeStore((s) => s.loadResume)

  const [openPreview, setOpenPreview] = useState(false)

  useEffect(() => {
    if (!resumeId) return

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes?id=${resumeId}`)
        if (!res.ok) return console.error("Failed to load resume")

        const json = await res.json()
        const data = json.resume?.data
        if (!data) return console.error("Resume has no data")

        loadResume(data)
      } catch (e) {
        console.error(e)
      }
    }

    fetchResume()
  }, [resumeId, loadResume])

  return (
    <Layout className="min-h-screen bg-slate-100">
      <Layout.Content className="py-6">
        <div className="mx-auto max-w-6xl px-6 space-y-5">
          {/* HEADER */}
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
              {/* кнопки */}
              <Button
                size="small"
                icon={<Eye size={14} />}
                onClick={() => setOpenPreview(true)}
              >
                {dict.openPreview}
              </Button>

              <SaveResumeButton />
              <DownloadPdfButton locale={locale} />
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {/* FULL-WIDTH EDITOR */}
          <div className="w-full">
            <EditorShell />
          </div>
        </div>
      </Layout.Content>

      {/* SIDE PREVIEW DRAWER */}
      <Drawer
        title={dict.previewTitle}
        placement="right"
        width={820}
        onClose={() => setOpenPreview(false)}
        open={openPreview}
      >
        <ResumePreview />
      </Drawer>
    </Layout>
  )
}
