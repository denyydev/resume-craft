export type TemplateKey =
  | "default"
  | "classic"
  | "minimal"
  | "modern"
  | "neo"
  | "sidebar"
  | "compact"
  | "simple"
  | "timeline"
  | "grid";

export type Contacts = {
  email: string;
  phone: string;
  location: string;
  telegram?: string;
  github?: string;
  linkedin?: string;
  website?: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
};

export type ProjectItem = {
  id: string;
  name: string;
  role: string;
  stack: string;
  link: string;
  description: string;
};

export type EducationItem = {
  id: string;
  institution: string;
  field: string;
  degree: string;
  startDate: string;
  endDate: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  level: string;
};

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "freelance";
export type WorkFormat = "remote" | "hybrid" | "onsite";

export type EmploymentPreferences = {
  employmentType: EmploymentType[];
  workFormat: WorkFormat[];
  relocation?: boolean;
  timezone?: string;
  workAuthorization?: string;
};

export type CertificationItem = {
  id: string;
  name: string;
  issuer: string;
  year?: string;
  link?: string;
};

export type ActivityType = "open-source" | "volunteering" | "community";

export type ActivityItem = {
  id: string;
  type: ActivityType;
  name: string;
  role?: string;
  description?: string;
  link?: string;
};

export type SkillsBlock = {
  tags: string[];
  note: string;
};

export type ResumeSectionKey =
  | "summary"
  | "contacts"
  | "experience"
  | "projects"
  | "techSkills"
  | "softSkills"
  | "education"
  | "languages"
  | "employmentPreferences"
  | "certifications"
  | "activities";

export type SectionsVisibility = Record<ResumeSectionKey, boolean>;

export type ResumeData = {
  fullName: string;
  position: string;
  contacts: Contacts;
  summary: string;

  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  languages: LanguageItem[];

  techSkills: SkillsBlock;
  softSkills: SkillsBlock;

  photo?: string;
  templateKey: TemplateKey;

  employmentPreferences: EmploymentPreferences;
  certifications: CertificationItem[];
  activities: ActivityItem[];

  accentColor: string;
  includePhoto: boolean;

  sectionsVisibility?: SectionsVisibility;
};

export type Resume = ResumeData;
export type ResumeContacts = Contacts;
