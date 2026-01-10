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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

type Item = {
  key: ResumeSectionKey;
  icon: React.ReactNode;
};

const ITEMS = [
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
] as const satisfies readonly Item[];

type SidebarKey = (typeof ITEMS)[number]["key"];
type Dict = Record<SidebarKey | "sections", string>;

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
} satisfies Record<"ru" | "en", Dict>;

type LocaleKey = keyof typeof messages;

const ACCENT = "#0A84FF";
const SECTION_KEYS = new Set<SidebarKey>(ITEMS.map((x) => x.key));

function normalizeSection(value: string | null): SidebarKey {
  return SECTION_KEYS.has(value as SidebarKey)
    ? (value as SidebarKey)
    : "summary";
}

function normalizeLocale(value: unknown): LocaleKey {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function SectionsSidebar() {
  const params = useParams<{ locale: Locale }>();
  const locale = normalizeLocale(params?.locale);
  const dict = messages[locale];

  const router = useRouter();
  const searchParams = useSearchParams();

  const activeKey = useMemo(
    () => normalizeSection(searchParams.get("section")),
    [searchParams]
  );

  const items = useMemo(
    () =>
      ITEMS.map((it) => ({
        ...it,
        label: dict[it.key],
        isActive: activeKey === it.key,
      })),
    [dict, activeKey]
  );

  const setSectionInUrl = (key: SidebarKey) => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("section", key);
    router.replace(`?${next.toString()}`, { scroll: false });
  };

  return (
    <aside
      className="
        rounded-2xl border border-white/10 overflow-hidden
        shadow-lg backdrop-blur
        bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]
        p-3 relative will-change-transform
      "
    >
      <div className="pointer-events-none absolute inset-0 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/10 before:to-transparent before:opacity-25" />

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
              onClick={() => setSectionInUrl(item.key)}
              aria-current={item.isActive ? "true" : undefined}
              className={
                item.isActive
                  ? "group relative flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-left transition-all duration-150 active:scale-[0.99] bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                  : "group relative flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-left transition-all duration-150 active:scale-[0.99] text-white/70 hover:text-white hover:bg-white/6"
              }
            >
              <span
                className={
                  item.isActive
                    ? "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r opacity-100 transition-opacity duration-150"
                    : "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r opacity-0 transition-opacity duration-150"
                }
                style={{ backgroundColor: ACCENT }}
              />

              <span
                className={
                  item.isActive
                    ? "flex h-8 w-8 items-center justify-center rounded-lg bg-white/6 ring-1 ring-white/10 transition-all duration-150"
                    : "flex h-8 w-8 items-center justify-center rounded-lg bg-white/4 ring-1 ring-white/10 transition-all duration-150 group-hover:bg-white/6"
                }
                style={{
                  color: item.isActive ? ACCENT : "rgba(255,255,255,0.70)",
                }}
              >
                {item.icon}
              </span>

              <span className="min-w-0 flex-1 truncate text-[13px] leading-5 text-white">
                {item.label}
              </span>

              <span
                className={
                  item.isActive
                    ? "ml-auto h-1.5 w-1.5 rounded-full opacity-100 transition-opacity duration-150"
                    : "ml-auto h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-150"
                }
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
