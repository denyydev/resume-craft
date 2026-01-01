import { ResumePrint } from "@/components/resume/ResumePrint";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeData } from "@/types/resume";
import { notFound } from "next/navigation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface PrintPageProps {
  params: Promise<{
    locale: string;
    id: string;
  }>;
}

function normalizeLocale(value: string): Locale {
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export default async function PrintPage(props: PrintPageProps) {
  const { locale: localeRaw, id } = await props.params;

  if (!id) notFound();

  let resume: { data: unknown } | null = null;

  try {
    resume = await prisma.resume.findUnique({
      where: { id },
      select: { data: true },
    });
  } catch (error) {
    console.error("PrintPage prisma error:", error);
    throw error;
  }

  if (!resume) notFound();

  const locale: Locale = normalizeLocale(localeRaw);

  return <ResumePrint data={resume.data as ResumeData} locale={locale} />;
}
