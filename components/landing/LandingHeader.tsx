"use client";

import type { Locale } from "@/app/i18n";
import { usePathname, useRouter } from "next/navigation";

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

type Props = { locale: Locale };

export function LandingHeader({ locale }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const pushLocale = (newLocale: Locale) => {
    if (!pathname) return;
    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "ru" || segments[0] === "en") segments[0] = newLocale;
    else segments.unshift(newLocale);
    router.push(`/${segments.join("/")}`);
  };

  const isRu = locale === "ru";

  return (
    <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
      <div
        className={[
          "relative flex items-center gap-1.5",
          "rounded-full border border-slate-200/70",
          "bg-white/70 backdrop-blur-md",
          "shadow-[0_10px_30px_rgba(15,23,42,0.08)]",
          "px-1.5 py-1",
          "overflow-hidden",
        ].join(" ")}
      >
        {/* subtle highlight */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 to-transparent opacity-60" />

        {/* Segmented language */}
        <div className="relative flex items-center rounded-full bg-white/60 p-0.5 ring-1 ring-slate-200/60">
          <button
            type="button"
            onClick={() => pushLocale("ru")}
            aria-pressed={isRu}
            className={[
              "h-8! px-3! rounded-full! text-xs! cursor-pointer",
              "transition-all! outline-none!",
              "focus-visible:ring-2! focus-visible:ring-indigo-400/35",
              isRu
                ? "bg-white! text-slate-900! shadow-sm!"
                : "text-slate-600! hover:text-slate-900! hover:bg-white/60!!",
            ].join(" ")}
          >
            RU
          </button>

          <button
            type="button"
            onClick={() => pushLocale("en")}
            aria-pressed={!isRu}
            className={[
              "h-8 px-3 rounded-full text-xs! cursor-pointer",
              "transition-all outline-none",
              "focus-visible:ring-2 focus-visible:ring-indigo-400/35",
              !isRu
                ? "bg-white! text-slate-900! shadow-sm!"
                : "text-slate-600! hover:text-slate-900! hover:bg-white/60!",
            ].join(" ")}
          >
            EN
          </button>
        </div>

        {/* divider */}
        <div className="relative mx-1 h-6 w-px bg-slate-200/80" />

        {/* GitHub */}
        <a
          href="https://github.com/denyydev"
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "relative inline-flex h-8 w-8 items-center justify-center rounded-full",
            "text-slate-600 transition-all",
            "hover:text-slate-900 hover:bg-white/60",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/35",
            "active:scale-[0.98]",
          ].join(" ")}
          aria-label="GitHub"
        >
          <GitHubIcon />
        </a>
      </div>
    </div>
  );
}
