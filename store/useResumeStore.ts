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

  setLastName: (lastName: string) => void;
  setFirstName: (firstName: string) => void;
  setPatronymic: (patronymic: string) => void;

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
  contacts: true,
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

const emptyExperience = (): ExperienceItem => ({
  id: nanoid(),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
});

const emptyProject = (): ProjectItem => ({
  id: nanoid(),
  name: "",
  role: "",
  stack: "",
  link: "",
  description: "",
});

const emptyEducation = (): EducationItem => ({
  id: nanoid(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

const emptyLanguage = (): LanguageItem => ({
  id: nanoid(),
  name: "",
  level: "",
});

const emptyCertification = (): CertificationItem => ({
  id: nanoid(),
  name: "",
  issuer: "",
  year: "",
  link: "",
});

const emptyActivity = (
  type: ActivityItem["type"] = "open-source"
): ActivityItem => ({
  id: nanoid(),
  type,
  name: "",
  role: "",
  description: "",
  link: "",
});

function ensureAtLeastOne<T>(
  arr: T[] | undefined | null,
  createOne: () => T
): T[] {
  return Array.isArray(arr) && arr.length > 0 ? arr : [createOne()];
}

function uniq(list: string[]) {
  return [...new Set(list.map((x) => x.trim()).filter(Boolean))];
}

const createEmptyResume = (): Resume => ({
  lastName: "",
  firstName: "",
  patronymic: "",
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
  experience: [emptyExperience()],
  projects: [emptyProject()],
  techSkills: { tags: [], note: "" },
  softSkills: { tags: [], note: "" },
  education: [emptyEducation()],
  languages: [emptyLanguage()],
  employmentPreferences: {
    employmentType: [],
    workFormat: [],
    relocation: undefined,
    timezone: "",
    workAuthorization: "",
  },
  certifications: [emptyCertification()],
  activities: [emptyActivity()],
  templateKey: "default",
  accentColor: DEFAULT_ACCENT_COLOR,
  includePhoto: DEFAULT_INCLUDE_PHOTO,
  photo: undefined,
  sectionsVisibility: DEFAULT_SECTIONS_VISIBILITY,
});

export const useResumeStore = create<ResumeState>((set) => ({
  resume: createEmptyResume(),

  setPhoto: (photo) =>
    set((state) => ({
      resume: { ...state.resume, photo },
    })),

  setLastName: (lastName) =>
    set((state) => ({
      resume: { ...state.resume, lastName },
    })),

  setFirstName: (firstName) =>
    set((state) => ({
      resume: { ...state.resume, firstName },
    })),

  setPatronymic: (patronymic) =>
    set((state) => ({
      resume: { ...state.resume, patronymic },
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
      const base = createEmptyResume();
      return {
        resume: {
          ...base,
          ...resume,
          accentColor: resume.accentColor ?? DEFAULT_ACCENT_COLOR,
          includePhoto: resume.includePhoto ?? DEFAULT_INCLUDE_PHOTO,
          experience: ensureAtLeastOne(resume.experience, emptyExperience),
          projects: ensureAtLeastOne(resume.projects, emptyProject),
          education: ensureAtLeastOne(resume.education, emptyEducation),
          languages: ensureAtLeastOne(resume.languages, emptyLanguage),
          techSkills: resume.techSkills ?? base.techSkills,
          softSkills: resume.softSkills ?? base.softSkills,
          employmentPreferences:
            resume.employmentPreferences ?? base.employmentPreferences,
          certifications: ensureAtLeastOne(
            resume.certifications,
            emptyCertification
          ),
          activities: ensureAtLeastOne(resume.activities, () =>
            emptyActivity("open-source")
          ),
          sectionsVisibility: {
            ...DEFAULT_SECTIONS_VISIBILITY,
            ...(resume.sectionsVisibility ?? {}),
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
          techSkills: { ...state.resume.techSkills, tags: [...prev, value] },
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
          softSkills: { ...state.resume.softSkills, tags: [...prev, value] },
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
        experience: [...state.resume.experience, emptyExperience()],
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
    set((state) => {
      const next = state.resume.experience.filter((item) => item.id !== id);
      return {
        resume: {
          ...state.resume,
          experience: next.length > 0 ? next : [emptyExperience()],
        },
      };
    }),

  addProject: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        projects: [...state.resume.projects, emptyProject()],
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
    set((state) => {
      const next = state.resume.projects.filter((item) => item.id !== id);
      return {
        resume: {
          ...state.resume,
          projects: next.length > 0 ? next : [emptyProject()],
        },
      };
    }),

  addEducation: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        education: [...state.resume.education, emptyEducation()],
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
    set((state) => {
      const next = state.resume.education.filter((item) => item.id !== id);
      return {
        resume: {
          ...state.resume,
          education: next.length > 0 ? next : [emptyEducation()],
        },
      };
    }),

  addLanguage: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        languages: [...state.resume.languages, emptyLanguage()],
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
    set((state) => {
      const next = state.resume.languages.filter((item) => item.id !== id);
      return {
        resume: {
          ...state.resume,
          languages: next.length > 0 ? next : [emptyLanguage()],
        },
      };
    }),

  addCertification: () =>
    set((state) => ({
      resume: {
        ...state.resume,
        certifications: [
          ...(state.resume.certifications ?? []),
          emptyCertification(),
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
    set((state) => {
      const next = (state.resume.certifications ?? []).filter(
        (item) => item.id !== id
      );
      return {
        resume: {
          ...state.resume,
          certifications: next.length > 0 ? next : [emptyCertification()],
        },
      };
    }),

  addActivity: (type = "open-source") =>
    set((state) => ({
      resume: {
        ...state.resume,
        activities: [...(state.resume.activities ?? []), emptyActivity(type)],
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
    set((state) => {
      const next = (state.resume.activities ?? []).filter(
        (item) => item.id !== id
      );
      return {
        resume: {
          ...state.resume,
          activities: next.length > 0 ? next : [emptyActivity("open-source")],
        },
      };
    }),
}));
