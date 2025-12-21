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

export function computeResumeScore(resume: Resume) {
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
    certs.some((c) => has(c.name) && has((c as any).year));

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
      title: "Добавь имя — так резюме выглядит завершённым",
      description: "Укажи ФИО, чтобы шапка резюме не выглядела пустой.",
      section: "basic",
    },
    missing("position") && {
      key: "h_position",
      title: "Уточни желаемую позицию",
      description: "Например: Frontend Developer (React/Next.js).",
      section: "basic",
    },
    missing("email") && {
      key: "h_email",
      title: "Добавь email для связи",
      description: "Это один из ключевых контактов для рекрутера.",
      section: "basic",
    },
    missing("summary") && {
      key: "h_summary",
      title: "Сделай краткое резюме сильнее",
      description:
        "2–4 предложения: опыт, стек, ценность. Идеально от 120 символов.",
      section: "summary",
    },
    missing("experienceAny") && {
      key: "h_exp",
      title: "Добавь хотя бы 1 опыт",
      description: "Без опыта резюме сильно теряет вес.",
      section: "experience",
    },
    missing("experienceDesc") && {
      key: "h_exp_desc",
      title: "Усиль описание опыта",
      description: "Добавь 2–4 строки задач/результатов (от 60 символов).",
      section: "experience",
    },
    missing("techTags") && {
      key: "h_tech",
      title: "Добавь 5+ технологий в стек",
      description: "Так резюме легче матчится по ключевым словам.",
      section: "skills",
    },
    missing("softTags") && {
      key: "h_soft",
      title: "Добавь 5+ soft skills",
      description: "Покажи, как ты работаешь в команде и решаешь задачи.",
      section: "skills",
    },
    missing("preferencesAny") && {
      key: "h_prefs_any",
      title: "Заполни предпочтения по работе",
      description:
        "Укажи тип занятости и формат (remote/hybrid/onsite) — это помогает рекрутерам.",
      section: "preferences",
    },
    !missing("preferencesAny") &&
      (missing("preferencesType") || missing("preferencesFormat")) && {
        key: "h_prefs_details",
        title: "Добавь тип занятости и формат работы",
        description:
          "Хотя бы один вариант: full-time/contract и remote/hybrid/onsite.",
        section: "preferences",
      },
    missing("certificationsAny") && {
      key: "h_certs",
      title: "Добавь сертификаты (если есть)",
      description: "Сертификации повышают доверие и улучшают релевантность.",
      section: "certifications",
    },
    missing("activitiesAny") && {
      key: "h_activities",
      title: "Добавь open-source или волонтёрство",
      description:
        "Даже 1 запись про вклад/комьюнити заметно усиливает профиль.",
      section: "activities",
    },
  ].filter(Boolean) as DashboardHint[];

  const nextHint = hints[0] ?? null;

  const metrics: DashboardMetric[] = [
    {
      key: "score",
      label: "Готовность",
      value: `${percent}%`,
      status: percent >= 80 ? "good" : percent >= 50 ? "warn" : "bad",
    },
    {
      key: "experience",
      label: "Опыт",
      value: resume.experience.length
        ? `${resume.experience.length} поз.`
        : "нет",
      status: resume.experience.length ? "good" : "bad",
    },
    {
      key: "skills",
      label: "Стек",
      value: `${resume.techSkills.tags.length} tech / ${resume.softSkills.tags.length} soft`,
      status:
        resume.techSkills.tags.length >= 5 && resume.softSkills.tags.length >= 5
          ? "good"
          : "warn",
    },
    {
      key: "contacts",
      label: "Контакты",
      value: `${contactsCount}/3`,
      status:
        contactsCount >= 2 ? "good" : contactsCount === 1 ? "warn" : "bad",
    },
    {
      key: "preferences",
      label: "Предпочтения",
      value: prefAnyOk ? "есть" : "нет",
      status: prefAnyOk ? "good" : "warn",
    },
    {
      key: "certifications",
      label: "Сертификаты",
      value: certs.length ? `${certs.length} шт.` : "нет",
      status: certs.length ? (certStrongOk ? "good" : "warn") : "warn",
    },
    {
      key: "activities",
      label: "Активности",
      value: acts.length ? `${acts.length} шт.` : "нет",
      status: acts.length ? (actsStrongOk ? "good" : "warn") : "warn",
    },
  ];

  return { percent, metrics, nextHint, gained, total };
}
