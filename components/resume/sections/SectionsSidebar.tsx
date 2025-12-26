"use client";

import { Card } from "antd";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeSectionKey } from "@/types/resume";

import {
  Activity,
  Award,
  BadgeCheck,
  Briefcase,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Languages,
  Layers3,
  ShieldCheck,
  SlidersHorizontal,
  User,
} from "lucide-react";

type Item = {
  key: ResumeSectionKey;
  icon: React.ReactNode;
};

const ITEMS: Item[] = [
  { key: "photo", icon: <User size={16} /> },
  { key: "summary", icon: <FileText size={16} /> },
  { key: "experience", icon: <Briefcase size={16} /> },
  { key: "projects", icon: <Layers3 size={16} /> },
  { key: "techSkills", icon: <ShieldCheck size={16} /> },
  { key: "softSkills", icon: <BadgeCheck size={16} /> },
  { key: "education", icon: <GraduationCap size={16} /> },
  { key: "languages", icon: <Languages size={16} /> },
  { key: "employmentPreferences", icon: <SlidersHorizontal size={16} /> },
  { key: "certifications", icon: <Award size={16} /> },
  { key: "activities", icon: <Activity size={16} /> },
];

const messages = {
  ru: {
    photo: "Фото",
    summary: "О себе",
    experience: "Опыт",
    projects: "Проекты",
    techSkills: "Тех. навыки",
    softSkills: "Софт-скиллы",
    education: "Образование",
    languages: "Языки",
    employmentPreferences: "Предпочтения",
    certifications: "Сертификаты",
    activities: "Активности",
  },
  en: {
    photo: "Photo",
    summary: "Summary",
    experience: "Experience",
    projects: "Projects",
    techSkills: "Tech skills",
    softSkills: "Soft skills",
    education: "Education",
    languages: "Languages",
    employmentPreferences: "Preferences",
    certifications: "Certifications",
    activities: "Activities",
  },
} as const;

export function SectionsSidebar() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const { resume, toggleSection } = useResumeStore();

  const isVisible = (key: ResumeSectionKey) => resume.sectionsVisibility[key];

  const itemsWithLabels = useMemo(
    () =>
      ITEMS.map((it) => ({
        ...it,
        label: dict[it.key],
      })),
    [dict]
  );

  return (
    <Card size="small" className="w-[220px]">
      <div className="flex w-full flex-col gap-1.5">
        {itemsWithLabels.map((item) => {
          const visible = isVisible(item.key);

          return (
            <button
              key={item.key}
              type="button"
              onClick={() => toggleSection(item.key)}
              className={[
                "flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left transition",
                "hover:bg-black/5 active:scale-[0.99] cursor-pointer",
                visible ? "opacity-100" : "opacity-45 bg-black/5",
              ].join(" ")}
            >
              <span className="flex shrink-0 items-center">{item.icon}</span>
              <span className="min-w-0 flex-1 truncate text-sm">
                {item.label}
              </span>
              <span className="flex shrink-0 items-center">
                {visible ? <Eye size={14} /> : <EyeOff size={14} />}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
