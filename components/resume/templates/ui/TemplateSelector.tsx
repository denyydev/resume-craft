"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { TemplateKey } from "@/types/resume";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { Check, ChevronDown, LayoutTemplate } from "lucide-react";
import { useMemo } from "react";

type LocaleKey = "ru" | "en";

const messages = {
  ru: { title: "Шаблон" },
  en: { title: "Template" },
} as const;

const templateTitles: Record<TemplateKey, Record<LocaleKey, string>> = {
  default: { ru: "По умолчанию", en: "Default" },
  classic: { ru: "Классический", en: "Classic" },
  minimal: { ru: "Минимал", en: "Minimal" },
  modern: { ru: "Современный", en: "Modern" },
  neo: { ru: "Нео", en: "Neo" },
  sidebar: { ru: "Сайдбар", en: "Sidebar" },
  compact: { ru: "Компактный", en: "Compact" },
  simple: { ru: "ATS Friendly", en: "ATS Friendly" },
  timeline: { ru: "Таймлайн", en: "Timeline" },
  grid: { ru: "Сетка", en: "Grid" },
  creative: { ru: "Креативный", en: "Creative" },
};

const templateHints: Partial<Record<TemplateKey, Record<LocaleKey, string>>> = {
  simple: { ru: "Максимум ATS", en: "Most ATS-friendly" },
  minimal: { ru: "Чисто и просто", en: "Clean & simple" },
  modern: { ru: "Акценты и воздух", en: "Airy with accents" },
  classic: { ru: "Традиционный вид", en: "Traditional look" },
  timeline: { ru: "Хронология", en: "Timeline layout" },
  grid: { ru: "Сетка секций", en: "Grid sections" },
  creative: {
    ru: "Для дизайнеров и нестандартных ролей",
    en: "For designers and creative roles",
  },
};

export function TemplateSelector() {
  const localeRaw = useCurrentLocale();
  const locale: LocaleKey = localeRaw === "en" ? "en" : "ru";
  const t = messages[locale];

  const templateKey = useResumeStore((s) => s.resume.templateKey);
  const setTemplateKey = useResumeStore((s) => s.setTemplateKey);

  const options: TemplateKey[] = [
    "simple",
    "classic",
    "minimal",
    "modern",
    "timeline",
    "grid",
    "creative",
  ];

  const items: MenuProps["items"] = useMemo(
    () =>
      options.map((key) => {
        const title = templateTitles[key][locale];
        const hint = templateHints[key]?.[locale];

        return {
          key,
          label: (
            <div className="flex items-start gap-3 py-1">
              <span className="mt-[2px] inline-flex h-5 w-5 items-center justify-center">
                {templateKey === key ? (
                  <Check size={16} />
                ) : (
                  <span className="h-4 w-4" />
                )}
              </span>

              <div className="min-w-0">
                <div className="text-sm font-medium leading-5">{title}</div>
                {hint ? (
                  <div className="text-xs leading-4 opacity-70">{hint}</div>
                ) : null}
              </div>
            </div>
          ),
        };
      }),
    [options, locale, templateKey]
  );

  return (
    <Dropdown
      placement="bottomLeft"
      trigger={["click"]}
      menu={{
        items,
        selectable: true,
        selectedKeys: [templateKey],
        onClick: ({ key }) => setTemplateKey(key as TemplateKey),
      }}
    >
      {/* pill trigger */}
      <Button
        type="default"
        className="
          !h-10
          !rounded-full
          !border-slate-200/80
          !bg-white/80
          hover:!bg-white
          !px-3
          shadow-sm
          backdrop-blur
          flex items-center gap-2
        "
      >
        <LayoutTemplate size={16} className="opacity-80" />
        <span className="text-sm font-medium">{t.title}:</span>
        <span className="text-sm">{templateTitles[templateKey][locale]}</span>
        <ChevronDown size={16} className="opacity-70" />
      </Button>
    </Dropdown>
  );
}
