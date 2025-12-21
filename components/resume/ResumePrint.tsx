"use client"

import type { Resume } from "@/types/resume"
import type { Locale } from "@/lib/useCurrentLocale"
import { templateMap } from "@/components/resume/templates"
import { NeoTemplate } from "@/components/resume/templates/NeoTemplate"
import { mockResume } from "@/lib/mockResume"

export function ResumePrint({ data, locale }: { data: Resume; locale: Locale }) {
  const key = "sidebar"
  const Template = templateMap[key] ?? NeoTemplate

  return <Template data={mockResume} locale={locale} />
}
