import type { Resume } from "@/types/resume";
import type { Locale } from "@/lib/useCurrentLocale";

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
