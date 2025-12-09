"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Button,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd"

const { TextArea } = Input
const { Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Проекты и кейсы",
    sectionSubtitle:
      "Pet-проекты, опенсорс и продукты, по которым лучше всего видно твой уровень.",
    addButton: "Добавить проект",
    emptyState:
      "Добавь 2–4 проекта, чтобы показать стек, подход к задачам и реальный опыт разработки.",
    itemTitle: (index: number) => `Проект #${index}`,
    delete: "Удалить",
    name: "Название проекта",
    namePlaceholder: "Сервис генерации резюме",
    role: "Роль",
    rolePlaceholder: "Frontend Engineer / автор проекта",
    stack: "Технологии и стек",
    stackPlaceholder: "Next.js, TypeScript, Tailwind, Prisma",
    link: "Ссылка",
    linkPlaceholder: "GitHub, прод или демо: https://...",
    description: "Краткое описание и результаты",
    descriptionPlaceholder:
      "1–3 предложения: цель проекта, твой вклад, ключевые задачи и заметные результаты (метрики, пользователи, эффект).",
  },
  en: {
    sectionTitle: "Projects and case studies",
    sectionSubtitle:
      "Side projects, open source and key products that best showcase your skills.",
    addButton: "Add project",
    emptyState:
      "Add 2–4 projects to demonstrate your tech stack, problem-solving approach and real development experience.",
    itemTitle: (index: number) => `Project #${index}`,
    delete: "Delete",
    name: "Project name",
    namePlaceholder: "Resume generator service",
    role: "Role",
    rolePlaceholder: "Frontend engineer / creator",
    stack: "Tech stack",
    stackPlaceholder: "Next.js, TypeScript, Tailwind, Prisma",
    link: "Link",
    linkPlaceholder: "GitHub, production or demo: https://...",
    description: "Short description and impact",
    descriptionPlaceholder:
      "1–3 sentences: goal of the project, your contribution, key tasks and measurable results (metrics, users, impact).",
  },
} as const

export function ProjectsSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const { resume, addProject, updateProject, removeProject } = useResumeStore()

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <Space direction="vertical" size={2}>
          <Text className="text-base font-semibold text-slate-900 tracking-tight">
            {t.sectionTitle}
          </Text>
          <Text type="secondary" className="text-xs md:text-sm text-slate-500">
            {t.sectionSubtitle}
          </Text>
        </Space>
        <Button size="small" type="primary" onClick={addProject}>
          {t.addButton}
        </Button>
      </div>

      {resume.projects.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs md:text-sm leading-relaxed text-slate-500">
          {t.emptyState}
        </p>
      )}

      <div className="space-y-4">
        {resume.projects.map((project, index) => (
          <div
            key={project.id}
            className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 md:px-4 md:py-4"
          >
            <div className="flex items-center justify-between gap-2">
              <Text className="text-[11px] uppercase tracking-wide text-slate-500">
                {t.itemTitle(index + 1)}
              </Text>
              <button
                type="button"
                className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
                onClick={() => removeProject(project.id)}
              >
                {t.delete}
              </button>
            </div>

            <Space direction="vertical" size={10} className="w-full">
              <Space direction="vertical" size={4} className="w-full">
                <Text className="text-xs font-medium text-slate-800">
                  {t.name}
                </Text>
                <Input
                  size="middle"
                  placeholder={t.namePlaceholder}
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, { name: e.target.value })
                  }
                  className="rounded-lg"
                />
              </Space>

              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size={4} className="w-full">
                    <Text className="text-xs font-medium text-slate-800">
                      {t.role}
                    </Text>
                    <Input
                      size="middle"
                      placeholder={t.rolePlaceholder}
                      value={project.role}
                      onChange={(e) =>
                        updateProject(project.id, { role: e.target.value })
                      }
                      className="rounded-lg"
                    />
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size={4} className="w-full">
                    <Text className="text-xs font-medium text-slate-800">
                      {t.stack}
                    </Text>
                    <Input
                      size="middle"
                      placeholder={t.stackPlaceholder}
                      value={project.stack}
                      onChange={(e) =>
                        updateProject(project.id, { stack: e.target.value })
                      }
                      className="rounded-lg"
                    />
                  </Space>
                </Col>
              </Row>

              <Space direction="vertical" size={4} className="w-full">
                <Text className="text-xs font-medium text-slate-800">
                  {t.link}
                </Text>
                <Input
                  size="middle"
                  placeholder={t.linkPlaceholder}
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, { link: e.target.value })
                  }
                  className="rounded-lg"
                />
              </Space>

              <Space direction="vertical" size={4} className="w-full">
                <div className="flex items-baseline justify-between gap-2">
                  <Text className="text-xs font-medium text-slate-800">
                    {t.description}
                  </Text>
                </div>
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder={t.descriptionPlaceholder}
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, {
                      description: e.target.value,
                    })
                  }
                  className="rounded-lg text-sm leading-relaxed"
                />
              </Space>
            </Space>

            {index !== resume.projects.length - 1 && (
              <Divider className="!my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
