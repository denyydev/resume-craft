"use client";

import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/nav/DownloadPdfButton";
import { PhotoExportToggle } from "@/components/resume/nav/PhotoExportToggle";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Button, Card, Divider } from "antd";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
      <div className="flex flex-col gap-5 py-5 lg:flex-row">
        <aside className="hidden w-[320px] shrink-0 lg:block">
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

        <Card className="mb-5 block lg:hidden">
          <Button
            type="text"
            size="small"
            className="w-full"
            onClick={handleBack}
            icon={<ArrowLeft className="h-4 w-4" />}
          >
            {t.backToEditor}
          </Button>
          <Divider />
          <TemplateSelector />
        </Card>

        <main className="min-w-0 flex-1 overflow-x-hidden">
          <ResumePreview />
        </main>

        <aside className="hidden w-[320px] shrink-0 lg:block">
          <div className="sticky top-5">
            <Card>
              <AccentColorPicker />
              <Divider />
              <PhotoExportToggle />
              <Divider />
              <DownloadPdfButton />
            </Card>
          </div>
        </aside>

        <Card className="mt-5 block lg:hidden">
          <AccentColorPicker />
          <Divider />
          <PhotoExportToggle />
          <Divider />
          <DownloadPdfButton />
        </Card>
      </div>
    </div>
  );
}
