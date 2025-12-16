"use client"

import { useEffect, useCallback } from "react"
import Link from "next/link"
import { useParams, useSearchParams, usePathname, useRouter } from "next/navigation"
import { Card, Typography, Space, Button, Grid, Flex } from "antd"
import { EyeOutlined, LeftOutlined } from "@ant-design/icons"

import type { Locale } from "@/lib/useCurrentLocale"
import { useResumeStore } from "@/store/useResumeStore"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"

const { Title, Paragraph, Text } = Typography
const { useBreakpoint } = Grid

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle: "Заполните секции, чтобы собрать аккуратное и профессиональное резюме.",
    openPreview: "Предпросмотр",
    back: "Назад",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill in the sections to build a clean, professional resume.",
    openPreview: "Preview",
    back: "Back",
  },
} as const

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>()
  const locale: Locale = params?.locale === "en" ? "en" : "ru"
  const dict = messages[locale]

  const screens = useBreakpoint()
  const isMobile = !screens.sm

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

  const handleOpenPreview = useCallback(() => {
    const basePath = pathname.endsWith("/preview") ? pathname.replace(/\/preview$/, "") : pathname
    const queryString = searchParams.toString()
    const suffix = queryString ? `?${queryString}` : ""
    router.push(`${basePath}/preview${suffix}`)
  }, [pathname, router, searchParams])

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <div className="p-5">
        <Card
          styles={{ body: { padding: isMobile ? 16 : 20 } }}
          style={{ borderRadius: 16 }}
        >
          <Flex justify="space-between" align={isMobile ? "flex-start" : "center"} gap={12} wrap>
            <Link href={`/${locale}/resumes`} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <LeftOutlined />
              <Text type="secondary">{dict.back}</Text>
            </Link>

            <Space size={8} wrap>
              <Button onClick={handleOpenPreview} icon={<EyeOutlined />}>
                {dict.openPreview}
              </Button>
              <SaveResumeButton />
            </Space>
          </Flex>

          <div style={{ marginTop: 14 }}>
            <Title level={2} style={{ margin: 0 }}>
              {dict.editorTitle}
            </Title>
            <Paragraph type="secondary" style={{ marginTop: 6, marginBottom: 0, maxWidth: 720 }}>
              {dict.editorSubtitle}
            </Paragraph>
          </div>
        </Card>

        <div style={{ marginTop: 14 }}>
          <EditorShell />
        </div>
      </div>
    </div>
  )
}
