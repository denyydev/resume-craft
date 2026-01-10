"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EditorShell } from "@/components/resume/EditorShell";
import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/nav/DownloadPdfButton";
import { ResetResumeButton } from "@/components/resume/nav/ResetButton";
import { SaveResumeButton } from "@/components/resume/nav/SaveResumeButton";
import ShareResumeButton from "@/components/resume/nav/ShareResumeButton";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SectionsSidebar } from "@/components/resume/sections/SectionsSidebar";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { useResumeStore } from "@/store/useResumeStore";
import { Card } from "antd";

export default function EditorPage() {
  const [selected, setSelected] = useState("summary");
  const searchParams = useSearchParams();
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

  return (
    // SCROLL CONTAINER — без padding (скроллбар прижат вправо)
    <div className="h-full min-h-0 overflow-auto">
      {/* PADDED CANVAS */}
      <div className="px-5 h-full min-h-0">
        <div
          className="
          h-full min-h-0
          grid gap-5
          grid-cols-1
          lg:grid-cols-[240px_minmax(0,1fr)]
        "
        >
          {/* LEFT: sidebar (desktop) */}
          <aside className="hidden lg:block min-h-0">
            <div className="sticky top-20 h-[calc(100dvh-5rem)]">
              <SectionsSidebar setSelected={setSelected} />
            </div>
          </aside>

          {/* MOBILE: твой “воздушный” навигейшн сверху */}
          <div className="lg:hidden">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-2">
              <SectionsSidebar setSelected={setSelected} />
            </div>
          </div>

          {/* RIGHT: content */}
          <main className="min-w-0 min-h-0">
            {/* Toolbar: sticky только на lg+ */}
            <div className="z-20 pt-4 pb-3 relative lg:sticky lg:top-0">
              {/* glass layer */}
              <div
                className="
      pointer-events-none absolute
      -inset-x-4 -inset-y-3
      hidden lg:block
      bg-[#f3f5f9]/70 backdrop-blur-md
      supports-[backdrop-filter]:bg-[#f3f5f9]/55
    "
              />

              <div className="relative">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <TemplateSelector />
                    <AccentColorPicker />
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

            {/* Content */}
            <div className="py-5">
              <div className="flex min-h-0 flex-col gap-5 xl:flex-row">
                <div className="min-w-0 xl:flex-[0_0_420px]">
                  <Card className="h-fit">
                    <EditorShell selected={selected} />
                  </Card>
                </div>

                <div className="min-w-0 xl:flex-1">
                  <A4PreviewFrame>
                    <ResumePreview />
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
  maxScale = 0.82, // как было на десктопе
  padding = 16, // "воздух" по бокам внутри контейнера
}: {
  children: React.ReactNode;
  maxScale?: number;
  padding?: number;
}) {
  const W = 794;
  const H = 1123;

  const [containerW, setContainerW] = useState<number>(0);

  return (
    <div className="w-full min-w-0">
      <div
        className="w-full min-w-0 flex justify-center"
        ref={(el) => {
          if (!el) return;

          // ResizeObserver, чтобы пересчитывать scale при изменении ширины
          const ro = new ResizeObserver((entries) => {
            const w = entries[0]?.contentRect?.width ?? 0;
            setContainerW(w);
          });
          ro.observe(el);
          return () => ro.disconnect();
        }}
      >
        <div className="pt-4 pb-10 w-full min-w-0">
          {/* viewport */}
          <div
            className="relative mx-auto shadow-lg overflow-hidden rounded-xl bg-white"
            style={{
              // доступная ширина минус "воздух"
              width: containerW
                ? Math.min(containerW - padding * 2, W * maxScale)
                : "100%",
            }}
          >
            {(() => {
              const available = Math.max(0, containerW - padding * 2);
              const fitScale =
                available > 0 ? Math.min(maxScale, available / W) : maxScale;

              // реальный "видимый" размер
              const viewW = W * fitScale;
              const viewH = H * fitScale;

              return (
                <div
                  style={{
                    width: viewW,
                  }}
                  className="mx-auto"
                >
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
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
