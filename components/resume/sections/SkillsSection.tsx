"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { motion } from "framer-motion"
import { Sparkles, MessageCircle, Code2, X, Plus } from "lucide-react"
import { useState, useMemo } from "react"
import { Card } from "antd"

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

const TAGS_SEPARATOR = "\n\n---TEXT---\n\n"

function parseSkillsString(str: string): { tags: string[]; customText: string } {
  if (!str) return { tags: [], customText: "" }

  const hasSeparator = str.includes(TAGS_SEPARATOR)

  if (hasSeparator) {
    const [tagsPart, textPart] = str.split(TAGS_SEPARATOR)
    const tags = tagsPart
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
    return {
      tags: [...new Set(tags)],
      customText: textPart || "",
    }
  }

  const lines = str.split("\n").filter(Boolean)
  if (lines.length === 0) return { tags: [], customText: "" }

  const firstLine = lines[0].trim()
  const hasCommas = firstLine.includes(",")

  if (hasCommas && lines.length === 1) {
    const tags = firstLine.split(",").map((t) => t.trim()).filter(Boolean)
    return {
      tags: [...new Set(tags)],
      customText: "",
    }
  }

  if (hasCommas) {
    const tags = firstLine.split(",").map((t) => t.trim()).filter(Boolean)
    const text = lines.slice(1).join("\n")
    return {
      tags: [...new Set(tags)],
      customText: text,
    }
  }

  return {
    tags: [],
    customText: str,
  }
}

function formatSkillsString(tags: string[], customText: string): string {
  const parts: string[] = []
  if (tags.length > 0) {
    parts.push(tags.join(", "))
  }
  if (customText.trim()) {
    if (tags.length > 0) {
      return parts.join("") + TAGS_SEPARATOR + customText.trim()
    }
    return customText.trim()
  }
  return tags.join(", ")
}

export function SkillsSection() {
  const { resume, setSkills, setSoftSkills } = useResumeStore()
  const [techInput, setTechInput] = useState("")
  const [softInput, setSoftInput] = useState("")

  const techSkills = useMemo(() => parseSkillsString(resume.skills), [resume.skills])
  const softSkills = useMemo(() => parseSkillsString(resume.softSkills), [resume.softSkills])

  const handleAddTechTag = (tag: string) => {
    if (techSkills.tags.includes(tag)) return
    const newTags = [...techSkills.tags, tag]
    setSkills(formatSkillsString(newTags, techSkills.customText))
  }

  const handleRemoveTechTag = (tag: string) => {
    const newTags = techSkills.tags.filter((t) => t !== tag)
    setSkills(formatSkillsString(newTags, techSkills.customText))
  }

  const handleAddCustomTechTag = () => {
    const trimmed = techInput.trim()
    if (!trimmed || techSkills.tags.includes(trimmed)) {
      setTechInput("")
      return
    }
    const newTags = [...techSkills.tags, trimmed]
    setSkills(formatSkillsString(newTags, techSkills.customText))
    setTechInput("")
  }

  const handleTechCustomTextChange = (text: string) => {
    setSkills(formatSkillsString(techSkills.tags, text))
  }

  const handleAddSoftTag = (tag: string) => {
    if (softSkills.tags.includes(tag)) return
    const newTags = [...softSkills.tags, tag]
    setSoftSkills(formatSkillsString(newTags, softSkills.customText))
  }

  const handleRemoveSoftTag = (tag: string) => {
    const newTags = softSkills.tags.filter((t) => t !== tag)
    setSoftSkills(formatSkillsString(newTags, softSkills.customText))
  }

  const handleAddCustomSoftTag = () => {
    const trimmed = softInput.trim()
    if (!trimmed || softSkills.tags.includes(trimmed)) {
      setSoftInput("")
      return
    }
    const newTags = [...softSkills.tags, trimmed]
    setSoftSkills(formatSkillsString(newTags, softSkills.customText))
    setSoftInput("")
  }

  const handleSoftCustomTextChange = (text: string) => {
    setSoftSkills(formatSkillsString(softSkills.tags, text))
  }

  const availableTechTags = TECH_SKILLS_TAGS.filter((tag) => !techSkills.tags.includes(tag))
  const availableSoftTags = SOFT_SKILLS_TAGS.filter((tag) => !softSkills.tags.includes(tag))

  return (
    <Card>
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Навыки и стек
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Технические и мягкие навыки, которые лучше всего показывают твой профиль.
        </p>
      </div>

      <div className="space-y-6">
        <div className="group relative bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-4 transition-all hover:border-slate-300 hover:shadow-sm focus-within:ring-2 focus-within:ring-slate-900/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Code2 className="w-4 h-4 text-slate-500" />
            Технические навыки
          </div>

          {techSkills.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {techSkills.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTechTag(tag)}
                    className="hover:bg-white/20 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCustomTechTag()
                  }
                }}
                placeholder="Добавить навык..."
                className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400 bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomTechTag}
                className="px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Добавить
              </button>
            </div>

            {availableTechTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableTechTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTechTag(tag)}
                    className="px-2.5 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <textarea
              className="w-full min-h-[80px] bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400 block p-3 transition-all outline-none resize-none placeholder:text-slate-400"
              placeholder="Дополнительная информация о технических навыках..."
              value={techSkills.customText}
              onChange={(e) => handleTechCustomTextChange(e.target.value)}
            />
          </div>
        </div>

        <div className="group relative bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-4 transition-all hover:border-slate-300 hover:shadow-sm focus-within:ring-2 focus-within:ring-slate-900/5">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <MessageCircle className="w-4 h-4 text-slate-500" />
            Soft skills
          </div>

          {softSkills.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {softSkills.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveSoftTag(tag)}
                    className="hover:bg-white/20 rounded p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={softInput}
                onChange={(e) => setSoftInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddCustomSoftTag()
                  }
                }}
                placeholder="Добавить навык..."
                className="flex-1 px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400 bg-white"
              />
              <button
                type="button"
                onClick={handleAddCustomSoftTag}
                className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                Добавить
              </button>
            </div>

            {availableSoftTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {availableSoftTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddSoftTag(tag)}
                    className="px-2.5 py-1 text-xs text-slate-600 bg-white border border-slate-200 rounded-md hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <textarea
              className="w-full min-h-[80px] bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/20 focus:border-slate-400 block p-3 transition-all outline-none resize-none placeholder:text-slate-400"
              placeholder="Дополнительная информация о soft skills..."
              value={softSkills.customText}
              onChange={(e) => handleSoftCustomTextChange(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}
