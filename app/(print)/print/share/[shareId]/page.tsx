import { ResumePrint } from "@/components/resume/ResumePrint";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeData } from "@/types/resume";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SharePrintPageProps {
  params: Promise<{
    shareId: string;
  }>;
}

function normalizeLocale(value: string): Locale {
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

/**
 * Print страница для генерации PDF из shareId
 * Используется Playwright для создания PDF
 */
export default async function SharePrintPage(props: SharePrintPageProps) {
  const { shareId } = await props.params;

  if (!shareId) notFound();

  let resume: { locale: string; data: unknown } | null = null;

  try {
    resume = await prisma.resume.findFirst({
      where: {
        shareId,
        isShared: true, // Только если share включен
      },
      select: {
        locale: true,
        data: true,
      },
    });
  } catch (error) {
    console.error("SharePrintPage prisma error:", error);
    throw error;
  }

  if (!resume) notFound();

  const locale: Locale = normalizeLocale(resume.locale);
  const data = resume.data as ResumeData;

  return (
    <ResumePrint data={data} templateKey={data.templateKey} locale={locale} />
  );
}

