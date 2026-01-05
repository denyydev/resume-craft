"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Empty, Form, Input, Typography } from "antd";
import { BookOpen } from "lucide-react";

const { Title, Text } = Typography;

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

export function EducationSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const education = useResumeStore((s) => s.resume.education ?? []);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <section id="education" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <BookOpen size={16} />
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
        {education.length === 0 ? (
          <div className="rounded-xl bg-black/3 p-4">
            <Empty description={t.educationEmpty} />
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Text strong className="text-sm">
                      {item.institution?.trim()
                        ? item.institution
                        : t.institutionPlaceholder}
                    </Text>
                    {item.field?.trim() ? (
                      <div>
                        <Text type="secondary" className="text-sm">
                          {item.field}
                        </Text>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeEducation(item.id)}
                  />
                </div>

                <Form layout="vertical" colon={false} className="space-y-1">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Form.Item label={t.institution} className="mb-0">
                      <Input
                        value={item.institution ?? ""}
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
                        value={item.field ?? ""}
                        onChange={(e) =>
                          updateEducation(item.id, { field: e.target.value })
                        }
                        placeholder={t.fieldPlaceholder}
                        allowClear
                      />
                    </Form.Item>
                  </div>

                  <Form.Item label={t.degree} className="mb-0">
                    <Input
                      value={item.degree ?? ""}
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
                        value={item.startDate ?? ""}
                        onChange={(e) =>
                          updateEducation(item.id, {
                            startDate: e.target.value,
                          })
                        }
                        placeholder={t.startPlaceholder}
                        prefix={<CalendarOutlined />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.endLabel} className="mb-0">
                      <Input
                        value={item.endDate ?? ""}
                        onChange={(e) =>
                          updateEducation(item.id, { endDate: e.target.value })
                        }
                        placeholder={t.endPlaceholder}
                        prefix={<CalendarOutlined />}
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Form>

                {index !== education.length - 1 && <Divider className="my-4" />}
              </div>
            ))}
          </div>
        )}

        <Divider className="my-6" />

        <Button
          type="dashed"
          icon={<PlusOutlined />}
          block
          onClick={addEducation}
        >
          {t.addEducation}
        </Button>
      </div>
    </section>
  );
}
