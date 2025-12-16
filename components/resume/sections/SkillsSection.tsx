"use client"

import { useMemo, useState, useCallback } from "react"
import { Card, Typography, Tag, Input, Button, Space, Divider, Flex } from "antd"
import {
  CodeOutlined,
  MessageOutlined,
  PlusOutlined,
  BulbOutlined,
} from "@ant-design/icons"
import { useResumeStore } from "@/store/useResumeStore"

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input

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
]

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
]

function uniquePush(list: string[], item: string) {
  const value = item.trim()
  if (!value) return list
  if (list.includes(value)) return list
  return [...list, value]
}

function removeItem(list: string[], item: string) {
  return list.filter((x) => x !== item)
}

type SkillsBlockProps = {
  title: string
  icon: React.ReactNode
  tags: string[]
  note: string
  suggestions: string[]
  accent?: "default" | "blue"
  onAddTag: (tag: string) => void
  onRemoveTag: (tag: string) => void
  onChangeNote: (note: string) => void
}

function SkillsBlock({
  title,
  icon,
  tags,
  note,
  suggestions,
  accent = "default",
  onAddTag,
  onRemoveTag,
  onChangeNote,
}: SkillsBlockProps) {
  const [input, setInput] = useState("")

  const available = useMemo(
    () => suggestions.filter((t) => !tags.includes(t)),
    [suggestions, tags]
  )

  const handleAddCustom = useCallback(() => {
    const value = input.trim()
    if (!value) return setInput("")
    onAddTag(value)
    setInput("")
  }, [input, onAddTag])

  const chipColor = accent === "blue" ? "blue" : "default"
  const addBtnType = accent === "blue" ? "primary" : "default"

  return (
    <Card size="small" styles={{ body: { padding: 16 } }}>
      <Flex align="center" gap={8}>
        {icon}
        <Text strong>{title}</Text>
      </Flex>

      <Divider style={{ margin: "12px 0" }} />

      <Space direction="vertical" size={12} style={{ width: "100%" }}>
        {tags.length > 0 && (
          <Flex wrap gap={8}>
            {tags.map((tag) => (
              <Tag
                key={tag}
                color={chipColor}
                closable
                onClose={(e) => {
                  e.preventDefault()
                  onRemoveTag(tag)
                }}
                style={{ marginInlineEnd: 0 }}
              >
                {tag}
              </Tag>
            ))}
          </Flex>
        )}

        <Flex gap={8}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddCustom()
              }
            }}
            placeholder="Добавить навык..."
            allowClear
          />
          <Button type={addBtnType} icon={<PlusOutlined />} onClick={handleAddCustom}>
            Добавить
          </Button>
        </Flex>

        {available.length > 0 && (
          <Flex wrap gap={8}>
            {available.slice(0, 12).map((tag) => (
              <Button
                key={tag}
                size="small"
                onClick={() => onAddTag(tag)}
                style={{ paddingInline: 10 }}
              >
                + {tag}
              </Button>
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
    </Card>
  )
}

export function SkillsSection() {
  const {
    resume,
    setTechSkillsTags,
    setTechSkillsNote,
    setSoftSkillsTags,
    setSoftSkillsNote,
  } = useResumeStore()

  const techTags = resume.techSkills?.tags ?? []
  const techNote = resume.techSkills?.note ?? ""
  const softTags = resume.softSkillsBlock?.tags ?? resume.softSkills?.tags ?? []
  const softNote = resume.softSkillsBlock?.note ?? resume.softSkills?.note ?? ""

  const addTechTag = useCallback(
    (tag: string) => setTechSkillsTags(uniquePush(techTags, tag)),
    [setTechSkillsTags, techTags]
  )
  const removeTechTag = useCallback(
    (tag: string) => setTechSkillsTags(removeItem(techTags, tag)),
    [setTechSkillsTags, techTags]
  )

  const addSoftTag = useCallback(
    (tag: string) => setSoftSkillsTags(uniquePush(softTags, tag)),
    [setSoftSkillsTags, softTags]
  )
  const removeSoftTag = useCallback(
    (tag: string) => setSoftSkillsTags(removeItem(softTags, tag)),
    [setSoftSkillsTags, softTags]
  )

  return (
    <Card styles={{ body: { padding: 20 } }}>
      <Space direction="vertical" size={16} style={{ width: "100%" }}>
        <div>
          <Flex align="center" gap={10}>
            <BulbOutlined />
            <Title level={4} style={{ margin: 0 }}>
              Навыки и стек
            </Title>
          </Flex>
          <Paragraph style={{ marginTop: 6, marginBottom: 0, color: "rgba(0,0,0,0.65)" }}>
            Технические и мягкие навыки, которые лучше всего показывают твой профиль.
          </Paragraph>
        </div>

        <Space direction="vertical" size={14} style={{ width: "100%" }}>
          <SkillsBlock
            title="Технические навыки"
            icon={<CodeOutlined />}
            tags={techTags}
            note={techNote}
            suggestions={TECH_SKILLS_TAGS}
            onAddTag={addTechTag}
            onRemoveTag={removeTechTag}
            onChangeNote={setTechSkillsNote}
          />

          <SkillsBlock
            title="Soft skills"
            icon={<MessageOutlined />}
            tags={softTags}
            note={softNote}
            suggestions={SOFT_SKILLS_TAGS}
            accent="blue"
            onAddTag={addSoftTag}
            onRemoveTag={removeSoftTag}
            onChangeNote={setSoftSkillsNote}
          />
        </Space>
      </Space>
    </Card>
  )
}
