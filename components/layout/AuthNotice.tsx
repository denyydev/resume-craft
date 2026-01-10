"use client";

import { Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  locale: "ru" | "en";
};

export function AuthNotice({ locale }: Props) {
  const { data: session, status } = useSession();
  const [closed, setClosed] = useState(false);

  if (status === "loading") return null;
  if (session?.user || closed) return null;

  const t = {
    ru: {
      title: "Откройте полный доступ",
      description:
        "Авторизуйтесь, чтобы сохранять резюме, скачивать PDF и управлять документами.",
      action: "Войти",
    },
    en: {
      title: "Get full access",
      description:
        "Sign in to save resumes, download PDFs, and manage your documents.",
      action: "Sign in",
    },
  }[locale];

  return (
    <div
      className="
        border-b border-slate-200
        bg-blue-50/80 backdrop-blur
        dark:border-slate-800
        dark:bg-slate-900/80
      "
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-start gap-3">
          {/* icon */}
          <div className="mt-0.5 text-blue-600 dark:text-blue-400">
            <Info size={18} />
          </div>

          {/* text */}
          <div className="text-sm">
            <div className="font-semibold text-slate-900 dark:text-slate-100">
              {t.title}
            </div>
            <div className="text-slate-700 dark:text-slate-400">
              {t.description}
            </div>
          </div>
        </div>

        {/* close */}
        <button
          onClick={() => setClosed(true)}
          className="
            cursor-pointer rounded-full px-2 py-1 text-xs
            text-slate-500 hover:text-slate-900
            transition-colors
            dark:text-slate-400 dark:hover:text-slate-200
          "
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
