"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { ResumePrint } from "@/components/resume/ResumePrint"
import { FileText } from "lucide-react"
import type { Resume } from "@/types/resume"

const messages = {
  ru: {
    emptyTitle: "Резюме пустое",
    emptyDescription: "Начните заполнять поля в редакторе и выберите шаблон — превью обновляется автоматически",
  },
  en: {
    emptyTitle: "Resume is empty",
    emptyDescription: "Start filling in the fields in the editor and select a template — preview updates automatically",
  },
} as const

export function ResumePreview() {
  const { resume } = useResumeStore()
  const locale = useCurrentLocale()
  const t = messages[locale === "en" ? "en" : "ru"]

  const isEmpty =
    !resume.fullName &&
    !resume.position &&
    !resume.summary &&
    resume.experience.length === 0 &&
    resume.projects.length === 0 &&
    resume.education.length === 0

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-[794px]">
        {/* Paper-like container with shadow */}
        <div className="relative bg-white shadow-2xl rounded-sm overflow-hidden">
          {/* Paper texture effect */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
            style={{
              backgroundImage: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                #000 2px,
                #000 4px
              )`,
            }}
          />
          
          {/* Content */}
          <div className="relative">
            <ResumePrint data={resume as Resume} locale={locale} />
          </div>
        </div>

        {isEmpty && (
          <div className="mt-6 border border-slate-200 rounded-xl bg-gradient-to-br from-slate-50 to-white p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <p className="text-sm font-medium text-slate-700 mb-1">
              {t.emptyTitle}
            </p>
            <p className="text-xs text-slate-500">
              {t.emptyDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
