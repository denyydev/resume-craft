"use client";

import { templateMap } from "@/components/resume/templates";
import { NeoTemplate } from "@/components/resume/templates/NeoTemplate";
import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";

export function ResumePrint({
  data,
  locale,
  templateKey,
}: {
  data: Resume;
  locale: Locale;
}) {
  const Template = templateMap[templateKey] ?? NeoTemplate;

  return <Template data={data} locale={locale} />;
}
