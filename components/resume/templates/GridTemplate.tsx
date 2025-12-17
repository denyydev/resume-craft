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

function TagPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] leading-none text-slate-700">
      {label}
    </span>
  )
}

function SectionCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-white rounded-xl border border-slate-200 px-4 py-3 space-y-2">
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function GridTemplate({ data }: ResumeTemplateProps) {
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
    photo,
  } = data

  const techTags = techSkills?.tags ?? []
  const techNote = techSkills?.note?.trim() ?? ""
  const softTags = softSkills?.tags ?? []
  const softNote = softSkills?.note?.trim() ?? ""

  const hasTech = techTags.length > 0 || techNote.length > 0
  const hasSoft = softTags.length > 0 || softNote.length > 0
  const hasLinks = !!(contacts.github || contacts.linkedin || contacts.website || contacts.telegram)

  return (
    <div className="w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 px-8 py-8 flex flex-col gap-5">
      <header className="bg-white rounded-xl border border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          {photo ? (
            <img
              src={photo}
              alt={fullName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-lg font-semibold">
              {(fullName || "N").trim().charAt(0).toUpperCase()}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-[22px] font-semibold leading-tight tracking-tight">
              {fullName || "Your Name"}
            </h1>
            <p className="mt-1 text-xs text-slate-600">
              {position || "Job Title / Position"}
            </p>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-right space-y-0.5 shrink-0">
          {contacts.location && <p>{contacts.location}</p>}
          {contacts.email && <p>{contacts.email}</p>}
          {contacts.phone && <p>{contacts.phone}</p>}

          {hasLinks && (
            <div className="mt-1 flex flex-wrap justify-end gap-x-2 gap-y-1">
              {contacts.github && <span>{contacts.github}</span>}
              {contacts.linkedin && <span>{contacts.linkedin}</span>}
              {contacts.website && <span>{contacts.website}</span>}
              {contacts.telegram && <span>{contacts.telegram}</span>}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 gap-4 text-[11px] leading-snug">
        <div className="space-y-3">
          {summary && (
            <SectionCard title="Summary">
              <p className="text-slate-800 whitespace-pre-line">{summary}</p>
            </SectionCard>
          )}

          {experience?.length > 0 && (
            <SectionCard title="Experience">
              <div className="space-y-2">
                {experience.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <p className="font-medium text-slate-900">
                      {item.position || "Position"}
                      {item.company && <span className="text-slate-600"> · {item.company}</span>}
                    </p>

                    <p className="text-[10px] text-slate-500">
                      {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                      {item.location && ` · ${item.location}`}
                    </p>

                    {item.description && (
                      <p className="text-slate-800 whitespace-pre-line">{item.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {education?.length > 0 && (
            <SectionCard title="Education">
              <div className="space-y-2">
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
              </div>
            </SectionCard>
          )}
        </div>

        <div className="space-y-3">
          {(hasTech || hasSoft) && (
            <SectionCard title="Skills">
              <div className="space-y-3">
                {hasTech && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                      Tech
                    </p>

                    {techTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {techTags.map((t) => (
                          <TagPill key={`tech-${t}`} label={t} />
                        ))}
                      </div>
                    )}

                    {techNote && (
                      <p className="text-slate-800 whitespace-pre-line">{techNote}</p>
                    )}
                  </div>
                )}

                {hasSoft && (
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-600">
                      Soft
                    </p>

                    {softTags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {softTags.map((t) => (
                          <TagPill key={`soft-${t}`} label={t} />
                        ))}
                      </div>
                    )}

                    {softNote && (
                      <p className="text-slate-800 whitespace-pre-line">{softNote}</p>
                    )}
                  </div>
                )}
              </div>
            </SectionCard>
          )}

          {projects?.length > 0 && (
            <SectionCard title="Projects">
              <div className="space-y-2">
                {projects.map((p) => (
                  <div key={p.id} className="space-y-0.5">
                    <p className="font-medium text-slate-900">
                      {p.name || "Project"}
                      {p.role && <span className="text-slate-600"> · {p.role}</span>}
                    </p>

                    {p.stack && <p className="text-[10px] text-slate-500">{p.stack}</p>}
                    {p.link && <p className="text-[10px] text-sky-600">{p.link}</p>}

                    {p.description && (
                      <p className="text-slate-800 whitespace-pre-line">{p.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {languages?.length > 0 && (
            <SectionCard title="Languages">
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
            </SectionCard>
          )}
        </div>
      </main>
    </div>
  )
}
