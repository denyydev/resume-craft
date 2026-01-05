"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { MessageOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Input, Space, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { useCallback, useMemo, useState } from "react";
import { SkillTag } from "../nav/SkillTag";

const { Title, Text } = Typography;
const { TextArea } = Input;

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

export function SoftSkillsSection() {
  const tags = useResumeStore((s) => s.resume.softSkills.tags);
  const note = useResumeStore((s) => s.resume.softSkills.note);

  const addSoftSkillTag = useResumeStore((s) => s.addSoftSkillTag);
  const removeSoftSkillTag = useResumeStore((s) => s.removeSoftSkillTag);
  const setSoftSkillsNote = useResumeStore((s) => s.setSoftSkillsNote);

  const [input, setInput] = useState("");

  const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase();
  const selectedSet = useMemo(() => new Set(tags.map(norm)), [tags]);

  const available = useMemo(
    () => SOFT_SKILLS_TAGS.filter((t) => !selectedSet.has(norm(t))),
    [selectedSet]
  );

  const handleAddCustom = useCallback(() => {
    const value = input.trim();
    if (!value) return setInput("");
    addSoftSkillTag(value);
    setInput("");
  }, [input, addSoftSkillTag]);

  return (
    <section id="softSkills" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <Flex align="center" gap={10} wrap>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <MessageOutlined className="text-base" />
            </span>
            <Title level={4} className="!m-0">
              SOFT SKILLS
            </Title>
          </Flex>

          <Text type="secondary" className="text-sm">
            Навыки взаимодействия и личные качества, влияющие на эффективность
            работы
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
                    key={`soft-selected-${tag}`}
                    kind="soft"
                    label={tag}
                    onClose={() => removeSoftSkillTag(tag)}
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

          {available.length > 0 ? (
            <Flex wrap gap={8}>
              {available.slice(0, 14).map((tag) => (
                <SkillTag
                  key={`soft-available-${tag}`}
                  kind="soft"
                  variant="pick"
                  label={tag}
                  closable={false}
                  onClick={() => addSoftSkillTag(tag)}
                />
              ))}
            </Flex>
          ) : null}

          <TextArea
            value={note}
            onChange={(e) => setSoftSkillsNote(e.target.value)}
            placeholder="Дополнительная информация о soft skills..."
            autoSize={{ minRows: 3, maxRows: 8 }}
            allowClear
          />
        </Space>
      </div>
    </section>
  );
}
