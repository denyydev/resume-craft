"use client";

import { formatPeriod, type ResumeTemplateProps } from "./common";

export function NeoTemplate({ data }: ResumeTemplateProps) {
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
  } = data;

  const fullName = [lastName, firstName, patronymic].filter(Boolean).join(" ");

  const techTags = techSkills?.tags ?? [];
  const techNote = techSkills?.note?.trim() ?? "";
  const softTags = softSkills?.tags ?? [];
  const softNote = softSkills?.note?.trim() ?? "";

  const hasTech = techTags.length > 0 || techNote.length > 0;
  const hasSoft = softTags.length > 0 || softNote.length > 0;

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
                        <span className="text-slate-600">
                          {" "}
                          · {item.company}
                        </span>
                      )}
                    </p>
                    <p className="text-[10px] text-slate-500 whitespace-nowrap">
                      {formatPeriod(
                        item.startDate,
                        item.endDate,
                        item.isCurrent
                      )}
                    </p>
                  </div>

                  {(item.location || item.description) && (
                    <div className="space-y-0.5">
                      {item.location && (
                        <p className="text-[10px] text-slate-500">
                          {item.location}
                        </p>
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
                      {p.role && (
                        <span className="text-slate-600"> · {p.role}</span>
                      )}
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
          {(hasTech || hasSoft) && (
            <section className="space-y-2">
              {hasTech && (
                <div className="space-y-1.5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Skills
                  </h2>

                  {techTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {techTags.map((t) => (
                        <span
                          key={`tech-${t}`}
                          className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {techNote && (
                    <p className="text-slate-800 whitespace-pre-line">
                      {techNote}
                    </p>
                  )}
                </div>
              )}

              {hasSoft && (
                <div className="space-y-1.5">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                    Soft Skills
                  </h2>

                  {softTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {softTags.map((t) => (
                        <span
                          key={`soft-${t}`}
                          className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {softNote && (
                    <p className="text-slate-800 whitespace-pre-line">
                      {softNote}
                    </p>
                  )}
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
                    <p className="text-[10px] text-slate-600">
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
                    {l.level && (
                      <span className="text-slate-500"> · {l.level}</span>
                    )}
                  </span>
                ))}
              </div>
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
