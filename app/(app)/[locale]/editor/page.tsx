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
import { ResetResumeButton } from "@/components/resume/ResetButton";
import { SaveResumeButton } from "@/components/resume/SaveResumeButton";
import { EditorShell } from "@/components/resume/sections/EditorShell";
import { ResumeDashboard } from "@/components/resume/sections/ResumeDashboard";
import { SectionsVisibilityPanel } from "@/components/resume/sections/SectionsVisibilityPanel";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

const { useBreakpoint } = Grid;

const messages = {
  ru: { openPreview: "Предпросмотр" },
  en: { openPreview: "Preview" },
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
    <div className="min-h-screen bg-bg pb-24">
      <div className="grid grid-cols-2 gap-5 p-5">
        <EditorShell />
        <div className="grid grid-cols-1 gap-5">
          <SectionsVisibilityPanel />
          <ResumeDashboard />
        </div>
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
