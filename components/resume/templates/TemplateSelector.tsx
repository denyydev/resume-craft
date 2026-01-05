"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { TemplateKey } from "@/types/resume";
import type { MenuProps } from "antd";
import { Button, Dropdown, theme } from "antd";

type LocaleKey = "ru" | "en";

const messages = {
  ru: { title: "Выберите шаблон" },
  en: { title: "Select template" },
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
};

export function TemplateSelector() {
  const { token } = theme.useToken();

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
  ];

  const items: MenuProps["items"] = options.map((key) => ({
    key,
    label: templateTitles[key][locale],
  }));

  return (
    <Dropdown
      placement="topLeft"
      trigger={["click"]}
      menu={{
        items,
        selectable: true,
        selectedKeys: [templateKey],
        onClick: ({ key }) => setTemplateKey(key as TemplateKey),
      }}
    >
      <Button>{templateTitles[templateKey][locale]}</Button>
    </Dropdown>
  );
}
