"use client";

import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeSectionKey } from "@/types/resume";
import { Card } from "antd";
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
import React, { useEffect, useMemo, useRef, useState } from "react";

type Item = { key: ResumeSectionKey; icon: React.ReactNode };

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
  },
} as const;

export function SectionsSidebar() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const ids = useMemo(() => ITEMS.map((x) => x.key as string), []);
  const activeId = useScrollSpy(ids);

  const itemsWithLabels = useMemo(
    () =>
      ITEMS.map((it) => ({
        ...it,
        label: dict[it.key],
        href: `#${it.key}`,
        isActive: activeId === it.key,
      })),
    [dict, activeId]
  );

  const rowRef = useRef<HTMLAnchorElement | null>(null);
  const [rowHeight, setRowHeight] = useState(34);

  useEffect(() => {
    if (!rowRef.current) return;
    const h = rowRef.current.getBoundingClientRect().height;
    if (h) setRowHeight(h);
  }, []);

  const activeIndex = useMemo(() => {
    const idx = itemsWithLabels.findIndex((x) => x.isActive);
    return idx >= 0 ? idx : 0;
  }, [itemsWithLabels]);

  const gap = 6;
  const highlightY = activeIndex * (rowHeight + gap);

  return (
    <Card className="w-full">
      <div className="relative flex w-full flex-col gap-1.5">
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 w-full rounded-lg bg-black/5 transition-transform duration-300 ease-out"
          style={{
            height: rowHeight,
            transform: `translateY(${highlightY}px)`,
          }}
        />

        {itemsWithLabels.map((item, idx) => (
          <a
            key={item.key}
            href={item.href}
            ref={idx === 0 ? rowRef : undefined}
            className={[
              "relative z-10 flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left",
              "no-underline text-inherit",
              "transition",
              "hover:bg-black/5 active:scale-[0.99] cursor-pointer",
              item.isActive ? "opacity-100 font-medium" : "opacity-75",
            ].join(" ")}
            aria-current={item.isActive ? "true" : undefined}
          >
            <span className="flex shrink-0 items-center">{item.icon}</span>
            <span className="min-w-0 flex-1 truncate text-sm">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </Card>
  );
}
