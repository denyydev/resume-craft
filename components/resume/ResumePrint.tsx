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

function NeoTemplate({ data }: ResumeTemplateProps) {
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
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 px-10 py-9 flex flex-col gap-6">
      <header className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-[26px] font-semibold tracking-tight leading-tight">
            {fullName || "Your Name"}
          </h1>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
            {position || "Job Title / Position"}
          </p>
        </div>
        <div className="text-[11px] text-slate-500 text-right space-y-0.5">
          <div className="flex flex-col gap-0.5">
            {contacts.email && <span>{contacts.email}</span>}
            {contacts.phone && <span>{contacts.phone}</span>}
            {contacts.location && <span>{contacts.location}</span>}
          </div>
          <div className="mt-1 flex flex-col gap-0.5">
            {contacts.github && <span>{contacts.github}</span>}
            {contacts.linkedin && <span>{contacts.linkedin}</span>}
            {contacts.website && <span>{contacts.website}</span>}
            {contacts.telegram && <span>{contacts.telegram}</span>}
          </div>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-[1.35fr,0.9fr] gap-6 text-[11px] leading-snug">
        <div className="space-y-4">
          {summary && (
            <section className="space-y-1.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Profile
              </h2>
              <p className="text-slate-800 whitespace-pre-line">{summary}</p>
            </section>
          )}

          {experience?.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Experience
              </h2>
              {experience.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex justify-between gap-4">
                    <p className="font-medium text-slate-900">
                      {item.position || "Position"}
                      {item.company && (
                        <span className="text-slate-600"> · {item.company}</span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500 whitespace-nowrap">
                      {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                    </p>
                  </div>
                  {(item.location || item.description) && (
                    <div className="space-y-0.5">
                      {item.location && (
                        <p className="text-[10px] text-slate-500">{item.location}</p>
                      )}
                      {item.description && (
                        <p className="text-slate-800 whitespace-pre-line">
                          {item.description}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </section>
          )}

          {projects?.length > 0 && (
            <section className="space-y-2.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Projects
              </h2>
              {projects.map((p) => (
                <div key={p.id} className="space-y-0.5">
                  <div className="flex justify-between gap-4">
                    <p className="font-medium text-slate-900">
                      {p.name || "Project"}
                      {p.role && <span className="text-slate-600"> · {p.role}</span>}
                    </p>
                    {p.link && (
                      <p className="text-[10px] text-sky-600 truncate max-w-[180px] text-right">
                        {p.link}
                      </p>
                    )}
                  </div>
                  {p.stack && (
                    <p className="text-[10px] text-slate-500">{p.stack}</p>
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
        </div>

        <aside className="space-y-4">
          {(skills || softSkills) && (
            <section className="space-y-2">
              {skills && (
                <div className="space-y-1.5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Skills
                  </h2>
                  <p className="text-slate-800 whitespace-pre-line">{skills}</p>
                </div>
              )}
              {softSkills && (
                <div className="space-y-1.5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Soft Skills
                  </h2>
                  <p className="text-slate-800 whitespace-pre-line">{softSkills}</p>
                </div>
              )}
            </section>
          )}

          {education?.length > 0 && (
            <section className="space-y-1.5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                Education
              </h2>
              {education.map((e) => (
                <div key={e.id} className="space-y-0.5">
                  <p className="font-medium text-slate-900">
                    {e.degree || e.field || "Education"}
                  </p>
                  {e.institution && (
                    <p className="text-[10px] text-slate-600">{e.institution}</p>
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
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
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
        </aside>
      </main>
    </div>
  )
}

function SidebarTemplate({ data }: ResumeTemplateProps) {
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
    photo,
  } = data

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-slate-900 flex">
      <aside className="w-[260px] bg-slate-950 text-slate-50 px-6 py-8 flex flex-col gap-6">
        <div className="flex flex-col items-start gap-4">
          {photo ? (
            <img
              src={photo}
              alt={fullName}
              className="w-20 h-20 rounded-2xl object-cover border border-white/20"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-xl font-semibold">
              {(fullName || "N").trim().charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="text-lg font-semibold leading-tight">
              {fullName || "Your Name"}
            </h1>
            <p className="mt-1 text-[11px] text-slate-300">
              {position || "Job Title / Position"}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-[11px] text-slate-200">
          {contacts.email && <p>{contacts.email}</p>}
          {contacts.phone && <p>{contacts.phone}</p>}
          {contacts.location && <p>{contacts.location}</p>}
          {contacts.telegram && <p>{contacts.telegram}</p>}
          {contacts.github && <p>{contacts.github}</p>}
          {contacts.linkedin && <p>{contacts.linkedin}</p>}
          {contacts.website && <p>{contacts.website}</p>}
        </div>

        {skills && (
          <section className="space-y-1.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              Skills
            </h2>
            <p className="text-[11px] text-slate-100 whitespace-pre-line">
              {skills}
            </p>
          </section>
        )}

        {softSkills && (
          <section className="space-y-1.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              Soft Skills
            </h2>
            <p className="text-[11px] text-slate-100 whitespace-pre-line">
              {softSkills}
            </p>
          </section>
        )}

        {languages?.length > 0 && (
          <section className="space-y-1.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-200">
              Languages
            </h2>
            <ul className="space-y-0.5 text-[11px]">
              {languages.map((l) => (
                <li key={l.id}>
                  {l.name}
                  {l.level && <span className="text-slate-400"> · {l.level}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </aside>

      <main className="flex-1 px-8 py-8 space-y-5 text-[11px] leading-snug">
        {summary && (
          <section className="space-y-1.5 border-b border-slate-200 pb-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Profile
            </h2>
            <p className="text-slate-800 whitespace-pre-line">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="space-y-2.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Experience
            </h2>
            {experience.map((item) => (
              <div key={item.id} className="space-y-0.5">
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {item.position || "Position"}
                    {item.company && (
                      <span className="text-slate-600"> · {item.company}</span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-500 whitespace-nowrap">
                    {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                  </p>
                </div>
                {item.location && (
                  <p className="text-[10px] text-slate-500">{item.location}</p>
                )}
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
          <section className="space-y-2.5">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Projects
            </h2>
            {projects.map((p) => (
              <div key={p.id} className="space-y-0.5">
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {p.name || "Project"}
                    {p.role && <span className="text-slate-600"> · {p.role}</span>}
                  </p>
                  {p.link && (
                    <p className="text-[10px] text-sky-600 truncate max-w-[200px] text-right">
                      {p.link}
                    </p>
                  )}
                </div>
                {p.stack && (
                  <p className="text-[10px] text-slate-500">{p.stack}</p>
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

        {education?.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700">
              Education
            </h2>
            {education.map((e) => (
              <div key={e.id} className="space-y-0.5">
                <p className="font-medium text-slate-900">
                  {e.degree || e.field || "Education"}
                  {e.institution && (
                    <span className="text-slate-600"> · {e.institution}</span>
                  )}
                </p>
                {(e.startDate || e.endDate) && (
                  <p className="text-[10px] text-slate-500">
                    {formatPeriod(e.startDate, e.endDate)}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

function CompactTemplate({ data }: ResumeTemplateProps) {
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
      <header className="flex flex-col gap-2 border-b border-slate-200 pb-3">
        <div className="flex justify-between gap-4">
          <div>
            <h1 className="text-[24px] font-semibold tracking-tight leading-tight">
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

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
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
          </div>

          <div className="space-y-3">
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
                    <p className="text-slate-800 whitespace-pre-line">
                      {softSkills}
                    </p>
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
          </div>
        </div>
      </main>
    </div>
  )
}

const templateMap = {
  default: NeoTemplate,
  classic: SidebarTemplate,
  minimal: NeoTemplate,
  modern: CompactTemplate,
  neo: NeoTemplate,
  sidebar: SidebarTemplate,
  compact: CompactTemplate,
} as const

export function ResumePrint({ data, locale }: { data: Resume; locale: Locale }) {
  const key =
    (data.templateKey as keyof typeof templateMap) && templateMap[data.templateKey as keyof typeof templateMap]
      ? (data.templateKey as keyof typeof templateMap)
      : "default"
  const Template = templateMap[key] ?? NeoTemplate
  return <Template data={data} locale={locale} />
}
