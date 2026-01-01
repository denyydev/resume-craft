"use client"

import React from "react"
import { Tooltip } from "antd"
import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"

type LocaleKey = "ru" | "en"

type AccentColor = {
  value: string
  name: Record<LocaleKey, string>
}

const COLORS: AccentColor[] = [
  { value: "#1677ff", name: { ru: "Синий", en: "Blue" } },
  { value: "#722ed1", name: { ru: "Фиолетовый", en: "Purple" } },
  { value: "#eb2f96", name: { ru: "Маджента", en: "Magenta" } },
  { value: "#f5222d", name: { ru: "Красный", en: "Red" } },
  { value: "#fa8c16", name: { ru: "Оранжевый", en: "Orange" } },
  { value: "#52c41a", name: { ru: "Зелёный", en: "Green" } },
]

const messages = {
  ru: {
    title: "Выберите акцентный цвет",
    subtitle: "Этот цвет будет использован при экспорте PDF",
    aria: "Выбрать акцентный цвет",
  },
  en: {
    title: "Select accent color",
    subtitle: "This color will be used for PDF export",
    aria: "Select accent color",
  },
} as const

export type AccentColorPickerProps = {
  disabled?: boolean
  className?: string
}

export default function AccentColorPicker({
  disabled,
  className,
}: AccentColorPickerProps) {
  const localeRaw = useCurrentLocale()
  const locale: LocaleKey = localeRaw === "en" ? "en" : "ru"
  const t = messages[locale]

  const accentColor = useResumeStore((s) => s.resume.accentColor)
  const setAccentColor = useResumeStore((s) => s.setAccentColor)

  const current = accentColor ?? COLORS[0].value

  return (
    <div>
      <div className="flex-1 min-w-0 mb-5">
        <span className="text-sm font-semibold block">{t.title}</span>
        <span className="text-xs leading-relaxed">{t.subtitle}</span>
      </div>

      <div className={"flex items-center justify-center gap-3 " + (className ?? "")}>
        {COLORS.map((c) => {
          const selected = current === c.value

          return (
            <Tooltip key={c.value} title={c.name[locale]} placement="top">
              <button
                type="button"
                disabled={disabled}
                onClick={() => setAccentColor(c.value)}
                aria-label={`${t.aria}: ${c.name[locale]}`}
                aria-pressed={selected}
                className={
                  "relative h-8 w-8 rounded-full transition " +
                  (disabled
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer hover:scale-[1.06] active:scale-[0.98]")
                }
                style={{
                  backgroundColor: c.value,
                  boxShadow: selected
                    ? `0 0 0 3px rgba(255,255,255,1), 0 0 0 5px ${c.value}`
                    : "0 0 0 1px rgba(0,0,0,0.06) inset",
                }}
              >
                <span className="sr-only">{c.name[locale]}</span>

                {selected && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      boxShadow: "0 0 0 1px rgba(0,0,0,0.08) inset",
                    }}
                  />
                )}
              </button>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}
