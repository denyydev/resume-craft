"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume, ResumeSectionKey } from "@/types/resume";
import React from "react";

type ResumeTemplateProps = {
  data: Resume;
  locale: Locale;
};

function formatPeriod(start?: string, end?: string, isCurrent?: boolean) {
  if (!start && !end) return "";
  if (isCurrent) return `${start || ""} — Present`;
  if (start && end) return `${start} — ${end}`;
  return start || end || "";
}

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] leading-none text-slate-700">
      {label}
    </span>
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 px-4 py-3 space-y-2">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function GridTemplate({ data }: ResumeTemplateProps) {
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
    includePhoto,
    sectionsVisibility,
  } = data;

  const fullName = [lastName, firstName, patronymic].filter(Boolean).join(" ");

  const visible = (key: ResumeSectionKey) =>
    sectionsVisibility?.[key] !== false;

  const techTags = techSkills?.tags ?? [];
  const techNote = techSkills?.note?.trim() ?? "";
  const softTags = softSkills?.tags ?? [];
  const softNote = softSkills?.note?.trim() ?? "";

  const hasTech = visible("techSkills") && (techTags.length > 0 || !!techNote);
  const hasSoft = visible("softSkills") && (softTags.length > 0 || !!softNote);

  const hasLinks = !!(
    contacts?.github ||
    contacts?.linkedin ||
    contacts?.website ||
    contacts?.telegram
  );

  const hasSummary = visible("summary") && !!summary?.trim();
  const hasExperience = visible("experience") && (experience?.length ?? 0) > 0;
  const hasProjects = visible("projects") && (projects?.length ?? 0) > 0;
  const hasEducation = visible("education") && (education?.length ?? 0) > 0;
  const hasLanguages = visible("languages") && (languages?.length ?? 0) > 0;

  const cards: Array<{ key: string; node: React.ReactNode }> = [];

  if (hasSummary) {
    cards.push({
      key: "summary",
      node: (
        <SectionCard title="Summary">
          <p className="text-slate-800 whitespace-pre-line">{summary}</p>
        </SectionCard>
      ),
    });
  }

  if (hasExperience) {
    cards.push({
      key: "experience",
      node: (
        <SectionCard title="Experience">
          <div className="space-y-2">
            {(experience ?? []).map((item) => (
              <div key={item.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {item.position || "Position"}
                  {item.company && (
                    <span className="text-slate-600"> · {item.company}</span>
                  )}
                </p>

                <p className="text-[10px] text-slate-500">
                  {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                  {item.location && ` · ${item.location}`}
                </p>

                {item.description && item.description.trim() ? (
                  <p className="text-slate-800 whitespace-pre-line">
                    {item.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      ),
    });
  }

  if (hasProjects) {
    cards.push({
      key: "projects",
      node: (
        <SectionCard title="Projects">
          <div className="space-y-2">
            {(projects ?? []).map((p) => (
              <div key={p.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {p.name || "Project"}
                  {p.role && (
                    <span className="text-slate-600"> · {p.role}</span>
                  )}
                </p>

                {p.stack && p.stack.trim() ? (
                  <p className="text-[10px] text-slate-500">{p.stack}</p>
                ) : null}

                {p.link && p.link.trim() ? (
                  <p className="text-[10px] text-sky-600">{p.link}</p>
                ) : null}

                {p.description && p.description.trim() ? (
                  <p className="text-slate-800 whitespace-pre-line">
                    {p.description}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      ),
    });
  }

  if (hasTech || hasSoft) {
    cards.push({
      key: "skills",
      node: (
        <SectionCard title="Skills">
          <div className="space-y-3">
            {hasTech ? (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                  Tech
                </p>

                {techTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {techTags.map((t) => (
                      <TagPill key={`tech-${t}`} label={t} />
                    ))}
                  </div>
                ) : null}

                {techNote ? (
                  <p className="text-slate-800 whitespace-pre-line">
                    {techNote}
                  </p>
                ) : null}
              </div>
            ) : null}

            {hasSoft ? (
              <div className="space-y-1.5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                  Soft
                </p>

                {softTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {softTags.map((t) => (
                      <TagPill key={`soft-${t}`} label={t} />
                    ))}
                  </div>
                ) : null}

                {softNote ? (
                  <p className="text-slate-800 whitespace-pre-line">
                    {softNote}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </SectionCard>
      ),
    });
  }

  if (hasEducation) {
    cards.push({
      key: "education",
      node: (
        <SectionCard title="Education">
          <div className="space-y-2">
            {(education ?? []).map((e) => (
              <div key={e.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {e.degree || e.field || "Education"}
                </p>

                {e.institution && e.institution.trim() ? (
                  <p className="text-[10px] text-slate-500">{e.institution}</p>
                ) : null}

                {e.startDate || e.endDate ? (
                  <p className="text-[10px] text-slate-500">
                    {formatPeriod(e.startDate, e.endDate)}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </SectionCard>
      ),
    });
  }

  if (hasLanguages) {
    cards.push({
      key: "languages",
      node: (
        <SectionCard title="Languages">
          <div className="flex flex-wrap gap-1.5">
            {(languages ?? []).map((l) => (
              <span
                key={l.id}
                className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
              >
                {l.name}
                {l.level && (
                  <span className="text-slate-500"> · {l.level}</span>
                )}
              </span>
            ))}
          </div>
        </SectionCard>
      ),
    });
  }

  return (
    <div className="w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 px-8 py-8 flex flex-col gap-5">
      <header className="bg-white rounded-xl border border-slate-200 px-6 py-4 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          {includePhoto !== false && visible("photo") && photo ? (
            <img
              src={photo}
              alt={fullName || "Photo"}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-semibold shrink-0">
              {(fullName || "N").trim().charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-tight tracking-tight truncate">
              {fullName || "Your Name"}
            </h1>
            <p className="mt-1 text-xs text-slate-600 truncate">
              {position || "Job Title / Position"}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-[10px] text-slate-500 text-right leading-snug max-w-[260px]">
          <div className="space-y-0.5">
            {contacts?.location && (
              <p className="truncate">{contacts.location}</p>
            )}
            {contacts?.email && <p className="truncate">{contacts.email}</p>}
            {contacts?.phone && <p className="truncate">{contacts.phone}</p>}
          </div>

          {hasLinks ? (
            <div className="mt-1 flex flex-col gap-0.5">
              {contacts?.github && (
                <p className="truncate">{contacts.github}</p>
              )}
              {contacts?.linkedin && (
                <p className="truncate">{contacts.linkedin}</p>
              )}
              {contacts?.website && (
                <p className="truncate">{contacts.website}</p>
              )}
              {contacts?.telegram && (
                <p className="truncate">{contacts.telegram}</p>
              )}
            </div>
          ) : null}
        </div>
      </header>

      {/* ✅ карточки идут просто по порядку в 2 колонки */}
      <main className="flex-1 grid grid-cols-1 gap-x-4 gap-y-3 text-[11px] leading-snug auto-rows-max">
        {cards.map((c) => (
          <React.Fragment key={c.key}>{c.node}</React.Fragment>
        ))}
      </main>
    </div>
  );
}
