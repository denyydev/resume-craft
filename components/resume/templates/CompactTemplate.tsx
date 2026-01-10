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
    summary: "О себе",
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
    summary: "Summary",
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
function splitBullets(text?: string) {
  const raw = (text ?? "").trim();
  if (!raw) return [];
  return raw
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean)
    .map((x) => x.replace(/^[-•]\s*/, "").trim());
}

function TagPill({ label, accent }: { label: string; accent: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full border bg-white px-2 py-0.5 text-[10px] leading-none text-slate-700"
      style={{ borderColor: `${accent}33` }}
    >
      {label}
    </span>
  );
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
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
        {children}
      </h2>
    </div>
  );
}

export function CompactTemplate({ data, locale }: ResumeTemplateProps) {
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
        <header className="flex flex-col gap-2 border-b border-slate-200 pb-3">
          <div className="flex justify-between gap-4">
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

      <main className="flex-1 flex flex-col gap-4 text-[11px] leading-snug">
        {visible("summary") && hasText(summary) ? (
          <section className="space-y-1.5">
            <SectionTitle accent={accent}>{t.summary}</SectionTitle>
            <p className="text-slate-800 whitespace-pre-line break-words">
              {summary}
            </p>
          </section>
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          {/* LEFT COLUMN */}
          <div className="space-y-3">
            {experienceFilled.length > 0 ? (
              <section className="space-y-2">
                <SectionTitle accent={accent}>{t.experience}</SectionTitle>

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
                      className="space-y-0.5 break-inside-avoid"
                      style={{ pageBreakInside: "avoid" }}
                    >
                      {hasAnyText([item.position, item.company]) ? (
                        <p className="font-medium text-slate-900 break-words">
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
                            <li
                              key={idx}
                              className="text-slate-800 break-words"
                            >
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
                        <p className="font-medium text-slate-900 break-words">
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
                            <li
                              key={idx}
                              className="text-slate-800 break-words"
                            >
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
                        <p className="font-medium text-slate-900 break-words">
                          {head}
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
                            <li
                              key={idx}
                              className="text-slate-800 break-words"
                            >
                              {b}
                            </li>
                          ))}
                        </ul>
                      ) : hasText(a.description) ? (
                        <p className="text-slate-800 whitespace-pre-line break-words">
                          {a.description}
                        </p>
                      ) : null}
                    </div>
                  );
                })}
              </section>
            ) : null}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-3">
            {hasTech || hasSoft ? (
              <section className="space-y-3">
                {hasTech ? (
                  <div className="space-y-1.5">
                    <SectionTitle accent={accent}>{t.skills}</SectionTitle>

                    {techTags.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {techTags.map((x) => (
                          <TagPill
                            key={`tech-${x}`}
                            label={x}
                            accent={accent}
                          />
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
                          <TagPill
                            key={`soft-${x}`}
                            label={x}
                            accent={accent}
                          />
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
                        <p className="font-medium text-slate-900 break-words">
                          {title}
                        </p>
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
                      className="rounded-full border px-2 py-0.5 text-[10px] text-slate-700"
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

                <div className="space-y-1">
                  {certificationsFilled.map((c) => {
                    const link = normalizeGenericUrl(c.link) || "";
                    const head = joinNonEmpty([
                      hasText(c.name) ? c.name!.trim() : "",
                      hasText(c.issuer) ? c.issuer!.trim() : "",
                    ]);
                    const year = hasText(c.year) ? ` (${c.year!.trim()})` : "";

                    return (
                      <p
                        key={c.id}
                        className="text-[11px] text-slate-800 break-words"
                      >
                        <span className="font-medium text-slate-900">
                          {head}
                        </span>
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

            {prefsLines.length > 0 ? (
              <section className="space-y-1.5">
                <SectionTitle accent={accent}>{t.preferences}</SectionTitle>
                <div className="space-y-0.5">
                  {prefsLines.map((line, idx) => (
                    <p
                      key={idx}
                      className="text-[11px] text-slate-800 break-words"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
