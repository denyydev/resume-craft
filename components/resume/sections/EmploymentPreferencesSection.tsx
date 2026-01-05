"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Divider, Form, Input, Select, Switch, Typography } from "antd";
import { Briefcase, Globe2, MapPin, ShieldCheck } from "lucide-react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    title: "Предпочтения по работе",
    subtitle: "Тип занятости, формат, релокация и прочее.",
    employmentType: "Тип занятости",
    employmentTypePh: "Выбери подходящие варианты",
    workFormat: "Формат работы",
    workFormatPh: "Remote / Hybrid / Onsite",
    relocation: "Готов(а) к релокации",
    relocationHint: "Если актуально — включи",
    timezone: "Таймзона",
    timezonePh: "Например: Europe/Warsaw",
    authorization: "Разрешение на работу",
    authorizationPh: "Например: EU citizen / Work permit",
  },
  en: {
    title: "Employment preferences",
    subtitle: "Employment type, work format, relocation, and more.",
    employmentType: "Employment type",
    employmentTypePh: "Choose applicable options",
    workFormat: "Work format",
    workFormatPh: "Remote / Hybrid / Onsite",
    relocation: "Open to relocation",
    relocationHint: "Toggle if applicable",
    timezone: "Timezone",
    timezonePh: "e.g. Europe/Warsaw",
    authorization: "Work authorization",
    authorizationPh: "e.g. EU citizen / Work permit",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export function EmploymentPreferencesSection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const pref = useResumeStore((s) => s.resume.employmentPreferences);
  const setEmploymentPreferences = useResumeStore(
    (s) => s.setEmploymentPreferences
  );

  const employmentTypeOptions =
    locale === "ru"
      ? [
          { value: "full-time", label: "Полная занятость" },
          { value: "part-time", label: "Частичная" },
          { value: "contract", label: "Контракт" },
          { value: "freelance", label: "Фриланс" },
        ]
      : [
          { value: "full-time", label: "Full-time" },
          { value: "part-time", label: "Part-time" },
          { value: "contract", label: "Contract" },
          { value: "freelance", label: "Freelance" },
        ];

  const workFormatOptions = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "Onsite" },
  ];

  return (
    <section
      id="employmentPreferences"
      className="w-full h-full min-h-0 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <Briefcase size={16} />
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
        <Form layout="vertical" colon={false} className="space-y-1">
          <Form.Item label={t.employmentType} className="mb-0">
            <Select
              mode="multiple"
              value={pref.employmentType ?? []}
              onChange={(v) => setEmploymentPreferences({ employmentType: v })}
              placeholder={t.employmentTypePh}
              options={employmentTypeOptions}
              className="w-full"
              allowClear
            />
          </Form.Item>

          <Form.Item label={t.workFormat} className="mb-0">
            <Select
              mode="multiple"
              value={pref.workFormat ?? []}
              onChange={(v) => setEmploymentPreferences({ workFormat: v })}
              placeholder={t.workFormatPh}
              options={workFormatOptions}
              className="w-full"
              allowClear
            />
          </Form.Item>

          <Form.Item
            label={
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Globe2 size={16} />
                  <span>{t.relocation}</span>
                </div>
                <Text type="secondary" className="text-xs">
                  {t.relocationHint}
                </Text>
              </div>
            }
            className="mb-0"
          >
            <Switch
              checked={Boolean(pref.relocation)}
              onChange={(checked) =>
                setEmploymentPreferences({ relocation: checked })
              }
            />
          </Form.Item>

          <Form.Item label={t.timezone} className="mb-0">
            <Input
              value={pref.timezone ?? ""}
              onChange={(e) =>
                setEmploymentPreferences({ timezone: e.target.value })
              }
              placeholder={t.timezonePh}
              prefix={<MapPin size={16} />}
              allowClear
            />
          </Form.Item>

          <Form.Item label={t.authorization} className="mb-0">
            <Input
              value={pref.workAuthorization ?? ""}
              onChange={(e) =>
                setEmploymentPreferences({ workAuthorization: e.target.value })
              }
              placeholder={t.authorizationPh}
              prefix={<ShieldCheck size={16} />}
              allowClear
            />
          </Form.Item>
        </Form>
      </div>
    </section>
  );
}
