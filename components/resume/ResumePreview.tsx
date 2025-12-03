"use client"

import { useResumeStore } from "@/store/useResumeStore"

export function ResumePreview() {
  const { resume } = useResumeStore()

  const formatPeriod = (start: string, end: string, isCurrent?: boolean) => {
    if (!start && !end) return ""
    if (isCurrent) return `${start} — настоящее время`
    if (start && end) return `${start} — ${end}`
    return start || end
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[794px] rounded-xl border bg-white px-8 py-8 shadow-sm">
        <header className="border-b pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {resume.fullName || "Ваше имя"}
            </h1>
            <p className="text-sm text-slate-600">
              {resume.position || "Желаемая позиция"}
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
            {resume.contacts.location && <span>{resume.contacts.location}</span>}
            {resume.contacts.email && <span>{resume.contacts.email}</span>}
            {resume.contacts.phone && <span>{resume.contacts.phone}</span>}
            {resume.contacts.telegram && <span>{resume.contacts.telegram}</span>}
            {resume.contacts.github && <span>{resume.contacts.github}</span>}
            {resume.contacts.linkedin && <span>{resume.contacts.linkedin}</span>}
          </div>
        </header>

        <div className="mt-5 space-y-5 text-sm text-slate-800">
          {resume.summary && (
            <section className="space-y-1">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Профиль
              </h2>
              <p className="leading-relaxed whitespace-pre-line">
                {resume.summary}
              </p>
            </section>
          )}

          {resume.experience.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Опыт работы
              </h2>
              <div className="space-y-3">
                {resume.experience.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        {item.position || "Должность"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {formatPeriod(item.startDate, item.endDate, item.isCurrent)}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600">
                      {item.company || "Компания"}
                      {item.location && ` · ${item.location}`}
                    </p>
                    {item.description && (
                      <p className="pt-1 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {(resume.skills || resume.softSkills) && (
            <section className="grid gap-4 md:grid-cols-2">
              {resume.skills && (
                <div className="space-y-1">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Технические навыки
                  </h2>
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {resume.skills}
                  </p>
                </div>
              )}
              {resume.softSkills && (
                <div className="space-y-1">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Soft skills
                  </h2>
                  <p className="text-xs leading-relaxed whitespace-pre-line">
                    {resume.softSkills}
                  </p>
                </div>
              )}
            </section>
          )}

          {resume.projects.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Проекты
              </h2>
              <div className="space-y-3">
                {resume.projects.map((project) => (
                  <div key={project.id} className="space-y-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        {project.name || "Проект"}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          className="text-[11px] text-sky-600 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Ссылка
                        </a>
                      )}
                    </div>
                    <p className="text-xs text-slate-600">
                      {project.role && project.role}
                      {project.stack && project.role && " · "}
                      {project.stack && project.stack}
                    </p>
                    {project.description && (
                      <p className="pt-1 text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                        {project.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.education.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Образование
              </h2>
              <div className="space-y-2">
                {resume.education.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-medium text-slate-900">
                        {item.institution || "Учебное заведение"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {formatPeriod(item.startDate, item.endDate)}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600">
                      {item.field || "Специальность"}
                      {item.degree && ` · ${item.degree}`}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {resume.languages.length > 0 && (
            <section className="space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                Языки
              </h2>
              <div className="flex flex-wrap gap-3 text-xs text-slate-700">
                {resume.languages.map((lang) => (
                  <span key={lang.id}>
                    {lang.name || "Язык"}
                    {lang.level && ` — ${lang.level}`}
                  </span>
                ))}
              </div>
            </section>
          )}

          {!resume.fullName &&
            !resume.position &&
            !resume.summary &&
            resume.experience.length === 0 && (
              <p className="pt-4 text-xs text-slate-400">
                Начни заполнять поля слева, чтобы увидеть превью резюме.
              </p>
            )}
        </div>
      </div>
    </div>
  )
}
