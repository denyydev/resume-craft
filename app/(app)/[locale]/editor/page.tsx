"use client";

import { EditorShell } from "@/components/resume/EditorShell";
import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/nav/DownloadPdfButton";
import { ResetResumeButton } from "@/components/resume/nav/ResetButton";
import { SaveResumeButton } from "@/components/resume/nav/SaveResumeButton";
import ShareResumeButton from "@/components/resume/nav/ShareResumeButton";
import { TogglePreviewButton } from "@/components/resume/nav/TogglePreviewButton";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SectionsSidebar } from "@/components/resume/sections/SectionsSidebar";
import { TemplateSelector } from "@/components/resume/templates/ui/TemplateSelector";
import { useResumeStore } from "@/store/resume/useResumeStore";
import type { Resume, ResumeSectionKey } from "@/types/resume";
import { Spin } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";

const SECTION_KEYS = new Set<ResumeSectionKey>([
  "summary",
  "contacts",
  "experience",
  "techSkills",
  "softSkills",
  "projects",
  "education",
  "languages",
  "employmentPreferences",
  "certifications",
  "activities",
]);

function normalizeSection(value: string | null): ResumeSectionKey {
  return SECTION_KEYS.has(value as ResumeSectionKey)
    ? (value as ResumeSectionKey)
    : "summary";
}

type ResumeApiResponse = {
  resume?: {
    data?: Resume;
  };
};

function isAbortError(err: unknown): boolean {
  return (
    err instanceof DOMException ||
    (typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name: unknown }).name === "AbortError")
  );
}

export default function EditorPage() {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId") || undefined;

  const selected = useMemo(
    () => normalizeSection(searchParams.get("section")),
    [searchParams]
  );

  const loadResume = useResumeStore((s) => s.loadResume);
  const [loading, setLoading] = useState<boolean>(!!resumeId);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (!resumeId) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    setLoading(true);

    fetch(`/api/resumes?id=${resumeId}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load resume");
        return res.json();
      })
      .then((json: ResumeApiResponse) => {
        const data = json.resume?.data;
        if (data) loadResume(data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [resumeId, loadResume]);

  return (
    <div className="h-screen overflow-hidden">
      <div className="px-5 h-full min-h-0 overflow-y-auto">
        <div className="h-full min-h-0 grid gap-5 grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="hidden lg:block min-h-0">
            <div className="sticky top-5 lg:max-h-[calc(100vh-2.5rem)]">
              <SectionsSidebar />
            </div>
          </aside>

          <div className="lg:hidden">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-2">
              <SectionsSidebar />
            </div>
          </div>

          <main className="min-w-0 min-h-0 flex flex-col">
            <div className="z-20 pt-5 relative lg:sticky lg:top-0 flex-shrink-0">
              <div className="pointer-events-none absolute -inset-x-4 -inset-y-3 hidden lg:block bg-[#f3f5f9]/70 backdrop-blur-md supports-[backdrop-filter]:bg-[#f3f5f9]/55" />
              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <TemplateSelector />
                    <AccentColorPicker />
                    <TogglePreviewButton
                      showPreview={showPreview}
                      onToggle={() => setShowPreview((v) => !v)}
                    />
                    <ResetResumeButton />
                  </div>

                  <div className="flex items-center gap-2">
                    <ShareResumeButton />
                    <SaveResumeButton />
                    <div className="mx-1 h-6 w-px bg-slate-300/70" />
                    <DownloadPdfButton />
                  </div>
                </div>

                <div className="mt-3 h-px w-full bg-slate-200/80" />
              </div>
            </div>

            <div className="py-5 flex-1 min-h-0">
              <div
                className={[
                  "flex min-h-0 flex-col gap-5",
                  showPreview ? "xl:flex-row" : "xl:flex-row xl:justify-center",
                ].join(" ")}
              >
                <div
                  className={[
                    "min-w-0",
                    showPreview
                      ? "xl:flex-[0_0_520px]"
                      : "xl:w-full xl:max-w-[760px]",
                  ].join(" ")}
                >
                  <Spin spinning={loading}>
                    <EditorShell selected={selected} />
                  </Spin>
                </div>

                <div
                  className={[
                    "min-w-0 xl:flex-1",
                    showPreview ? "" : "hidden",
                  ].join(" ")}
                >
                  <A4PreviewFrame>
                    <Spin spinning={loading}>
                      <ResumePreview />
                    </Spin>
                  </A4PreviewFrame>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function A4PreviewFrame({
  children,
  maxScale = 0.82,
  padding = 16,
}: {
  children: React.ReactNode;
  maxScale?: number;
  padding?: number;
}) {
  const W = 794;
  const H = 1123;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0;
      setContainerW(w);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const available = Math.max(0, containerW - padding * 2);
  const fitScale = available > 0 ? Math.min(maxScale, available / W) : maxScale;
  const viewW = W * fitScale;

  const viewportW = containerW
    ? Math.min(containerW - padding * 2, W * maxScale)
    : "100%";

  return (
    <div className="w-full min-w-0">
      <div ref={hostRef} className="w-full min-w-0 flex justify-center">
        <div className="pb-10 w-full min-h-0 min-w-0">
          <div
            className="relative mx-auto shadow-lg overflow-hidden rounded-xl bg-white"
            style={{ width: viewportW }}
          >
            <div style={{ width: viewW }} className="mx-auto">
              <div
                style={{
                  width: W,
                  height: H,
                  transform: `scale(${fitScale})`,
                  transformOrigin: "top left",
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
