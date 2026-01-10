"use client";

import {
  normalizeGenericUrl,
  normalizeGithubLink,
  normalizeLinkedinLink,
  normalizeTelegramLink,
} from "@/lib/normalizeLinks";
import type { ResumeSectionKey } from "@/types/resume";
import React from "react";

type LocaleKey = "ru" | "en";

type ResumeTemplateProps = {
  // у тебя это уже есть
  data: import("@/types/resume").Resume;
  locale: import("@/lib/useCurrentLocale").Locale;
};

const messages = {
  ru: {
    present: "по настоящее время",
    summary: "О себе",
    experience: "Опыт работы",
    projects: "Проекты",
    activities: "Активности",
    skills: "Навыки",
    softSkills: "Soft skills",
    education: "Образование",
    languages: "Языки",
    certifications: "Сертификаты",
    preferences: "Предпочтения",
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
    experience: "Experience",
    projects: "Projects",
    activities: "Activities",
    skills: "Skills",
    softSkills: "Soft Skills",
    education: "Education",
    languages: "Languages",
    certifications: "Certifications",
    preferences: "Preferences",
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

function hasText(v?: string | null) {
  return Boolean((v ?? "").trim());
}
function hasAnyText(values: Array<string | undefined | null>) {
  return values.some((v) => hasText(v));
}
function joinNonEmpty(values: Array<string | undefined>) {
  return values
    .map((v) => (v ?? "").trim())
    .filter(Boolean)
    .join(" · ");
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
function formatPeriod(
  start?: string,
  end?: string,
  isCurrent?: boolean,
  presentLabel: string = "Present"
) {
  const s = (start ?? "").trim();
  const e = (end ?? "").trim();
  if (!s && !e) return "";
  if (isCurrent) return `${s || ""} — ${presentLabel}`.trim();
  if (s && e) return `${s} — ${e}`;
  return s || e || "";
}

function SectionTitle({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <h2
      className="text-[11px] font-semibold uppercase tracking-[0.18em]"
      style={{ color: accent }}
    >
      {children}
    </h2>
  );
}

export function TimelineTemplate({ data, locale }: ResumeTemplateProps) {
  const loc: LocaleKey = locale === "en" ? "en" : "ru";
  const t = messages[loc];

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
    accentColor,
    includePhoto,
    photo,
    sectionsVisibility,
  } = data;

  const accent = accentColor || "#1677ff";

  const visible = (key: ResumeSectionKey) =>
    sectionsVisibility?.[key] !== false;

  const fullName = [lastName, firstName, patronymic].filter(Boolean).join(" ");

  // normalize links (как ATS)
  const githubLink = normalizeGithubLink(contacts?.github) ?? "";
  const telegramLink = normalizeTelegramLink(contacts?.telegram) ?? "";
  const linkedinLink = normalizeLinkedinLink(contacts?.linkedin) ?? "";
  const websiteLink = normalizeGenericUrl(contacts?.website) ?? "";

  const headerRight = [
    contacts?.location?.trim() || "",
    contacts?.email?.trim() || "",
    contacts?.phone?.trim() || "",
  ].filter(Boolean);

  const linksLine = [
    githubLink,
    linkedinLink,
    websiteLink,
    telegramLink,
  ].filter(Boolean);

  const techTags = techSkills?.tags ?? [];
  const techNote = (techSkills?.note ?? "").trim();
  const softTags = softSkills?.tags ?? [];
  const softNote = (softSkills?.note ?? "").trim();

  const hasTech =
    visible("techSkills") && (techTags.length > 0 || hasText(techNote));
  const hasSoft =
    visible("softSkills") && (softTags.length > 0 || hasText(softNote));

  const experienceFilled = visible("experience")
    ? (experience ?? []).filter((x) =>
        hasAnyText([
          x.company,
          x.position,
          x.location,
          x.startDate,
          x.endDate,
          x.description,
          x.isCurrent ? "1" : "",
        ])
      )
    : [];

  const projectsFilled = visible("projects")
    ? (projects ?? []).filter((p) =>
        hasAnyText([p.name, p.role, p.stack, p.link, p.description])
      )
    : [];

  const activitiesFilled = visible("activities")
    ? (activities ?? []).filter((a) =>
        hasAnyText([a.name, a.role, a.description, a.link])
      )
    : [];

  const educationFilled = visible("education")
    ? (education ?? []).filter((e) =>
        hasAnyText([e.institution, e.degree, e.field, e.startDate, e.endDate])
      )
    : [];

  const languagesFilled = visible("languages")
    ? (languages ?? []).filter((l) => hasAnyText([l.name, l.level]))
    : [];

  const certificationsFilled = visible("certifications")
    ? (certifications ?? []).filter((c) =>
        hasAnyText([c.name, c.issuer, c.year, c.link])
      )
    : [];

  const prefsLines = visible("employmentPreferences")
    ? [
        employmentPreferences?.employmentType?.length
          ? `${
              t.prefs.employmentType
            }: ${employmentPreferences.employmentType.join(", ")}`
          : "",
        employmentPreferences?.workFormat?.length
          ? `${t.prefs.workFormat}: ${employmentPreferences.workFormat.join(
              ", "
            )}`
          : "",
        typeof employmentPreferences?.relocation === "boolean"
          ? `${t.prefs.relocation}: ${
              employmentPreferences.relocation ? t.prefs.yes : t.prefs.no
            }`
          : "",
        hasText(employmentPreferences?.timezone)
          ? `${t.prefs.timezone}: ${employmentPreferences.timezone.trim()}`
          : "",
        hasText(employmentPreferences?.workAuthorization)
          ? `${
              t.prefs.workAuthorization
            }: ${employmentPreferences.workAuthorization.trim()}`
          : "",
      ].filter(Boolean)
    : [];

  const showHeader =
    hasText(fullName) ||
    hasText(position) ||
    (visible("contacts") && (headerRight.length > 0 || linksLine.length > 0));

  return (
    <div
      className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-9 py-9 flex flex-col gap-5"
      style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
    >
      {showHeader ? (
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-3">
          <div className="flex justify-between gap-4">
            <div className="flex gap-4 min-w-0">
              {includePhoto !== false && visible("photo") && hasText(photo) ? (
                <img
                  src={photo}
                  alt=""
                  className="h-16 w-16 rounded-full object-cover shrink-0"
                />
              ) : null}

              <div className="min-w-0">
                {hasText(fullName) ? (
                  <h1 className="text-[24px] font-semibold tracking-tight leading-tight break-words">
                    {fullName}
                  </h1>
                ) : null}

                {hasText(position) ? (
                  <p
                    className="mt-1 text-xs text-slate-600 break-words"
                    style={{ color: accent }}
                  >
                    {position}
                  </p>
                ) : null}
              </div>
            </div>

            {visible("contacts") && headerRight.length > 0 ? (
              <div className="text-[10px] text-slate-500 text-right space-y-0.5 shrink-0">
                {headerRight.map((x) => (
                  <p key={x} className="break-words">
                    {x}
                  </p>
                ))}
              </div>
            ) : null}
          </div>

          {visible("contacts") && linksLine.length > 0 ? (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
              {linksLine.map((x) => (
                <span key={x} className="break-words" style={{ color: accent }}>
                  {x}
                </span>
              ))}
            </div>
          ) : null}
        </header>
      ) : null}

      <main className="flex-1 grid grid-cols-[1.2fr,0.9fr] gap-5 text-[11px] leading-snug">
        {/* LEFT */}
        <div className="space-y-4">
          {visible("summary") && hasText(summary) ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.summary}</SectionTitle>
              <p className="whitespace-pre-line break-words">{summary}</p>
            </section>
          ) : null}

          {experienceFilled.length > 0 ? (
            <section className="space-y-3">
              <SectionTitle accent={accent}>{t.experience}</SectionTitle>

              <div className="relative border-l border-slate-200 pl-4 space-y-4">
                {experienceFilled.map((item) => {
                  const dates = formatPeriod(
                    item.startDate,
                    item.endDate,
                    item.isCurrent,
                    t.present
                  );
                  const meta = joinNonEmpty([
                    hasText(dates) ? dates : "",
                    hasText(item.location) ? item.location!.trim() : "",
                  ]);

                  const bullets = splitBullets(item.description);

                  return (
                    <div
                      key={item.id}
                      className="relative space-y-0.5 break-inside-avoid"
                      style={{ pageBreakInside: "avoid" }}
                    >
                      <span
                        className="absolute -left-[9px] top-1 h-2 w-2 rounded-full"
                        style={{ backgroundColor: accent }}
                      />

                      {hasAnyText([item.position, item.company]) ? (
                        <p className="font-medium break-words">
                          {hasText(item.position) ? item.position : ""}
                          {hasText(item.company) ? (
                            <span className="text-slate-600">
                              {hasText(item.position) ? " · " : ""}
                              {item.company}
                            </span>
                          ) : null}
                        </p>
                      ) : null}

                      {hasText(meta) ? (
                        <p className="text-[10px] text-slate-500 break-words">
                          {meta}
                        </p>
                      ) : null}

                      {bullets.length > 0 ? (
                        <ul className="mt-1 list-disc pl-4 space-y-0.5">
                          {bullets.map((b, idx) => (
                            <li key={idx} className="break-words">
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : hasText(item.description) ? (
                        <p className="whitespace-pre-line break-words">
                          {item.description}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {projectsFilled.length > 0 ? (
            <section className="space-y-2">
              <SectionTitle accent={accent}>{t.projects}</SectionTitle>

              {projectsFilled.map((p) => {
                const link = normalizeGenericUrl(p.link) || "";
                const bullets = splitBullets(p.description);

                return (
                  <div
                    key={p.id}
                    className="space-y-0.5 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    {hasAnyText([p.name, p.role]) ? (
                      <p className="font-medium break-words">
                        {hasText(p.name) ? p.name : ""}
                        {hasText(p.role) ? (
                          <span className="text-slate-600">
                            {hasText(p.name) ? " · " : ""}
                            {p.role}
                          </span>
                        ) : null}
                      </p>
                    ) : null}

                    {hasText(p.stack) ? (
                      <p className="text-[10px] text-slate-500 break-words">
                        {p.stack}
                      </p>
                    ) : null}

                    {hasText(link) ? (
                      <p
                        className="text-[10px] break-words"
                        style={{ color: accent }}
                      >
                        {link}
                      </p>
                    ) : null}

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(p.description) ? (
                      <p className="whitespace-pre-line break-words">
                        {p.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}

          {activitiesFilled.length > 0 ? (
            <section className="space-y-2">
              <SectionTitle accent={accent}>{t.activities}</SectionTitle>

              {activitiesFilled.map((a) => {
                const link = normalizeGenericUrl(a.link) || "";
                const bullets = splitBullets(a.description);
                const head = joinNonEmpty([
                  hasText(a.name) ? a.name!.trim() : "",
                  hasText(a.role) ? a.role!.trim() : "",
                ]);

                return (
                  <div
                    key={a.id}
                    className="space-y-0.5 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    {hasText(head) ? (
                      <p className="font-medium break-words">{head}</p>
                    ) : null}

                    {hasText(link) ? (
                      <p
                        className="text-[10px] break-words"
                        style={{ color: accent }}
                      >
                        {link}
                      </p>
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
                      <p className="whitespace-pre-line break-words">
                        {a.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}
        </div>

        {/* RIGHT */}
        <aside className="space-y-3">
          {hasTech ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.skills}</SectionTitle>

              {techTags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {techTags.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: `${accent}33` }}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              ) : null}

              {hasText(techNote) ? (
                <p className="whitespace-pre-line break-words">{techNote}</p>
              ) : null}
            </section>
          ) : null}

          {hasSoft ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.softSkills}</SectionTitle>

              {softTags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {softTags.map((x) => (
                    <span
                      key={x}
                      className="rounded-full border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: `${accent}33` }}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              ) : null}

              {hasText(softNote) ? (
                <p className="whitespace-pre-line break-words">{softNote}</p>
              ) : null}
            </section>
          ) : null}

          {educationFilled.length > 0 ? (
            <section className="space-y-2">
              <SectionTitle accent={accent}>{t.education}</SectionTitle>

              {educationFilled.map((e) => {
                const title = joinNonEmpty([
                  hasText(e.degree) ? e.degree!.trim() : "",
                  hasText(e.field) ? e.field!.trim() : "",
                ]);

                const dates = formatPeriod(
                  e.startDate,
                  e.endDate,
                  false,
                  t.present
                );
                const meta = joinNonEmpty([
                  hasText(e.institution) ? e.institution!.trim() : "",
                  dates,
                ]);

                return (
                  <div
                    key={e.id}
                    className="space-y-0.5 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    {hasText(title) ? (
                      <p className="font-medium break-words">{title}</p>
                    ) : null}
                    {hasText(meta) ? (
                      <p className="text-[10px] text-slate-500 break-words">
                        {meta}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}

          {languagesFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.languages}</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {languagesFilled.map((l) => (
                  <span
                    key={l.id}
                    className="rounded-full border px-2 py-0.5 text-[10px]"
                    style={{ borderColor: `${accent}33` }}
                  >
                    {l.name}
                    {hasText(l.level) ? (
                      <span className="text-slate-500"> · {l.level}</span>
                    ) : null}
                  </span>
                ))}
              </div>
            </section>
          ) : null}

          {certificationsFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.certifications}</SectionTitle>

              {certificationsFilled.map((c) => {
                const link = normalizeGenericUrl(c.link) || "";
                const head = joinNonEmpty([
                  hasText(c.name) ? c.name!.trim() : "",
                  hasText(c.issuer) ? c.issuer!.trim() : "",
                ]);
                const year = hasText(c.year) ? ` · ${c.year!.trim()}` : "";

                return (
                  <div key={c.id} className="text-[10px] break-words">
                    <span className="font-medium">{head}</span>
                    <span className="text-slate-500">{year}</span>
                    {hasText(link) ? (
                      <div
                        className="mt-0.5 break-words"
                        style={{ color: accent }}
                      >
                        {link}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}

          {prefsLines.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.preferences}</SectionTitle>
              <div className="space-y-0.5">
                {prefsLines.map((line, idx) => (
                  <p
                    key={idx}
                    className="text-[10px] text-slate-700 break-words"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </section>
          ) : null}
        </aside>
      </main>
    </div>
  );
}
