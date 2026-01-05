import { ResumePrint } from "@/components/resume/ResumePrint";
import { prisma } from "@/lib/prisma";
import type { Locale } from "@/lib/useCurrentLocale";
import type { ResumeData } from "@/types/resume";
import { notFound } from "next/navigation";
import { Button, Card } from "antd";
import { FileDown } from "lucide-react";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface SharePageProps {
  params: Promise<{
    shareId: string;
  }>;
}

function normalizeLocale(value: string): Locale {
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

/**
 * Публичная страница для просмотра резюме по shareId
 * Доступна без авторизации, но только если isShared=true
 */
export default async function SharePage(props: SharePageProps) {
  const { shareId } = await props.params;

  if (!shareId) notFound();

  let resume: {
    id: string;
    locale: string;
    title: string | null;
    data: unknown;
  } | null = null;

  try {
    resume = await prisma.resume.findFirst({
      where: {
        shareId,
        isShared: true, // Только если share включен
      },
      select: {
        id: true,
        locale: true,
        title: true,
        data: true,
      },
    });
  } catch (error) {
    console.error("SharePage prisma error:", error);
    throw error;
  }

  if (!resume) notFound();

  const locale: Locale = normalizeLocale(resume.locale);
  const data = resume.data as ResumeData;

  const fullName = [data.lastName, data.firstName, data.patronymic].filter(Boolean).join(" ") || resume.title || "Resume";
  const position = data.position || "";

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        {/* Header with download button */}
        <Card className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{fullName}</h1>
              {position && (
                <p className="mt-1 text-lg text-gray-600">{position}</p>
              )}
            </div>
            <Link href={`/api/share/${shareId}/pdf`}>
              <Button
                type="primary"
                size="large"
                icon={<FileDown className="w-4 h-4" />}
                className="font-medium"
              >
                {locale === "ru" ? "Скачать PDF" : "Download PDF"}
              </Button>
            </Link>
          </div>
        </Card>

        {/* Resume preview */}
        <Card>
          <div className="flex justify-center bg-white p-4">
            <div className="w-full max-w-[794px]">
              <ResumePrint
                data={data}
                templateKey={data.templateKey}
                locale={locale}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

