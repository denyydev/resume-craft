"use client";

import { Button, Card, Space, Typography } from "antd";
import { ArrowLeft, FileSearch, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const { Title, Text } = Typography;

const messages = {
  ru: {
    title: "Страница не найдена",
    subtitle:
      "Похоже, этой страницы больше нет или ссылка была неправильной. Вернёмся в безопасное место.",
    back: "Назад",
    home: "На главную",
    editor: "Открыть конструктор",
    hintTitle: "Быстрые варианты",
    hint1: "Проверьте адрес в строке браузера",
    hint2: "Если вы искали резюме — откройте «Документы»",
    hint3: "Если это ссылка на экспорт — убедитесь, что резюме существует",
  },
  en: {
    title: "Page not found",
    subtitle:
      "This page doesn’t exist or the link is invalid. Let’s get you back to a safe place.",
    back: "Go back",
    home: "Home",
    editor: "Open builder",
    hintTitle: "Quick options",
    hint1: "Double-check the URL in the address bar",
    hint2: "Looking for a resume? Open “Documents”",
    hint3: "If it’s an export link — make sure the resume exists",
  },
} as const;

type Locale = "ru" | "en";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const homeHref = `/${locale}`;
  const editorHref = `/${locale}/editor`;

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-4 md:p-6 grid place-items-center">
      <div className="w-full max-w-[920px]">
        <Card className="rounded-2xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorFillTertiary)]">
                <FileSearch size={20} className="text-[var(--ant-colorText)]" />
              </div>

              <div className="min-w-0">
                <Title level={2} style={{ margin: 0 }}>
                  404 — {t.title}
                </Title>
                <Text type="secondary" className="block mt-1">
                  {t.subtitle}
                </Text>

                <Space size={10} className="mt-5" wrap>
                  <Button
                    icon={<ArrowLeft size={16} />}
                    onClick={() => history.back()}
                  >
                    {t.back}
                  </Button>

                  <Link href={homeHref}>
                    <Button>{t.home}</Button>
                  </Link>

                  <Link href={editorHref}>
                    <Button type="primary" icon={<LayoutDashboard size={16} />}>
                      {t.editor}
                    </Button>
                  </Link>
                </Space>
              </div>
            </div>

            <div className="w-full md:w-[340px]">
              <div className="rounded-2xl border border-[var(--ant-colorBorder)] bg-[var(--ant-colorBgContainer)] p-4">
                <div className="text-xs font-semibold text-[var(--ant-colorText)]">
                  {t.hintTitle}
                </div>
                <div className="mt-2 space-y-2 text-xs text-[var(--ant-colorTextSecondary)]">
                  <div className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[var(--ant-colorTextSecondary)]" />
                    <span>{t.hint1}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[var(--ant-colorTextSecondary)]" />
                    <span>{t.hint2}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="mt-[2px] h-1.5 w-1.5 rounded-full bg-[var(--ant-colorTextSecondary)]" />
                    <span>{t.hint3}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 text-center text-xs text-[var(--ant-colorTextSecondary)]">
          Resumify
        </div>
      </div>
    </div>
  );
}
