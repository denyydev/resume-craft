"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { Input, Space, Typography } from "antd"

const { TextArea } = Input
const { Text } = Typography

export function SkillsSection() {
  const { resume, setSkills, setSoftSkills } = useResumeStore()

  return (
    <div className="space-y-6">
      <Space direction="vertical" size={4} className="w-full">
        <Text className="text-sm font-semibold text-slate-900">
          Навыки и стек
        </Text>
        <Text type="secondary" className="text-xs">
          Технические и мягкие навыки, которые лучше всего показывают твой профиль.
        </Text>
      </Space>

      <Space direction="vertical" size={4} className="w-full">
        <Text className="text-xs font-medium text-slate-700">
          Технические навыки
        </Text>
        <TextArea
          autoSize={{ minRows: 4, maxRows: 8 }}
          placeholder="React, TypeScript, Next.js, Redux, Node.js, PostgreSQL, Jest, Playwright..."
          value={resume.skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <Text className="text-[11px] text-slate-400">
          Можно перечислить через запятую или несколькими строками.
        </Text>
      </Space>

      <Space direction="vertical" size={4} className="w-full">
        <Text className="text-xs font-medium text-slate-700">
          Soft skills
        </Text>
        <TextArea
          autoSize={{ minRows: 4, maxRows: 8 }}
          placeholder="Коммуникация, ответственность, менторство, работа с неопределённостью..."
          value={resume.softSkills}
          onChange={(e) => setSoftSkills(e.target.value)}
        />
      </Space>
    </div>
  )
}
