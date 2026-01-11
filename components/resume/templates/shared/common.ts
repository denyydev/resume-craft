import type { Locale } from "@/lib/useCurrentLocale";
import type { Resume } from "@/types/resume";

export type ResumeTemplateProps = {
  data: Resume;
  locale: Locale;
};

export function formatPeriod(
  start?: string,
  end?: string,
  isCurrent?: boolean
) {
  if (!start && !end) return "";
  if (isCurrent) return `${start || ""} — Present`;
  if (start && end) return `${start} — ${end}`;
  return start || end || "";
}

export function hasText(value?: string | null) {
  return Boolean((value ?? "").trim());
}

export function hasAnyText(values: Array<string | undefined | null>) {
  return values.some((v) => hasText(v ?? ""));
}

export function joinNonEmpty(
  values: Array<string | undefined | null>,
  sep = " · "
) {
  return values
    .map((v) => (v ?? "").trim())
    .filter(Boolean)
    .join(sep);
}
