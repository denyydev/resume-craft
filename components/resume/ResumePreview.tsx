"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { Resume } from "@/types/resume";
import { FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const messages = {
  ru: {
    title: "Резюме пока пустое",
    description: "Начните заполнять резюме — превью появится автоматически.",
    hint: "Совет: начните с имени, позиции или опыта",
  },
  en: {
    title: "Your resume is empty",
    description:
      "Start filling in your resume and the preview will appear here.",
    hint: "Tip: start with your name, position or experience",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

function isResumeEmpty(resume: Resume) {
  return !(
    resume.firstName?.trim() ||
    resume.lastName?.trim() ||
    resume.position?.trim() ||
    resume.summary?.trim() ||
    resume.experience?.some((e) => e.company || e.position || e.description) ||
    resume.projects?.some((p) => p.name || p.description) ||
    resume.education?.some((e) => e.institution || e.degree) ||
    resume.techSkills?.tags?.length ||
    resume.softSkills?.tags?.length
  );
}

export function ResumePreview() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const liveResume = useResumeStore((s) => s.resume);
  const resume = useDebouncedValue(liveResume, 300);
  const empty = useMemo(() => isResumeEmpty(resume), [resume]);

  if (empty) {
    return <EmptyPreview t={t} />;
  }

  return (
    <ResumePrint
      data={resume}
      templateKey={resume.templateKey}
      locale={rawLocale}
    />
  );
}

function EmptyPreview({ t }: { t: (typeof messages)[Locale] }) {
  return (
    <div className="w-full h-[1123px] flex items-center justify-center">
      <div className="w-full max-w-[520px] rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-8 py-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>

        <h3 className="text-base font-semibold text-slate-900">{t.title}</h3>

        <p className="mt-2 text-sm text-slate-600">{t.description}</p>

        <p className="mt-4 text-xs text-slate-400">{t.hint}</p>
      </div>
    </div>
  );
}
