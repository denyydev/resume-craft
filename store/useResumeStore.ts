"use client";

import { create } from "zustand";
import {
  Resume,
  ResumeContacts,
  ExperienceItem,
  ProjectItem,
  EducationItem,
  LanguageItem,
  TemplateKey,
} from "@/types/resume";

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

  // ✅ NEW
  setIncludePhoto: (includePhoto: boolean) => void;

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

const generateId = () => Math.random().toString(36).slice(2, 9);

const DEFAULT_ACCENT_COLOR = "#1677ff";
// ✅ NEW
const DEFAULT_INCLUDE_PHOTO = true;

const emptyResume: Resume = {
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
  templateKey: "default",
  accentColor: DEFAULT_ACCENT_COLOR,

  // ✅ NEW
  includePhoto: DEFAULT_INCLUDE_PHOTO,

  photo: undefined,
};

function uniq(list: string[]) {
  return [...new Set(list.map((x) => x.trim()).filter(Boolean))];
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: emptyResume,

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

  // ✅ NEW
  setIncludePhoto: (includePhoto) =>
    set((state) => ({
      resume: { ...state.resume, includePhoto },
    })),

  loadResume: (resume) =>
    set(() => {
      const r = resume as any;
      return {
        resume: {
          ...emptyResume,
          ...resume,

          accentColor: resume.accentColor ?? DEFAULT_ACCENT_COLOR,

          // ✅ NEW: миграция (если поля нет в сохранёнке)
          includePhoto: (resume as any).includePhoto ?? DEFAULT_INCLUDE_PHOTO,

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
        },
      };
    }),

  reset: () => ({
    resume: emptyResume,
  }),

  // ... остальной код без изменений
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
            id: generateId(),
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
            id: generateId(),
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
            id: generateId(),
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
            id: generateId(),
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
}));
