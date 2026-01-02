import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";

export type DashboardMetric = {
  key: string;
  label: string;
  value: string;
  status: "good" | "warn" | "bad";
};

export type DashboardHint = {
  key: string;
  title: string;
  description: string;
  section:
    | "basic"
    | "summary"
    | "experience"
    | "skills"
    | "education"
    | "languages"
    | "preferences"
    | "certifications"
    | "activities";
};

const clean = (s?: string) => (s ?? "").trim();
const has = (s?: string) => clean(s).length > 0;

const messages = {
  ru: {
    hints: {
      fullName: {
        title: "Добавь имя — так резюме выглядит завершённым",
        description: "Укажи ФИО, чтобы шапка резюме не выглядела пустой.",
      },
      position: {
        title: "Уточни желаемую позицию",
        description: "Например: Frontend Developer (React/Next.js).",
      },
      email: {
        title: "Добавь email для связи",
        description: "Это один из ключевых контактов для рекрутера.",
      },
      summary: {
        title: "Сделай краткое резюме сильнее",
        description:
          "2–4 предложения: опыт, стек, ценность. Идеально от 120 символов.",
      },
      expAny: {
        title: "Добавь хотя бы 1 опыт",
        description: "Без опыта резюме сильно теряет вес.",
      },
      expDesc: {
        title: "Усиль описание опыта",
        description: "Добавь 2–4 строки задач/результатов (от 60 символов).",
      },
      tech: {
        title: "Добавь 5+ технологий в стек",
        description: "Так резюме легче матчится по ключевым словам.",
      },
      soft: {
        title: "Добавь 5+ soft skills",
        description: "Покажи, как ты работаешь в команде и решаешь задачи.",
      },
      prefsAny: {
        title: "Заполни предпочтения по работе",
        description:
          "Укажи тип занятости и формат (remote/hybrid/onsite) — это помогает рекрутерам.",
      },
      prefsDetails: {
        title: "Добавь тип занятости и формат работы",
        description:
          "Хотя бы один вариант: full-time/contract и remote/hybrid/onsite.",
      },
      certs: {
        title: "Добавь сертификаты (если есть)",
        description: "Сертификации повышают доверие и улучшают релевантность.",
      },
      activities: {
        title: "Добавь open-source или волонтёрство",
        description:
          "Даже 1 запись про вклад/комьюнити заметно усиливает профиль.",
      },
    },

    metrics: {
      score: "Готовность",
      experience: "Опыт",
      skills: "Стек",
      contacts: "Контакты",
      preferences: "Предпочтения",
      certifications: "Сертификаты",
      activities: "Активности",
    },

    values: {
      none: "нет",
      yes: "есть",
      expPosShort: "поз.",
      pcsShort: "шт.",
    },
  },

  en: {
    hints: {
      fullName: {
        title: "Add your name — it makes the resume feel complete",
        description: "Fill in your full name so the header doesn’t look empty.",
      },
      position: {
        title: "Specify your target position",
        description: "For example: Frontend Developer (React/Next.js).",
      },
      email: {
        title: "Add an email address",
        description: "This is one of the key contacts for recruiters.",
      },
      summary: {
        title: "Make your summary stronger",
        description:
          "2–4 sentences: experience, stack, impact. Ideally 120+ characters.",
      },
      expAny: {
        title: "Add at least 1 experience entry",
        description:
          "With no experience listed, your resume loses a lot of weight.",
      },
      expDesc: {
        title: "Improve experience descriptions",
        description: "Add 2–4 lines of tasks/results (60+ characters).",
      },
      tech: {
        title: "Add 5+ technologies to your stack",
        description: "It helps matching by keywords.",
      },
      soft: {
        title: "Add 5+ soft skills",
        description: "Show how you work in a team and solve problems.",
      },
      prefsAny: {
        title: "Fill in work preferences",
        description:
          "Add employment type and work format (remote/hybrid/onsite) — recruiters care.",
      },
      prefsDetails: {
        title: "Add employment type and work format",
        description:
          "At least one: full-time/contract and remote/hybrid/onsite.",
      },
      certs: {
        title: "Add certifications (if you have any)",
        description: "Certifications increase trust and relevance.",
      },
      activities: {
        title: "Add open-source or volunteering",
        description: "Even one entry can noticeably strengthen your profile.",
      },
    },

    metrics: {
      score: "Readiness",
      experience: "Experience",
      skills: "Stack",
      contacts: "Contacts",
      preferences: "Preferences",
      certifications: "Certifications",
      activities: "Activities",
    },

    values: {
      none: "none",
      yes: "yes",
      expPosShort: "pos.",
      pcsShort: "pcs.",
    },
  },
} as const;

