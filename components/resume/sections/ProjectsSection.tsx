"use client"

import { useResumeStore } from "@/store/useResumeStore"
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

export function ProjectsSection() {
  const { resume, addProject, updateProject, removeProject } = useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Space direction="vertical" size={2}>
          <Text className="text-sm font-semibold text-slate-900">
            Проекты
          </Text>
          <Text type="secondary" className="text-xs">
            Pet-проекты, опенсорс или ключевые продукты, над которыми ты работал.
          </Text>
        </Space>
        <Button size="small" type="primary" onClick={addProject}>
          Добавить проект
        </Button>
      </div>

      {resume.projects.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
          Добавь несколько проектов, чтобы показать свой стек и реальный опыт разработки.
        </p>
      )}

      <div className="space-y-4">
        {resume.projects.map((project, index) => (
          <div
            key={project.id}
            className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <Text className="text-xs font-medium text-slate-600">
                Проект #{index + 1}
              </Text>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-red-500"
                onClick={() => removeProject(project.id)}
              >
                Удалить
              </button>
            </div>

            <Space direction="vertical" size={10} className="w-full">
              <Space direction="vertical" size={4} className="w-full">
                <Text className="text-xs font-medium text-slate-700">
                  Название проекта
                </Text>
                <Input
                  size="middle"
                  placeholder="Resume Builder"
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, { name: e.target.value })
                  }
                />
              </Space>

              <Row gutter={[12, 12]}>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size={4} className="w-full">
                    <Text className="text-xs font-medium text-slate-700">
                      Роль
                    </Text>
                    <Input
                      size="middle"
                      placeholder="Frontend Developer"
                      value={project.role}
                      onChange={(e) =>
                        updateProject(project.id, { role: e.target.value })
                      }
                    />
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <Space direction="vertical" size={4} className="w-full">
                    <Text className="text-xs font-medium text-slate-700">
                      Стек
                    </Text>
                    <Input
                      size="middle"
                      placeholder="Next.js, TypeScript, Tailwind, Prisma"
                      value={project.stack}
                      onChange={(e) =>
                        updateProject(project.id, { stack: e.target.value })
                      }
                    />
                  </Space>
                </Col>
              </Row>

              <Space direction="vertical" size={4} className="w-full">
                <Text className="text-xs font-medium text-slate-700">
                  Ссылка
                </Text>
                <Input
                  size="middle"
                  placeholder="https://github.com/username/project или прод"
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, { link: e.target.value })
                  }
                />
              </Space>

              <Space direction="vertical" size={4} className="w-full">
                <Text className="text-xs font-medium text-slate-700">
                  Описание
                </Text>
                <TextArea
                  autoSize={{ minRows: 3, maxRows: 6 }}
                  placeholder="Кратко опиши, что делает проект, какие задачи решал и как это показывает твой уровень."
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, {
                      description: e.target.value,
                    })
                  }
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
