"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Divider, Flex, Form, Input, Space, Typography } from "antd";
import {
  Github,
  Linkedin,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useMemo } from "react";

const { Title, Text } = Typography;

type LocaleMessages = {
  position: string;
  positionPlaceholder: string;
  email: string;
  emailPlaceholder: string;
  phone: string;
  phonePlaceholder: string;
  city: string;
  cityPlaceholder: string;
  telegram: string;
  telegramPlaceholder: string;
  github: string;
  githubPlaceholder: string;
  linkedin: string;
  linkedinPlaceholder: string;
  summary: string;
  summaryPlaceholder: string;
  reset: string;
  next: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
};

export function BasicContactsSection({ t }: { t: LocaleMessages }) {
  const resume = useResumeStore((s) => s.resume);
  const setContacts = useResumeStore((s) => s.setContacts);

  const contactItems = useMemo(
    () => [
      {
        key: "email",
        label: t.email,
        placeholder: t.emailPlaceholder,
        value: resume.contacts.email,
        icon: <Mail size={16} />,
        onChange: (v: string) => setContacts({ email: v }),
      },
      {
        key: "phone",
        label: t.phone,
        placeholder: t.phonePlaceholder,
        value: resume.contacts.phone,
        icon: <Phone size={16} />,
        onChange: (v: string) => setContacts({ phone: v }),
      },
      {
        key: "location",
        label: t.city,
        placeholder: t.cityPlaceholder,
        value: resume.contacts.location,
        icon: <MapPin size={16} />,
        onChange: (v: string) => setContacts({ location: v }),
      },
      {
        key: "telegram",
        label: t.telegram,
        placeholder: t.telegramPlaceholder,
        value: resume.contacts.telegram ?? "",
        icon: <Send size={16} />,
        onChange: (v: string) => setContacts({ telegram: v }),
      },
      {
        key: "github",
        label: t.github,
        placeholder: t.githubPlaceholder,
        value: resume.contacts.github ?? "",
        icon: <Github size={16} />,
        onChange: (v: string) => setContacts({ github: v }),
      },
      {
        key: "linkedin",
        label: t.linkedin,
        placeholder: t.linkedinPlaceholder,
        value: resume.contacts.linkedin ?? "",
        icon: <Linkedin size={16} />,
        onChange: (v: string) => setContacts({ linkedin: v }),
      },
    ],
    [resume.contacts, setContacts, t]
  );

  return (
    <section id="contacts" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <Flex align="center" gap={10} wrap>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <LinkIcon size={18} />
            </span>
            <Title level={4} className="!m-0">
              {t.sectionTitle ?? "Контакты и заголовок"}
            </Title>
          </Flex>

          <Text type="secondary" className="text-sm">
            {t.sectionSubtitle ??
              "Должность, контакты и короткое summary — это первое, что читают рекрутеры."}
          </Text>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        <Space direction="vertical" size={12} className="w-full">
          <Form
            layout="vertical"
            colon={false}
            className="grid grid-cols-1 gap-4"
          >
            {contactItems.map((f) => (
              <Form.Item key={f.key} label={f.label} className="mb-0">
                <Input
                  prefix={f.icon}
                  placeholder={f.placeholder}
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  allowClear
                />
              </Form.Item>
            ))}
          </Form>
        </Space>
      </div>
    </section>
  );
}
