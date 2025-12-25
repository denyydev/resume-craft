"use client";

import { AuthButton } from "@/components/AuthButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { MenuProps } from "antd";
import { Dropdown, Layout, Menu, Space } from "antd";
import { FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const { Header, Content } = Layout;

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] === "en" ? "en" : "ru";

  const editorHref = `/${currentLocale}/editor`;
  const resumesHref = `/${currentLocale}/resumes`;

  const selectedKey = pathname?.includes("/resumes") ? "resumes" : "editor";

  const items: MenuProps["items"] = [
    {
      key: "editor",
      label: <Link href={editorHref}>Редактор</Link>,
    },
    {
      key: "resumes",
      label: <Link href={resumesHref}>Мои резюме</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="sticky top-0 z-50 flex items-center gap-4 border-b border-slate-400/20 px-4">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4">
          <Link href={editorHref} className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A84FF] shadow-sm">
              <FileText className="h-4 w-4 text-white" />
            </div>
            <span className="text-[16px] font-semibold tracking-tight">
              ResumeCraft
            </span>
          </Link>

          <div className="hidden items-center gap-4 sm:flex">
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              items={items}
              className="min-w-[320px] border-b-0 bg-transparent"
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
                <a className="px-3 py-2 rounded-full border border-[rgba(148,163,184,0.25)]">
                  Меню
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
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6">
          {children}
        </div>
      </Content>
    </Layout>
  );
}
