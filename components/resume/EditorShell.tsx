"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import type { ResumeSectionKey } from "@/types/resume";
import React from "react";

import { ActivitiesSection } from "./sections/ActivitiesSection";
import { BasicContactsSection } from "./sections/BasicContactsSection";
import { BasicIdentitySection } from "./sections/BasicIdentitySection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { EducationSection } from "./sections/EducationSection";
import { EmploymentPreferencesSection } from "./sections/EmploymentPreferencesSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { LanguagesSection } from "./sections/LanguagesSection";
import { ProjectsSection } from "./sections/ProjectsSection";

import { SoftSkillsSection } from "./sections/SoftSkillsSection";
import { TechSkillsSection } from "./sections/TechSkillsSection";

const messages = {
  ru: {
    sectionTitle: "Контакты",
    sectionSubtitle: "Основные способы связи",
    photo: "Фото",
    photoSubtitle: "Опционально",
    removePhoto: "Удалить",
    dragDrop: "Перетащите фото сюда или нажмите для загрузки",
    errorSize: "Файл должен быть меньше 5MB",
    errorType: "Пожалуйста, загрузите изображение",
    lastName: "Фамилия",
    firstName: "Имя",
    patronymic: "Отчество",
    lastNamePlaceholder: "Иванов",
    firstNamePlaceholder: "Иван",
    patronymicPlaceholder: "Иванович",
    position: "Желаемая позиция",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Телефон",
    phonePlaceholder: "+7 ...",
    city: "Город",
    cityPlaceholder: "Москва / Санкт-Петербург / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
    summary: "Краткое резюме",
    summaryPlaceholder:
      "2–4 предложения о твоём опыте, стеке и сильных сторонах.",
    reset: "Сбросить все поля",
    next: "Дальше к опыту",
  },
  en: {
    sectionTitle: "Contacts",
    sectionSubtitle: "Primary contact details",
    photo: "Photo",
    photoSubtitle: "Optional",
    removePhoto: "Remove",
    dragDrop: "Drop photo here or click to upload",
    errorSize: "File must be less than 5MB",
    errorType: "Please upload an image",
    lastName: "Last name",
    firstName: "First name",
    patronymic: "Middle name",
    lastNamePlaceholder: "Doe",
    firstNamePlaceholder: "John",
    patronymicPlaceholder: "",
    position: "Desired position",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone",
    phonePlaceholder: "+1 ...",
    city: "City",
    cityPlaceholder: "Berlin / Amsterdam / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
    summary: "Summary",
    summaryPlaceholder:
      "2–4 sentences about your experience, stack and strengths.",
    reset: "Reset all fields",
    next: "Next: Experience",
  },
} as const;

type Locale = keyof typeof messages;

type EditorShellProps = {
  selected: ResumeSectionKey;
};

const sections: Partial<
  Record<ResumeSectionKey, React.ComponentType<{ t: typeof messages.ru | typeof messages.en }>>
> = {
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
  const locale = useCurrentLocale() as Locale;
  const t = messages[locale];
  const Section = sections[selected];

  return (
    <div className="min-h-0">
      {Section ? (
        <Section t={t} />
      ) : (
        <div className="text-sm text-gray-500">Раздел пока не реализован</div>
      )}
    </div>
  );
}
