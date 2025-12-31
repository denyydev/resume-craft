"use client";

import AccentColorPicker from "@/components/resume/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/DownloadPdfButton";
import { PhotoExportToggle } from "@/components/resume/PhotoExportToggle";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/sections/TemplateSelector";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Button, Card, Divider, Grid } from "antd";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const { useBreakpoint } = Grid;

const messages = {
  ru: {
    previewTitle: "Превью резюме",
    backToEditor: "Вернуться к редактору",
  },
  en: {
    previewTitle: "Resume Preview",
    backToEditor: "Back to editor",
  },
} as const;

export default function PreviewPage() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const screens = useBreakpoint();
  const isDesktop = useMemo(() => !!screens.lg, [screens.lg]);

  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const router = useRouter();
  const loadResume = useResumeStore((s) => s.loadResume);

  useEffect(() => {
    if (!resumeId) return;

    const fetchResume = async () => {
      try {
        const res = await fetch(`/api/resumes?id=${resumeId}`);
        if (!res.ok) return;

        const json = await res.json();
        const data = json.resume?.data;
        if (!data) return;

        loadResume(data);
      } catch {
        return;
      }
    };

    fetchResume();
  }, [resumeId, loadResume]);

  const handleBack = () => {
    const query = resumeId ? `?resumeId=${resumeId}` : "";
    router.push(`/${locale}/editor${query}`);
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-5 lg:flex-row">
          <aside className="w-full lg:w-[320px] lg:shrink-0">
            <Card>
              <Button
                type="text"
                className="w-full justify-start"
                onClick={handleBack}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                {t.backToEditor}
              </Button>
              <Divider />
              <TemplateSelector />
            </Card>
          </aside>

          <main className="min-w-0 flex-1">
            <ResumePreview />
          </main>

          <aside className="w-full lg:w-[320px] lg:shrink-0">
            <Card>
              <AccentColorPicker />
              <Divider />
              <PhotoExportToggle />
              <Divider />
              <DownloadPdfButton locale={locale} />
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
