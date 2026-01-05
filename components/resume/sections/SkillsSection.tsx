"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { CodeOutlined, MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Space, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import React, { useCallback, useMemo, useState } from "react";
import { SkillTag } from "../nav/SkillTag";

const { Title, Text } = Typography;
const { TextArea } = Input;

const TECH_SKILLS_TAGS = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "Go",
  "Rust",
  "Vue.js",
  "Angular",
  "Svelte",
  "Redux",
  "Zustand",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "Git",
  "Jest",
  "Playwright",
  "Cypress",
  "GraphQL",
  "REST API",
  "WebSocket",
  "Tailwind CSS",
  "SCSS",
  "Figma",
];

const SOFT_SKILLS_TAGS = [
  "Коммуникация",
  "Работа в команде",
  "Лидерство",
  "Менторство",
  "Ответственность",
  "Адаптивность",
  "Креативность",
  "Аналитическое мышление",
  "Решение проблем",
  "Тайм-менеджмент",
  "Стрессоустойчивость",
  "Работа с неопределённостью",
  "Критическое мышление",
  "Эмпатия",
  "Переговоры",
];

type SkillsBlockProps = {
  linkId: string;
  kind: "tech" | "soft";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tags: string[];
  note: string;
  suggestions: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onChangeNote: (note: string) => void;
};

function SkillsBlock({
  kind,
  title,
  icon,
  tags,
  note,
  suggestions,
  onAddTag,
  onRemoveTag,
  onChangeNote,
  subtitle,
  linkId,
}: SkillsBlockProps) {
  const [input, setInput] = useState("");

  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();

  const selectedSet = useMemo(() => new Set(tags.map(norm)), [tags]);

  const available = useMemo(() => {
    return suggestions.filter((t) => !selectedSet.has(norm(t)));
  }, [suggestions, selectedSet]);

  const handleAddCustom = useCallback(() => {
    const value = input.trim();
    if (!value) return setInput("");
    onAddTag(value);
    setInput("");
  }, [input, onAddTag]);

  return (
    <section id={linkId} style={{ scrollMarginTop: 96 }}>
      <Space direction="vertical" size={10} style={{ width: "100%" }}>
        <Flex align="center" gap={10} wrap>
          <span style={{ fontSize: 18, lineHeight: 1 }}>{icon}</span>
          <Title level={3} style={{ margin: 0 }}>
            {title}
          </Title>
        </Flex>

        <Text type="secondary" style={{ fontSize: 14 }}>
          {subtitle}
        </Text>

        <Divider style={{ margin: "8px 0 14px" }} />

        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          {tags.length > 0 && (
            <Flex wrap gap={8}>
              <AnimatePresence initial={false}>
                {tags.map((tag) => (
                  <SkillTag
                    key={`selected-${tag}`}
                    kind={kind}
                    label={tag}
                    onClose={() => onRemoveTag(tag)}
                  />
                ))}
              </AnimatePresence>
            </Flex>
          )}

          <Flex gap={8} wrap>
            <div style={{ flex: 1, minWidth: 240 }}>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustom();
                  }
                }}
                placeholder="Добавить навык..."
                allowClear
              />
            </div>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddCustom}
            >
              Добавить
            </Button>
          </Flex>

          {available.length > 0 && (
            <Flex wrap gap={8}>
              {available.slice(0, 14).map((tag) => (
                <SkillTag
                  key={`available-${tag}`}
                  kind={kind}
                  variant="pick"
                  label={tag}
                  closable={false}
                  onClick={() => onAddTag(tag)}
                />
              ))}
            </Flex>
          )}

          <TextArea
            value={note}
            onChange={(e) => onChangeNote(e.target.value)}
            placeholder={`Дополнительная информация о ${title.toLowerCase()}...`}
            autoSize={{ minRows: 3, maxRows: 8 }}
          />
        </Space>
      </Space>
    </section>
  );
}

export function SkillsSection() {
  const resume = useResumeStore((s) => s.resume);

  const addTechSkillTag = useResumeStore((s) => s.addTechSkillTag);
  const removeTechSkillTag = useResumeStore((s) => s.removeTechSkillTag);
  const setTechSkillsNote = useResumeStore((s) => s.setTechSkillsNote);

  const addSoftSkillTag = useResumeStore((s) => s.addSoftSkillTag);
  const removeSoftSkillTag = useResumeStore((s) => s.removeSoftSkillTag);
  const setSoftSkillsNote = useResumeStore((s) => s.setSoftSkillsNote);

  const techTags = resume.techSkills.tags;
  const techNote = resume.techSkills.note;
  const softTags = resume.softSkills.tags;
  const softNote = resume.softSkills.note;

  const addTechTag = useCallback(
    (tag: string) => addTechSkillTag(tag),
    [addTechSkillTag]
  );
  const removeTechTag = useCallback(
    (tag: string) => removeTechSkillTag(tag),
    [removeTechSkillTag]
  );

  const addSoftTag = useCallback(
    (tag: string) => addSoftSkillTag(tag),
    [addSoftSkillTag]
  );
  const removeSoftTag = useCallback(
    (tag: string) => removeSoftSkillTag(tag),
    [removeSoftSkillTag]
  );

  return (
    <Space direction="vertical" size={22} style={{ width: "100%" }}>
      <SkillsBlock
        linkId="techSkills"
        kind="tech"
        title="HARD SKILLS"
        subtitle="Технологии, инструменты и фреймворки, с которыми ты работаешь на практике"
        icon={<CodeOutlined />}
        tags={techTags}
        note={techNote}
        suggestions={TECH_SKILLS_TAGS}
        onAddTag={addTechTag}
        onRemoveTag={removeTechTag}
        onChangeNote={setTechSkillsNote}
      />

      <SkillsBlock
        linkId="softSkills"
        kind="soft"
        title="SOFT SKILLS"
        subtitle="Навыки взаимодействия и личные качества, влияющие на эффективность работы"
        icon={<MessageOutlined />}
        tags={softTags}
        note={softNote}
        suggestions={SOFT_SKILLS_TAGS}
        onAddTag={addSoftTag}
        onRemoveTag={removeSoftTag}
        onChangeNote={setSoftSkillsNote}
      />
    </Space>
  );
}
