"use client";

import type { ResumeSectionKey } from "@/types/resume";
import React, { useMemo } from "react";
import type { ResumeTemplateProps } from "./common";
import { formatPeriod, hasAnyText, hasText, joinNonEmpty } from "./common";

const messages = {
  ru: {
    profile: "Профиль",
    experience: "Опыт",
    projects: "Проекты",
    education: "Образование",
    languages: "Языки",
    skills: "Навыки",
    softSkills: "Soft skills",
    preferences: "Предпочтения",
    certifications: "Сертификаты",
    activities: "Активности",
    contacts: "Контакты",
    prefs: {
      employment: "Занятость",
      format: "Формат",
      relocation: "Релокация",
      timezone: "Часовой пояс",
      authorization: "Разрешение",
      yes: "Да",
      no: "Нет",
    },
    activity: {
      openSource: "Open Source",
      volunteering: "Волонтёрство",
      community: "Комьюнити",
      other: "Активность",
    },
  },
  en: {
    profile: "Profile",
    experience: "Experience",
    projects: "Projects",
    education: "Education",
    languages: "Languages",
    skills: "Skills",
    softSkills: "Soft Skills",
    preferences: "Preferences",
    certifications: "Certifications",
    activities: "Activities",
    contacts: "Contacts",
    prefs: {
      employment: "Employment",
      format: "Format",
      relocation: "Relocation",
      timezone: "Timezone",
      authorization: "Authorization",
      yes: "Yes",
      no: "No",
    },
    activity: {
      openSource: "Open Source",
      volunteering: "Volunteering",
      community: "Community",
      other: "Activity",
    },
  },
} as const;

function InitialAvatar({
  fullName,
  accentColor,
}: {
  fullName?: string;
  accentColor: string;
}) {
  const letter = (fullName || "").trim().charAt(0).toUpperCase() || "N";
  return (
    <div
      className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center text-xl font-semibold border"
      style={{ borderColor: `${accentColor}55` }}
    >
      {letter}
    </div>
  );
}

