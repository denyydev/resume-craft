"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { DeleteOutlined, LinkOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Form, Input, Select, Typography } from "antd";
import { Briefcase, Building2, Github, HandHeart, Users } from "lucide-react";
import React from "react";

const { Title, Text } = Typography;

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
    <section id="activities" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <Github size={16} />
            </span>

            <div className="flex flex-col">
              <Title level={4} className="!m-0">
                {t.title}
              </Title>
              <Text type="secondary" className="text-sm">
                {t.subtitle}
              </Text>
            </div>
          </div>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        {list.length === 0 ? (
          <div className="rounded-xl bg-black/3 p-4">
            <Empty description={t.empty} />
          </div>
        ) : (
          <div className="space-y-6">
            {list.map((item, index) => {
              const type = (item.type as ActivityType) ?? "open-source";
              const headerIcon = iconByType[type];

              return (
                <div key={item.id} className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-baseline gap-2">
                      <Text type="secondary" className="text-xs tabular-nums">
                        {index + 1}
                      </Text>
                      <span className="opacity-70">{headerIcon}</span>

                      <div className="min-w-0">
                        <Text strong className="text-sm">
                          {item.name?.trim() ? item.name : t.namePh}
                        </Text>
                        {item.role?.trim() ? (
                          <div>
                            <Text type="secondary" className="text-sm">
                              {item.role}
                            </Text>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeActivity(item.id)}
                    />
                  </div>

                  <Form layout="vertical" colon={false} className="space-y-1">
                    <Form.Item label={t.type} className="mb-0">
                      <Select
                        value={item.type}
                        onChange={(v) => updateActivity(item.id, { type: v })}
                        options={typeOptions}
                        className="w-full"
                      />
                    </Form.Item>

                    <Form.Item label={t.name} className="mb-0">
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

                    <Form.Item label={t.role} className="mb-0">
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

                    <Form.Item label={t.link} className="mb-0">
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

                  {index !== list.length - 1 && <Divider className="my-4" />}
                </div>
              );
            })}
          </div>
        )}

        <Divider className="my-6" />

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
      </div>
    </section>
  );
}
``;
