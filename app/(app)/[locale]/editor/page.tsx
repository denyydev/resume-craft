"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EditorShell } from "@/components/resume/EditorShell";
import AccentColorPicker from "@/components/resume/nav/AccentColorPicker";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { SectionsSidebar } from "@/components/resume/sections/SectionsSidebar";
import { TemplateSelector } from "@/components/resume/templates/TemplateSelector";
import { useResumeStore } from "@/store/useResumeStore";

const PREVIEW_W = 550;
const PREVIEW_H = 700;

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
      <div className="grid h-full grid-cols-2">
        <div className="flex h-full min-h-0">
          <div className="h-full">
            <SectionsSidebar setSelected={setSelected} />
          </div>
          <div className="flex-1 min-h-0">
            <EditorShell selected={selected} />
          </div>
        </div>
        <div className="h-full min-h-0 p-5 flex  justify-center items-center">
          <div className="border-2 border-gray-200">
            <div className="min-h-0 overflow-auto bg-white flex justify-center h-[700] w-[700px]">
              <ResumePreview />
            </div>
            <div className="bg-white px-5 py-2 border-t-2 border-gray-200 flex items-center justify-between">
              <TemplateSelector />
              <AccentColorPicker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
