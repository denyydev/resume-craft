"use client"

import React from "react"
import { formatPeriod, type ResumeTemplateProps } from "./common"

function InitialAvatar({
  fullName,
  accentColor,
}: {
  fullName?: string
  accentColor: string
}) {
  const letter = (fullName || "N").trim().charAt(0).toUpperCase()
  return (
    <div
      className="w-20 h-20 rounded-2xl bg-slate-950 flex items-center justify-center text-xl font-semibold border"
      style={{ borderColor: `${accentColor}55` }}
    >
      {letter}
    </div>
  )
}

function TagPill({
  label,
  tone = "dark",
}: {
  label: string
  tone?: "dark" | "light"
}) {
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

function SectionTitle({
  children,
  accentColor,
  tone = "light",
}: {
  children: React.ReactNode
  accentColor: string
  tone?: "light" | "dark"
}) {
  const base =
    tone === "dark"
      ? "text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-200"
      : "text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-700"

  return (
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accentColor }} />
      <h2 className={base}>{children}</h2>
    </div>
  )
}

function KeyValueRow({
  label,
  value,
  tone = "dark",
}: {
  label: string
  value?: string
  tone?: "dark" | "light"
}) {
  if (!value) return null
  const labelCls =
    tone === "dark" ? "text-[10px] text-slate-400" : "text-[10px] text-slate-500"
  const valueCls =
    tone === "dark" ? "text-[11px] text-slate-100" : "text-[11px] text-slate-800"
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={labelCls}>{label}</span>
      <span className={`${valueCls} text-right leading-snug`}>{value}</span>
    </div>
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
    accentColor,
    includePhoto,
    employmentPreferences,
    certifications,
    activities,
  } = data

  const accent = accentColor || "#1677ff"

  const techTags = techSkills?.tags ?? []
  const techNote = techSkills?.note?.trim() ?? ""
  const softTags = softSkills?.tags ?? []
  const softNote = softSkills?.note?.trim() ?? ""

  const hasTech = techTags.length > 0 || techNote.length > 0
  const hasSoft = softTags.length > 0 || softNote.length > 0

  const hasPrimaryContacts = !!(contacts.email || contacts.phone || contacts.location)
  const hasLinks = !!(contacts.telegram || contacts.github || contacts.linkedin || contacts.website)

  const pref = employmentPreferences
  const prefEmploymentType = pref?.employmentType?.length ? pref.employmentType.join(" · ") : ""
  const prefWorkFormat = pref?.workFormat?.length ? pref.workFormat.join(" · ") : ""

  const hasPreferences = !!(
    prefEmploymentType ||
    prefWorkFormat ||
    pref?.timezone ||
    pref?.workAuthorization ||
    typeof pref?.relocation === "boolean"
  )

  const hasCerts = (certifications?.length ?? 0) > 0
  const hasActivities = (activities?.length ?? 0) > 0

  const activityLabel = (type?: string) => {
    if (type === "open-source") return "Open Source"
    if (type === "volunteering") return "Volunteering"
    if (type === "community") return "Community"
    return "Activity"
  }

  const contactLines = [contacts.email, contacts.phone, contacts.location].filter(
    Boolean
  ) as string[]

  const linkLines = [
    contacts.telegram,
    contacts.github,
    contacts.linkedin,
    contacts.website,
  ].filter(Boolean) as string[]

  return (
    <div
      className="w-[794px] bg-white text-slate-900 flex"
      style={{
        minHeight: "1123px",
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      <aside
        className="w-[270px] bg-slate-950 text-slate-50 px-6 py-8 flex flex-col gap-6"
        style={{
          boxShadow: `inset 4px 0 0 0 ${accent}`,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        <div className="flex flex-col items-start gap-4">
          {photo && includePhoto !== false ? (
            <img
              src={photo}
              alt={fullName}
              className="w-20 h-20 rounded-2xl object-cover border"
              style={{ borderColor: `${accent}55` }}
            />
          ) : (
            <InitialAvatar fullName={fullName} accentColor={accent} />
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
          <section className="space-y-3">
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
              Preferences
            </SectionTitle>

            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-3">
              <KeyValueRow label="Employment" value={prefEmploymentType} tone="dark" />
              <KeyValueRow label="Format" value={prefWorkFormat} tone="dark" />
              <KeyValueRow
                label="Relocation"
                value={
                  typeof pref?.relocation === "boolean"
                    ? pref.relocation
                      ? "Yes"
                      : "No"
                    : ""
                }
                tone="dark"
              />
              <KeyValueRow label="Timezone" value={pref?.timezone} tone="dark" />
              <KeyValueRow label="Authorization" value={pref?.workAuthorization} tone="dark" />
            </div>
          </section>
        )}

        {(hasTech || hasSoft) && (
          <section className="space-y-4">
            {hasTech && (
              <div className="space-y-2">
                <SectionTitle accentColor={accent} tone="dark">
                  Skills
                </SectionTitle>

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
                <SectionTitle accentColor={accent} tone="dark">
                  Soft Skills
                </SectionTitle>

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
            <SectionTitle accentColor={accent} tone="dark">
              Languages
            </SectionTitle>
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

        {hasCerts && (
          <section className="space-y-2">
            <SectionTitle accentColor={accent} tone="dark">
              Certifications
            </SectionTitle>

            <div className="space-y-2">
              {certifications!.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                >
                  <p className="text-[11px] text-slate-100 leading-snug font-medium">
                    {c.name}
                  </p>
                  <p className="text-[10px] text-slate-300 leading-snug">
                    {[c.issuer, (c as any).year].filter(Boolean).join(" · ")}
                  </p>
                  {c.link && (
                    <p className="text-[10px] truncate mt-1" style={{ color: accent }}>
                      {c.link}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {certifications!.length > 4 && (
              <p className="text-[10px] text-slate-400">+{certifications!.length - 4} more</p>
            )}
          </section>
        )}
      </aside>

      <main
        className="flex-1 px-9 py-8 space-y-5 text-[11px] leading-snug bg-white"
        style={{ WebkitPrintColorAdjust: "exact", printColorAdjust: "exact" }}
      >
        {summary && (
          <section className="space-y-2 border-b border-slate-200 pb-4">
            <SectionTitle accentColor={accent}>Profile</SectionTitle>
            <p className="text-slate-800 whitespace-pre-line leading-snug">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>Experience</SectionTitle>

            {experience.map((item) => (
              <div
                key={item.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
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
            <SectionTitle accentColor={accent}>Projects</SectionTitle>

            {projects.map((p) => (
              <div
                key={p.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {p.name || "Project"}
                    {p.role && <span className="text-slate-600"> · {p.role}</span>}
                  </p>
                  {p.link && (
                    <p
                      className="text-[10px] truncate max-w-[220px] text-right"
                      style={{ color: accent }}
                    >
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

        {hasActivities && (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>Open Source & Volunteering</SectionTitle>

            {activities!.map((a) => (
              <div
                key={a.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <div className="flex justify-between gap-4">
                  <p className="font-medium text-slate-900">
                    {a.name || "Activity"}
                    {a.role && <span className="text-slate-600"> · {a.role}</span>}
                  </p>
                  {a.type && (
                    <span
                      className="text-[10px] whitespace-nowrap px-2 py-0.5 rounded-full border"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      {activityLabel(a.type)}
                    </span>
                  )}
                </div>

                {a.link && (
                  <p className="text-[10px] truncate" style={{ color: accent }}>
                    {a.link}
                  </p>
                )}

                {a.description && (
                  <p className="text-slate-800 whitespace-pre-line leading-snug">
                    {a.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section className="space-y-3">
            <SectionTitle accentColor={accent}>Education</SectionTitle>

            {education.map((e) => (
              <div
                key={e.id}
                className="space-y-1"
                style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
              >
                <p className="font-medium text-slate-900">
                  {e.degree || e.field || "Education"}
                  {e.institution && <span className="text-slate-600"> · {e.institution}</span>}
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
