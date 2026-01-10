"use client";

import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { AuthButton } from "@/components/layout/AuthButton";
import { AuthNotice } from "@/components/layout/AuthNotice";
import { BrandLink } from "@/components/layout/BrandLink";
import { Layout } from "antd";
import { FolderOpen, LayoutDashboard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const { Header, Content } = Layout;

type NavItem = {
  key: "editor" | "resumes" | "guide";
  href: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
};

function NavTabs({ items }: { items: NavItem[] }) {
  return (
    <nav
      className="hidden md:flex items-center gap-1 rounded-full p-1"
      aria-label="Primary"
    >
      {items.map(({ key, href, label, Icon, isActive }) => (
        <Link
          key={key}
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={
            isActive
              ? "relative group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium select-none outline-none transition-all focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 no-underline bg-white/10 !text-white"
              : "relative group inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium select-none outline-none transition-all focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-0 no-underline !text-white/80 hover:!text-white hover:bg-white/5"
          }
        >
          <Icon
            size={16}
            className={
              isActive
                ? "transition-colors text-white"
                : "transition-colors text-white/60 group-hover:text-white/90"
            }
          />
          <span className="relative">
            {label}
            <span
              className={
                isActive
                  ? "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full transition-opacity bg-white/70 opacity-100"
                  : "pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full transition-opacity bg-white/50 opacity-0 group-hover:opacity-40"
              }
            />
          </span>
        </Link>
      ))}
    </nav>
  );
}

function MobileBottomBar({
  items,
  currentLocale,
}: {
  items: NavItem[];
  currentLocale: "ru" | "en";
}) {
  return (
    <div
      className="
        md:hidden
        fixed left-0 right-0 bottom-0 z-50
        border-t border-white/10
        bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]
        backdrop-blur
        shadow-[0_-10px_30px_rgba(0,0,0,0.45)]
      "
      style={{ paddingBottom: "max(env(safe-area-inset-bottom), 10px)" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-gradient-to-b from-white/10 to-transparent" />

      <div className="relative px-4 pt-2">
        <div className="grid grid-cols-5 gap-2">
          {items.map(({ key, href, label, Icon, isActive }) => (
            <Link
              key={key}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={
                isActive
                  ? "col-span-1 flex flex-col items-center justify-center gap-1 rounded-2xl py-2 transition-colors outline-none select-none no-underline focus-visible:ring-2 focus-visible:ring-white/25 bg-white/10 text-white"
                  : "col-span-1 flex flex-col items-center justify-center gap-1 rounded-2xl py-2 transition-colors outline-none select-none no-underline focus-visible:ring-2 focus-visible:ring-white/25 text-white/70 hover:bg-white/5 hover:text-white"
              }
            >
              <Icon
                size={20}
                className={isActive ? "text-white" : "text-white/70"}
              />
              <span className="text-[11px] leading-4">{label}</span>
            </Link>
          ))}

          <div className="col-span-1 flex items-center justify-center">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 px-2 py-2">
              <LanguageSwitcher currentLocale={currentLocale} />
            </div>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <div className="rounded-2xl bg-white/[0.03] border border-white/10 px-2 py-2">
              <AuthButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] === "en" ? "en" : "ru";

  const editorHref = `/${currentLocale}/editor`;
  const resumesHref = `/${currentLocale}/resumes`;
  const guideHref = `/${currentLocale}/guide`;

  const selectedKey = pathname?.includes("/resumes")
    ? "resumes"
    : pathname?.includes("/guide")
    ? "guide"
    : "editor";

  const navItems: NavItem[] = [
    {
      key: "editor",
      href: editorHref,
      Icon: LayoutDashboard,
      label: currentLocale === "en" ? "Builder" : "Конструктор",
      isActive: selectedKey === "editor",
    },
    {
      key: "resumes",
      href: resumesHref,
      Icon: FolderOpen,
      label: currentLocale === "en" ? "Docs" : "Документы",
      isActive: selectedKey === "resumes",
    },
    {
      key: "guide",
      href: guideHref,
      Icon: ShieldCheck,
      label: currentLocale === "en" ? "Guide" : "Инсайты",
      isActive: selectedKey === "guide",
    },
  ];

  return (
    <Layout className="h-screen overflow-hidden">
      <Header
        className="
          hidden md:block
          sticky top-0 z-50
          h-16! leading-16!
          border border-white/10
          bg-gradient-to-b! from-[#0b0b0e]! via-[#0f1117]! to-[#0b0b0e]!
          backdrop-blur
          shadow-[0_10px_30px_rgba(0,0,0,0.45)]
          relative
          before:absolute before:inset-0 before:rounded-full
          before:bg-gradient-to-b before:from-white/10 before:to-transparent
          before:opacity-30 before:pointer-events-none
          px-5!
        "
      >
        <div className="flex w-full items-center justify-between gap-3">
          <div className="shrink-0">
            <BrandLink href={editorHref} />
          </div>

          <div className="min-w-0 flex-1 flex items-center justify-center">
            <NavTabs items={navItems} />
          </div>

          <div className="shrink-0 flex items-center gap-5">
            <LanguageSwitcher currentLocale={currentLocale} />
            <AuthButton />
          </div>
        </div>
      </Header>

      <div className="hidden md:block fixed left-0 right-0 top-16 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <AuthNotice locale={currentLocale} />
        </div>
      </div>

      <Content className="flex-1 min-h-0">
        <div className="h-full w-full overflow-auto pb-28 md:pb-0">
          {children}
        </div>
      </Content>

      <MobileBottomBar items={navItems} currentLocale={currentLocale} />
    </Layout>
  );
}
