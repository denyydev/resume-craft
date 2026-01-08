"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EditorShell } from "@/components/resume/EditorShell";
import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { DownloadPdfButton } from "@/components/resume/nav/DownloadPdfButton";
import { SaveResumeButton } from "@/components/resume/nav/SaveResumeButton";
import ShareResumeButton from "@/components/resume/nav/ShareResumeButton";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SectionsSidebar } from "@/components/resume/sections/SectionsSidebar";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { useResumeStore } from "@/store/useResumeStore";

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
    <div className="h-full">
      <div className="grid h-full grid-cols-1 xl:grid-cols-5">
        <div className="flex h-full min-h-0 col-span-2">
          <div className="h-full">
            <SectionsSidebar setSelected={setSelected} />
          </div>
          <div className="flex-1 min-h-0 ">
            <EditorShell selected={selected} />
          </div>
        </div>
        <div className="flex flex-col col-span-3">
          <div className="bg-white w-full px-5 py-3 border-b-2 border-gray-200 flex items-center gap-5 justify-between">
            <div className="flex items-center gap-5">
              <AccentColorPicker />
              <TemplateSelector />
            </div>
            <SaveResumeButton />
            <div className="flex items-center gap-5">
              <ShareResumeButton />
              <DownloadPdfButton />
            </div>
          </div>
          <div className="h-full min-h-0 p-5 flex  justify-center items-center">
            <div className="border-2 border-gray-200">
              <div className="min-h-0 overflow-auto bg-white flex justify-center h-[700] w-[700px]">
                <ResumePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
