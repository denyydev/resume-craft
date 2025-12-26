"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { DeleteOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Empty, Form, Input, Select } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Building2, Github, HandHeart, Users } from "lucide-react";
import React from "react";

const messages = {
  ru: {
    title: "Open Source / Волонтерство",
    subtitle: "Проекты, комьюнити, вклад в OSS, волонтёрская деятельность.",
    add: "Добавить активность",
    empty:
      "Пока нет активностей. Добавь open-source/волонтёрство — это хороший плюс.",
    type: "Тип",
    name: "Проект / Организация",
    namePh: "Например: React Query / GDG / Foo NGO",
    role: "Роль",
    rolePh: "Contributor / Speaker / Volunteer",
    link: "Ссылка",
    linkPh: "https://github.com/...",
    description: "Описание",
    descriptionPh: "Коротко: что делал(а), какой вклад, результат.",
    addOpenSource: "Open Source",
    addVolunteering: "Волонтерство",
    addCommunity: "Комьюнити",
  },
  en: {
    title: "Open Source / Volunteering",
    subtitle: "OSS contributions, community work, volunteering activities.",
    add: "Add activity",
    empty:
      "No activities yet. Add open-source/volunteering — it's a strong plus.",
    type: "Type",
    name: "Project / Organization",
    namePh: "e.g. React Query / GDG / Foo NGO",
    role: "Role",
    rolePh: "Contributor / Speaker / Volunteer",
    link: "Link",
    linkPh: "https://github.com/...",
    description: "Description",
    descriptionPh: "Briefly: what you did, your impact, the result.",
    addOpenSource: "Open Source",
    addVolunteering: "Volunteering",
    addCommunity: "Community",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

type ActivityType = "open-source" | "volunteering" | "community";

export function ActivitiesSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const list = useResumeStore((s) => s.resume.activities ?? []);
  const addActivity = useResumeStore((s) => s.addActivity);
  const updateActivity = useResumeStore((s) => s.updateActivity);
  const removeActivity = useResumeStore((s) => s.removeActivity);

  const typeOptions: { value: ActivityType; label: string }[] = [
    { value: "open-source", label: "Open Source" },
    {
      value: "volunteering",
      label: locale === "ru" ? "Волонтерство" : "Volunteering",
    },
    { value: "community", label: locale === "ru" ? "Комьюнити" : "Community" },
  ];

  const iconByType: Record<ActivityType, React.ReactNode> = {
    "open-source": <Github size={16} />,
    volunteering: <HandHeart size={16} />,
    community: <Users size={16} />,
  };

  return (
    <Card
      className="w-full"
      title={
        <div className="flex items-center gap-2">
          <Github size={18} />
          <span>{t.title}</span>
        </div>
      }
    >
      <div className="-mt-2 mb-3 opacity-75">{t.subtitle}</div>

      <AnimatePresence initial={false}>
        {list.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Empty description={t.empty} />
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {list.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              >
                <Card
                  size="small"
                  className="w-full"
                  title={
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums">{index + 1}</span>
                      <span className="opacity-65">
                        {
                          iconByType[
                            (item.type as ActivityType) ?? "open-source"
                          ]
                        }
                      </span>
                    </div>
                  }
                  extra={
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeActivity(item.id)}
                    />
                  }
                >
                  <Form layout="vertical" colon={false} className="space-y-1">
                    <Form.Item label={t.type}>
                      <Select
                        value={item.type}
                        onChange={(v) => updateActivity(item.id, { type: v })}
                        options={typeOptions}
                        className="w-full"
                      />
                    </Form.Item>

                    <Form.Item label={t.name}>
                      <Input
                        value={item.name ?? ""}
                        onChange={(e) =>
                          updateActivity(item.id, { name: e.target.value })
                        }
                        placeholder={t.namePh}
                        prefix={<Building2 size={16} />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.role}>
                      <Input
                        value={item.role ?? ""}
                        onChange={(e) =>
                          updateActivity(item.id, { role: e.target.value })
                        }
                        placeholder={t.rolePh}
                        prefix={<Briefcase size={16} />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.link}>
                      <Input
                        value={item.link ?? ""}
                        onChange={(e) =>
                          updateActivity(item.id, { link: e.target.value })
                        }
                        placeholder={t.linkPh}
                        prefix={<LinkOutlined />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.description} className="mb-0">
                      <Input.TextArea
                        value={item.description ?? ""}
                        onChange={(e) =>
                          updateActivity(item.id, {
                            description: e.target.value,
                          })
                        }
                        placeholder={t.descriptionPh}
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

      <Divider className="my-4" />

      <div className="flex flex-col gap-2">
        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addActivity("open-source")}
        >
          {t.addOpenSource}
        </Button>
        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addActivity("volunteering")}
        >
          {t.addVolunteering}
        </Button>
        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={() => addActivity("community")}
        >
          {t.addCommunity}
        </Button>
      </div>
    </Card>
  );
}
