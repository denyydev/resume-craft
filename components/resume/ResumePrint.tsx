"use client";

import type { TemplateKey } from "@/components/resume/templates";
import { templateMap } from "@/components/resume/templates";
import { NeoTemplate } from "@/components/resume/templates/NeoTemplate";
import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume, TemplateKey as ResumeTemplateKey } from "@/types/resume";

type Props = {
  data: Resume;
  locale: Locale;
  templateKey: ResumeTemplateKey;
};

function mapTemplateKey(key: ResumeTemplateKey): TemplateKey {
  if (key === "neo") return "default";
  if (key === "sidebar") return "classic";
  if (key === "compact") return "modern";
  if (key in templateMap) return key as TemplateKey;
  return "default";
}

export function ResumePrint({ data, locale, templateKey }: Props) {
  const mappedKey = mapTemplateKey(templateKey);
  const Template = templateMap[mappedKey] ?? NeoTemplate;
  return <Template data={data} locale={locale} />;
}
