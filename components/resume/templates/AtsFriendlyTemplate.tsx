"use client";

import {
  normalizeGenericUrl,
  normalizeGithubLink,
  normalizeLinkedinLink,
  normalizeTelegramLink,
} from "@/lib/normalizeLinks";
import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume, ResumeSectionKey } from "@/types/resume";
import { Inter } from "next/font/google";

type ResumeTemplateProps = {
  data: Resume;
  locale: Locale;
};

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const messages = {
  ru: {
    present: "по настоящее время",
    summary: "О себе",
    techSkills: "Технические навыки",
    softSkills: "Soft skills",
    experience: "Опыт работы",
    projects: "Проекты",
    education: "Образование",
    languages: "Языки",
    certifications: "Сертификаты",
    activities: "Активности",
    employmentPreferences: "Предпочтения по работе",
    contacts: {
      location: "Город",
      email: "Email",
      phone: "Телефон",
      website: "Сайт",
      linkedin: "LinkedIn",
      github: "GitHub",
      telegram: "Telegram",
      link: "Ссылка",
    },
    placeholders: {
      name: "ВАШЕ ИМЯ",
      position: "ЖЕЛАЕМАЯ ДОЛЖНОСТЬ",
      role: "Роль",
      stack: "Стек",
      company: "Компания",
      project: "Проект",
      activity: "Активность",
      certification: "Сертификат",
      education: "Образование",
    },
    prefs: {
      employmentType: "Тип занятости",
      workFormat: "Формат",
      relocation: "Релокация",
      timezone: "Часовой пояс",
      workAuthorization: "Разрешение на работу",
      yes: "Да",
      no: "Нет",
    },
  },
  en: {
    present: "Present",
    summary: "Summary",
    techSkills: "Technical Skills",
    softSkills: "Soft Skills",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    languages: "Languages",
    certifications: "Certifications",
    activities: "Activities",
    employmentPreferences: "Employment Preferences",
    contacts: {
      location: "Location",
      email: "Email",
      phone: "Phone",
      website: "Website",
      linkedin: "LinkedIn",
      github: "GitHub",
      telegram: "Telegram",
      link: "Link",
    },
    placeholders: {
      name: "YOUR NAME",
      position: "TARGET POSITION",
      role: "Role",
      stack: "Stack",
      company: "Company",
      project: "Project",
      activity: "Activity",
      certification: "Certification",
      education: "Education",
    },
    prefs: {
      employmentType: "Employment type",
      workFormat: "Work format",
      relocation: "Relocation",
      timezone: "Timezone",
      workAuthorization: "Work authorization",
      yes: "Yes",
      no: "No",
    },
  },
} as const;

function hasText(value?: string | null) {
  return Boolean((value ?? "").trim());
}

function hasAnyText(values: Array<string | undefined | null>) {
  return values.some((v) => hasText(v ?? ""));
}

function formatPeriod(
  start: string | undefined,
  end: string | undefined,
  isCurrent: boolean | undefined,
  presentLabel: string
) {
  const s = (start ?? "").trim();
  const e = (end ?? "").trim();
  if (!s && !e) return "";
  if (isCurrent) return `${s || ""} — ${presentLabel}`.trim();
  if (s && e) return `${s} — ${e}`;
  return s || e || "";
}

function sectionTitle(text: string) {
  return (
    <h2 className="text-[12px] font-bold tracking-wide uppercase text-black mt-4 mb-2">
      {text}
    </h2>
  );
}

function joinNonEmpty(values: Array<string | undefined>) {
  return values
    .map((v) => (v ?? "").trim())
    .filter(Boolean)
    .join(" · ");
}

function asCommaList(values?: string[]) {
  if (!values || values.length === 0) return "";
  return values
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
}

function labeled(label: string, value?: string) {
  const v = (value ?? "").trim();
  return v ? `${label}: ${v}` : "";
}

function splitBullets(text?: string) {
  const raw = (text ?? "").trim();
  if (!raw) return [];
  return raw
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => x.replace(/^[-•]\s*/, "").trim());
}

