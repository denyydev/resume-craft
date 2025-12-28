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

function sectionTitle(text: string) {
  return (
    <h2 className="text-[12px] font-bold tracking-wide uppercase text-black mt-4 mb-2">
      {text}
    </h2>
  );
}

function lineOrDash(value?: string) {
  const v = (value ?? "").trim();
  return v ? v : "";
}

function joinNonEmpty(values: Array<string | undefined>) {
  return values
    .map((v) => (v ?? "").trim())
    .filter(Boolean)
    .join(" | ");
}

function asCommaList(values?: string[]) {
  if (!values || values.length === 0) return "";
  return values
    .map((x) => x.trim())
    .filter(Boolean)
    .join(", ");
}

export function AtsFriendlyTemplate({ data }: ResumeTemplateProps) {
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
    includePhoto,
    photo,
    sectionsVisibility,
  } = data;

  const visible = (key: keyof typeof sectionsVisibility) =>
    sectionsVisibility?.[key] !== false;

  const headerLine = joinNonEmpty([
    lineOrDash(contacts.location),
    lineOrDash(contacts.email),
    lineOrDash(contacts.phone),
    lineOrDash(contacts.website),
    lineOrDash(contacts.linkedin),
    lineOrDash(contacts.github),
    lineOrDash(contacts.telegram),
  ]);

  const tech = [asCommaList(techSkills?.tags), (techSkills?.note ?? "").trim()]
    .filter(Boolean)
    .join(techSkills?.tags?.length ? " — " : "");

  const soft = [asCommaList(softSkills?.tags), (softSkills?.note ?? "").trim()]
    .filter(Boolean)
    .join(softSkills?.tags?.length ? " — " : "");

  const prefsParts = [
    employmentPreferences?.employmentType?.length
      ? `Employment: ${employmentPreferences.employmentType.join(", ")}`
      : "",
    employmentPreferences?.workFormat?.length
      ? `Work format: ${employmentPreferences.workFormat.join(", ")}`
      : "",
    typeof employmentPreferences?.relocation === "boolean"
      ? `Relocation: ${employmentPreferences.relocation ? "Yes" : "No"}`
      : "",
    employmentPreferences?.timezone?.trim()
      ? `Timezone: ${employmentPreferences.timezone.trim()}`
      : "",
    employmentPreferences?.workAuthorization?.trim()
      ? `Work authorization: ${employmentPreferences.workAuthorization.trim()}`
      : "",
  ].filter(Boolean);

  return (
    <div className="w-[794px] min-h-[1123px] bg-white text-black px-10 py-10 font-sans">
      <header>
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold leading-tight break-words">
              {fullName || "YOUR NAME"}
            </h1>
            <p className="text-[12px] font-semibold mt-1 break-words">
              {position || "TARGET POSITION"}
            </p>
            {headerLine && (
              <p className="text-[10px] mt-2 break-words">{headerLine}</p>
            )}
          </div>

          {includePhoto && visible("photo") && photo && (
            <img
              src={photo}
              alt=""
              className="h-16 w-16 object-cover"
              style={{ borderRadius: 2 }}
            />
          )}
        </div>
      </header>

      <main className="mt-4 text-[11px] leading-[1.45]">
        {visible("summary") && summary?.trim() && (
          <section>
            {sectionTitle("Summary")}
            <p className="whitespace-pre-line break-words">{summary}</p>
          </section>
        )}

        {visible("techSkills") && tech && (
          <section>
            {sectionTitle("Skills")}
            <p className="whitespace-pre-line break-words">{tech}</p>
          </section>
        )}

        {visible("softSkills") && soft && (
          <section>
            {sectionTitle("Soft Skills")}
            <p className="whitespace-pre-line break-words">{soft}</p>
          </section>
        )}

        {visible("experience") && experience?.length > 0 && (
          <section>
            {sectionTitle("Experience")}
            <div className="space-y-3">
              {experience.map((x) => {
                const title = joinNonEmpty([
                  x.position?.trim() ? x.position.trim() : "Position",
                  x.company?.trim() ? x.company.trim() : "",
                ]);
                const meta = joinNonEmpty([
                  formatPeriod(x.startDate, x.endDate, x.isCurrent),
                  x.location?.trim() ? x.location.trim() : "",
                ]);

                return (
                  <div key={x.id} className="break-inside-avoid">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-bold break-words">{title}</p>
                      <p className="text-[10px] break-words">{meta}</p>
                    </div>
                    {x.description?.trim() && (
                      <p className="mt-1 whitespace-pre-line break-words">
                        {x.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {visible("projects") && projects?.length > 0 && (
          <section>
            {sectionTitle("Projects")}
            <div className="space-y-3">
              {projects.map((p) => {
                const title = joinNonEmpty([
                  p.name?.trim() ? p.name.trim() : "Project",
                  p.role?.trim() ? p.role.trim() : "",
                ]);
                const meta = joinNonEmpty([
                  p.stack?.trim() ? `Stack: ${p.stack.trim()}` : "",
                  p.link?.trim() ? `Link: ${p.link.trim()}` : "",
                ]);

                return (
                  <div key={p.id} className="break-inside-avoid">
                    <p className="font-bold break-words">{title}</p>
                    {meta && <p className="text-[10px] mt-0.5">{meta}</p>}
                    {p.description?.trim() && (
                      <p className="mt-1 whitespace-pre-line break-words">
                        {p.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {visible("education") && education?.length > 0 && (
          <section>
            {sectionTitle("Education")}
            <div className="space-y-2">
              {education.map((e) => {
                const title = joinNonEmpty([
                  e.degree?.trim() ? e.degree.trim() : "",
                  e.field?.trim() ? e.field.trim() : "",
                ]);
                const meta = joinNonEmpty([
                  e.institution?.trim() ? e.institution.trim() : "",
                  formatPeriod(e.startDate, e.endDate),
                ]);

                return (
                  <div key={e.id} className="break-inside-avoid">
                    <p className="font-bold break-words">
                      {title || "Education"}
                    </p>
                    {meta && <p className="text-[10px] break-words">{meta}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {visible("languages") && languages?.length > 0 && (
          <section>
            {sectionTitle("Languages")}
            <p className="break-words">
              {languages
                .map((l) =>
                  joinNonEmpty([
                    l.name?.trim() ? l.name.trim() : "",
                    l.level?.trim() ? l.level.trim() : "",
                  ])
                )
                .filter(Boolean)
                .join(", ")}
            </p>
          </section>
        )}

        {visible("certifications") && certifications?.length > 0 && (
          <section>
            {sectionTitle("Certifications")}
            <div className="space-y-1">
              {certifications.map((c) => (
                <p key={c.id} className="break-words">
                  <span className="font-bold">{c.name}</span>
                  {c.issuer?.trim() ? `, ${c.issuer.trim()}` : ""}
                  {c.year?.trim() ? ` (${c.year.trim()})` : ""}
                  {c.link?.trim() ? ` — ${c.link.trim()}` : ""}
                </p>
              ))}
            </div>
          </section>
        )}

        {visible("activities") && activities?.length > 0 && (
          <section>
            {sectionTitle("Activities")}
            <div className="space-y-2">
              {activities.map((a) => (
                <div key={a.id} className="break-inside-avoid">
                  <p className="font-bold break-words">
                    {joinNonEmpty([
                      a.type?.trim() ? a.type.trim() : "",
                      a.name?.trim() ? a.name.trim() : "",
                      a.role?.trim() ? a.role.trim() : "",
                    ])}
                  </p>
                  {a.link?.trim() && (
                    <p className="text-[10px] break-words">{a.link.trim()}</p>
                  )}
                  {a.description?.trim() && (
                    <p className="mt-1 whitespace-pre-line break-words">
                      {a.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {visible("employmentPreferences") && prefsParts.length > 0 && (
          <section>
            {sectionTitle("Employment Preferences")}
            <p className="break-words">{prefsParts.join(" | ")}</p>
          </section>
        )}
      </main>
    </div>
  );
}
