"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

type Locale = "ru" | "en";

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const locale: Locale = useMemo(() => {
    if (currentLocale) return currentLocale;
    const seg = pathname?.split("/")[1];
    return seg === "en" ? "en" : "ru";
  }, [currentLocale, pathname]);

  const toggle = () => {
    if (!pathname) return;

    const nextLocale: Locale = locale === "ru" ? "en" : "ru";
    const segments = pathname.split("/");
    segments[1] = nextLocale;

    router.push(segments.join("/") || "/");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={[
        "text-xs font-semibold uppercase tracking-wide",
        "transition-colors duration-150",
        "text-text2 hover:text-text cursor-pointer",
      ].join(" ")}
      aria-label="Toggle language"
    >
      {locale === "ru" ? "RU" : "EN"}
    </button>
  );
}

