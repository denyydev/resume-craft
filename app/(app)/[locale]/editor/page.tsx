"use client";

import { Grid } from "antd";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

import { EditorBottomBar } from "@/components/editor/EditorBottomBar";
import { EditorShell } from "@/components/resume/EditorShell";
import { ResetResumeButton } from "@/components/resume/nav/ResetButton";
import { SaveResumeButton } from "@/components/resume/nav/SaveResumeButton";
import { ResumeDashboard } from "@/components/resume/sections/ResumeDashboard";
import { SectionsSidebar } from "@/components/resume/sections/SectionsSidebar";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

const { useBreakpoint } = Grid;

const messages = {
  ru: { openPreview: "Предпросмотр / Скачать PDF" },
  en: { openPreview: "Preview / Download PDF" },
} as const;

export default function EditorPage() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const screens = useBreakpoint();
  const isMobile = useMemo(() => !screens.sm, [screens.sm]);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const resumeId = searchParams.get("resumeId") || undefined;

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

  const handleOpenPreview = useCallback(() => {
    const basePath = pathname.endsWith("/preview")
      ? pathname.replace(/\/preview$/, "")
      : pathname;

    const queryString = searchParams.toString();
    const suffix = queryString ? `?${queryString}` : "";
    router.push(`${basePath}/preview${suffix}`);
  }, [pathname, router, searchParams]);

  return (
    <div className="min-h-screen bg-bg pb-12">
      <div className="flex gap-5 py-5">
        {!isMobile && (
          <aside className="w-[240px] shrink-0">
            <div className="sticky top-5">
              <SectionsSidebar />
            </div>
          </aside>
        )}

        <main className="min-w-0 flex-1">
          <EditorShell />
        </main>

        {!isMobile && (
          <aside className="w-[360px] shrink-0">
            <div className="sticky top-5">
              <ResumeDashboard />
            </div>
          </aside>
        )}

        {isMobile && (
          <div className="grid w-full grid-cols-1 gap-5">
            <SectionsSidebar />
            <EditorShell />
            <ResumeDashboard />
          </div>
        )}
      </div>

      <EditorBottomBar
        previewLabel={dict.openPreview}
        onOpenPreview={handleOpenPreview}
        actions={
          <>
            <SaveResumeButton />
            <ResetResumeButton />
          </>
        }
      />
    </div>
  );
}
