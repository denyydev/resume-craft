"use client"

import type { Resume } from "@/types/resume"
import type { Locale } from "@/lib/useCurrentLocale"

type ResumeTemplateProps = {
  data: Resume
  locale: Locale
}

function formatPeriod(start?: string, end?: string, isCurrent?: boolean) {
  if (!start && !end) return ""
  if (isCurrent) return `${start || ""} — Present`
  if (start && end) return `${start} — ${end}`
  return start || end || ""
}

export function SimpleTemplate({ data }: ResumeTemplateProps) {
  const {
    fullName,
    position,
    contacts,
    summary,
    experience,
    projects,
    skills,
    softSkills,
    education,
    languages,
  } = data

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-9 py-9 flex flex-col gap-5">
      <header className="border-b border-slate-200 pb-3 flex flex-col gap-2">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[26px] font-semibold tracking-tight leading-tight">
              {fullName || "Your Name"}
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              {position || "Job Title / Position"}
            </p>
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

      <main className="flex-1 flex flex-col gap-4 text-[11px] leading-snug">
        {summary && (
          <section className="space-y-1.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Summary
            </h2>
            <p className="text-slate-800 whitespace-pre-line">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Experience
            </h2>
            {experience.map((item) => (
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
                {item.description && (
                  <p className="text-slate-800 whitespace-pre-line">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects?.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Projects
            </h2>
            {projects.map((p) => (
              <div key={p.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {p.name || "Project"}
                  {p.role && <span className="text-slate-600"> · {p.role}</span>}
                </p>
                {p.stack && (
                  <p className="text-[10px] text-slate-500">{p.stack}</p>
                )}
                {p.link && (
                  <p className="text-[10px] text-sky-600">{p.link}</p>
                )}
                {p.description && (
                  <p className="text-slate-800 whitespace-pre-line">
                    {p.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {(skills || softSkills) && (
          <section className="space-y-2">
            {skills && (
              <div className="space-y-1.5">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Skills
                </h2>
                <p className="text-slate-800 whitespace-pre-line">{skills}</p>
              </div>
            )}
            {softSkills && (
              <div className="space-y-1.5">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  Soft Skills
                </h2>
                <p className="text-slate-800 whitespace-pre-line">{softSkills}</p>
              </div>
            )}
          </section>
        )}

        {education?.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Education
            </h2>
            {education.map((e) => (
              <div key={e.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {e.degree || e.field || "Education"}
                </p>
                {e.institution && (
                  <p className="text-[10px] text-slate-500">{e.institution}</p>
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

        {languages?.length > 0 && (
          <section className="space-y-1.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Languages
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <span
                  key={l.id}
                  className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
                >
                  {l.name}
                  {l.level && <span className="text-slate-500"> · {l.level}</span>}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
