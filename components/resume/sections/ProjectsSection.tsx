"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  AppstoreOutlined,
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Empty, Form, Input, Typography } from "antd";
import { FolderGit2 } from "lucide-react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    sectionTitle: "Проекты и кейсы",
    sectionSubtitle:
      "Pet-проекты, опенсорс и продукты, по которым лучше всего видно твой уровень.",
    addButton: "Добавить проект",
    emptyState:
      "Добавь 2–4 проекта, чтобы показать стек, подход к задачам и реальный опыт разработки.",
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
      "1–3 предложения: цель проекта, твой вклад, ключевые задачи и заметные результаты.",
  },
  en: {
    sectionTitle: "Projects and case studies",
    sectionSubtitle:
      "Side projects, open source and key products that best showcase your skills.",
    addButton: "Add project",
    emptyState:
      "Add 2–4 projects to demonstrate your tech stack, problem-solving approach and real development experience.",
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
      "1–3 sentences: goal of the project, your contribution, key tasks and measurable results.",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function ProjectsSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const projects = useResumeStore((s) => s.resume.projects ?? []);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  return (
    <section id="projects" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <FolderGit2 size={16} />
            </span>

            <div className="flex flex-col">
              <Title level={4} className="!m-0">
                {t.sectionTitle}
              </Title>
              <Text type="secondary" className="text-sm">
                {t.sectionSubtitle}
              </Text>
            </div>
          </div>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        {projects.length === 0 ? (
          <div className="rounded-xl bg-black/3 p-4">
            <Empty description={t.emptyState} />
          </div>
        ) : (
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={project.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 gap-2">
                    <Text type="secondary" className="text-xs tabular-nums">
                      {index + 1}
                    </Text>

                    <div className="min-w-0">
                      <Text strong className="text-sm">
                        {project.name?.trim()
                          ? project.name
                          : t.namePlaceholder}
                      </Text>

                      {project.role?.trim() ? (
                        <div>
                          <Text type="secondary" className="text-sm">
                            {project.role}
                          </Text>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeProject(project.id)}
                  />
                </div>

                <Form layout="vertical" colon={false} className="space-y-1">
                  <Form.Item label={t.name} className="mb-0">
                    <Input
                      value={project.name ?? ""}
                      onChange={(e) =>
                        updateProject(project.id, { name: e.target.value })
                      }
                      placeholder={t.namePlaceholder}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.role} className="mb-0">
                    <Input
                      value={project.role ?? ""}
                      onChange={(e) =>
                        updateProject(project.id, { role: e.target.value })
                      }
                      placeholder={t.rolePlaceholder}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.stack} className="mb-0">
                    <Input
                      value={project.stack ?? ""}
                      onChange={(e) =>
                        updateProject(project.id, { stack: e.target.value })
                      }
                      placeholder={t.stackPlaceholder}
                      prefix={<AppstoreOutlined />}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.link} className="mb-0">
                    <Input
                      value={project.link ?? ""}
                      onChange={(e) =>
                        updateProject(project.id, { link: e.target.value })
                      }
                      placeholder={t.linkPlaceholder}
                      prefix={<LinkOutlined />}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.description} className="mb-0">
                    <Input.TextArea
                      value={project.description ?? ""}
                      onChange={(e) =>
                        updateProject(project.id, {
                          description: e.target.value,
                        })
                      }
                      placeholder={t.descriptionPlaceholder}
                      autoSize={{ minRows: 4, maxRows: 10 }}
                      allowClear
                    />
                  </Form.Item>
                </Form>

                {index !== projects.length - 1 && <Divider className="my-4" />}
              </div>
            ))}
          </div>
        )}

        <Divider className="my-6" />

        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addProject}
        >
          {t.addButton}
        </Button>
      </div>
    </section>
  );
}
