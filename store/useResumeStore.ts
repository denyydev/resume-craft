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
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

type ResumeState = {
  resume: Resume;
  hasHydrated: boolean;

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

function normalizeResume(resume: Partial<Resume>): Resume {
  const base = createEmptyResume();

  return {
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
  };
}

export const useResumeStore = create<ResumeState>()(
  persist(
    immer((set) => ({
      resume: createEmptyResume(),
      hasHydrated: false,

    setPhoto: (photo) =>
      set((state) => {
        state.resume.photo = photo;
      }),

    setLastName: (lastName) =>
      set((state) => {
        state.resume.lastName = lastName;
      }),

    setFirstName: (firstName) =>
      set((state) => {
        state.resume.firstName = firstName;
      }),

    setPatronymic: (patronymic) =>
      set((state) => {
        state.resume.patronymic = patronymic;
      }),

    setPosition: (position) =>
      set((state) => {
        state.resume.position = position;
      }),

    setContacts: (contacts) =>
      set((state) => {
        state.resume.contacts = { ...state.resume.contacts, ...contacts };
      }),

    setSummary: (summary) =>
      set((state) => {
        state.resume.summary = summary;
      }),

    setTemplateKey: (templateKey) =>
      set((state) => {
        state.resume.templateKey = templateKey;
      }),

    setAccentColor: (accentColor) =>
      set((state) => {
        state.resume.accentColor = accentColor;
      }),

    setIncludePhoto: (includePhoto) =>
      set((state) => {
        state.resume.includePhoto = includePhoto;
      }),

    setEmploymentPreferences: (patch) =>
      set((state) => {
        state.resume.employmentPreferences = {
          ...state.resume.employmentPreferences,
          ...patch,
        };
      }),

    setSectionVisible: (key, value) =>
      set((state) => {
        // нормализуем, чтобы не тащить undefined
        state.resume.sectionsVisibility = {
          ...DEFAULT_SECTIONS_VISIBILITY,
          ...(state.resume.sectionsVisibility ?? {}),
          [key]: value,
        };
      }),

    toggleSection: (key) =>
      set((state) => {
        const current =
          state.resume.sectionsVisibility?.[key] ??
          DEFAULT_SECTIONS_VISIBILITY[key];

        state.resume.sectionsVisibility = {
          ...DEFAULT_SECTIONS_VISIBILITY,
          ...(state.resume.sectionsVisibility ?? {}),
          [key]: !current,
        };
      }),

    showAllSections: () =>
      set((state) => {
        state.resume.sectionsVisibility = { ...DEFAULT_SECTIONS_VISIBILITY };
      }),

    loadResume: (resume) =>
      set((state) => {
        const base = createEmptyResume();

        state.resume = {
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
        };
      }),

    reset: () =>
      set((state) => {
        state.resume = createEmptyResume();
      }),

    addTechSkillTag: (tag) =>
      set((state) => {
        const value = tag.trim();
        if (!value) return;

        const prev = state.resume.techSkills.tags;
        if (prev.includes(value)) return;

        state.resume.techSkills.tags.push(value);
      }),

    removeTechSkillTag: (tag) =>
      set((state) => {
        state.resume.techSkills.tags = state.resume.techSkills.tags.filter(
          (t) => t !== tag
        );
      }),

    setTechSkillsTags: (tags) =>
      set((state) => {
        state.resume.techSkills.tags = uniq(tags);
      }),

    setTechSkillsNote: (note) =>
      set((state) => {
        state.resume.techSkills.note = note;
      }),

    addSoftSkillTag: (tag) =>
      set((state) => {
        const value = tag.trim();
        if (!value) return;

        const prev = state.resume.softSkills.tags;
        if (prev.includes(value)) return;

        state.resume.softSkills.tags.push(value);
      }),

    removeSoftSkillTag: (tag) =>
      set((state) => {
        state.resume.softSkills.tags = state.resume.softSkills.tags.filter(
          (t) => t !== tag
        );
      }),

    setSoftSkillsTags: (tags) =>
      set((state) => {
        state.resume.softSkills.tags = uniq(tags);
      }),

    setSoftSkillsNote: (note) =>
      set((state) => {
        state.resume.softSkills.note = note;
      }),

    addExperience: () =>
      set((state) => {
        state.resume.experience.push(emptyExperience());
      }),

    updateExperience: (id, patch) =>
      set((state) => {
        const item = state.resume.experience.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeExperience: (id) =>
      set((state) => {
        state.resume.experience = state.resume.experience.filter(
          (x) => x.id !== id
        );
        if (state.resume.experience.length === 0) {
          state.resume.experience = [emptyExperience()];
        }
      }),

    addProject: () =>
      set((state) => {
        state.resume.projects.push(emptyProject());
      }),

    updateProject: (id, patch) =>
      set((state) => {
        const item = state.resume.projects.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeProject: (id) =>
      set((state) => {
        state.resume.projects = state.resume.projects.filter(
          (x) => x.id !== id
        );
        if (state.resume.projects.length === 0) {
          state.resume.projects = [emptyProject()];
        }
      }),

    addEducation: () =>
      set((state) => {
        state.resume.education.push(emptyEducation());
      }),

    updateEducation: (id, patch) =>
      set((state) => {
        const item = state.resume.education.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeEducation: (id) =>
      set((state) => {
        state.resume.education = state.resume.education.filter(
          (x) => x.id !== id
        );
        if (state.resume.education.length === 0) {
          state.resume.education = [emptyEducation()];
        }
      }),

    addLanguage: () =>
      set((state) => {
        state.resume.languages.push(emptyLanguage());
      }),

    updateLanguage: (id, patch) =>
      set((state) => {
        const item = state.resume.languages.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeLanguage: (id) =>
      set((state) => {
        state.resume.languages = state.resume.languages.filter(
          (x) => x.id !== id
        );
        if (state.resume.languages.length === 0) {
          state.resume.languages = [emptyLanguage()];
        }
      }),

    addCertification: () =>
      set((state) => {
        state.resume.certifications ??= [];
        state.resume.certifications.push(emptyCertification());
      }),

    updateCertification: (id, patch) =>
      set((state) => {
        state.resume.certifications ??= [];
        const item = state.resume.certifications.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeCertification: (id) =>
      set((state) => {
        state.resume.certifications ??= [];
        state.resume.certifications = state.resume.certifications.filter(
          (x) => x.id !== id
        );
        if (state.resume.certifications.length === 0) {
          state.resume.certifications = [emptyCertification()];
        }
      }),

    addActivity: (type = "open-source") =>
      set((state) => {
        state.resume.activities ??= [];
        state.resume.activities.push(emptyActivity(type));
      }),

    updateActivity: (id, patch) =>
      set((state) => {
        state.resume.activities ??= [];
        const item = state.resume.activities.find((x) => x.id === id);
        if (!item) return;
        Object.assign(item, patch);
      }),

    removeActivity: (id) =>
      set((state) => {
        state.resume.activities ??= [];
        state.resume.activities = state.resume.activities.filter(
          (x) => x.id !== id
        );
        if (state.resume.activities.length === 0) {
          state.resume.activities = [emptyActivity("open-source")];
        }
      }),
    })),
    {
      name: "resume-draft",
      version: 1,
      partialize: (state) => {
        const { photo, ...resumeWithoutPhoto } = state.resume;
        return {
          resume: resumeWithoutPhoto,
        };
      },
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          const normalized = normalizeResume(
            persistedState?.resume ?? createEmptyResume()
          );
          return {
            resume: normalized,
            hasHydrated: false,
          };
        }
        return persistedState;
      },
      merge: (persistedState: any, currentState: ResumeState) => {
        if (persistedState?.resume) {
          const normalized = normalizeResume(persistedState.resume);
          return {
            ...currentState,
            resume: normalized,
          };
        }
        return currentState;
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);
