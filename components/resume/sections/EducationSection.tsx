"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  CalendarOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Divider, Empty, Form, Input, Space } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, GraduationCap, Languages } from "lucide-react";

const messages = {
  ru: {
    sectionTitle: "Образование и языки",
    sectionSubtitle:
      "Формальное образование, профильные курсы и уровни владения иностранными языками.",
    educationTitle: "Образование",
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
    languagesTitle: "Языки",
    addLanguage: "Добавить язык",
    languagesEmpty: "Укажи хотя бы английский и уровень владения.",
    languageLabel: "Язык",
    languagePlaceholder: "Английский",
    levelLabel: "Уровень",
    levelPlaceholder: "B2 / C1 / носитель",
  },
  en: {
    sectionTitle: "Education & languages",
    sectionSubtitle:
      "Formal education, relevant courses and your proficiency in foreign languages.",
    educationTitle: "Education",
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
    languagesTitle: "Languages",
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

export function EducationSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const education = useResumeStore((s) => s.resume.education ?? []);
  const languages = useResumeStore((s) => s.resume.languages ?? []);

  const {
    addEducation,
    updateEducation,
    removeEducation,
    addLanguage,
    updateLanguage,
    removeLanguage,
  } = useResumeStore();

  return (
    <Card
      title={
        <Space>
          <GraduationCap size={18} />
          <span>{t.sectionTitle}</span>
        </Space>
      }
    >
      <div style={{ marginTop: -8, marginBottom: 12, opacity: 0.75 }}>
        {t.sectionSubtitle}
      </div>

      <Space direction="vertical" style={{ width: "100%" }} size="large">
        <Card
          size="small"
          title={
            <Space>
              <BookOpen size={16} />
              <span>{t.educationTitle}</span>
            </Space>
          }
          extra={
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addEducation}
            >
              {t.addEducation}
            </Button>
          }
        >
          <AnimatePresence initial={false}>
            {education.length === 0 ? (
              <motion.div
                key="empty-edu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Empty description={t.educationEmpty} />
              </motion.div>
            ) : (
              <Space direction="vertical" style={{ width: "100%" }}>
                {education.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card
                      size="small"
                      extra={
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => removeEducation(item.id)}
                        />
                      }
                    >
                      <Form layout="vertical" colon={false}>
                        <Form.Item label={t.institution}>
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

                        <Form.Item label={t.field}>
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

                        <Form.Item label={t.degree}>
                          <Input
                            value={item.degree}
                            onChange={(e) =>
                              updateEducation(item.id, {
                                degree: e.target.value,
                              })
                            }
                            placeholder={t.degreePlaceholder}
                            allowClear
                          />
                        </Form.Item>

                        <Space style={{ width: "100%" }}>
                          <Form.Item label={t.startLabel} style={{ flex: 1 }}>
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

                          <Form.Item label={t.endLabel} style={{ flex: 1 }}>
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
                        </Space>
                      </Form>
                    </Card>
                  </motion.div>
                ))}
              </Space>
            )}
          </AnimatePresence>
        </Card>

        <Divider />

        <Card
          size="small"
          title={
            <Space>
              <Languages size={16} />
              <span>{t.languagesTitle}</span>
            </Space>
          }
          extra={
            <Button type="dashed" icon={<PlusOutlined />} onClick={addLanguage}>
              {t.addLanguage}
            </Button>
          }
        >
          <AnimatePresence initial={false}>
            {languages.length === 0 ? (
              <Empty description={t.languagesEmpty} />
            ) : (
              <Space direction="vertical" style={{ width: "100%" }}>
                {languages.map((lang) => (
                  <motion.div
                    key={lang.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Card
                      size="small"
                      extra={
                        <Button
                          danger
                          type="text"
                          icon={<DeleteOutlined />}
                          onClick={() => removeLanguage(lang.id)}
                        />
                      }
                    >
                      <Form layout="vertical" colon={false}>
                        <Form.Item label={t.languageLabel}>
                          <Input
                            value={lang.name}
                            onChange={(e) =>
                              updateLanguage(lang.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder={t.languagePlaceholder}
                            allowClear
                          />
                        </Form.Item>

                        <Form.Item label={t.levelLabel}>
                          <Input
                            value={lang.level}
                            onChange={(e) =>
                              updateLanguage(lang.id, {
                                level: e.target.value,
                              })
                            }
                            placeholder={t.levelPlaceholder}
                            allowClear
                          />
                        </Form.Item>
                      </Form>
                    </Card>
                  </motion.div>
                ))}
              </Space>
            )}
          </AnimatePresence>
        </Card>
      </Space>
    </Card>
  );
}
