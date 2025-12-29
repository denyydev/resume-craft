"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { MOCK_RESUME } from "@/lib/mockResume";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const locale = useCurrentLocale();

  return (
    <div className="flex justify-center">
      <ResumePrint
        data={MOCK_RESUME}
        templateKey={resume.templateKey}
        locale={locale}
      />
    </div>
  );
}
