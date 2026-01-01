"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Switch, Tooltip } from "antd";

type LocaleKey = "ru" | "en";

const messages = {
  ru: {
    title: "Фото в PDF",
    subtitle: "Включите, чтобы печатать резюме с фотографией",
    on: "С фото",
    off: "Без фото",
  },
  en: {
    title: "Photo in PDF",
    subtitle: "Enable to export resume with a photo",
    on: "With photo",
    off: "No photo",
  },
} as const;

export function PhotoExportToggle({ className }: { className?: string }) {
  const localeRaw = useCurrentLocale();
  const locale: LocaleKey = localeRaw === "en" ? "en" : "ru";
  const t = messages[locale];

  const includePhoto = useResumeStore(
    (s) => (s as any).resume.includePhoto as boolean | undefined
  );
  const setIncludePhoto = useResumeStore(
    (s) => (s as any).setIncludePhoto as (v: boolean) => void
  );

  const checked = includePhoto ?? true;

  return (
    <div
      className={"flex items-center justify-between gap-4 " + (className ?? "")}
    >
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-900">{t.title}</div>
        <div className="text-xs text-slate-500 mt-0.5">{t.subtitle}</div>
      </div>

      <Tooltip title={checked ? t.on : t.off} placement="top">
        <Switch checked={checked} onChange={(v) => setIncludePhoto(v)} />
      </Tooltip>
    </div>
  );
}
