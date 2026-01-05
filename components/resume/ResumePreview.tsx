"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

const PAGE_W = 794;
const PAGE_H = 1123;

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const locale = useCurrentLocale();

  return (
    <ResumePrint
      data={resume}
      templateKey={resume.templateKey}
      locale={locale}
    />
  );
}
