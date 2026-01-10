"use client";

import {
  normalizeGenericUrl,
  normalizeGithubLink,
  normalizeLinkedinLink,
  normalizeTelegramLink,
} from "@/lib/normalizeLinks";
import type { ResumeSectionKey } from "@/types/resume";
import React from "react";
import { formatPeriod, type ResumeTemplateProps } from "./common";

const messages = {
  ru: {
    present: "по настоящее время",
    profile: "О себе",
    experience: "Опыт работы",
    projects: "Проекты",
    skills: "Навыки",
    softSkills: "Soft skills",
    education: "Образование",
    languages: "Языки",
    certifications: "Сертификаты",
    activities: "Активности",
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
    profile: "Profile",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    softSkills: "Soft Skills",
    education: "Education",
    languages: "Languages",
    certifications: "Certifications",
    activities: "Activities",
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
function asCommaList(values?: string[]) {
  return (values ?? [])
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
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

function SectionTitle({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
        {children}
      </h2>
    </div>
  );
}

function Pill({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <span
      className="rounded-full border px-2 py-0.5 text-[10px] leading-none text-slate-700"
      style={{ borderColor: `${accent}33` }}
    >
      {children}
    </span>
  );
}

export function NeoTemplate({ data, locale }: ResumeTemplateProps) {
  const t = messages[locale === "en" ? "en" : "ru"];

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
    certifications,
    activities,
    employmentPreferences,
    accentColor,
    photo,
    includePhoto,
    sectionsVisibility,
  } = data;

  const accent = accentColor || "#1677ff";

  const visible = (key: ResumeSectionKey) =>
    sectionsVisibility?.[key] !== false;

  const fullName = [lastName, firstName, patronymic].filter(Boolean).join(" ");

  // links normalize
  const githubLink = normalizeGithubLink(contacts?.github) ?? "";
  const telegramLink = normalizeTelegramLink(contacts?.telegram) ?? "";
  const linkedinLink = normalizeLinkedinLink(contacts?.linkedin) ?? "";
  const websiteLink = normalizeGenericUrl(contacts?.website) ?? "";

  const contactsLine1 = [
    contacts?.email?.trim() || "",
    contacts?.phone?.trim() || "",
    contacts?.location?.trim() || "",
  ].filter(Boolean);

  const contactsLine2 = [githubLink, linkedinLink, websiteLink, telegramLink]
    .filter(Boolean)
    .map((x) => x.trim());

  const techTags = techSkills?.tags ?? [];
  const techNote = techSkills?.note?.trim() ?? "";
  const softTags = softSkills?.tags ?? [];
  const softNote = softSkills?.note?.trim() ?? "";

  const hasTech =
    visible("techSkills") && (techTags.length > 0 || hasText(techNote));
  const hasSoft =
    visible("softSkills") && (softTags.length > 0 || hasText(softNote));

  const experienceFilled = (experience ?? []).filter((x) =>
    visible("experience")
      ? hasAnyText([
          x.company,
          x.position,
          x.location,
          x.startDate,
          x.endDate,
          x.description,
          x.isCurrent ? "1" : "",
        ])
      : false
  );

  const projectsFilled = (projects ?? []).filter((p) =>
    visible("projects")
      ? hasAnyText([p.name, p.role, p.stack, p.link, p.description])
      : false
  );

  const educationFilled = (education ?? []).filter((e) =>
    visible("education")
      ? hasAnyText([e.institution, e.degree, e.field, e.startDate, e.endDate])
      : false
  );

  const languagesFilled = (languages ?? []).filter((l) =>
    visible("languages") ? hasAnyText([l.name, l.level]) : false
  );

  const certificationsFilled = (certifications ?? []).filter((c) =>
    visible("certifications")
      ? hasAnyText([c.name, c.issuer, c.year, c.link])
      : false
  );

  const activitiesFilled = (activities ?? []).filter((a) =>
    visible("activities")
      ? hasAnyText([a.name, a.role, a.description, a.link])
      : false
  );

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
        employmentPreferences?.timezone?.trim()
          ? `${t.prefs.timezone}: ${employmentPreferences.timezone.trim()}`
          : "",
        employmentPreferences?.workAuthorization?.trim()
          ? `${
              t.prefs.workAuthorization
            }: ${employmentPreferences.workAuthorization.trim()}`
          : "",
      ].filter(Boolean)
    : [];

  const hasHeaderLeft = hasText(fullName) || hasText(position);
  const hasHeaderRight =
    (visible("contacts") &&
      (contactsLine1.length > 0 || contactsLine2.length > 0)) ||
    (visible("photo") && includePhoto !== false && Boolean(photo));

  const showHeader = hasHeaderLeft || hasHeaderRight;

  return (
    <div
      className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-10 py-9 flex flex-col gap-6"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {showHeader ? (
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="min-w-0">
            {hasText(fullName) ? (
              <h1 className="text-[26px] font-semibold tracking-tight leading-tight break-words">
                {fullName}
              </h1>
            ) : null}

            {hasText(position) ? (
              <p
                className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 break-words"
                style={{ color: `${accent}` }}
              >
                {position}
              </p>
            ) : null}
          </div>

          <div className="shrink-0 text-[11px] text-slate-500 text-right space-y-2">
            {/* photo only when реально есть */}
            {visible("photo") && photo && includePhoto !== false ? (
              <div className="flex justify-end">
                <img
                  src={photo}
                  alt={fullName || "Photo"}
                  className="w-14 h-14 rounded-xl object-cover border"
                  style={{ borderColor: `${accent}55` }}
                />
              </div>
            ) : null}

            {visible("contacts") &&
            (contactsLine1.length > 0 || contactsLine2.length > 0) ? (
              <div className="space-y-1">
                {contactsLine1.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {contactsLine1.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                ) : null}

                {contactsLine2.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {contactsLine2.map((x) => (
                      <span key={x} style={{ color: accent }}>
                        {x}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </header>
      ) : null}

      <main className="flex-1 grid grid-cols-[1.35fr,0.9fr] gap-6 text-[11px] leading-snug">
        {/* LEFT */}
        <div className="space-y-4">
          {visible("summary") && hasText(summary) ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.profile}</SectionTitle>
              <p className="text-slate-800 whitespace-pre-line break-words">
                {summary}
              </p>
            </section>
          ) : null}

          {experienceFilled.length > 0 ? (
            <section className="space-y-2.5">
              <SectionTitle accent={accent}>{t.experience}</SectionTitle>

              {experienceFilled.map((item) => {
                const dates = formatPeriod(
                  item.startDate,
                  item.endDate,
                  item.isCurrent
                );
                const bullets = splitBullets(item.description);

                return (
                  <div
                    key={item.id}
                    className="space-y-0.5 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between gap-4">
                      <p className="font-medium text-slate-900 break-words">
                        {hasText(item.position) ? item.position : ""}
                        {hasText(item.company) ? (
                          <span className="text-slate-600">
                            {hasText(item.position) ? " · " : ""}
                            {item.company}
                          </span>
                        ) : null}
                      </p>
                      {hasText(dates) ? (
                        <p className="text-[10px] text-slate-500 whitespace-nowrap">
                          {dates}
                        </p>
                      ) : null}
                    </div>

                    {hasText(item.location) ? (
                      <p className="text-[10px] text-slate-500 break-words">
                        {item.location}
                      </p>
                    ) : null}

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="text-slate-800 break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(item.description) ? (
                      <p className="text-slate-800 whitespace-pre-line break-words">
                        {item.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}

          {projectsFilled.length > 0 ? (
            <section className="space-y-2.5">
              <SectionTitle accent={accent}>{t.projects}</SectionTitle>

              {projectsFilled.map((p) => {
                const link = normalizeGenericUrl(p.link) || "";
                const bullets = splitBullets(p.description);

                const meta = joinNonEmpty([
                  hasText(p.role) ? p.role!.trim() : "",
                  hasText(p.stack) ? p.stack!.trim() : "",
                ]);

                return (
                  <div
                    key={p.id}
                    className="space-y-0.5 break-inside-avoid"
                    style={{ pageBreakInside: "avoid" }}
                  >
                    <div className="flex justify-between gap-4">
                      <p className="font-medium text-slate-900 break-words">
                        {hasText(p.name) ? p.name : ""}
                      </p>
                      {hasText(link) ? (
                        <p
                          className="text-[10px] truncate max-w-[180px] text-right"
                          style={{ color: accent }}
                        >
                          {link}
                        </p>
                      ) : null}
                    </div>

                    {hasText(meta) ? (
                      <p className="text-[10px] text-slate-500 break-words">
                        {meta}
                      </p>
                    ) : null}

                    {bullets.length > 0 ? (
                      <ul className="mt-1 list-disc pl-4 space-y-0.5">
                        {bullets.map((b, idx) => (
                          <li key={idx} className="text-slate-800 break-words">
                            {b}
                          </li>
                        ))}
                      </ul>
                    ) : hasText(p.description) ? (
                      <p className="text-slate-800 whitespace-pre-line break-words">
                        {p.description}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}
        </div>

        {/* RIGHT */}
        <aside className="space-y-4">
          {hasTech || hasSoft ? (
            <section className="space-y-3">
              {hasTech ? (
                <div className="space-y-1.5">
                  <SectionTitle accent={accent}>{t.skills}</SectionTitle>

                  {techTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {techTags.map((x) => (
                        <Pill key={`tech-${x}`} accent={accent}>
                          {x}
                        </Pill>
                      ))}
                    </div>
                  ) : null}

                  {hasText(techNote) ? (
                    <p className="text-slate-800 whitespace-pre-line break-words">
                      {techNote}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {hasSoft ? (
                <div className="space-y-1.5">
                  <SectionTitle accent={accent}>{t.softSkills}</SectionTitle>

                  {softTags.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {softTags.map((x) => (
                        <Pill key={`soft-${x}`} accent={accent}>
                          {x}
                        </Pill>
                      ))}
                    </div>
                  ) : null}

                  {hasText(softNote) ? (
                    <p className="text-slate-800 whitespace-pre-line break-words">
                      {softNote}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </section>
          ) : null}

          {educationFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.education}</SectionTitle>

              {educationFilled.map((e) => (
                <div
                  key={e.id}
                  className="space-y-0.5 break-inside-avoid"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {hasAnyText([e.degree, e.field]) ? (
                    <p className="font-medium text-slate-900 break-words">
                      {joinNonEmpty([
                        hasText(e.degree) ? e.degree!.trim() : "",
                        hasText(e.field) ? e.field!.trim() : "",
                      ])}
                    </p>
                  ) : null}

                  {hasText(e.institution) ? (
                    <p className="text-[10px] text-slate-600 break-words">
                      {e.institution}
                    </p>
                  ) : null}

                  {hasAnyText([e.startDate, e.endDate]) ? (
                    <p className="text-[10px] text-slate-500 break-words">
                      {formatPeriod(e.startDate, e.endDate, false)}
                    </p>
                  ) : null}
                </div>
              ))}
            </section>
          ) : null}

          {languagesFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.languages}</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {languagesFilled.map((l) => (
                  <Pill key={l.id} accent={accent}>
                    {l.name}
                    {hasText(l.level) ? (
                      <span className="text-slate-500"> · {l.level}</span>
                    ) : null}
                  </Pill>
                ))}
              </div>
            </section>
          ) : null}

          {certificationsFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.certifications}</SectionTitle>
              <div className="space-y-1">
                {certificationsFilled.map((c) => {
                  const link = normalizeGenericUrl(c.link) || "";
                  const head = joinNonEmpty([
                    hasText(c.name) ? c.name!.trim() : "",
                    hasText(c.issuer) ? c.issuer!.trim() : "",
                  ]);
                  const year = hasText(c.year) ? ` (${c.year!.trim()})` : "";

                  return (
                    <p key={c.id} className="break-words">
                      <span className="font-medium text-slate-900">{head}</span>
                      {year}
                      {hasText(link) ? (
                        <span style={{ color: accent }}> — {link}</span>
                      ) : null}
                    </p>
                  );
                })}
              </div>
            </section>
          ) : null}

          {activitiesFilled.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.activities}</SectionTitle>
              <div className="space-y-2">
                {activitiesFilled.map((a) => {
                  const link = normalizeGenericUrl(a.link) || "";
                  const title = joinNonEmpty([
                    hasText(a.name) ? a.name!.trim() : "",
                    hasText(a.role) ? a.role!.trim() : "",
                  ]);

                  return (
                    <div
                      key={a.id}
                      className="break-inside-avoid"
                      style={{ pageBreakInside: "avoid" }}
                    >
                      {hasText(title) ? (
                        <p className="font-medium text-slate-900 break-words">
                          {title}
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

                      {hasText(a.description) ? (
                        <p className="mt-0.5 text-slate-800 whitespace-pre-line break-words">
                          {a.description}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </section>
          ) : null}

          {prefsLines.length > 0 ? (
            <section className="space-y-1.5">
              <SectionTitle accent={accent}>{t.preferences}</SectionTitle>
              <div className="space-y-0.5">
                {prefsLines.map((line, idx) => (
                  <p key={idx} className="break-words text-slate-800">
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
