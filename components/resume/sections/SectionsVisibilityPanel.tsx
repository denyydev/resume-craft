"use client";

import { useResumeStore } from "@/store/useResumeStore";
import type { ResumeSectionKey } from "@/types/resume";
import { Button, Card, Divider, Space, Switch, Typography } from "antd";
import {
  BadgeCheck,
  Briefcase,
  FileText,
  GraduationCap,
  Languages,
  Layers3,
  LayoutList,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";

const { Text, Title } = Typography;

type SectionItem = {
  key: ResumeSectionKey;
  label: string;
  icon: React.ReactNode;
};

type Props = {
  title?: string;
  items?: SectionItem[];
};

const DEFAULT_ITEMS: SectionItem[] = [
  { key: "photo", label: "Photo", icon: <User size={16} /> },
  { key: "summary", label: "Summary", icon: <FileText size={16} /> },
  { key: "experience", label: "Experience", icon: <Briefcase size={16} /> },
  { key: "projects", label: "Projects", icon: <Layers3 size={16} /> },
  { key: "techSkills", label: "Tech skills", icon: <ShieldCheck size={16} /> },
  { key: "softSkills", label: "Soft skills", icon: <BadgeCheck size={16} /> },
  { key: "education", label: "Education", icon: <GraduationCap size={16} /> },
  { key: "languages", label: "Languages", icon: <Languages size={16} /> },
  {
    key: "employmentPreferences",
    label: "Employment preferences",
    icon: <LayoutList size={16} />,
  },
  {
    key: "certifications",
    label: "Certifications",
    icon: <BadgeCheck size={16} />,
  },
  { key: "activities", label: "Activities", icon: <Palette size={16} /> },
];

export function SectionsVisibilityPanel({
  title = "Sections visibility",
  items = DEFAULT_ITEMS,
}: Props) {
  const { resume, setSectionVisible, showAllSections } = useResumeStore();

  const isVisible = (key: ResumeSectionKey) =>
    resume.sectionsVisibility?.[key] ?? true;

  return (
    <Card>
      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        <Space
          align="center"
          style={{ width: "100%", justifyContent: "space-between" }}
        >
          <Title level={5} style={{ margin: 0 }}>
            {title}
          </Title>

          <Space size={8}>
            <Button size="small" onClick={showAllSections}>
              Show all
            </Button>
          </Space>
        </Space>

        <Divider style={{ margin: "8px 0" }} />

        <Space direction="vertical" size={10} style={{ width: "100%" }}>
          {items.map((it) => (
            <div
              key={it.key}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <Space size={10} style={{ minWidth: 0 }}>
                <span style={{ opacity: 0.75, display: "inline-flex" }}>
                  {it.icon}
                </span>
                <Text ellipsis style={{ maxWidth: 260 }}>
                  {it.label}
                </Text>
              </Space>

              <Switch
                checked={isVisible(it.key)}
                onChange={(checked) => setSectionVisible(it.key, checked)}
              />
            </div>
          ))}
        </Space>
      </Space>
    </Card>
  );
}
