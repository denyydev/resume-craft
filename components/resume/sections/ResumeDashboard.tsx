"use client"

import React, { useMemo } from "react"
import { Card, Progress, Button, Typography } from "antd"
import { useResumeStore } from "@/store/useResumeStore"
import { computeResumeScore } from "@/lib/resumeProgress"
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  User,
  FileText,
  Briefcase,
  Wrench,
  GraduationCap,
  Languages,
  Settings2,
  BadgeCheck,
  HeartHandshake,
} from "lucide-react"

const { Text } = Typography

type Status = "good" | "warn" | "bad"

function statusStyles(status: Status) {
  if (status === "good") return { chip: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" }
  if (status === "warn") return { chip: "bg-amber-50 text-amber-800 border-amber-200", dot: "bg-amber-500" }
  return { chip: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" }
}

function scoreLabel(percent: number) {
  if (percent >= 85) return { text: "Почти готово", status: "good" as const }
  if (percent >= 60) return { text: "Неплохо", status: "warn" as const }
  return { text: "Нужно заполнить", status: "bad" as const }
}

function sectionMeta(section: string) {
  switch (section) {
    case "basic":
      return { icon: User, label: "Шапка" }
    case "summary":
      return { icon: FileText, label: "О себе" }
    case "experience":
      return { icon: Briefcase, label: "Опыт" }
    case "skills":
      return { icon: Wrench, label: "Навыки" }
    case "education":
      return { icon: GraduationCap, label: "Образование" }
    case "languages":
      return { icon: Languages, label: "Языки" }
    case "preferences":
      return { icon: Settings2, label: "Предпочтения" }
    case "certifications":
      return { icon: BadgeCheck, label: "Сертификаты" }
    case "activities":
      return { icon: HeartHandshake, label: "Активности" }
    default:
      return { icon: Sparkles, label: "Раздел" }
  }
}

function MiniStat({
  label,
  value,
  status,
}: {
  label: string
  value: string
  status: Status
}) {
  const s = statusStyles(status)
  return (
    <div className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 ${s.chip}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        <span className="text-[12px] font-semibold">{label}</span>
      </div>
      <span className="text-[12px] font-semibold tabular-nums">{value}</span>
    </div>
  )
}

export function ResumeDashboard({
  onNavigate,
}: {
  onNavigate?: (section: string) => void
}) {
  const resume = useResumeStore((s) => s.resume)
  const data = useMemo(() => computeResumeScore(resume), [resume])

  const badge = scoreLabel(data.percent)
  const badgeStyles = statusStyles(badge.status)

  const HintIcon = data.percent >= 85 ? CheckCircle2 : AlertTriangle

  return (
    <Card
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-700" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Text strong className="!m-0">
                    Дашборд резюме
                  </Text>
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[12px] font-semibold ${badgeStyles.chip}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${badgeStyles.dot}`} />
                    {badge.text}
                  </span>
                </div>
                <div className="text-[12px] text-slate-500 mt-0.5">
                  {data.gained}/{data.total} баллов · чем ближе к 100%, тем сильнее резюме
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <div className="text-[28px] leading-none font-bold tabular-nums text-slate-900">
              {data.percent}%
            </div>
            <div className="text-[12px] text-slate-500 mt-0.5">
              готовность
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <Progress
            percent={data.percent}
            showInfo={false}
            size="small"
            style={{ margin: 0 }}
          />
          <div className="flex items-center justify-between text-[12px] text-slate-500 mt-2">
            <span>Минимум для отправки: ~60%</span>
            <span>Сильно: 85%+</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {data.metrics.map((m) => (
            <MiniStat key={m.key} label={m.label} value={m.value} status={m.status} />
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4">
          {data.nextHint ? (
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                  <HintIcon
                    className={`w-5 h-5 ${data.percent >= 85 ? "text-emerald-600" : "text-amber-600"}`}
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    {(() => {
                      const meta = sectionMeta(data.nextHint.section)
                      const Icon = meta.icon
                      return (
                        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-slate-600">
                          <Icon className="w-4 h-4" />
                          {meta.label}
                        </span>
                      )
                    })()}
                  </div>

                  <div className="mt-1 text-[13px] font-semibold text-slate-900">
                    {data.nextHint.title}
                  </div>
                  <div className="mt-1 text-[12px] text-slate-600 whitespace-pre-line">
                    {data.nextHint.description}
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {onNavigate && (
                  <Button
                    type="primary"
                    className="rounded-full"
                    onClick={() => onNavigate(data.nextHint!.section)}
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    Исправить
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">
                  Отлично! Всё выглядит заполненным
                </div>
                <div className="text-[12px] text-slate-600">
                  Можешь проверить форматирование и экспортировать в PDF.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
