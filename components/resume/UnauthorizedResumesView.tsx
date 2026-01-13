"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { Button, Card } from "antd";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthButton } from "../layout/AuthButton";

type Props = {
  locale: Locale;
};

const messages = {
  ru: {
    title: "Войдите, чтобы управлять резюме",
    subtitle:
      "Сохраняйте версии, экспортируйте PDF и управляйте шаблонами в одном месте.",
    versions: "Версии",
    versionsDesc: "Храните несколько вариантов под разные вакансии.",
    export: "Экспорт",
    exportDesc: "PDF без сюрпризов: кликабельные ссылки и текстовый слой.",
    templates: "Шаблоны",
    templatesDesc: "Выбирайте стиль под роль: ATS или дизайн.",
    goHome: "На главную",
  },
  en: {
    title: "Sign in to manage your resumes",
    subtitle: "Save versions, export PDFs, and manage templates in one place.",
    versions: "Versions",
    versionsDesc: "Keep multiple variants for different jobs.",
    export: "Export",
    exportDesc: "No-surprise PDFs: clickable links and real text layer.",
    templates: "Templates",
    templatesDesc: "Choose ATS-safe or modern styles.",
    goHome: "Go Home",
  },
} as const;

const FEATURES = [
  { key: "versions", Icon: FileText },
  { key: "export", Icon: FileText },
  { key: "templates", Icon: FileText },
] as const;

export function UnauthorizedResumesView({ locale }: Props) {
  const router = useRouter();
  const t = messages[locale];

  return (
    <div className="h-full w-full p-4">
      <div className="mx-auto flex min-h-[70vh] w-full max-w-[860px] items-center">
        <Card className="w-full overflow-hidden rounded-3xl !border-0 shadow-[0_10px_40px_rgba(15,23,42,0.10)]">
          <div className="relative">
            <div className="relative p-6 md:p-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/60 bg-white/70 shadow-sm">
                      <FileText size={20} className="text-slate-800" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-xl font-semibold text-slate-900 md:text-2xl">
                        {t.title}
                      </div>
                      <div className="mt-1 text-sm text-slate-600">
                        {t.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button onClick={() => router.push(`/${locale}`)}>
                      {t.goHome}
                    </Button>
                    <AuthButton />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900/5">
                        <FileText size={16} className="text-slate-700" />
                      </span>
                      <div className="text-sm font-semibold text-slate-900">
                        {t.versions}
                      </div>
                    </div>
                    <div className="mt-2 text-xs leading-5 text-slate-600">
                      {t.versionsDesc}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900/5">
                        <FileText size={16} className="text-slate-700" />
                      </span>
                      <div className="text-sm font-semibold text-slate-900">
                        {t.export}
                      </div>
                    </div>
                    <div className="mt-2 text-xs leading-5 text-slate-600">
                      {t.exportDesc}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-slate-900/5">
                        <FileText size={16} className="text-slate-700" />
                      </span>
                      <div className="text-sm font-semibold text-slate-900">
                        {t.templates}
                      </div>
                    </div>
                    <div className="mt-2 text-xs leading-5 text-slate-600">
                      {t.templatesDesc}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-2 sm:hidden">
                  <Button onClick={() => router.push(`/${locale}`)}>
                    {t.goHome}
                  </Button>
                  <AuthButton />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