export function computeResumeScore(resume: Resume, locale: Locale = "ru") {
  const dict = messages[locale === "en" ? "en" : "ru"];

  const prefs = resume.employmentPreferences;
  const certs = resume.certifications ?? [];
  const acts = resume.activities ?? [];

  const contactsCount = [
    resume.contacts.email,
    resume.contacts.phone,
    resume.contacts.location,
  ].filter(has).length;

  const prefEmploymentTypeOk = (prefs?.employmentType?.length ?? 0) > 0;
  const prefWorkFormatOk = (prefs?.workFormat?.length ?? 0) > 0;
  const prefAnyOk =
    prefEmploymentTypeOk ||
    prefWorkFormatOk ||
    has(prefs?.timezone) ||
    has(prefs?.workAuthorization) ||
    typeof prefs?.relocation === "boolean";

  const certAnyOk = certs.length > 0;
  const certStrongOk =
    certs.some((c) => has(c.name) && has(c.issuer)) ||
    certs.some((c) => has(c.name) && has(c.year));

  const actsAnyOk = acts.length > 0;
  const actsStrongOk = acts.some((a) => has(a.name) && has(a.description));

  const checks = [
    { key: "fullName", weight: 10, ok: has(resume.fullName) },
    { key: "position", weight: 10, ok: has(resume.position) },

    { key: "email", weight: 8, ok: has(resume.contacts.email) },
    { key: "phone", weight: 6, ok: has(resume.contacts.phone) },
    { key: "location", weight: 6, ok: has(resume.contacts.location) },
    { key: "photo", weight: 4, ok: !!resume.photo },

    { key: "summary", weight: 10, ok: clean(resume.summary).length >= 120 },

    { key: "experienceAny", weight: 12, ok: resume.experience.length > 0 },
    {
      key: "experienceDesc",
      weight: 6,
      ok: resume.experience.some((e) => clean(e.description).length >= 60),
    },

    { key: "techTags", weight: 8, ok: resume.techSkills.tags.length >= 5 },
    { key: "softTags", weight: 6, ok: resume.softSkills.tags.length >= 5 },
    {
      key: "techNote",
      weight: 2,
      ok: clean(resume.techSkills.note).length >= 40,
    },
    {
      key: "softNote",
      weight: 2,
      ok: clean(resume.softSkills.note).length >= 40,
    },

    { key: "education", weight: 4, ok: resume.education.length > 0 },
    { key: "languages", weight: 4, ok: resume.languages.length > 0 },

    { key: "preferencesAny", weight: 4, ok: prefAnyOk },
    { key: "preferencesType", weight: 3, ok: prefEmploymentTypeOk },
    { key: "preferencesFormat", weight: 3, ok: prefWorkFormatOk },

    { key: "certificationsAny", weight: 4, ok: certAnyOk },
    { key: "certificationsStrong", weight: 2, ok: certStrongOk },

    { key: "activitiesAny", weight: 4, ok: actsAnyOk },
    { key: "activitiesStrong", weight: 2, ok: actsStrongOk },
  ];

  const total = checks.reduce((s, c) => s + c.weight, 0);
  const gained = checks.reduce((s, c) => s + (c.ok ? c.weight : 0), 0);
  const percent = Math.round((gained / total) * 100);

  const missing = (k: string) => checks.find((c) => c.key === k)?.ok === false;

  const hints: DashboardHint[] = [
    missing("fullName") && {
      key: "h_fullName",
      title: dict.hints.fullName.title,
      description: dict.hints.fullName.description,
      section: "basic",
    },
    missing("position") && {
      key: "h_position",
      title: dict.hints.position.title,
      description: dict.hints.position.description,
      section: "basic",
    },
    missing("email") && {
      key: "h_email",
      title: dict.hints.email.title,
      description: dict.hints.email.description,
      section: "basic",
    },
    missing("summary") && {
      key: "h_summary",
      title: dict.hints.summary.title,
      description: dict.hints.summary.description,
      section: "summary",
    },
    missing("experienceAny") && {
      key: "h_exp",
      title: dict.hints.expAny.title,
      description: dict.hints.expAny.description,
      section: "experience",
    },
    missing("experienceDesc") && {
      key: "h_exp_desc",
      title: dict.hints.expDesc.title,
      description: dict.hints.expDesc.description,
      section: "experience",
    },
    missing("techTags") && {
      key: "h_tech",
      title: dict.hints.tech.title,
      description: dict.hints.tech.description,
      section: "skills",
    },
    missing("softTags") && {
      key: "h_soft",
      title: dict.hints.soft.title,
      description: dict.hints.soft.description,
      section: "skills",
    },
    missing("preferencesAny") && {
      key: "h_prefs_any",
      title: dict.hints.prefsAny.title,
      description: dict.hints.prefsAny.description,
      section: "preferences",
    },
    !missing("preferencesAny") &&
      (missing("preferencesType") || missing("preferencesFormat")) && {
        key: "h_prefs_details",
        title: dict.hints.prefsDetails.title,
        description: dict.hints.prefsDetails.description,
        section: "preferences",
      },
    missing("certificationsAny") && {
      key: "h_certs",
      title: dict.hints.certs.title,
      description: dict.hints.certs.description,
      section: "certifications",
    },
    missing("activitiesAny") && {
      key: "h_activities",
      title: dict.hints.activities.title,
      description: dict.hints.activities.description,
      section: "activities",
    },
  ].filter(Boolean) as DashboardHint[];

  const nextHint = hints[0] ?? null;

  const metrics: DashboardMetric[] = [
    {
      key: "score",
      label: dict.metrics.score,
      value: `${percent}%`,
      status: percent >= 80 ? "good" : percent >= 50 ? "warn" : "bad",
    },
    {
      key: "experience",
      label: dict.metrics.experience,
      value: resume.experience.length
        ? `${resume.experience.length} ${dict.values.expPosShort}`
        : dict.values.none,
      status: resume.experience.length ? "good" : "bad",
    },
    {
      key: "skills",
      label: dict.metrics.skills,
      value: `${resume.techSkills.tags.length} tech / ${resume.softSkills.tags.length} soft`,
      status:
        resume.techSkills.tags.length >= 5 && resume.softSkills.tags.length >= 5
          ? "good"
          : "warn",
    },
    {
      key: "contacts",
      label: dict.metrics.contacts,
      value: `${contactsCount}/3`,
      status:
        contactsCount >= 2 ? "good" : contactsCount === 1 ? "warn" : "bad",
    },
    {
      key: "preferences",
      label: dict.metrics.preferences,
      value: prefAnyOk ? dict.values.yes : dict.values.none,
      status: prefAnyOk ? "good" : "warn",
    },
    {
      key: "certifications",
      label: dict.metrics.certifications,
      value: certs.length
        ? `${certs.length} ${dict.values.pcsShort}`
        : dict.values.none,
      status: certs.length ? (certStrongOk ? "good" : "warn") : "warn",
    },
    {
      key: "activities",
      label: dict.metrics.activities,
      value: acts.length
        ? `${acts.length} ${dict.values.pcsShort}`
        : dict.values.none,
      status: acts.length ? (actsStrongOk ? "good" : "warn") : "warn",
    },
  ];

  return { percent, metrics, nextHint, gained, total };
}
