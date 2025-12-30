"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Card, Form, Input, Typography } from "antd";
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

const { Text } = Typography;
const { TextArea } = Input;

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
};

export function BasicContactsSection({ t }: { t: LocaleMessages }) {
  const { resume, setPosition, setContacts, setSummary, reset } =
    useResumeStore();

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
    <Card id="contacts">
      <Form layout="vertical" colon={false} className="grid grid-cols-1 gap-4">
        <Form.Item label={t.position} style={{ marginBottom: 0 }}>
          <Input
            prefix={<LinkIcon size={16} />}
            placeholder={t.positionPlaceholder}
            value={resume.position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Form.Item>

        {contactItems.map((f) => (
          <Form.Item key={f.key} label={f.label} style={{ marginBottom: 0 }}>
            <Input
              prefix={f.icon}
              placeholder={f.placeholder}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
            />
          </Form.Item>
        ))}

        <Form.Item
          label={
            <div className="flex w-full items-baseline justify-between">
              <span>{t.summary}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                {resume.summary.length}/300
              </span>
            </div>
          }
          style={{ marginBottom: 0 }}
        >
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder={t.summaryPlaceholder}
            value={resume.summary}
            onChange={(e) => setSummary(e.target.value.slice(0, 300))}
          />
        </Form.Item>
      </Form>
    </Card>
  );
}
