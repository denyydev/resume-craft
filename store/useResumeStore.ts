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
  SkillsBlock,
} from "@/types/resume";

type ResumeState = {
  resume: Resume;
  techSkills: SkillsBlock;
  softSkills: SkillsBlock;
  setPhoto: (photo?: string) => void;
  loadResume: (resume: Resume) => void;
  setFullName: (fullName: string) => void;
  setPosition: (position: string) => void;
  setContacts: (contacts: Partial<ResumeContacts>) => void;
  setSummary: (summary: string) => void;
  setSkills: (skills: string) => void;
  setSoftSkills: (softSkills: string) => void;
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
  reset: () => void;
  setTemplateKey: (templateKey: TemplateKey) => void;
};

const generateId = () => Math.random().toString(36).slice(2, 9);

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
  photo: undefined,
};

export const useResumeStore = create<ResumeState>((set) => ({
  resume: emptyResume,
  setPhoto: (photo) =>
    set((state) => ({
      resume: {
        ...state.resume,
        photo,
      },
    })),
  setTechSkillsTags: (tags: string[]) =>
    set((state) => ({
      resume: {
        ...state.resume,
        techSkills: { ...state.resume.techSkills, tags: [...new Set(tags)] },
      },
    })),

  setTechSkillsNote: (note: string) =>
    set((state) => ({
      resume: {
        ...state.resume,
        techSkills: { ...state.resume.techSkills, note },
      },
    })),

  setSoftSkillsTags: (tags: string[]) =>
    set((state) => ({
      resume: {
        ...state.resume,
        softSkills: { ...state.resume.softSkills, tags: [...new Set(tags)] },
      },
    })),

  setSoftSkillsNote: (note: string) =>
    set((state) => ({
      resume: {
        ...state.resume,
        softSkills: { ...state.resume.softSkills, note },
      },
    })),
  setFullName: (fullName) =>
    set((state) => ({ resume: { ...state.resume, fullName } })),

  setPosition: (position) =>
    set((state) => ({ resume: { ...state.resume, position } })),

  setContacts: (contacts) =>
    set((state) => ({
      resume: {
        ...state.resume,
        contacts: { ...state.resume.contacts, ...contacts },
      },
    })),
  setTemplateKey: (templateKey) =>
    set((state) => ({
      resume: {
        ...state.resume,
        templateKey,
      },
    })),
  loadResume: (resume) =>
    set(() => ({
      resume: {
        ...emptyResume,
        ...resume,
      },
    })),
  setSummary: (summary) =>
    set((state) => ({ resume: { ...state.resume, summary } })),

  setSkills: (skills) =>
    set((state) => ({ resume: { ...state.resume, skills } })),

  setSoftSkills: (softSkills) =>
    set((state) => ({ resume: { ...state.resume, softSkills } })),

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

  reset: () => ({
    resume: emptyResume,
  }),
}));
