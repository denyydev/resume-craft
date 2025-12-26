"use client";

import { AuthButton } from "@/components/AuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Menu, Space } from "antd";
import {
  FileText,
  FolderOpen,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const { Header, Content } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
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
          {currentLocale === "en" ? "Editor" : "Редактор"}
        </Link>
      ),
    },
    {
      key: "resumes",
      icon: <FolderOpen size={16} />,
      label: (
        <Link href={resumesHref}>
          {currentLocale === "en" ? "My resumes" : "Мои резюме"}
        </Link>
      ),
    },
    {
      key: "guide",
      icon: <ShieldCheck size={16} />,
      label: (
        <Link href={guideHref}>
          {currentLocale === "en" ? "ATS & Tips" : "Советы по резюме"}
        </Link>
      ),
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="sticky top-0 z-50 flex items-center gap-4 border-b border-slate-400/20 px-4">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Link href={editorHref} className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A84FF] shadow-sm">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <span className="text-[16px] font-semibold tracking-tight">
                ResumeCraft
              </span>
            </Link>
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={items}
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <Dropdown
                trigger={["click"]}
                menu={{
                  items,
                  selectable: true,
                  selectedKeys: [selectedKey],
                }}
                placement="bottomRight"
              >
                <a className="rounded-full border border-[rgba(148,163,184,0.25)] px-3 py-2">
                  {currentLocale === "en" ? "Menu" : "Меню"}
                </a>
              </Dropdown>
            </div>

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

      <Content>
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </Content>
    </Layout>
  );
}
