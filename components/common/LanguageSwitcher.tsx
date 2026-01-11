"use client";

import { Button } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Locale = "ru" | "en";

export function LanguageSwitcher({
  currentLocale,
}: {
  currentLocale?: Locale;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

    const qs = searchParams?.toString();
    const nextPath = segments.join("/") || "/";

    router.push(qs ? `${nextPath}?${qs}` : nextPath);
  };

  return <Button onClick={toggle}>{locale === "ru" ? "RU" : "EN"}</Button>;
}
