"use client";

import {
  ActivityItem,
  CertificationItem,
  EducationItem,
  EmploymentPreferences,
  ExperienceItem,
  LanguageItem,
  ProjectItem,
  Resume,
  ResumeContacts,
  ResumeSectionKey,
  SectionsVisibility,
  TemplateKey,
} from "@/types/resume";
import { nanoid } from "nanoid";
import { create } from "zustand";

type ResumeState = {
  resume: Resume;

  setPhoto: (photo?: string) => void;
  loadResume: (resume: Resume) => void;
  reset: () => void;

  setFullName: (fullName: string) => void;
  setPosition: (position: string) => void;
  setContacts: (contacts: Partial<ResumeContacts>) => void;
  setSummary: (summary: string) => void;
  setTemplateKey: (templateKey: TemplateKey) => void;

  setAccentColor: (accentColor: string) => void;
  setIncludePhoto: (includePhoto: boolean) => void;

  setEmploymentPreferences: (patch: Partial<EmploymentPreferences>) => void;

  setSectionVisible: (key: ResumeSectionKey, value: boolean) => void;
  toggleSection: (key: ResumeSectionKey) => void;
  showAllSections: () => void;

  addCertification: () => void;
  updateCertification: (id: string, patch: Partial<CertificationItem>) => void;
  removeCertification: (id: string) => void;

  addActivity: (type?: ActivityItem["type"]) => void;
  updateActivity: (id: string, patch: Partial<ActivityItem>) => void;
  removeActivity: (id: string) => void;

  addTechSkillTag: (tag: string) => void;
  removeTechSkillTag: (tag: string) => void;
  setTechSkillsTags: (tags: string[]) => void;
  setTechSkillsNote: (note: string) => void;

  addSoftSkillTag: (tag: string) => void;
  removeSoftSkillTag: (tag: string) => void;
  setSoftSkillsTags: (tags: string[]) => void;
  setSoftSkillsNote: (note: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, patch: Partial<ExperienceItem>) => void;
  removeExperience: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, patch: Partial<ProjectItem>) => void;
  removeProject: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, patch: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, patch: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
};

const DEFAULT_ACCENT_COLOR = "#1677ff";
const DEFAULT_INCLUDE_PHOTO = true;

const DEFAULT_SECTIONS_VISIBILITY: SectionsVisibility = {
  photo: true,
  summary: true,
  experience: true,
  projects: true,
  techSkills: true,
  softSkills: true,
  education: true,
  languages: true,
  employmentPreferences: true,
  certifications: true,
  activities: true,
};

