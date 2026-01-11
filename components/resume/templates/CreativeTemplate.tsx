"use client";

import { formatPeriod, type ResumeTemplateProps } from "./shared/common";

function hasText(v?: string | null) {
  return Boolean((v ?? "").trim());
}

function hasAnyText(values: Array<string | undefined | null>) {
  return values.some((x) => hasText(x));
}

function SectionTitle({
  children,
  accentColor,
}: {
  children: string;
  accentColor: string;
}) {
  return (
    <h2
      className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-2"
      style={{ color: accentColor }}
    >
      {children}
    </h2>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 bg-white">
      {label}
    </span>
  );
}

function ProjectCard({
  name,
  role,
  stack,
  link,
  description,
  accentColor,
}: {
  name?: string;
  role?: string;
  stack?: string;
  link?: string;
  description?: string;
  accentColor: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5">
      <div className="flex justify-between gap-3">
        <p className="font-semibold text-slate-900 break-words">
          {name}
          {role ? <span className="text-slate-500"> · {role}</span> : null}
        </p>

        {link ? (
          <p
            className="text-[10px] truncate max-w-[160px]"
            style={{ color: accentColor }}
          >
            {link}
          </p>
        ) : null}
      </div>

      {stack ? <p className="text-[10px] text-slate-500">{stack}</p> : null}

      {description ? (
        <p className="text-[11px] text-slate-800 whitespace-pre-line leading-snug">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function CreativeTemplate({ data }: ResumeTemplateProps) {
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
    accentColor,
    photo,
    includePhoto,
  } = data;

  const fullNameRaw = [lastName, firstName, patronymic]
    .filter(Boolean)
    .join(" ")
    .trim();

  const fullName = hasText(fullNameRaw) ? fullNameRaw : "";
  const accent = accentColor || "#1677ff";

  const hasLinks = hasAnyText([
    contacts.github,
    contacts.linkedin,
    contacts.website,
    contacts.telegram,
  ]);

  // ✅ FILTER FILLED ITEMS (иначе “пустышки” из стора будут рисоваться)
  const experienceFilled = (experience ?? []).filter((x) =>
    hasAnyText([
      x.company,
      x.position,
      x.location,
      x.startDate,
      x.endDate,
      x.description,
      x.isCurrent ? "1" : "",
    ])
  );

  const projectsFilled = (projects ?? []).filter((p) =>
    hasAnyText([p.name, p.role, p.stack, p.link, p.description])
  );

  const educationFilled = (education ?? []).filter((e) =>
    hasAnyText([e.institution, e.degree, e.field, e.startDate, e.endDate])
  );

  const languagesFilled = (languages ?? []).filter((l) =>
    hasAnyText([l.name, l.level])
  );

  const techTags = (techSkills?.tags ?? [])
    .map((x) => x.trim())
    .filter(Boolean);
  const techNote = (techSkills?.note ?? "").trim();

  const softTags = (softSkills?.tags ?? [])
    .map((x) => x.trim())
    .filter(Boolean);
  const softNote = (softSkills?.note ?? "").trim();

  const showTech = techTags.length > 0 || hasText(techNote);
  const showSoft = softTags.length > 0 || hasText(softNote);

  return (
    <div
      className="w-[794px] min-h-[1123px] bg-slate-50 text-slate-900 px-10 py-10"
      style={{
        WebkitPrintColorAdjust: "exact",
        printColorAdjust: "exact",
      }}
    >
      {/* HEADER */}
      <header className="mb-8 flex items-center justify-between gap-6">
        <div className="min-w-0">
          <h1 className="text-[32px] font-semibold tracking-tight leading-tight">
            {fullName || "Your Name"}
          </h1>

          {hasText(position) ? (
            <p className="mt-1 text-sm font-medium" style={{ color: accent }}>
              {position}
            </p>
          ) : null}

          {/* contacts only if реально есть что показывать */}
          {hasAnyText([contacts.location, contacts.email, contacts.phone]) ? (
            <div className="mt-3 text-[11px] text-slate-600 space-y-0.5">
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                {hasText(contacts.location) ? (
                  <span>{contacts.location}</span>
                ) : null}
                {hasText(contacts.email) ? <span>{contacts.email}</span> : null}
                {hasText(contacts.phone) ? <span>{contacts.phone}</span> : null}
              </div>

              {hasLinks ? (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {hasText(contacts.website) ? (
                    <span>{contacts.website}</span>
                  ) : null}
                  {hasText(contacts.linkedin) ? (
                    <span>{contacts.linkedin}</span>
                  ) : null}
                  {hasText(contacts.github) ? (
                    <span>{contacts.github}</span>
                  ) : null}
                  {hasText(contacts.telegram) ? (
                    <span>{contacts.telegram}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* фото только если includePhoto && photo */}
        {includePhoto !== false && hasText(photo) ? (
          <img
            src={photo}
            alt={fullName || "Photo"}
            className="w-24 h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
          />
        ) : null}
      </header>

      {/* CONTENT */}
      <main className="grid grid-cols-[1.6fr,1fr] gap-8 text-[11px] leading-snug">
        {/* LEFT */}
        <div className="space-y-6">
          {hasText(summary) ? (
            <section>
              <SectionTitle accentColor={accent}>Profile</SectionTitle>
              <p className="text-slate-800 whitespace-pre-line">{summary}</p>
            </section>
          ) : null}

          {projectsFilled.length > 0 ? (
            <section className="space-y-3">
              <SectionTitle accentColor={accent}>
                Selected Projects
              </SectionTitle>

              <div className="space-y-3">
                {projectsFilled.map((p) => (
                  <ProjectCard
                    key={p.id}
                    name={(p.name ?? "").trim() || "Project"}
                    role={(p.role ?? "").trim() || undefined}
                    stack={(p.stack ?? "").trim() || undefined}
                    link={(p.link ?? "").trim() || undefined}
                    description={(p.description ?? "").trim() || undefined}
                    accentColor={accent}
                  />
                ))}
              </div>
            </section>
          ) : null}

          {experienceFilled.length > 0 ? (
            <section className="space-y-3">
              <SectionTitle accentColor={accent}>Experience</SectionTitle>

              {experienceFilled.map((item) => {
                const pos = (item.position ?? "").trim();
                const company = (item.company ?? "").trim();
                const loc = (item.location ?? "").trim();
                const desc = (item.description ?? "").trim();

                return (
                  <div key={item.id} className="space-y-1 break-inside-avoid">
                    <div className="flex justify-between gap-4">
                      <p className="font-medium text-slate-900">
                        {pos || "Position"}
                        {company ? (
                          <span className="text-slate-600"> · {company}</span>
                        ) : null}
                      </p>
                      <p className="text-[10px] text-slate-500 whitespace-nowrap">
                        {formatPeriod(
                          item.startDate,
                          item.endDate,
                          item.isCurrent
                        )}
                      </p>
                    </div>

                    {loc ? (
                      <p className="text-[10px] text-slate-500">{loc}</p>
                    ) : null}
                    {desc ? (
                      <p className="text-slate-800 whitespace-pre-line">
                        {desc}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}
        </div>

        {/* RIGHT */}
        <aside className="space-y-6">
          {showTech ? (
            <section>
              <SectionTitle accentColor={accent}>Skills</SectionTitle>

              {techTags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {techTags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              ) : null}

              {hasText(techNote) ? (
                <p className="mt-2 whitespace-pre-line text-slate-800">
                  {techNote}
                </p>
              ) : null}
            </section>
          ) : null}

          {showSoft ? (
            <section>
              <SectionTitle accentColor={accent}>Soft Skills</SectionTitle>

              {softTags.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {softTags.map((t) => (
                    <Tag key={t} label={t} />
                  ))}
                </div>
              ) : null}

              {hasText(softNote) ? (
                <p className="mt-2 whitespace-pre-line text-slate-800">
                  {softNote}
                </p>
              ) : null}
            </section>
          ) : null}

          {languagesFilled.length > 0 ? (
            <section>
              <SectionTitle accentColor={accent}>Languages</SectionTitle>
              <div className="flex flex-wrap gap-1.5">
                {languagesFilled.map((l) => {
                  const name = (l.name ?? "").trim();
                  const level = (l.level ?? "").trim();
                  return (
                    <Tag
                      key={l.id}
                      label={`${name}${level ? ` · ${level}` : ""}`}
                    />
                  );
                })}
              </div>
            </section>
          ) : null}

          {educationFilled.length > 0 ? (
            <section className="space-y-2">
              <SectionTitle accentColor={accent}>Education</SectionTitle>

              {educationFilled.map((e) => {
                const degree = (e.degree ?? "").trim();
                const field = (e.field ?? "").trim();
                const inst = (e.institution ?? "").trim();

                const title = degree || field || "Education";
                const dates = formatPeriod(e.startDate, e.endDate, false);

                return (
                  <div key={e.id} className="break-inside-avoid">
                    <p className="font-medium text-slate-900">{title}</p>
                    {inst ? (
                      <p className="text-[10px] text-slate-500">{inst}</p>
                    ) : null}
                    {dates ? (
                      <p className="text-[10px] text-slate-500">{dates}</p>
                    ) : null}
                  </div>
                );
              })}
            </section>
          ) : null}
        </aside>
      </main>
    </div>
  );
}
