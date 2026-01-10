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
      aria-label="Toggle language"
      className="
        cursor-pointer
        text-xs font-semibold uppercase tracking-wide
        text-white!
        transition-colors duration-150
        hover:text-white
      "
    >
      {locale === "ru" ? "RU" : "EN"}
    </button>
  );
}
