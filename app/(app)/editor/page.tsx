"use client"

import { Layout, Typography } from "antd"
import { EditorShell } from "@/components/resume/sections/EditorShell"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"

const { Title, Text } = Typography

const messages = {
  ru: {
    editorTitle: "Конструктор резюме",
    editorSubtitle: "Заполняй данные слева и сразу смотри превью справа.",
  },
  en: {
    editorTitle: "Resume Builder",
    editorSubtitle: "Fill the form on the left and see live preview on the right.",
  },
} as const

export default function EditorPage({
  params,
}: {
  params: { locale: "ru" | "en" }
}) {
  const dict = messages[params.locale] ?? messages.ru

  return (
    <Layout className="min-h-screen bg-slate-100">
      <Layout.Header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="py-3">
            <Title level={4} className="!mb-0">
              {dict.editorTitle}
            </Title>
            <Text type="secondary" className="text-xs">
              {dict.editorSubtitle}
            </Text>
          </div>

          <div className="py-3">
            <LanguageSwitcher currentLocale={params.locale} />
          </div>
        </div>
      </Layout.Header>

      <Layout.Content className="py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 lg:flex-row">
          <div className="w-full lg:w-[52%]">
            <EditorShell />
          </div>
          <div className="w-full lg:w-[48%]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">
              <ResumePreview />
            </div>
          </div>
        </div>
      </Layout.Content>
    </Layout>
  )
}
