"use client";

import { ActivitiesSection } from "./sections/ActivitiesSection";
import { BasicSection } from "./sections/BasicSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { EmploymentPreferencesSection } from "./sections/EmploymentPreferencesSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { SkillsSection } from "./sections/SkillsSection";

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
