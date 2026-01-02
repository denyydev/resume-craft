"use client"

import React, { useMemo } from "react"
import { Tag } from "antd"
import { motion } from "framer-motion"
import type { PresetColorType } from "antd/es/_util/colors"
import {
  ApiOutlined,
  CloudOutlined,
  CodeOutlined,
  CoffeeOutlined,
  DatabaseOutlined,
  DesktopOutlined,
  ExperimentOutlined,
  GithubOutlined,
  GlobalOutlined,
  RadarChartOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
} from "@ant-design/icons"

const MotionTag = motion.create(Tag)

type IconComp = React.ComponentType<Record<string, never>>

type TagMeta = {
  color?: PresetColorType | "default"
  Icon?: IconComp
}

const TECH_META: Record<string, TagMeta> = {
  React: { color: "geekblue", Icon: CodeOutlined },
  TypeScript: { color: "blue", Icon: CodeOutlined },
  JavaScript: { color: "gold", Icon: CodeOutlined },
  "Next.js": { color: "default", Icon: DesktopOutlined },
  "Node.js": { color: "green", Icon: ApiOutlined },
  Redux: { color: "purple", Icon: RadarChartOutlined },
  Zustand: { color: "purple", Icon: RadarChartOutlined },

  PostgreSQL: { color: "cyan", Icon: DatabaseOutlined },
  MySQL: { color: "blue", Icon: DatabaseOutlined },
  MongoDB: { color: "green", Icon: DatabaseOutlined },
  Redis: { color: "red", Icon: DatabaseOutlined },

  Docker: { color: "cyan", Icon: ToolOutlined },
  Kubernetes: { color: "geekblue", Icon: ToolOutlined },
  AWS: { color: "orange", Icon: CloudOutlined },

  Git: { color: "volcano", Icon: GithubOutlined },

  Jest: { color: "magenta", Icon: ExperimentOutlined },
  Playwright: { color: "green", Icon: SafetyCertificateOutlined },
  Cypress: { color: "green", Icon: SafetyCertificateOutlined },

  GraphQL: { color: "magenta", Icon: GlobalOutlined },
  "REST API": { color: "blue", Icon: ApiOutlined },
  WebSocket: { color: "cyan", Icon: ApiOutlined },

  "Tailwind CSS": { color: "cyan", Icon: ToolOutlined },
  SCSS: { color: "magenta", Icon: ToolOutlined },
  Figma: { color: "purple", Icon: ToolOutlined },

  Python: { color: "gold", Icon: CoffeeOutlined },
  Java: { color: "volcano", Icon: CoffeeOutlined },
  "C++": { color: "blue", Icon: CodeOutlined },
  Go: { color: "cyan", Icon: CodeOutlined },
  Rust: { color: "default", Icon: CodeOutlined },
  "Vue.js": { color: "green", Icon: DesktopOutlined },
  Angular: { color: "red", Icon: DesktopOutlined },
  Svelte: { color: "volcano", Icon: DesktopOutlined },
}

const SOFT_META: Record<string, TagMeta> = {
  "Коммуникация": { color: "blue", Icon: ApiOutlined },
  "Работа в команде": { color: "geekblue", Icon: RadarChartOutlined },
  "Лидерство": { color: "volcano", Icon: SafetyCertificateOutlined },
  "Менторство": { color: "purple", Icon: ToolOutlined },
  "Ответственность": { color: "green", Icon: SafetyCertificateOutlined },
  "Адаптивность": { color: "cyan", Icon: ToolOutlined },
  "Креативность": { color: "magenta", Icon: ExperimentOutlined },
  "Аналитическое мышление": { color: "geekblue", Icon: RadarChartOutlined },
  "Решение проблем": { color: "orange", Icon: ToolOutlined },
  "Тайм-менеджмент": { color: "blue", Icon: SafetyCertificateOutlined },
  "Стрессоустойчивость": { color: "red", Icon: SafetyCertificateOutlined },
  "Работа с неопределённостью": { color: "cyan", Icon: GlobalOutlined },
  "Критическое мышление": { color: "geekblue", Icon: RadarChartOutlined },
  "Эмпатия": { color: "magenta", Icon: ApiOutlined },
  "Переговоры": { color: "volcano", Icon: GlobalOutlined },
}

const FALLBACK_COLORS: PresetColorType[] = [
  "blue",
  "geekblue",
  "cyan",
  "green",
  "gold",
  "orange",
  "volcano",
  "magenta",
  "purple",
]

function hashColor(label: string) {
  let h = 0
  for (let i = 0; i < label.length; i++) h = (h * 31 + label.charCodeAt(i)) >>> 0
  return FALLBACK_COLORS[h % FALLBACK_COLORS.length]
}

export type SkillTagVariant = "selected" | "pick"

export type SkillTagProps = {
  label: string
  kind?: "tech" | "soft"
  variant?: SkillTagVariant
  onClick?: () => void
  closable?: boolean
  onClose?: () => void
}

export function SkillTag({
  label,
  kind = "tech",
  variant = "selected",
  onClick,
  closable,
  onClose,
}: SkillTagProps) {
  const meta = (kind === "soft" ? SOFT_META[label] : TECH_META[label]) ?? {}
  const Icon = meta.Icon

  const color = useMemo(() => meta.color ?? hashColor(label), [meta.color, label])

  const isPick = variant === "pick"

  return (
    <MotionTag
      color={color === "default" ? undefined : color}
      closable={closable ?? !isPick}
      onClose={(e) => {
        e.preventDefault()
        onClose?.()
      }}
      onClick={onClick}
      style={{
        marginInlineEnd: 0,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        paddingInline: isPick ? 10 : 12,
        paddingBlock: 3,
        borderRadius: 999,
        cursor: isPick ? "pointer" : "default",
        userSelect: "none",
        opacity: isPick ? 0.9 : 1,
      }}
      initial={{ opacity: 0, scale: 0.92, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -6 }}
      transition={{ type: "spring", stiffness: 520, damping: 32 }}
      whileHover={isPick ? { scale: 1.04, opacity: 1 } : { scale: 1.03 }}
      whileTap={isPick ? { scale: 0.98 } : { scale: 0.99 }}
      layout
    >
      {Icon ? <Icon style={{ fontSize: 14 }} /> : null}
      {isPick ? `+ ${label}` : label}
    </MotionTag>
  )
}
