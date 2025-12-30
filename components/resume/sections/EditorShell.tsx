"use client";

import { ActivitiesSection } from "./ActivitiesSection";
import { BasicSection } from "./BasicSection";
import { CertificationsSection } from "./CertificationsSection";
import { EducationSection } from "./EducationSection";
import { EmploymentPreferencesSection } from "./EmploymentPreferencesSection";
import { ExperienceSection } from "./ExperienceSection";
import { LanguagesSection } from "./LanguagesSection";
import { ProjectsSection } from "./ProjectsSection";
import { SkillsSection } from "./SkillsSection";

export function EditorShell() {
  return (
    <div className="flex flex-col gap-5">
      <BasicSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <LanguagesSection />
      <EmploymentPreferencesSection />
      <CertificationsSection />
      <ActivitiesSection />
    </div>
  );
}
