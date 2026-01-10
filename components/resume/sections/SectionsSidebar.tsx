"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeSectionKey } from "@/types/resume";
import {
  Activity,
  Award,
  BadgeCheck,
  Briefcase,
  FileText,
  GraduationCap,
  Languages,
  Layers3,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";

type Item = {
  key: ResumeSectionKey;
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  { key: "summary", icon: <FileText size={16} /> },
  { key: "contacts", icon: <Briefcase size={16} /> },
  { key: "experience", icon: <Briefcase size={16} /> },
  { key: "techSkills", icon: <ShieldCheck size={16} /> },
  { key: "softSkills", icon: <BadgeCheck size={16} /> },
  { key: "projects", icon: <Layers3 size={16} /> },
  { key: "education", icon: <GraduationCap size={16} /> },
  { key: "languages", icon: <Languages size={16} /> },
  { key: "employmentPreferences", icon: <SlidersHorizontal size={16} /> },
  { key: "certifications", icon: <Award size={16} /> },
  { key: "activities", icon: <Activity size={16} /> },
];

const messages = {
  ru: {
    summary: "О себе",
    contacts: "Контакты",
    experience: "Опыт",
    projects: "Проекты",
    techSkills: "Тех. навыки",
    softSkills: "Софт-скиллы",
    education: "Образование",
    languages: "Языки",
    employmentPreferences: "Предпочтения",
    certifications: "Сертификаты",
    activities: "Активности",
    sections: "Разделы",
  },
  en: {
    summary: "Summary",
    contacts: "Contacts",
    experience: "Experience",
    projects: "Projects",
    techSkills: "Tech skills",
    softSkills: "Soft skills",
    education: "Education",
    languages: "Languages",
    employmentPreferences: "Preferences",
    certifications: "Certifications",
    activities: "Activities",
    sections: "Sections",
  },
} as const;

const ACCENT = "#0A84FF";

export function SectionsSidebar({
  setSelected,
}: {
  setSelected: (key: ResumeSectionKey) => void;
}) {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const [activeKey, setActiveKey] = useState<ResumeSectionKey>("summary");

  const items = useMemo(
    () =>
      ITEMS.map((it) => ({
        ...it,
        label: dict[it.key],
        isActive: activeKey === it.key,
      })),
    [dict, activeKey]
  );

  return (
    <aside
      className={[
        // ❌ без w-[15rem]
        "rounded-2xl border border-white/10 overflow-hidden",
        "shadow-lg backdrop-blur",
        "bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]",
        "p-3 relative will-change-transform",
      ].join(" ")}
    >
      {/* premium highlight like capsules */}
      <div
        className="
          pointer-events-none absolute inset-0
          before:absolute before:inset-0 before:rounded-2xl
          before:bg-gradient-to-b before:from-white/10 before:to-transparent
          before:opacity-25
        "
      />

      {/* soft blobs for depth */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative">
        <nav className="space-y-1">
          {items.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                setActiveKey(item.key);
                setSelected(item.key);
              }}
              aria-current={item.isActive ? "true" : undefined}
              className={[
                "group relative flex w-full items-center gap-3 cursor-pointer",
                "rounded-xl px-3 py-2.5 text-left",
                "transition-all duration-150",
                "active:scale-[0.99]",
                item.isActive
                  ? "bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "text-white/70 hover:text-white hover:bg-white/6",
              ].join(" ")}
            >
              {/* active left rail */}
              <span
                className={[
                  "absolute left-0 top-1/2 -translate-y-1/2",
                  "h-6 w-[3px] rounded-r",
                  item.isActive ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-150",
                ].join(" ")}
                style={{ backgroundColor: ACCENT }}
              />

              {/* icon */}
              <span
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  "bg-white/4 ring-1 ring-white/10",
                  "transition-all duration-150",
                  item.isActive ? "bg-white/6" : "group-hover:bg-white/6",
                ].join(" ")}
                style={{
                  color: item.isActive ? ACCENT : "rgba(255,255,255,0.70)",
                }}
              >
                {item.icon}
              </span>

              {/* label */}
              <span className="min-w-0 flex-1 truncate text-[13px] leading-5 text-white">
                {item.label}
              </span>

              {/* tiny active glow dot */}
              <span
                className={[
                  "ml-auto h-1.5 w-1.5 rounded-full",
                  item.isActive ? "opacity-100" : "opacity-0",
                  "transition-opacity duration-150",
                ].join(" ")}
                style={{
                  backgroundColor: ACCENT,
                  boxShadow: `0 0 0 4px rgba(10,132,255,0.14)`,
                }}
              />
            </button>
          ))}
        </nav>

        <div className="mt-3 px-2">
          <div className="h-px w-full bg-white/5" />
        </div>
      </div>
    </aside>
  );
}
