"use client"

import { BasicSection } from "./BasicSection"
import { ExperienceSection } from "./ExperienceSection"
import { SkillsSection } from "./SkillsSection"
import { ProjectsSection } from "./ProjectsSection"
import { EducationSection } from "./EducationSection"
import { ResumeDashboard } from "./ResumeDashboard"
import { ActivitiesSection, CertificationsSection, EmploymentPreferencesSection } from "./EmploymentPreferencesSection"


export function EditorShell() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
<div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <BasicSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <EmploymentPreferencesSection/>
        <CertificationsSection/>
        <ActivitiesSection/>
    </div>
</div>
  )
}