const createEmptyResume = (): Resume => ({
  fullName: "",
  position: "",
  contacts: {
    email: "",
    phone: "",
    location: "",
    telegram: "",
    github: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [],
  projects: [],
  techSkills: { tags: [], note: "" },
  softSkills: { tags: [], note: "" },
  education: [],
  languages: [],
  employmentPreferences: {
    employmentType: [],
    workFormat: [],
    relocation: undefined,
    timezone: "",
    workAuthorization: "",
  },
  certifications: [],
  activities: [],
  templateKey: "default",
  accentColor: DEFAULT_ACCENT_COLOR,
  includePhoto: DEFAULT_INCLUDE_PHOTO,
  photo: undefined,
  sectionsVisibility: DEFAULT_SECTIONS_VISIBILITY,
});

function uniq(list: string[]) {
  return [...new Set(list.map((x) => x.trim()).filter(Boolean))];
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: createEmptyResume(),

  setPhoto: (photo) =>
    set((state) => ({
      resume: { ...state.resume, photo },
    })),

  setFullName: (fullName) =>
    set((state) => ({
      resume: { ...state.resume, fullName },
    })),

  setPosition: (position) =>
    set((state) => ({
      resume: { ...state.resume, position },
    })),

  setContacts: (contacts) =>
    set((state) => ({
      resume: {
        ...state.resume,
        contacts: { ...state.resume.contacts, ...contacts },
      },
    })),

  setSummary: (summary) =>
    set((state) => ({
      resume: { ...state.resume, summary },
    })),

  setTemplateKey: (templateKey) =>
    set((state) => ({
      resume: { ...state.resume, templateKey },
    })),

  setAccentColor: (accentColor) =>
    set((state) => ({
      resume: { ...state.resume, accentColor },
    })),

  setIncludePhoto: (includePhoto) =>
    set((state) => ({
      resume: { ...state.resume, includePhoto },
    })),

  setEmploymentPreferences: (patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        employmentPreferences: {
          ...state.resume.employmentPreferences,
          ...patch,
        },
      },
    })),

  setSectionVisible: (key, value) =>
    set((state) => ({
      resume: {
        ...state.resume,
        sectionsVisibility: {
          ...DEFAULT_SECTIONS_VISIBILITY,
          ...state.resume.sectionsVisibility,
          [key]: value,
        },
      },
    })),

  toggleSection: (key) =>
    set((state) => {
      const current =
        state.resume.sectionsVisibility?.[key] ??
        DEFAULT_SECTIONS_VISIBILITY[key];
      return {
        resume: {
          ...state.resume,
          sectionsVisibility: {
            ...DEFAULT_SECTIONS_VISIBILITY,
            ...state.resume.sectionsVisibility,
            [key]: !current,
          },
        },
      };
    }),

  showAllSections: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        sectionsVisibility: { ...DEFAULT_SECTIONS_VISIBILITY },
      },
    })),

  loadResume: (resume) =>
    set(() => {
      const r = resume as any;
      return {
        resume: {
          ...createEmptyResume(),
          ...resume,
          accentColor: resume.accentColor ?? DEFAULT_ACCENT_COLOR,
          includePhoto: r.includePhoto ?? DEFAULT_INCLUDE_PHOTO,
          techSkills:
            resume.techSkills ??
            ({
              tags: [],
              note: typeof r.skills === "string" ? r.skills : "",
            } as Resume["techSkills"]),
          softSkills:
            resume.softSkills ??
            ({
              tags: [],
              note: typeof r.softSkills === "string" ? r.softSkills : "",
            } as Resume["softSkills"]),
          employmentPreferences:
            r.employmentPreferences ??
            createEmptyResume().employmentPreferences,
          certifications:
            r.certifications ?? createEmptyResume().certifications,
          activities: r.activities ?? createEmptyResume().activities,
          sectionsVisibility: {
            ...DEFAULT_SECTIONS_VISIBILITY,
            ...(r.sectionsVisibility ?? {}),
          },
        },
      };
    }),

  reset: () =>
    set(() => ({
      resume: createEmptyResume(),
    })),

  addTechSkillTag: (tag) =>
    set((state) => {
      const value = tag.trim();
      if (!value) return state;
      const prev = state.resume.techSkills.tags;
      if (prev.includes(value)) return state;
      return {
        resume: {
          ...state.resume,
          techSkills: {
            ...state.resume.techSkills,
            tags: [...prev, value],
          },
        },
      };
    }),

  removeTechSkillTag: (tag) =>
    set((state) => ({
      resume: {
        ...state.resume,
        techSkills: {
          ...state.resume.techSkills,
          tags: state.resume.techSkills.tags.filter((t) => t !== tag),
        },
      },
    })),

  setTechSkillsTags: (tags) =>
    set((state) => ({
      resume: {
        ...state.resume,
        techSkills: { ...state.resume.techSkills, tags: uniq(tags) },
      },
    })),

  setTechSkillsNote: (note) =>
    set((state) => ({
      resume: {
        ...state.resume,
        techSkills: { ...state.resume.techSkills, note },
      },
    })),

  addSoftSkillTag: (tag) =>
    set((state) => {
      const value = tag.trim();
      if (!value) return state;
      const prev = state.resume.softSkills.tags;
      if (prev.includes(value)) return state;
      return {
        resume: {
          ...state.resume,
          softSkills: {
            ...state.resume.softSkills,
            tags: [...prev, value],
          },
        },
      };
    }),

  removeSoftSkillTag: (tag) =>
    set((state) => ({
      resume: {
        ...state.resume,
        softSkills: {
          ...state.resume.softSkills,
          tags: state.resume.softSkills.tags.filter((t) => t !== tag),
        },
      },
    })),

  setSoftSkillsTags: (tags) =>
    set((state) => ({
      resume: {
        ...state.resume,
        softSkills: { ...state.resume.softSkills, tags: uniq(tags) },
      },
    })),

  setSoftSkillsNote: (note) =>
    set((state) => ({
      resume: {
        ...state.resume,
        softSkills: { ...state.resume.softSkills, note },
      },
    })),

  addExperience: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: [
          ...state.resume.experience,
          {
            id: nanoid(),
            company: "",
            position: "",
            location: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            description: "",
          },
        ],
      },
    })),

  updateExperience: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeExperience: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        experience: state.resume.experience.filter((item) => item.id !== id),
      },
    })),

  addProject: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [
          ...state.resume.projects,
          {
            id: nanoid(),
            name: "",
            role: "",
            stack: "",
            link: "",
            description: "",
          },
        ],
      },
    })),

  updateProject: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeProject: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: state.resume.projects.filter((item) => item.id !== id),
      },
    })),

  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [
          ...state.resume.education,
          {
            id: nanoid(),
            institution: "",
            degree: "",
            field: "",
            startDate: "",
            endDate: "",
          },
        ],
      },
    })),

  updateEducation: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeEducation: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: state.resume.education.filter((item) => item.id !== id),
      },
    })),

  addLanguage: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [
          ...state.resume.languages,
          {
            id: nanoid(),
            name: "",
            level: "",
          },
        ],
      },
    })),

  updateLanguage: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeLanguage: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: state.resume.languages.filter((item) => item.id !== id),
      },
    })),

  addCertification: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [
          ...(state.resume.certifications ?? []),
          {
            id: nanoid(),
            name: "",
            issuer: "",
            year: "",
            link: "",
          },
        ],
      },
    })),

  updateCertification: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: (state.resume.certifications ?? []).map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeCertification: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: (state.resume.certifications ?? []).filter(
          (item) => item.id !== id
        ),
      },
    })),

  addActivity: (type = "open-source") =>
    set((state) => ({
      resume: {
        ...state.resume,
        activities: [
          ...(state.resume.activities ?? []),
          {
            id: nanoid(),
            type,
            name: "",
            role: "",
            description: "",
            link: "",
          },
        ],
      },
    })),

  updateActivity: (id, patch) =>
    set((state) => ({
      resume: {
        ...state.resume,
        activities: (state.resume.activities ?? []).map((item) =>
          item.id === id ? { ...item, ...patch } : item
        ),
      },
    })),

  removeActivity: (id) =>
    set((state) => ({
      resume: {
        ...state.resume,
        activities: (state.resume.activities ?? []).filter(
          (item) => item.id !== id
        ),
      },
    })),
}));
