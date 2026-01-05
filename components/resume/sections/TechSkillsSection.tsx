"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { CodeOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Space, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
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

export function TechSkillsSection() {
  const tags = useResumeStore((s) => s.resume.techSkills.tags);
  const note = useResumeStore((s) => s.resume.techSkills.note);

  const addTechSkillTag = useResumeStore((s) => s.addTechSkillTag);
  const removeTechSkillTag = useResumeStore((s) => s.removeTechSkillTag);
  const setTechSkillsNote = useResumeStore((s) => s.setTechSkillsNote);

  const [input, setInput] = useState("");

  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const selectedSet = useMemo(() => new Set(tags.map(norm)), [tags]);

  const available = useMemo(
    () => TECH_SKILLS_TAGS.filter((t) => !selectedSet.has(norm(t))),
    [selectedSet]
  );

  const handleAddCustom = useCallback(() => {
    const value = input.trim();
    if (!value) return setInput("");
    addTechSkillTag(value);
    setInput("");
  }, [input, addTechSkillTag]);

  return (
    <section id="techSkills" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <Flex align="center" gap={10} wrap>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <CodeOutlined className="text-base" />
            </span>
            <Title level={4} className="!m-0">
              HARD SKILLS
            </Title>
          </Flex>

          <Text type="secondary" className="text-sm">
            Технологии, инструменты и фреймворки, с которыми ты работаешь на
            практике
          </Text>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        <Space direction="vertical" size={12} className="w-full">
          {tags.length > 0 ? (
            <Flex wrap gap={8}>
              <AnimatePresence initial={false}>
                {tags.map((tag) => (
                  <SkillTag
                    key={`tech-selected-${tag}`}
                    kind="tech"
                    label={tag}
                    onClose={() => removeTechSkillTag(tag)}
                  />
                ))}
              </AnimatePresence>
            </Flex>
          ) : null}

          <Flex gap={8} wrap>
            <div className="flex-1 min-w-[240px]">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCustom();
                  }
                }}
                placeholder="Добавить технологию..."
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

          {available.length > 0 ? (
            <Flex wrap gap={8}>
              {available.slice(0, 14).map((tag) => (
                <SkillTag
                  key={`tech-available-${tag}`}
                  kind="tech"
                  variant="pick"
                  label={tag}
                  closable={false}
                  onClick={() => addTechSkillTag(tag)}
                />
              ))}
            </Flex>
          ) : null}

          <TextArea
            value={note}
            onChange={(e) => setTechSkillsNote(e.target.value)}
            placeholder="Дополнительная информация о hard skills..."
            autoSize={{ minRows: 3, maxRows: 8 }}
            allowClear
          />
        </Space>
      </div>
    </section>
  );
}
