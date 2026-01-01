"use client";

import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/nav/DownloadPdfButton";
import { PhotoExportToggle } from "@/components/resume/nav/PhotoExportToggle";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
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
  const isMobile = useMemo(() => !screens.lg, [screens.lg]);

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
      <div className="flex gap-5 py-5">
        {!isMobile && (
          <aside className="w-[320px] shrink-0">
            <div className="sticky top-5">
              <Card>
                <Button
                  type="text"
                  className="w-full"
                  onClick={handleBack}
                  icon={<ArrowLeft className="h-4 w-4" />}
                >
                  {t.backToEditor}
                </Button>
                <Divider />
                <TemplateSelector />
              </Card>
            </div>
          </aside>
        )}

        <main className="min-w-0 flex-1">
          {isMobile && (
            <Card className="mb-5">
              <Button
                type="text"
                size="small"
                onClick={handleBack}
                icon={<ArrowLeft className="h-4 w-4" />}
              >
                {t.backToEditor}
              </Button>
              <TemplateSelector />
            </Card>
          )}

          <ResumePreview />
        </main>

        {!isMobile && (
          <aside className="w-[320px] shrink-0">
            <div className="sticky top-5">
              <Card>
                <AccentColorPicker />
                <Divider />
                <PhotoExportToggle />
                <Divider />
                <DownloadPdfButton locale={locale} />
              </Card>
            </div>
          </aside>
        )}

        {isMobile && (
          <Card className="mt-5">
            <AccentColorPicker />
            <Divider />
            <PhotoExportToggle />
            <DownloadPdfButton locale={locale} />
          </Card>
        )}
      </div>
    </div>
  );
}
