"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const locale = useCurrentLocale();

  return (
    <div className="flex justify-center w-full">
      <ResumePrint
        data={resume}
        templateKey={resume.templateKey}
        locale={locale}
      />
    </div>
  );
}
