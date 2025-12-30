"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Languages } from "lucide-react";

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

const Row = motion(Card);

export function LanguagesSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const languages = useResumeStore((s) => s.resume.languages ?? []);
  const { addLanguage, updateLanguage, removeLanguage } = useResumeStore();

  return (
    <Card
      className="w-full"
      title={
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
            <Languages size={16} />
          </span>
          <div className="flex flex-col">
            <div className="leading-tight">{t.sectionTitle}</div>
            <div className="text-xs opacity-70">{t.sectionSubtitle}</div>
          </div>
        </div>
      }
      styles={{ header: { borderBottom: "0px", paddingBottom: 8 } }}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {languages.length === 0 ? (
          <motion.div
            key="empty-lang"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl bg-black/3 p-4">
              <Empty description={t.languagesEmpty} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-lang"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col gap-2"
          >
            {languages.map((lang) => (
              <Row
                key={lang.id}
                layout
                size="small"
                className="w-full rounded-xl"
                styles={{ body: { padding: 12 } }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Form layout="vertical" colon={false} className="space-y-1">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Form.Item label={t.languageLabel} className="mb-0">
                          <Input
                            value={lang.name}
                            onChange={(e) =>
                              updateLanguage(lang.id, { name: e.target.value })
                            }
                            placeholder={t.languagePlaceholder}
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item label={t.levelLabel} className="mb-0">
                          <Input
                            value={lang.level}
                            onChange={(e) =>
                              updateLanguage(lang.id, { level: e.target.value })
                            }
                            placeholder={t.levelPlaceholder}
                            allowClear
                          />
                        </Form.Item>
                      </div>
                    </Form>
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeLanguage(lang.id)}
                    className="mt-1"
                  />
                </div>
              </Row>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4">
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          block
          onClick={addLanguage}
          className="rounded-xl"
        >
          {t.addLanguage}
        </Button>
      </div>
    </Card>
  );
}
