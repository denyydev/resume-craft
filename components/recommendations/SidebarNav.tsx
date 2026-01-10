"use client";

import type { Locale, SectionKey } from "@/content/recommendations/types";
import { BadgeCheck, BookOpen, FileText, Sparkles } from "lucide-react";
import React, { useMemo } from "react";

const ACCENT = "#0A84FF";

const messages = {
  ru: {
    pageTitle: "Рекомендации",
    intro: "Короткие подсказки и ответы, чтобы улучшить резюме и пройти отбор.",
    disclaimer:
      "Подсказки носят рекомендательный характер и не гарантируют результат.",
    nav: { overview: "Обзор", faq: "FAQ", checklist: "Чеклист" },
  },
  en: {
    pageTitle: "Recommendations",
    intro:
      "Quick insights and answers to improve your resume and pass screening.",
    disclaimer: "Tips are informational and don’t guarantee outcomes.",
    nav: { overview: "Overview", faq: "FAQ", checklist: "Checklist" },
  },
} as const;

type Messages = typeof messages;
type LocaleKey = keyof Messages;

function normalizeLocale(value: Locale): LocaleKey {
  return value === "en" ? "en" : "ru";
}

export function SidebarNav({
  locale,
  activeSection,
  onSectionChange,
}: {
  locale: Locale;
  activeSection: SectionKey;
  onSectionChange: (key: SectionKey) => void;
}) {
  const t = messages[normalizeLocale(locale)];

  const navItems = useMemo(
    () =>
      [
        { key: "overview", label: t.nav.overview, Icon: Sparkles },
        { key: "faq", label: t.nav.faq, Icon: BookOpen },
        { key: "checklist", label: t.nav.checklist, Icon: BadgeCheck },
      ] as const satisfies ReadonlyArray<{
        key: SectionKey;
        label: string;
        Icon: React.ComponentType<{ size?: number }>;
      }>,
    [t]
  );

  return (
    <aside
      className="
        rounded-2xl border border-white/10 overflow-hidden
        shadow-lg backdrop-blur
        bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]
        p-3 relative will-change-transform
      "
    >
      <div
        className="
          pointer-events-none absolute inset-0
          before:absolute before:inset-0 before:rounded-2xl
          before:bg-gradient-to-b before:from-white/10 before:to-transparent
          before:opacity-25
        "
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative">
        <div className="mb-3 flex items-start gap-3">
          <span
            className="
              flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
              bg-white/4 ring-1 ring-white/10
            "
            style={{ color: ACCENT }}
          >
            <FileText size={18} />
          </span>

          <div className="min-w-0">
            <div className="text-sm font-semibold tracking-tight text-white">
              {t.pageTitle}
            </div>
            <div className="mt-1 text-xs leading-relaxed text-white/60">
              {t.intro}
            </div>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Recommendations navigation">
          {navItems.map(({ key, label, Icon }) => {
            const isActive = activeSection === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => onSectionChange(key)}
                aria-current={isActive ? "true" : undefined}
                className={
                  isActive
                    ? "group relative flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-left transition-all duration-150 active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-white/20 bg-white/10 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                    : "group relative flex w-full items-center gap-3 cursor-pointer rounded-xl px-3 py-2.5 text-left transition-all duration-150 active:scale-[0.99] outline-none focus-visible:ring-2 focus-visible:ring-white/20 text-white/70 hover:text-white hover:bg-white/6"
                }
              >
                <span
                  className={
                    isActive
                      ? "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r opacity-100 transition-opacity duration-150"
                      : "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-r opacity-0 transition-opacity duration-150"
                  }
                  style={{ backgroundColor: ACCENT }}
                />

                <span
                  className={
                    isActive
                      ? "flex h-8 w-8 items-center justify-center rounded-lg bg-white/6 ring-1 ring-white/10 transition-all duration-150"
                      : "flex h-8 w-8 items-center justify-center rounded-lg bg-white/4 ring-1 ring-white/10 transition-all duration-150 group-hover:bg-white/6"
                  }
                  style={{
                    color: isActive ? ACCENT : "rgba(255,255,255,0.70)",
                  }}
                >
                  <Icon size={16} />
                </span>

                <span className="min-w-0 flex-1 truncate text-[13px] leading-5 text-white">
                  {label}
                </span>

                <span
                  className={
                    isActive
                      ? "ml-auto h-1.5 w-1.5 rounded-full opacity-100 transition-opacity duration-150"
                      : "ml-auto h-1.5 w-1.5 rounded-full opacity-0 transition-opacity duration-150"
                  }
                  style={{
                    backgroundColor: ACCENT,
                    boxShadow: `0 0 0 4px rgba(10,132,255,0.14)`,
                  }}
                />
              </button>
            );
          })}
        </nav>

        <div className="mt-3 px-2">
          <div className="h-px w-full bg-white/5" />
        </div>

        <div className="mt-3 rounded-xl bg-white/4 ring-1 ring-white/10 px-3 py-2">
          <div className="text-[12px] leading-5 text-white/60">
            {t.disclaimer}
          </div>
        </div>
      </div>
    </aside>
  );
}
