"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";

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

export function TimelineTemplate({ data }: ResumeTemplateProps) {
  const {
    fullName,
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

  const visible = (key: keyof typeof sectionsVisibility) =>
    sectionsVisibility?.[key] !== false;

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-9 py-9 flex flex-col gap-5">
      <header className="flex flex-col gap-3 border-b border-slate-200 pb-3">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            {includePhoto && visible("photo") && photo && (
              <img
                src={photo}
                alt=""
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <div>
              <h1 className="text-[24px] font-semibold tracking-tight leading-tight">
                {fullName || "Your Name"}
              </h1>
              <p className="mt-1 text-xs text-slate-600">
                {position || "Job Title / Position"}
              </p>
            </div>
          </div>
          <div className="text-[10px] text-slate-500 text-right space-y-0.5">
            {contacts.location && <p>{contacts.location}</p>}
            {contacts.email && <p>{contacts.email}</p>}
            {contacts.phone && <p>{contacts.phone}</p>}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500">
          {contacts.github && <span>{contacts.github}</span>}
          {contacts.linkedin && <span>{contacts.linkedin}</span>}
          {contacts.website && <span>{contacts.website}</span>}
          {contacts.telegram && <span>{contacts.telegram}</span>}
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[1.2fr,0.9fr] gap-5 text-[11px] leading-snug">
        <div className="space-y-4">
          {visible("summary") && summary && (
            <section className="space-y-1.5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Summary
              </h2>
              <p className="whitespace-pre-line">{summary}</p>
            </section>
          )}

          {visible("experience") && experience.length > 0 && (
            <section className="space-y-3">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Experience
              </h2>
              <div className="relative border-l border-slate-200 pl-4 space-y-4">
                {experience.map((item) => (
                  <div key={item.id} className="relative space-y-0.5">
                    <span
                      className="absolute -left-[9px] top-1 h-2 w-2 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    />
                    <p className="font-medium">
                      {item.position || "Position"}
                      {item.company && (
                        <span className="text-slate-600">
                          {" "}
                          · {item.company}
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {formatPeriod(
                        item.startDate,
                        item.endDate,
                        item.isCurrent
                      )}
                      {item.location && ` · ${item.location}`}
                    </p>
                    {item.description && (
                      <p className="whitespace-pre-line">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {visible("projects") && projects.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Projects
              </h2>
              {projects.map((p) => (
                <div key={p.id} className="space-y-0.5">
                  <p className="font-medium">
                    {p.name || "Project"}
                    {p.role && (
                      <span className="text-slate-600"> · {p.role}</span>
                    )}
                  </p>
                  {p.stack && (
                    <p className="text-[10px] text-slate-500">{p.stack}</p>
                  )}
                  {p.link && (
                    <p className="text-[10px]" style={{ color: accentColor }}>
                      {p.link}
                    </p>
                  )}
                  {p.description && (
                    <p className="whitespace-pre-line">{p.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}

          {visible("activities") && activities.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Activities
              </h2>
              {activities.map((a) => (
                <div key={a.id} className="space-y-0.5">
                  <p className="font-medium">
                    {a.name}
                    {a.role && (
                      <span className="text-slate-600"> · {a.role}</span>
                    )}
                  </p>
                  {a.description && (
                    <p className="whitespace-pre-line">{a.description}</p>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <aside className="space-y-3">
          {visible("techSkills") &&
            (techSkills.tags.length > 0 || techSkills.note) && (
              <section className="space-y-1.5">
                <h2
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Skills
                </h2>
                {techSkills.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techSkills.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {techSkills.note && (
                  <p className="whitespace-pre-line">{techSkills.note}</p>
                )}
              </section>
            )}

          {visible("softSkills") &&
            (softSkills.tags.length > 0 || softSkills.note) && (
              <section className="space-y-1.5">
                <h2
                  className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: accentColor }}
                >
                  Soft Skills
                </h2>
                {softSkills.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {softSkills.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {softSkills.note && (
                  <p className="whitespace-pre-line">{softSkills.note}</p>
                )}
              </section>
            )}

          {visible("education") && education.length > 0 && (
            <section className="space-y-2">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Education
              </h2>
              {education.map((e) => (
                <div key={e.id} className="space-y-0.5">
                  <p className="font-medium">
                    {e.degree || e.field || "Education"}
                  </p>
                  {e.institution && (
                    <p className="text-[10px] text-slate-500">
                      {e.institution}
                    </p>
                  )}
                  {(e.startDate || e.endDate) && (
                    <p className="text-[10px] text-slate-500">
                      {formatPeriod(e.startDate, e.endDate)}
                    </p>
                  )}
                </div>
              ))}
            </section>
          )}

          {visible("languages") && languages.length > 0 && (
            <section className="space-y-1.5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Languages
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((l) => (
                  <span
                    key={l.id}
                    className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px]"
                  >
                    {l.name}
                    {l.level && (
                      <span className="text-slate-500"> · {l.level}</span>
                    )}
                  </span>
                ))}
              </div>
            </section>
          )}

          {visible("certifications") && certifications.length > 0 && (
            <section className="space-y-1.5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Certifications
              </h2>
              {certifications.map((c) => (
                <div key={c.id} className="text-[10px]">
                  <span className="font-medium">{c.name}</span>
                  {c.issuer && (
                    <span className="text-slate-500"> · {c.issuer}</span>
                  )}
                  {c.year && (
                    <span className="text-slate-500"> · {c.year}</span>
                  )}
                </div>
              ))}
            </section>
          )}

          {visible("employmentPreferences") && (
            <section className="space-y-1.5">
              <h2
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: accentColor }}
              >
                Preferences
              </h2>
              <p className="text-[10px] text-slate-700">
                {employmentPreferences.employmentType.join(", ")}
                {employmentPreferences.workFormat.length > 0 &&
                  ` · ${employmentPreferences.workFormat.join(", ")}`}
              </p>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
