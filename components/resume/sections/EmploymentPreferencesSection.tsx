"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Card, Form, Input, Select, Space, Switch, Typography } from "antd";
import { Briefcase, Globe2, MapPin, ShieldCheck } from "lucide-react";

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
    <Card
      id="employmentPreferences"
      title={
        <Space>
          <Briefcase size={18} />
          <span>{t.title}</span>
        </Space>
      }
    >
      <Typography.Paragraph type="secondary" style={{ marginTop: -8 }}>
        {t.subtitle}
      </Typography.Paragraph>

      <Form layout="vertical" colon={false}>
        <Form.Item label={t.employmentType}>
          <Select
            mode="multiple"
            value={pref.employmentType ?? []}
            onChange={(v) => setEmploymentPreferences({ employmentType: v })}
            placeholder={t.employmentTypePh}
            options={employmentTypeOptions}
            style={{ width: "100%" }}
            allowClear
          />
        </Form.Item>

        <Form.Item label={t.workFormat}>
          <Select
            mode="multiple"
            value={pref.workFormat ?? []}
            onChange={(v) => setEmploymentPreferences({ workFormat: v })}
            placeholder={t.workFormatPh}
            options={workFormatOptions}
            style={{ width: "100%" }}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label={
            <Space orientation="vertical" size={0}>
              <Space>
                <Globe2 size={16} />
                <span>{t.relocation}</span>
              </Space>
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {t.relocationHint}
              </Typography.Text>
            </Space>
          }
        >
          <Switch
            checked={Boolean(pref.relocation)}
            onChange={(checked) =>
              setEmploymentPreferences({ relocation: checked })
            }
          />
        </Form.Item>

        <Form.Item label={t.timezone}>
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

        <Form.Item label={t.authorization}>
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
    </Card>
  );
}
