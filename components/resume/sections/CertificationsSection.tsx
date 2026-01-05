"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import {
  CalendarOutlined,
  DeleteOutlined,
  LinkOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Divider, Empty, Form, Input, Typography } from "antd";
import { BadgeCheck, Building2 } from "lucide-react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    title: "Сертификации",
    subtitle: "Добавь сертификаты и курсы, которые важны для роли.",
    add: "Добавить сертификат",
    empty: "Пока нет сертификатов. Добавь первый — это повысит доверие.",
    name: "Название",
    namePh: "AWS Certified Developer – Associate",
    issuer: "Организация",
    issuerPh: "Amazon Web Services",
    year: "Год",
    yearPh: "2025",
    link: "Ссылка",
    linkPh: "https://...",
    remove: "Удалить",
  },
  en: {
    title: "Certifications",
    subtitle: "Add certifications and courses relevant to your role.",
    add: "Add certification",
    empty: "No certifications yet. Add your first one to boost credibility.",
    name: "Name",
    namePh: "AWS Certified Developer – Associate",
    issuer: "Issuer",
    issuerPh: "Amazon Web Services",
    year: "Year",
    yearPh: "2025",
    link: "Link",
    linkPh: "https://...",
    remove: "Remove",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

type CertificationDraft = {
  name?: string;
  issuer?: string;
  year?: string;
  link?: string;
};

type CertificationItem = CertificationDraft & { id: string };

type ResumeStoreShape = {
  resume: { certifications?: CertificationItem[] };
  addCertification: () => void;
  updateCertification: (id: string, patch: CertificationDraft) => void;
  removeCertification: (id: string) => void;
};

export function CertificationsSection() {
  const rawLocale = useCurrentLocale();
  const locale: Locale = normalizeLocale(rawLocale);
  const t = messages[locale];

  const list = useResumeStore(
    (s) => (s as unknown as ResumeStoreShape).resume.certifications ?? []
  );
  const addCertification = useResumeStore(
    (s) => (s as unknown as ResumeStoreShape).addCertification
  );
  const updateCertification = useResumeStore(
    (s) => (s as unknown as ResumeStoreShape).updateCertification
  );
  const removeCertification = useResumeStore(
    (s) => (s as unknown as ResumeStoreShape).removeCertification
  );

  return (
    <section
      id="certifications"
      className="w-full h-full min-h-0 flex flex-col"
    >
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <BadgeCheck size={16} />
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
            {list.map((item, index) => (
              <div key={item.id} className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Text strong className="text-sm">
                      {item.name?.trim() ? item.name : t.namePh}
                    </Text>
                    {item.issuer?.trim() ? (
                      <div>
                        <Text type="secondary" className="text-sm">
                          {item.issuer}
                        </Text>
                      </div>
                    ) : null}
                  </div>

                  <Button
                    danger
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => removeCertification(item.id)}
                  />
                </div>

                <Form layout="vertical" colon={false} className="space-y-1">
                  <Form.Item label={t.name} className="mb-0">
                    <Input
                      value={item.name ?? ""}
                      onChange={(e) =>
                        updateCertification(item.id, { name: e.target.value })
                      }
                      placeholder={t.namePh}
                      prefix={<BadgeCheck size={16} />}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.issuer} className="mb-0">
                    <Input
                      value={item.issuer ?? ""}
                      onChange={(e) =>
                        updateCertification(item.id, { issuer: e.target.value })
                      }
                      placeholder={t.issuerPh}
                      prefix={<Building2 size={16} />}
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.year} className="mb-0">
                    <Input
                      value={item.year ?? ""}
                      onChange={(e) =>
                        updateCertification(item.id, { year: e.target.value })
                      }
                      placeholder={t.yearPh}
                      prefix={<CalendarOutlined />}
                      inputMode="numeric"
                      allowClear
                    />
                  </Form.Item>

                  <Form.Item label={t.link} className="mb-0">
                    <Input
                      value={item.link ?? ""}
                      onChange={(e) =>
                        updateCertification(item.id, { link: e.target.value })
                      }
                      placeholder={t.linkPh}
                      prefix={<LinkOutlined />}
                      allowClear
                    />
                  </Form.Item>
                </Form>

                {index !== list.length - 1 && <Divider className="my-4" />}
              </div>
            ))}
          </div>
        )}

        <Divider className="my-6" />

        <Button
          block
          type="dashed"
          icon={<PlusOutlined />}
          onClick={addCertification}
        >
          {t.add}
        </Button>
      </div>
    </section>
  );
}
