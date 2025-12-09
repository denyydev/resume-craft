"use client"

import { useResumeStore } from "@/store/useResumeStore"
import type { TemplateKey } from "@/types/resume"

const templateLabels: Record<TemplateKey, { title: string; subtitle: string }> = {
  classic: {
    title: "Classic",
    subtitle: "Sidebar layout with dark accent",
  },
  minimal: {
    title: "Minimal",
    subtitle: "Clean single-column layout",
  },
  modern: {
    title: "Modern",
    subtitle: "Compact two-column layout",
  },
  simple: {
    title: "Simple",
    subtitle: "Straightforward single-column resume",
  },
  timeline: {
    title: "Timeline",
    subtitle: "Experience-focused timeline layout",
  },
  grid: {
    title: "Grid",
    subtitle: "Card-based structured layout",
  },
}

export function TemplateSelector() {
  const templateKey = useResumeStore((s) => s.resume.templateKey)
  const setTemplateKey = useResumeStore((s) => s.setTemplateKey)

  const options: TemplateKey[] = [
    "classic",
    "minimal",
    "modern",
    "simple",
    "timeline",
    "grid",
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-baseline justify-between">
        <p className="text-xs font-semibold text-slate-800">Template</p>
        <p className="text-[11px] text-slate-500">
          This will be used for PDF export.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {options.map((key) => {
          const active = templateKey === key
          const t = templateLabels[key]

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTemplateKey(key)}
              className={`flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition ${
                active
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white hover:border-slate-400"
              }`}
            >
              <span className="text-xs font-semibold">{t.title}</span>
              <span
                className={`mt-0.5 text-[11px] ${
                  active ? "text-slate-200" : "text-slate-500"
                }`}
              >
                {t.subtitle}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