function TagPill({
  label,
  tone = "dark",
}: {
  label: string;
  tone?: "dark" | "light";
}) {
  const base =
    tone === "dark"
      ? "border-white/15 text-slate-100 bg-white/5"
      : "border-slate-200 text-slate-700 bg-white";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] leading-none ${base}`}
    >
      {label}
    </span>
  );
}

function SectionTitle({
  children,
  accentColor,
  tone = "light",
}: {
  children: React.ReactNode;
  accentColor: string;
  tone?: "light" | "dark";
}) {
  const base =
    tone === "dark"
      ? "text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200"
      : "text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700";

  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: accentColor }}
      />
      <h2 className={base}>{children}</h2>
    </div>
  );
}

function KeyValueRow({
  label,
  value,
  tone = "dark",
}: {
  label: string;
  value?: string;
  tone?: "dark" | "light";
}) {
  if (!hasText(value)) return null;

  const labelCls =
    tone === "dark"
      ? "text-[10px] text-slate-400"
      : "text-[10px] text-slate-500";
  const valueCls =
    tone === "dark"
      ? "text-[11px] text-slate-100"
      : "text-[11px] text-slate-800";

  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={labelCls}>{label}</span>
      <span className={`${valueCls} text-right leading-snug`}>{value}</span>
    </div>
  );
}

export function SidebarTemplate({ data, locale }: ResumeTemplateProps) {
  const t = messages[locale === "ru" ? "ru" : "en"];

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
    photo,
    accentColor,
    includePhoto,
    employmentPreferences,
    certifications,
    activities,
    sectionsVisibility,
  } = data;

  const visible = (key: ResumeSectionKey) =>
    sectionsVisibility?.[key] !== false;

  const accent = accentColor || "#1677ff";
  const fullName = [lastName, firstName, patronymic]
    .filter(Boolean)
    .join(" ")
    .trim();

  // ✅ фильтруем пустые элементы списков (как в ATS)
  const experienceFilled = useMemo(
    () =>
      (experience ?? []).filter((x) =>
        hasAnyText([
          x.company,
          x.position,
          x.location,
          x.startDate,
          x.endDate,
          x.description,
          x.isCurrent ? "1" : "",
        ])
      ),
    [experience]
  );

  const projectsFilled = useMemo(
    () =>
      (projects ?? []).filter((p) =>
        hasAnyText([p.name, p.role, p.stack, p.link, p.description])
      ),
    [projects]
  );

  const educationFilled = useMemo(
    () =>
      (education ?? []).filter((e) =>
        hasAnyText([e.institution, e.degree, e.field, e.startDate, e.endDate])
      ),
    [education]
  );

  const languagesFilled = useMemo(
    () => (languages ?? []).filter((l) => hasAnyText([l.name, l.level])),
    [languages]
  );

  const certificationsFilled = useMemo(
    () =>
      (certifications ?? []).filter((c) =>
        hasAnyText([c.name, c.issuer, c.year, c.link])
      ),
    [certifications]
  );

  const activitiesFilled = useMemo(
    () =>
      (activities ?? []).filter((a) =>
        hasAnyText([a.name, a.role, a.description, a.link])
      ),
    [activities]
  );

  const techTags = (techSkills?.tags ?? [])
    .map((x) => x.trim())
    .filter(Boolean);
  const techNote = (techSkills?.note ?? "").trim();

  const softTags = (softSkills?.tags ?? [])
    .map((x) => x.trim())
    .filter(Boolean);
  const softNote = (softSkills?.note ?? "").trim();

  const hasTech =
    visible("techSkills") && (techTags.length > 0 || hasText(techNote));
  const hasSoft =
    visible("softSkills") && (softTags.length > 0 || hasText(softNote));

  // ✅ контакты/ссылки — показываем только если реально есть
  const contactLines = [contacts?.email, contacts?.phone, contacts?.location]
    .map((x) => (x ?? "").trim())
    .filter(Boolean);

  const linkLines = [
    contacts?.telegram,
    contacts?.github,
    contacts?.linkedin,
    contacts?.website,
  ]
    .map((x) => (x ?? "").trim())
    .filter(Boolean);

  const hasPrimaryContacts = visible("contacts") && contactLines.length > 0;
  const hasLinks = visible("contacts") && linkLines.length > 0;

  const pref = employmentPreferences;
  const prefEmploymentType = pref?.employmentType?.length
    ? pref.employmentType.join(" · ")
    : "";
  const prefWorkFormat = pref?.workFormat?.length
    ? pref.workFormat.join(" · ")
    : "";

  const hasPreferences =
    visible("employmentPreferences") &&
    hasAnyText([
      prefEmploymentType,
      prefWorkFormat,
      pref?.timezone,
      pref?.workAuthorization,
      typeof pref?.relocation === "boolean" ? "1" : "",
    ]);

  const activityLabel = (type?: string) => {
    if (type === "open-source") return t.activity.openSource;
    if (type === "volunteering") return t.activity.volunteering;
    if (type === "community") return t.activity.community;
    return t.activity.other;
  };

  return (
    <div
      className="w-[794px] bg-white text-slate-900 grid grid-cols-[270px_1fr]"
      style={{
        minHeight: "1123px",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* LEFT */}
      <aside
        className="bg-slate-950 text-slate-50 px-6 py-8 flex flex-col gap-6 self-stretch"
        style={{
          boxShadow: `inset 4px 0 0 0 ${accent}`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        {(hasText(fullName) ||
          hasText(position) ||
          (visible("photo") && photo && includePhoto !== false)) && (
          <div className="flex flex-col items-start gap-4">
            {/* ✅ Фото — только когда есть */}
            {visible("photo") && photo && includePhoto !== false ? (
              <img
                src={photo}
                alt={fullName || "Photo"}
                className="w-20 h-20 rounded-2xl object-cover border"
                style={{ borderColor: `${accent}55` }}
              />
            ) : null}

            {(hasText(fullName) || hasText(position)) && (
              <div className="space-y-1">
                {hasText(fullName) ? (
                  <h1 className="text-[16px] font-semibold leading-tight tracking-tight">
                    {fullName}
                  </h1>
                ) : null}

                {hasText(position) ? (
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {position}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        )}

        {(hasPrimaryContacts || hasLinks) && (
          <section className="space-y-3">
            <SectionTitle accentColor={accent} tone="dark">
              {t.contacts}
            </SectionTitle>

            {hasPrimaryContacts && (
              <div className="space-y-1 text-[11px] text-slate-200">
                {contactLines.map((line, i) => (
                  <p key={`c-${i}`} className="leading-snug">
                    {line}
                  </p>
                ))}
              </div>
            )}

            {hasLinks && (
              <div className="space-y-1 text-[11px] text-slate-200">
                {linkLines.map((line, i) => (
                  <p key={`l-${i}`} className="leading-snug">
                    {line}
                  </p>
                ))}
              </div>
            )}
          </section>
        )}

        {hasPreferences && (
          <section className="space-y-3">
            <SectionTitle accentColor={accent} tone="dark">
              {t.preferences}
            </SectionTitle>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <KeyValueRow
                label={t.prefs.employment}
                value={prefEmploymentType}
                tone="dark"
              />
              <KeyValueRow
                label={t.prefs.format}
                value={prefWorkFormat}
                tone="dark"
              />
              <KeyValueRow
                label={t.prefs.relocation}
                value={
                  typeof pref?.relocation === "boolean"
                    ? pref.relocation
                      ? t.prefs.yes
                      : t.prefs.no
                    : undefined
                }
                tone="dark"
              />
              <KeyValueRow
                label={t.prefs.timezone}
                value={pref?.timezone}
                tone="dark"
              />
              <KeyValueRow
                label={t.prefs.authorization}
                value={pref?.workAuthorization}
                tone="dark"
              />
            </div>
          </section>
        )}

        {(hasTech || hasSoft) && (
          <section className="space-y-4">
            {hasTech && (
              <div className="space-y-2">
                <SectionTitle accentColor={accent} tone="dark">
                  {t.skills}
                </SectionTitle>

                {techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techTags.map((tag) => (
                      <TagPill key={`tech-${tag}`} label={tag} tone="dark" />
                    ))}
                  </div>
                )}

                {hasText(techNote) && (
                  <p className="text-[11px] text-slate-100 whitespace-pre-line leading-snug">
                    {techNote}
                  </p>
                )}
              </div>
            )}

            {hasSoft && (
              <div className="space-y-2">
                <SectionTitle accentColor={accent} tone="dark">
                  {t.softSkills}
                </SectionTitle>

                {softTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {softTags.map((tag) => (
                      <TagPill key={`soft-${tag}`} label={tag} tone="dark" />
                    ))}
                  </div>
                )}

                {hasText(softNote) && (
                  <p className="text-[11px] text-slate-100 whitespace-pre-line leading-snug">
                    {softNote}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {visible("languages") && languagesFilled.length > 0 ? (
          <section className="space-y-2">
            <SectionTitle accentColor={accent} tone="dark">
              {t.languages}
            </SectionTitle>
            <ul className="space-y-1 text-[11px] text-slate-100">
              {languagesFilled.map((l) => (
                <li key={l.id} className="leading-snug">
                  {l.name}
                  {hasText(l.level) ? (
                    <span className="text-slate-400"> · {l.level}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {visible("certifications") && certificationsFilled.length > 0 ? (
          <section className="space-y-2">
            <SectionTitle accentColor={accent} tone="dark">
              {t.certifications}
            </SectionTitle>

            <div className="space-y-2">
              {certificationsFilled.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <p className="text-[11px] text-slate-100 leading-snug font-medium">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    {[c.issuer, c.year].filter(Boolean).join(" · ")}
                  </p>
                  {hasText(c.link) && (
                    <p
                      className="text-[10px] truncate mt-1"
                      style={{ color: accent }}
                    >
                      {c.link}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {certificationsFilled.length > 4 && (
              <p className="text-[10px] text-slate-400">
                +{certificationsFilled.length - 4} more
              </p>
            )}
          </section>
        ) : null}
      </aside>

      {/* RIGHT */}
      <main
        className="px-9 py-8 space-y-5 text-[11px] leading-snug bg-white"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        {visible("summary") && hasText(summary) ? (
          <section className="space-y-2 border-b border-slate-200 pb-4">
            <SectionTitle accentColor={accent}>{t.profile}</SectionTitle>
            <p className="text-slate-800 whitespace-pre-line leading-snug">
              {summary}
            </p>
          </section>
        ) : null}

        {visible("experience") && experienceFilled.length > 0 ? (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>{t.experience}</SectionTitle>

            {experienceFilled.map((item) => {
              const title = joinNonEmpty([item.position, item.company]);
              const dates = formatPeriod(
                item.startDate,
                item.endDate,
                item.isCurrent
              );

              return (
                <div
                  key={item.id}
                  className="space-y-1"
                  style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
                >
                  <div className="flex justify-between gap-4">
                    <p className="font-medium text-slate-900">{title}</p>
                    {hasText(dates) ? (
                      <p className="text-[10px] text-slate-500 whitespace-nowrap">
                        {dates}
                      </p>
                    ) : null}
                  </div>

                  {hasText(item.location) ? (
                    <p className="text-[10px] text-slate-500">
                      {item.location}
                    </p>
                  ) : null}

                  {hasText(item.description) ? (
                    <p className="text-slate-800 whitespace-pre-line leading-snug">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </section>
        ) : null}

        {visible("projects") && projectsFilled.length > 0 ? (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>{t.projects}</SectionTitle>

            {projectsFilled.map((p) => (
              <div
                key={p.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {joinNonEmpty([p.name, p.role])}
                  </p>
                  {hasText(p.link) ? (
                    <p
                      className="text-[10px] truncate max-w-[220px] text-right"
                      style={{ color: accent }}
                    >
                      {p.link}
                    </p>
                  ) : null}
                </div>

                {hasText(p.stack) ? (
                  <p className="text-[10px] text-slate-500">{p.stack}</p>
                ) : null}

                {hasText(p.description) ? (
                  <p className="text-slate-800 whitespace-pre-line leading-snug">
                    {p.description}
                  </p>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}

        {visible("activities") && activitiesFilled.length > 0 ? (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>{t.activities}</SectionTitle>

            {activitiesFilled.map((a) => (
              <div
                key={a.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {joinNonEmpty([a.name, a.role])}
                  </p>
                  {a.type ? (
                    <span
                      className="text-[10px] whitespace-nowrap px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      {activityLabel(a.type)}
                    </span>
                  ) : null}
                </div>

                {hasText(a.link) ? (
                  <p className="text-[10px] truncate" style={{ color: accent }}>
                    {a.link}
                  </p>
                ) : null}

                {hasText(a.description) ? (
                  <p className="text-slate-800 whitespace-pre-line leading-snug">
                    {a.description}
                  </p>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}

        {visible("education") && educationFilled.length > 0 ? (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>{t.education}</SectionTitle>

            {educationFilled.map((e) => (
              <div
                key={e.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <p className="font-medium text-slate-900">
                  {joinNonEmpty([e.degree, e.field]) || e.institution}
                </p>

                {hasAnyText([e.institution, e.startDate, e.endDate]) ? (
                  <p className="text-[10px] text-slate-500">
                    {joinNonEmpty([
                      e.institution,
                      formatPeriod(e.startDate, e.endDate, false),
                    ])}
                  </p>
                ) : null}
              </div>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}
