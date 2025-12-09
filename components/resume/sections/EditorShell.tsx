"use client"

import { Card } from "antd"
import { BasicSection } from "./BasicSection"
import { ExperienceSection } from "./ExperienceSection"
import { SkillsSection } from "./SkillsSection"
import { ProjectsSection } from "./ProjectsSection"
import { EducationSection } from "./EducationSection"
import { TemplateSelector } from "./TemplateSelector"

export function EditorShell() {
  return (
    <div className="flex h-full flex-col gap-4 overflow-y-auto pr-1">
      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <TemplateSelector />
      </Card>

      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <BasicSection />
      </Card>

      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <ExperienceSection />
      </Card>

      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <SkillsSection />
      </Card>

      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <ProjectsSection />
      </Card>

      <Card
        size="small"
        className="rounded-2xl border-slate-200 shadow-sm"
      >
        <EducationSection />
      </Card>
    </div>
  )
}
