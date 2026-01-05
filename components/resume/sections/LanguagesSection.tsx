"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Empty, Form, Input, Typography } from "antd";
import { Languages } from "lucide-react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    sectionTitle: "Языки",
    sectionSubtitle: "Иностранные языки и уровень владения.",
    addLanguage: "Добавить язык",
    languagesEmpty: "Укажи хотя бы английский и уровень владения.",
    languageLabel: "Язык",
    languagePlaceholder: "Английский",
    levelLabel: "Уровень",
    levelPlaceholder: "B2 / C1 / носитель",
  },
  en: {
    sectionTitle: "Languages",
    sectionSubtitle: "Foreign languages and your proficiency.",
    addLanguage: "Add language",
    languagesEmpty: "Add at least English and your level.",
    languageLabel: "Language",
    languagePlaceholder: "English",
    levelLabel: "Level",
    levelPlaceholder: "B2 / C1 / native",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function LanguagesSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const languages = useResumeStore((s) => s.resume.languages ?? []);
  const addLanguage = useResumeStore((s) => s.addLanguage);
  const updateLanguage = useResumeStore((s) => s.updateLanguage);
  const removeLanguage = useResumeStore((s) => s.removeLanguage);

  return (
    <section id="languages" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <Languages size={16} />
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
        {languages.length === 0 ? (
          <div className="rounded-xl bg-black/3 p-4">
            <Empty description={t.languagesEmpty} />
          </div>
        ) : (
          <div className="space-y-6">
            {languages.map((lang, index) => (
              <div key={lang.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Text strong className="text-sm">
                      {lang.name?.trim() ? lang.name : t.languagePlaceholder}
                    </Text>
                    {lang.level?.trim() ? (
                      <div>
                        <Text type="secondary" className="text-sm">
                          {lang.level}
                        </Text>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeLanguage(lang.id)}
                  />
                </div>

                <Form layout="vertical" colon={false} className="space-y-1">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Form.Item label={t.languageLabel} className="mb-0">
                      <Input
                        value={lang.name ?? ""}
                        onChange={(e) =>
                          updateLanguage(lang.id, { name: e.target.value })
                        }
                        placeholder={t.languagePlaceholder}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.levelLabel} className="mb-0">
                      <Input
                        value={lang.level ?? ""}
                        onChange={(e) =>
                          updateLanguage(lang.id, { level: e.target.value })
                        }
                        placeholder={t.levelPlaceholder}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Form>

                {index !== languages.length - 1 && <Divider className="my-4" />}
              </div>
            ))}
          </div>
        )}

        <Divider className="my-6" />

        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addLanguage}
        >
          {t.addLanguage}
        </Button>
      </div>
    </section>
  );
}
