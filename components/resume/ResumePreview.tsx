"use client";

import { ResumePrint } from "@/components/resume/ResumePrint";
import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { FileText } from "lucide-react";

function isResumeEmpty(resume: any) {
  return !(
    resume.firstName?.trim() ||
    resume.lastName?.trim() ||
    resume.position?.trim() ||
    resume.summary?.trim() ||
    resume.experience?.some(
      (e: any) => e.company || e.position || e.description
    ) ||
    resume.projects?.some((p: any) => p.name || p.description) ||
    resume.education?.some((e: any) => e.institution || e.degree) ||
    resume.techSkills?.tags?.length ||
    resume.softSkills?.tags?.length
  );
}

export function ResumePreview() {
  const resume = useResumeStore((s) => s.resume);
  const locale = useCurrentLocale();

  if (isResumeEmpty(resume)) {
    return <EmptyPreview locale={locale} />;
  }

  return (
    <ResumePrint
      data={resume}
      templateKey={resume.templateKey}
      locale={locale}
    />
  );
}

function EmptyPreview({ locale }: { locale: string }) {
  const isRu = locale?.startsWith("ru");

  return (
    <div className="w-full h-[1123px] flex items-center justify-center">
      <div
        className="
          w-full max-w-[520px]
          rounded-2xl
          border border-dashed border-slate-300
          bg-slate-50
          px-8 py-10
          text-center
        "
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm">
          <FileText className="h-6 w-6 text-slate-400" />
        </div>

        <h3 className="text-base font-semibold text-slate-900">
          {isRu ? "Резюме пока пустое" : "Your resume is empty"}
        </h3>

        <p className="mt-2 text-sm text-slate-600">
          {isRu
            ? "Начните заполнять резюме — превью появится автоматически."
            : "Start filling in your resume and the preview will appear here."}
        </p>

        <p className="mt-4 text-xs text-slate-400">
          {isRu
            ? "Совет: начните с имени, позиции или опыта"
            : "Tip: start with your name, position or experience"}
        </p>
      </div>
    </div>
  );
}
