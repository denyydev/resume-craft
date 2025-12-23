"use client";

import { AuthButton } from "@/components/AuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Divider } from "antd";
import { Edit, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] === "en" ? "en" : "ru";

  const isActive = (path: string) => {
    if (!pathname) return false;
    return pathname.includes(path);
  };

  const linkBase =
    "flex items-center gap-2 text-sm font-medium transition-colors";
  const linkActive = "text-text";
  const linkInactive = "text-text3 hover:text-text";

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text">
      <header className="sticky top-0 z-50 border-b border-border bg-surface">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4">
          <Link
            href={`/${currentLocale}/editor`}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-soft dark:shadow-glow">
              <FileText className="h-4 w-4 text-primary-contrast" />
            </div>
            <span className="text-lg font-bold tracking-tight text-text">
              ResumeCraft
            </span>
          </Link>

          <nav className="hidden items-center gap-6 sm:flex">
            <Link
              href={`/${currentLocale}/editor`}
              className={`${linkBase} ${
                isActive("/editor") && !isActive("/resumes")
                  ? linkActive
                  : linkInactive
              }`}
            >
              <span>Редактор</span>
            </Link>

            <Link
              href={`/${currentLocale}/resumes`}
              className={`${linkBase} ${
                isActive("/resumes") ? linkActive : linkInactive
              }`}
            >
              <span>Мои резюме</span>
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <nav className="mr-2 flex items-center gap-1 sm:hidden">
              <Link
                href={`/${currentLocale}/editor`}
                className={`rounded-md p-2 transition-colors ${
                  isActive("/editor") && !isActive("/resumes")
                    ? "bg-surface2 text-text"
                    : "text-text3 hover:bg-surface2 hover:text-text"
                }`}
                aria-label="Редактор"
              >
                <Edit className="h-4 w-4" />
              </Link>

              <Link
                href={`/${currentLocale}/resumes`}
                className={`rounded-md p-2 transition-colors ${
                  isActive("/resumes")
                    ? "bg-surface2 text-text"
                    : "text-text3 hover:bg-surface2 hover:text-text"
                }`}
                aria-label="Мои резюме"
              >
                <FolderOpen className="h-4 w-4" />
              </Link>
            </nav>

            <Divider orientation="vertical" className="!h-6 !border-border" />
            <ThemeSwitcher />
            <Divider orientation="vertical" className="!h-6 !border-border" />
            <LanguageSwitcher currentLocale={currentLocale} />
            <Divider orientation="vertical" className="!h-6 !border-border" />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1440px] flex-1 px-4">
        {children}
      </main>
    </div>
  );
}
