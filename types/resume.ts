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

export type ResumeData = {
  fullName: string;
  position: string;
  contacts: Contacts;
  summary: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  languages: LanguageItem[];
  skills: string;
  softSkills: string;
  photo?: string;
  templateKey: TemplateKey;
};

export type Resume = ResumeData;

export type ResumeContacts = Contacts;
