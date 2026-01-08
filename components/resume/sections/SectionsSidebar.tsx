"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeSectionKey } from "@/types/resume";
import { Divider, Typography } from "antd";
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

const { Text } = Typography;

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

export function SectionsSidebar({ setSelected }) {
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
    <div className="xl:w-[15rem] bg-white h-full py-5">
      <div>
        {items.map((item, idx) => (
          <React.Fragment key={item.key}>
            <button
              type="button"
              onClick={() => {
                setActiveKey(item.key);
                setSelected(item.key);
              }}
              aria-current={item.isActive ? "true" : undefined}
              className={[
                "flex w-full items-center gap-2.5 px-2 text-left transition active:scale-[0.99]",
                "hover:bg-(--ant-colorFillSecondary) cursor-pointer px-5",
                item.isActive
                  ? "font-medium text-(--ant-colorPrimary)"
                  : "text-(--ant-colorTextSecondary) hover:text-(--ant-colorText)",
              ].join(" ")}
            >
              <span className="flex shrink-0 items-center">{item.icon}</span>
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
            </button>

            <Divider className="my-4! border-1 border-gray-200" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
