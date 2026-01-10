"use client";

import type { ResumeSectionKey } from "@/types/resume";
import { Spin } from "antd";
import dynamic from "next/dynamic";
import React from "react";

type EditorShellProps = {
  selected: ResumeSectionKey;
};

type SectionComponent = React.ComponentType<Record<string, never>>;

function SectionLoader() {
  return (
    <div className="flex min-h-[120px] w-full items-center justify-center">
      <Spin />
    </div>
  );
}

const dyn = (loader: () => Promise<SectionComponent>) =>
  dynamic(async () => loader(), {
    ssr: false,
    loading: SectionLoader,
  });

const BasicIdentitySection = dyn(() =>
  import("./sections/BasicIdentitySection").then((m) => m.BasicIdentitySection)
);

const BasicContactsSection = dyn(() =>
  import("./sections/BasicContactsSection").then((m) => m.BasicContactsSection)
);

const ExperienceSection = dyn(() =>
  import("./sections/ExperienceSection").then((m) => m.ExperienceSection)
);

const TechSkillsSection = dyn(() =>
  import("./sections/TechSkillsSection").then((m) => m.TechSkillsSection)
);

const SoftSkillsSection = dyn(() =>
  import("./sections/SoftSkillsSection").then((m) => m.SoftSkillsSection)
);

const ProjectsSection = dyn(() =>
  import("./sections/ProjectsSection").then((m) => m.ProjectsSection)
);

const EducationSection = dyn(() =>
  import("./sections/EducationSection").then((m) => m.EducationSection)
);

const LanguagesSection = dyn(() =>
  import("./sections/LanguagesSection").then((m) => m.LanguagesSection)
);

const EmploymentPreferencesSection = dyn(() =>
  import("./sections/EmploymentPreferencesSection").then(
    (m) => m.EmploymentPreferencesSection
  )
);

const CertificationsSection = dyn(() =>
  import("./sections/CertificationsSection").then(
    (m) => m.CertificationsSection
  )
);

const ActivitiesSection = dyn(() =>
  import("./sections/ActivitiesSection").then((m) => m.ActivitiesSection)
);

const sections: Partial<Record<ResumeSectionKey, SectionComponent>> = {
  summary: BasicIdentitySection,
  contacts: BasicContactsSection,
  experience: ExperienceSection,
  techSkills: TechSkillsSection,
  softSkills: SoftSkillsSection,
  projects: ProjectsSection,
  education: EducationSection,
  languages: LanguagesSection,
  employmentPreferences: EmploymentPreferencesSection,
  certifications: CertificationsSection,
  activities: ActivitiesSection,
};

export function EditorShell({ selected }: EditorShellProps) {
  const Section = sections[selected];

  return (
    <div className="min-h-0">
      {Section ? (
        <Section />
      ) : (
        <div className="text-sm text-gray-500">Раздел пока не реализован</div>
      )}
    </div>
  );
}
