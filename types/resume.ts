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
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
};

export type LanguageItem = {
  id: string;
  name: string;
  level: string;
};

export type ResumeContacts = {
  email: string;
  phone: string;
  location: string;
  telegram?: string;
  github?: string;
  linkedin?: string;
  website?: string;
};

export type Resume = {
  fullName: string;
  position: string;
  contacts: ResumeContacts;
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  skills: string;
  softSkills: string;
  education: EducationItem[];
  languages: LanguageItem[];
  templateKey: string;
};
