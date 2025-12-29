"use client";

import { AuthButton } from "@/components/AuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { BrandLink } from "@/components/ui/BrandLink";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Menu, Space } from "antd";
import { FolderOpen, LayoutDashboard, ShieldCheck } from "lucide-react";
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
      <Header className="sticky top-0 z-50 h-16 flex items-center gap-4 border-b border-slate-400/20 px-4">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4">
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

      {/* ВАЖНО: скролл только тут */}
      <Content className="flex-1 min-h-0 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1440px]">{children}</div>
      </Content>
    </Layout>
  );
}
