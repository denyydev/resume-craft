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
  Checkbox,
  DatePicker,
  Divider,
  Empty,
  Form,
  Input,
  Typography,
} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Briefcase } from "lucide-react";

dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

const messages = {
  ru: {
    sectionTitle: "Опыт работы",
    sectionSubtitle:
      "Добавь релевантный профессиональный опыт за последние годы.",
    addButton: "Добавить место работы",
    emptyState:
      "В этом разделе будет отображаться твой опыт работы. Добавь первую запись, чтобы начать.",
    company: "Компания",
    companyPlaceholder: "Название компании",
    position: "Должность",
    positionPlaceholder: "Frontend Developer",
    location: "Локация",
    locationPlaceholder: "Москва / Remote",
    startDate: "Дата начала",
    endDate: "Дата окончания",
    currentCheckbox: "Работаю здесь сейчас",
    description: "Описание",
    descriptionPlaceholder:
      "Кратко опиши обязанности, достижения и используемые технологии.",
  },
  en: {
    sectionTitle: "Work experience",
    sectionSubtitle:
      "Add your most relevant professional experience from recent years.",
    addButton: "Add work experience",
    emptyState:
      "Your work experience will appear here. Add your first entry to get started.",
    company: "Company",
    companyPlaceholder: "Company name",
    position: "Position",
    positionPlaceholder: "Frontend Developer",
    location: "Location",
    locationPlaceholder: "Berlin / Remote",
    startDate: "Start date",
    endDate: "End date",
    currentCheckbox: "I currently work here",
    description: "Description",
    descriptionPlaceholder:
      "Briefly describe your responsibilities, achievements and technologies used.",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

const MONTH_FORMAT = "YYYY-MM";

export function ExperienceSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const experience = useResumeStore((s) => s.resume.experience ?? []);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return (
    <section id="experience" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <Briefcase size={16} />
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
        {experience.length === 0 ? (
          <div className="rounded-xl bg-black/3 p-4">
            <Empty description={t.emptyState} />
          </div>
        ) : (
          <div className="space-y-6">
            {experience.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-baseline gap-2">
                    <Text type="secondary" className="text-xs tabular-nums">
                      {index + 1}
                    </Text>
                    <Text className="text-sm">
                      {item.position?.trim() || t.position}
                    </Text>
                    {item.company?.trim() ? (
                      <Text type="secondary" className="text-sm">
                        · {item.company.trim()}
                      </Text>
                    ) : null}
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeExperience(item.id)}
                  />
                </div>

                <Form layout="vertical" colon={false} className="space-y-1">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Form.Item label={t.company} className="mb-0">
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

                    <Form.Item label={t.position} className="mb-0">
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
                  </div>

                  <Form.Item label={t.location} className="mb-0">
                    <Input
                      value={item.location ?? ""}
                      onChange={(e) =>
                        updateExperience(item.id, { location: e.target.value })
                      }
                      placeholder={t.locationPlaceholder}
                      prefix={<EnvironmentOutlined />}
                      allowClear
                    />
                  </Form.Item>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Form.Item label={t.startDate} className="mb-0">
                      <DatePicker
                        picker="month"
                        format={MONTH_FORMAT}
                        value={
                          item.startDate
                            ? dayjs(item.startDate, MONTH_FORMAT)
                            : null
                        }
                        onChange={(v) =>
                          updateExperience(item.id, {
                            startDate: v ? v.format(MONTH_FORMAT) : "",
                          })
                        }
                        className="w-full"
                        suffixIcon={<CalendarOutlined />}
                      />
                    </Form.Item>

                    <Form.Item label={t.endDate} className="mb-0">
                      <DatePicker
                        picker="month"
                        format={MONTH_FORMAT}
                        disabled={Boolean(item.isCurrent)}
                        value={
                          item.endDate
                            ? dayjs(item.endDate, MONTH_FORMAT)
                            : null
                        }
                        onChange={(v) =>
                          updateExperience(item.id, {
                            endDate: v ? v.format(MONTH_FORMAT) : "",
                          })
                        }
                        className="w-full"
                        suffixIcon={<CalendarOutlined />}
                      />
                    </Form.Item>
                  </div>

                  <Form.Item className="mb-0">
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

                  <Form.Item label={t.description} className="mb-0">
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

                {index !== experience.length - 1 && (
                  <Divider className="my-4" />
                )}
              </div>
            ))}
          </div>
        )}

        <Divider className="my-6" />

        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addExperience}
        >
          {t.addButton}
        </Button>
      </div>
    </section>
  );
}
