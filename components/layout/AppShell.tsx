"use client";

import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/common/ThemeSwitcher";
import { AuthButton } from "@/components/layout/AuthButton";
import { AuthNotice } from "@/components/layout/AuthNotice";
import { BrandLink } from "@/components/layout/BrandLink";
import type { MenuProps } from "antd";
import { Layout, Menu, Space } from "antd";
import { FolderOpen, LayoutDashboard, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const { Header, Content } = Layout;

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

  const items: MenuProps["items"] = [
    {
      key: "editor",
      icon: <LayoutDashboard size={16} />,
      label: (
        <Link href={editorHref}>
          {currentLocale === "en" ? "Builder" : "Конструктор"}
        </Link>
      ),
    },
    {
      key: "resumes",
      icon: <FolderOpen size={16} />,
      label: (
        <Link href={resumesHref}>
          {currentLocale === "en" ? "Documents" : "Документы"}
        </Link>
      ),
    },
    {
      key: "guide",
      icon: <ShieldCheck size={16} />,
      label: (
        <Link href={guideHref}>
          {currentLocale === "en" ? "Insights" : "Инсайты"}
        </Link>
      ),
    },
  ];

  return (
    <Layout className="h-screen overflow-hidden">
      <Header className="sticky top-0 z-50flex items-center gap-4 border-b border-slate-400/20 px-4">
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <BrandLink href={editorHref} />

            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={items}
              disabledOverflow
            />
          </div>

          <div className="flex items-center gap-3">
            <Space
              size={10}
              separator={
                <span className="h-5 w-px bg-[rgba(148,163,184,0.25)]" />
              }
            >
              <ThemeSwitcher />
              <LanguageSwitcher currentLocale={currentLocale} />
              <AuthButton />
            </Space>
          </div>
        </div>
      </Header>
      <AuthNotice locale={currentLocale} />
      <Content className="flex-1 min-h-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </Content>
    </Layout>
  );
}
