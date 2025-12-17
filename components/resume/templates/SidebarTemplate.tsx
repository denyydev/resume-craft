"use client"

import { formatPeriod, type ResumeTemplateProps } from "./common"

function InitialAvatar({ fullName }: { fullName?: string }) {
  const letter = (fullName || "N").trim().charAt(0).toUpperCase()
  return (
    <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-semibold border border-white/10">
      {letter}
    </div>
  )
}

function TagPill({ label, tone = "dark" }: { label: string; tone?: "dark" | "light" }) {
  const base =
    tone === "dark"
      ? "border-white/15 text-slate-100 bg-white/5"
      : "border-slate-200 text-slate-700 bg-white"

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] leading-none ${base}`}
    >
      {label}
    </span>
  )
}

export function SidebarTemplate({ data }: ResumeTemplateProps) {
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

  const hasPrimaryContacts = !!(contacts.email || contacts.phone || contacts.location)
  const hasLinks = !!(contacts.telegram || contacts.github || contacts.linkedin || contacts.website)

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 flex">
      <aside className="w-[270px] bg-slate-950 text-slate-50 px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4">
          {photo ? (
            <img
              src={photo}
              alt={fullName}
              className="w-20 h-20 rounded-2xl object-cover border border-white/15"
            />
          ) : (
            <InitialAvatar fullName={fullName} />
          )}

          <div className="space-y-1">
            <h1 className="text-[16px] font-semibold leading-tight tracking-tight">
              {fullName || "Your Name"}
            </h1>
            <p className="text-[11px] text-slate-300 leading-snug">
              {position || "Job Title / Position"}
            </p>
          </div>
        </div>

        {(hasPrimaryContacts || hasLinks) && (
          <div className="space-y-3">
            {hasPrimaryContacts && (
              <div className="space-y-1 text-[11px] text-slate-200">
                {contacts.email && <p className="leading-snug">{contacts.email}</p>}
                {contacts.phone && <p className="leading-snug">{contacts.phone}</p>}
                {contacts.location && <p className="leading-snug">{contacts.location}</p>}
              </div>
            )}

            {hasLinks && (
              <div className="space-y-1 text-[11px] text-slate-200">
                {contacts.telegram && <p className="leading-snug">{contacts.telegram}</p>}
                {contacts.github && <p className="leading-snug">{contacts.github}</p>}
                {contacts.linkedin && <p className="leading-snug">{contacts.linkedin}</p>}
                {contacts.website && <p className="leading-snug">{contacts.website}</p>}
              </div>
            )}
          </div>
        )}

        {(hasTech || hasSoft) && (
          <section className="space-y-4">
            {hasTech && (
              <div className="space-y-2">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200">
                  Skills
                </h2>

                {techTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techTags.map((t) => (
                      <TagPill key={`tech-${t}`} label={t} tone="dark" />
                    ))}
                  </div>
                )}

                {techNote && (
                  <p className="text-[11px] text-slate-100 whitespace-pre-line leading-snug">
                    {techNote}
                  </p>
                )}
              </div>
            )}

            {hasSoft && (
              <div className="space-y-2">
                <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200">
                  Soft Skills
                </h2>

                {softTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {softTags.map((t) => (
                      <TagPill key={`soft-${t}`} label={t} tone="dark" />
                    ))}
                  </div>
                )}

                {softNote && (
                  <p className="text-[11px] text-slate-100 whitespace-pre-line leading-snug">
                    {softNote}
                  </p>
                )}
              </div>
            )}
          </section>
        )}

        {languages?.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200">
              Languages
            </h2>
            <ul className="space-y-1 text-[11px] text-slate-100">
              {languages.map((l) => (
                <li key={l.id} className="leading-snug">
                  {l.name}
                  {l.level && <span className="text-slate-400"> · {l.level}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="flex-1 px-9 py-8 space-y-5 text-[11px] leading-snug">
        {summary && (
          <section className="space-y-2 border-b border-slate-200 pb-4">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
              Profile
            </h2>
            <p className="text-slate-800 whitespace-pre-line leading-snug">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
              Experience
            </h2>

            {experience.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {item.position || "Position"}
                    {item.company && <span className="text-slate-600"> · {item.company}</span>}
                  </p>
                  <p className="text-[10px] text-slate-500 whitespace-nowrap">
                    {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                  </p>
                </div>

                {item.location && <p className="text-[10px] text-slate-500">{item.location}</p>}

                {item.description && (
                  <p className="text-slate-800 whitespace-pre-line leading-snug">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {projects?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
              Projects
            </h2>

            {projects.map((p) => (
              <div key={p.id} className="space-y-1">
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {p.name || "Project"}
                    {p.role && <span className="text-slate-600"> · {p.role}</span>}
                  </p>
                  {p.link && (
                    <p className="text-[10px] text-sky-600 truncate max-w-[220px] text-right">
                      {p.link}
                    </p>
                  )}
                </div>

                {p.stack && <p className="text-[10px] text-slate-500">{p.stack}</p>}

                {p.description && (
                  <p className="text-slate-800 whitespace-pre-line leading-snug">
                    {p.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700">
              Education
            </h2>

            {education.map((e) => (
              <div key={e.id} className="space-y-1">
                <p className="font-medium text-slate-900">
                  {e.degree || e.field || "Education"}
                  {e.institution && <span className="text-slate-600"> · {e.institution}</span>}
                </p>

                {(e.startDate || e.endDate) && (
                  <p className="text-[10px] text-slate-500">{formatPeriod(e.startDate, e.endDate)}</p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
