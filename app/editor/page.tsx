"use client"

import { Layout, Typography } from "antd"
import { ResumePreview } from "@/components/resume/ResumePreview"
import { EditorShell } from "@/components/resume/sections/EditorShell"

const { Header, Content } = Layout
const { Title, Text } = Typography

export default function EditorPage() {
  return (
    <Layout className="min-h-screen bg-slate-100">
      <Header className="bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
          <div className="py-3">
            <Title level={4} className="!mb-0">
              Конструктор резюме
            </Title>
            <Text type="secondary" className="text-xs">
              Заполняй данные слева и сразу смотри превью справа.
            </Text>
          </div>
        </div>
      </Header>

      <Content className="py-6">
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
      </Content>
    </Layout>
  )
}
