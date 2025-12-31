"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Form, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const messages = {
  ru: {
    sectionTitle: "Образование",
    sectionSubtitle: "Вуз, колледж, курсы и программы обучения.",
    addEducation: "Добавить запись",
    educationEmpty: "Добавь профильный вуз, колледж или сильные курсы.",
    institution: "Учебное заведение",
    institutionPlaceholder: "НИУ ВШЭ, МГУ, Яндекс Практикум...",
    field: "Специальность / программа",
    fieldPlaceholder: "Прикладная математика и информатика",
    degree: "Степень / формат обучения",
    degreePlaceholder: "Бакалавр, магистр, курс",
    startLabel: "Начало",
    startPlaceholder: "2017",
    endLabel: "Окончание",
    endPlaceholder: "2021",
  },
  en: {
    sectionTitle: "Education",
    sectionSubtitle: "University, college, courses and programs.",
    addEducation: "Add entry",
    educationEmpty: "Add a university, college or strong course.",
    institution: "Institution",
    institutionPlaceholder: "HSE, MSU, university...",
    field: "Major / program",
    fieldPlaceholder: "Computer Science",
    degree: "Degree / program type",
    degreePlaceholder: "Bachelor, Master, course",
    startLabel: "Start",
    startPlaceholder: "2017",
    endLabel: "End",
    endPlaceholder: "2021",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

const Row = motion(Card);

export function EducationSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const education = useResumeStore((s) => s.resume.education ?? []);
  const { addEducation, updateEducation, removeEducation } = useResumeStore();

  return (
    <Card
      id="education"
      className="w-full"
      title={
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
            <BookOpen size={16} />
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
        {education.length === 0 ? (
          <motion.div
            key="empty-edu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl bg-black/3 p-4">
              <Empty description={t.educationEmpty} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="list-edu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex w-full flex-col gap-2"
          >
            {education.map((item) => (
              <Row
                key={item.id}
                layout
                size="small"
                className="w-full rounded-xl"
                styles={{ body: { padding: 12 } }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Form layout="vertical" colon={false} className="space-y-1">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Form.Item label={t.institution} className="mb-0">
                          <Input
                            value={item.institution}
                            onChange={(e) =>
                              updateEducation(item.id, {
                                institution: e.target.value,
                              })
                            }
                            placeholder={t.institutionPlaceholder}
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item label={t.field} className="mb-0">
                          <Input
                            value={item.field}
                            onChange={(e) =>
                              updateEducation(item.id, {
                                field: e.target.value,
                              })
                            }
                            placeholder={t.fieldPlaceholder}
                            allowClear
                          />
                        </Form.Item>
                      </div>

                      <Form.Item label={t.degree} className="mb-0">
                        <Input
                          value={item.degree}
                          onChange={(e) =>
                            updateEducation(item.id, { degree: e.target.value })
                          }
                          placeholder={t.degreePlaceholder}
                          allowClear
                        />
                      </Form.Item>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Form.Item label={t.startLabel} className="mb-0">
                          <Input
                            value={item.startDate}
                            onChange={(e) =>
                              updateEducation(item.id, {
                                startDate: e.target.value,
                              })
                            }
                            placeholder={t.startPlaceholder}
                            prefix={<CalendarOutlined />}
                          />
                        </Form.Item>

                        <Form.Item label={t.endLabel} className="mb-0">
                          <Input
                            value={item.endDate}
                            onChange={(e) =>
                              updateEducation(item.id, {
                                endDate: e.target.value,
                              })
                            }
                            placeholder={t.endPlaceholder}
                            prefix={<CalendarOutlined />}
                          />
                        </Form.Item>
                      </div>
                    </Form>
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeEducation(item.id)}
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
          onClick={addEducation}
          className="rounded-xl"
        >
          {t.addEducation}
        </Button>
      </div>
    </Card>
  );
}
