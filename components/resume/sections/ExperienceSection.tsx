"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  BankOutlined,
  CalendarOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Empty,
  Form,
  Input,
  Space,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const messages = {
  ru: {
    sectionTitle: "Опыт работы",
    sectionSubtitle: "Укажи самые релевантные позиции за последние годы.",
    addButton: "Добавить место работы",
    emptyState:
      "Пока нет ни одной записи. Нажми кнопку ниже, чтобы добавить опыт.",
    company: "Компания",
    companyPlaceholder: "ООО «Рога и Копыта»",
    position: "Должность",
    positionPlaceholder: "Frontend Developer",
    location: "Локация",
    locationPlaceholder: "Москва / Remote",
    startDate: "Начало",
    endDate: "Окончание",
    currentCheckbox: "Работаю здесь сейчас",
    description: "Описание",
    descriptionPlaceholder: "Опиши задачи и достижения...",
  },
  en: {
    sectionTitle: "Work experience",
    sectionSubtitle: "List the most relevant positions from recent years.",
    addButton: "Add experience",
    emptyState:
      "No experience added yet. Click the button below to add experience.",
    company: "Company",
    companyPlaceholder: "Acme Inc.",
    position: "Position",
    positionPlaceholder: "Frontend Developer",
    location: "Location",
    locationPlaceholder: "Berlin / Remote",
    startDate: "Start date",
    endDate: "End date",
    currentCheckbox: "I currently work here",
    description: "Description",
    descriptionPlaceholder: "Describe tasks and achievements...",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function ExperienceSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const experience = useResumeStore((s) => s.resume.experience ?? []);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return (
    <Card
      title={
        <Space>
          <Briefcase size={18} />
          <span>{t.sectionTitle}</span>
        </Space>
      }
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={addExperience}>
          {t.addButton}
        </Button>
      }
    >
      <div style={{ marginTop: -8, marginBottom: 12, opacity: 0.75 }}>
        {t.sectionSubtitle}
      </div>

      <AnimatePresence initial={false}>
        {experience.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Empty description={t.emptyState} />
          </motion.div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {experience.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              >
                <Card
                  size="small"
                  title={`${index + 1}`}
                  extra={
                    <Button
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => removeExperience(item.id)}
                    />
                  }
                >
                  <Form layout="vertical" colon={false}>
                    <Form.Item label={t.company}>
                      <Input
                        value={item.company ?? ""}
                        onChange={(e) =>
                          updateExperience(item.id, { company: e.target.value })
                        }
                        placeholder={t.companyPlaceholder}
                        prefix={<BankOutlined />}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.position}>
                      <Input
                        value={item.position ?? ""}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            position: e.target.value,
                          })
                        }
                        placeholder={t.positionPlaceholder}
                        allowClear
                      />
                    </Form.Item>

                    <Form.Item label={t.location}>
                      <Input
                        value={item.location ?? ""}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            location: e.target.value,
                          })
                        }
                        placeholder={t.locationPlaceholder}
                        prefix={<EnvironmentOutlined />}
                        allowClear
                      />
                    </Form.Item>

                    <Space
                      style={{ width: "100%" }}
                      align="start"
                      size="middle"
                    >
                      <Form.Item label={t.startDate} style={{ flex: 1 }}>
                        <Input
                          type="month"
                          value={item.startDate ?? ""}
                          onChange={(e) =>
                            updateExperience(item.id, {
                              startDate: e.target.value,
                            })
                          }
                          prefix={<CalendarOutlined />}
                        />
                      </Form.Item>

                      <Form.Item label={t.endDate} style={{ flex: 1 }}>
                        <Input
                          type="month"
                          disabled={Boolean(item.isCurrent)}
                          value={item.endDate ?? ""}
                          onChange={(e) =>
                            updateExperience(item.id, {
                              endDate: e.target.value,
                            })
                          }
                          prefix={<CalendarOutlined />}
                        />
                      </Form.Item>
                    </Space>

                    <Form.Item>
                      <Checkbox
                        checked={Boolean(item.isCurrent)}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            isCurrent: e.target.checked,
                            endDate: e.target.checked ? "" : item.endDate,
                          })
                        }
                      >
                        {t.currentCheckbox}
                      </Checkbox>
                    </Form.Item>

                    <Form.Item label={t.description}>
                      <Input.TextArea
                        value={item.description ?? ""}
                        onChange={(e) =>
                          updateExperience(item.id, {
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

            <Divider />

            <Button
              block
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addExperience}
            >
              {t.addButton}
            </Button>
          </div>
        )}
      </AnimatePresence>
    </Card>
  );
}
