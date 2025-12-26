"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  AppstoreOutlined,
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { FolderGit2 } from "lucide-react";

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
    <Card
      className="w-full"
      title={
        <div className="flex items-center gap-2">
          <FolderGit2 size={18} />
          <span>{t.sectionTitle}</span>
        </div>
      }
    >
      <div className="-mt-2 mb-3 opacity-75">{t.sectionSubtitle}</div>

      <AnimatePresence initial={false}>
        {projects.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Empty description={t.emptyState} />
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              >
                <Card
                  size="small"
                  className="w-full"
                  title={<span className="tabular-nums">{index + 1}</span>}
                  extra={
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeProject(project.id)}
                    />
                  }
                >
                  <Form layout="vertical" colon={false} className="space-y-1">
                    <Form.Item label={t.name}>
                      <Input
                        value={project.name ?? ""}
                        onChange={(e) =>
                          updateProject(project.id, { name: e.target.value })
                        }
                        placeholder={t.namePlaceholder}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.role}>
                      <Input
                        value={project.role ?? ""}
                        onChange={(e) =>
                          updateProject(project.id, { role: e.target.value })
                        }
                        placeholder={t.rolePlaceholder}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.stack}>
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

                    <Form.Item label={t.link}>
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
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addProject}
        >
          {t.addButton}
        </Button>
      </div>
    </Card>
  );
}
