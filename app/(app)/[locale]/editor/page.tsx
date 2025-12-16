"use client"

import { useEffect } from "react"
import { useParams, useSearchParams, usePathname, useRouter } from "next/navigation"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton"
import type { Locale } from "@/lib/useCurrentLocale"
import { SaveResumeButton } from "@/components/resume/SaveResumeButton"
import { useResumeStore } from "@/store/useResumeStore"
import { Eye, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle: "Заполните секции, чтобы создать профессиональное резюме",
    previewTitle: "Превью резюме",
    openPreview: "Предпросмотр",
    back: "Назад",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill in the sections to build a professional resume",
    previewTitle: "Resume preview",
    openPreview: "Preview",
    back: "Back",
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
    <div className="min-h-screen bg-slate-50/50 pb-24">
      <div className="p-5">

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link href={`/${locale}/resumes`} className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {dict.back}
          </Link>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenPreview}
              className="rounded-full"
            >
              <Eye className="w-4 h-4 mr-2" />
              {dict.openPreview}
            </Button>
            <DownloadPdfButton locale={locale} />
            <SaveResumeButton />
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            {dict.editorTitle}
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl">
            {dict.editorSubtitle}
          </p>
        </div>

        <div className="w-full">
          <EditorShell />
        </div>
      </div>
    </div>
  )
}