export function AtsFriendlyTemplate({ data, locale }: ResumeTemplateProps) {
  const t = messages[locale];

  const {
    lastName,
    firstName,
    patronymic,
    position,
    contacts,
    summary,
    experience,
    projects,
    techSkills,
    softSkills,
    education,
    languages,
    employmentPreferences,
    certifications,
    activities,
    sectionsVisibility,
  } = data;

  const visible = (key: ResumeSectionKey) =>
    sectionsVisibility?.[key] !== false;

  const fullName = [lastName, firstName, patronymic].filter(Boolean).join(" ");

  const githubLink = normalizeGithubLink(contacts.github) ?? undefined;
  const telegramLink = normalizeTelegramLink(contacts.telegram) ?? undefined;
  const linkedinLink = normalizeLinkedinLink(contacts.linkedin) ?? undefined;
  const websiteLink = normalizeGenericUrl(contacts.website) ?? undefined;

  const contactsLine1 = joinNonEmpty([
    labeled(t.contacts.location, contacts.location),
    labeled(t.contacts.email, contacts.email),
    labeled(t.contacts.phone, contacts.phone),
  ]);

  const contactsLine2 = joinNonEmpty([
    websiteLink ? labeled(t.contacts.website, websiteLink) : "",
    linkedinLink ? labeled(t.contacts.linkedin, linkedinLink) : "",
    githubLink ? labeled(t.contacts.github, githubLink) : "",
    telegramLink ? labeled(t.contacts.telegram, telegramLink) : "",
  ]);

  const tech = [asCommaList(techSkills?.tags), (techSkills?.note ?? "").trim()]
    .filter(Boolean)
    .join(techSkills?.tags?.length ? " — " : "");

  const soft = [asCommaList(softSkills?.tags), (softSkills?.note ?? "").trim()]
    .filter(Boolean)
    .join(softSkills?.tags?.length ? " — " : "");

  const prefsLines = [
    employmentPreferences?.employmentType?.length
      ? `${t.prefs.employmentType}: ${employmentPreferences.employmentType.join(
          ", "
        )}`
      : "",
    employmentPreferences?.workFormat?.length
      ? `${t.prefs.workFormat}: ${employmentPreferences.workFormat.join(", ")}`
      : "",
    typeof employmentPreferences?.relocation === "boolean"
      ? `${t.prefs.relocation}: ${
          employmentPreferences.relocation ? t.prefs.yes : t.prefs.no
        }`
      : "",
    employmentPreferences?.timezone?.trim()
      ? `${t.prefs.timezone}: ${employmentPreferences.timezone.trim()}`
      : "",
    employmentPreferences?.workAuthorization?.trim()
      ? `${
          t.prefs.workAuthorization
        }: ${employmentPreferences.workAuthorization.trim()}`
      : "",
  ].filter(Boolean);

  const experienceFilled = (experience ?? []).filter((x) =>
    hasAnyText([
      x.company,
      x.position,
      x.location,
      x.startDate,
      x.endDate,
      x.description,
      x.isCurrent ? "1" : "",
    ])
  );

  const projectsFilled = (projects ?? []).filter((p) =>
    hasAnyText([p.name, p.role, p.stack, p.link, p.description])
  );

  const educationFilled = (education ?? []).filter((e) =>
    hasAnyText([e.institution, e.degree, e.field, e.startDate, e.endDate])
  );

  const languagesFilled = (languages ?? []).filter((l) =>
    hasAnyText([l.name, l.level])
  );

  const certificationsFilled = (certifications ?? []).filter((c) =>
    hasAnyText([c.name, c.issuer, c.year, c.link])
  );

  const activitiesFilled = (activities ?? []).filter((a) =>
    hasAnyText([a.name, a.role, a.description, a.link])
  );

  return (
    <div
      className={`${inter.className} w-[794px] min-h-[1123px] bg-white text-black px-10 py-10`}
    >
      <header>
        <div className="min-w-0">
          <h1 className="text-[22px] font-bold leading-tight break-words">
            {fullName || t.placeholders.name}
          </h1>
          <p className="text-[12px] font-semibold mt-1 break-words">
            {position || t.placeholders.position}
          </p>

          {contactsLine1 ? (
            <p className="text-[10px] mt-2 break-words">{contactsLine1}</p>
          ) : null}
          {contactsLine2 ? (
            <p className="text-[10px] mt-1 break-words">{contactsLine2}</p>
          ) : null}
        </div>
      </header>

      <main className="mt-4 text-[11px] leading-[1.45]">
        {visible("summary") && hasText(summary) ? (
          <section>
            {sectionTitle(t.summary)}
            <p className="whitespace-pre-line break-words">{summary}</p>
          </section>
        ) : null}

        {visible("techSkills") && hasText(tech) ? (
          <section>
            {sectionTitle(t.techSkills)}
            <p className="whitespace-pre-line break-words">{tech}</p>
          </section>
        ) : null}

        {visible("softSkills") && hasText(soft) ? (
          <section>
            {sectionTitle(t.softSkills)}
            <p className="whitespace-pre-line break-words">{soft}</p>
          </section>
        ) : null}

        {visible("experience") && experienceFilled.length > 0 ? (
          <section>
            {sectionTitle(t.experience)}
            <div className="space-y-3">
              {experienceFilled.map((x) => {
                const pos = x.position?.trim() || t.placeholders.position;
                const company = x.company?.trim() || t.placeholders.company;
                const loc = x.location?.trim() || "";
                const dates = formatPeriod(
                  x.startDate,
                  x.endDate,
                  x.isCurrent,
                  t.present
                );
                const bullets = splitBullets(x.description);

                return (
                  <div key={x.id} className="break-inside-avoid">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold break-words">{pos}</p>
                        <p className="text-[10px] break-words">
                          {joinNonEmpty([company, loc])}
                        </p>
                      </div>
                      {dates ? (
                        <p className="text-[10px] shrink-0 text-right break-words">
                          {dates}
                        </p>
                      ) : null}
                    </div>

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(x.description) ? (
                      <p className="mt-1 whitespace-pre-line break-words">
                        {x.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {visible("projects") && projectsFilled.length > 0 ? (
          <section>
            {sectionTitle(t.projects)}
            <div className="space-y-3">
              {projectsFilled.map((p) => {
                const name = p.name?.trim() || t.placeholders.project;
                const role = p.role?.trim() || "";
                const stack = p.stack?.trim() || "";
                const link = normalizeGenericUrl(p.link) || "";
                const bullets = splitBullets(p.description);

                const metaLine = joinNonEmpty([
                  role ? `${t.placeholders.role}: ${role}` : "",
                  stack ? `${t.placeholders.stack}: ${stack}` : "",
                  link ? `${t.contacts.link}: ${link}` : "",
                ]);

                return (
                  <div key={p.id}>
                    <div className="break-inside-avoid">
                      <p className="font-bold break-words">{name}</p>
                      {metaLine ? (
                        <p className="text-[10px] mt-0.5 break-words">
                          {metaLine}
                        </p>
                      ) : null}
                    </div>

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(p.description) ? (
                      <p className="mt-1 whitespace-pre-line break-words">
                        {p.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {visible("education") && educationFilled.length > 0 ? (
          <section>
            {sectionTitle(t.education)}
            <div className="space-y-2">
              {educationFilled.map((e) => {
                const degree = e.degree?.trim() || "";
                const field = e.field?.trim() || "";
                const title =
                  joinNonEmpty([degree, field]) || t.placeholders.education;

                const inst = e.institution?.trim() || "";
                const dates = formatPeriod(
                  e.startDate,
                  e.endDate,
                  false,
                  t.present
                );
                const meta = joinNonEmpty([inst, dates]);

                return (
                  <div key={e.id} className="break-inside-avoid">
                    <p className="font-bold break-words">{title}</p>
                    {meta ? (
                      <p className="text-[10px] break-words">{meta}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {visible("languages") && languagesFilled.length > 0 ? (
          <section>
            {sectionTitle(t.languages)}
            <p className="break-words">
              {languagesFilled
                .map((l) =>
                  joinNonEmpty([
                    l.name?.trim() ? l.name.trim() : "",
                    l.level?.trim() ? l.level.trim() : "",
                  ])
                )
                .filter(Boolean)
                .join(", ")}
            </p>
          </section>
        ) : null}

        {visible("certifications") && certificationsFilled.length > 0 ? (
          <section>
            {sectionTitle(t.certifications)}
            <div className="space-y-1">
              {certificationsFilled.map((c) => {
                const name = c.name?.trim() || t.placeholders.certification;
                const issuer = c.issuer?.trim() || "";
                const year = c.year?.trim() ? ` (${c.year.trim()})` : "";
                const certLink = normalizeGenericUrl(c.link) || "";
                const head = joinNonEmpty([name, issuer]);

                return (
                  <p key={c.id} className="break-words">
                    <span className="font-bold">{head}</span>
                    {year}
                    {certLink ? ` — ${certLink}` : ""}
                  </p>
                );
              })}
            </div>
          </section>
        ) : null}

        {visible("activities") && activitiesFilled.length > 0 ? (
          <section>
            {sectionTitle(t.activities)}
            <div className="space-y-2">
              {activitiesFilled.map((a) => {
                const name = a.name?.trim() || t.placeholders.activity;
                const role = a.role?.trim() || "";
                const link = normalizeGenericUrl(a.link) || "";
                const bullets = splitBullets(a.description);

                return (
                  <div key={a.id} className="break-inside-avoid">
                    <p className="font-bold break-words">
                      {joinNonEmpty([name, role])}
                    </p>
                    {link ? (
                      <p className="text-[10px] break-words">{link}</p>
                    ) : null}

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(a.description) ? (
                      <p className="mt-1 whitespace-pre-line break-words">
                        {a.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {visible("employmentPreferences") && prefsLines.length > 0 ? (
          <section>
            {sectionTitle(t.employmentPreferences)}
            <div className="space-y-0.5">
              {prefsLines.map((line, idx) => (
                <p key={idx} className="break-words">
                  {line}
                </p>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
