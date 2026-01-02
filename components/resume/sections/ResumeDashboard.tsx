"use client";

import { Button, Card, Progress, Typography } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Briefcase,
  CheckCircle2,
  FileText,
  GraduationCap,
  HeartHandshake,
  Languages,
  Settings2,
  Sparkles,
  User,
  Wrench,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useMemo } from "react";

import { computeResumeScore } from "@/lib/resumeProgress";
import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";

const { Text } = Typography;

type Status = "good" | "warn" | "bad";

const messages = {
  ru: {
    dashboard: "Дашборд",
    almostReady: "Почти готово",
    notBad: "Неплохо",
    needFill: "Нужно заполнить",
    betterTo100: "· к 100% лучше",
    readiness: "готовность",
    minimum: "Минимум: ~60%",
    strong: "Сильно: 85%+",
    fix: "Исправить",
    allDoneTitle: "Отлично! Всё заполнено",
    allDoneDesc: "Проверь форматирование и экспортируй в PDF.",
    sections: {
      basic: "Шапка",
      summary: "О себе",
      experience: "Опыт",
      skills: "Навыки",
      education: "Образование",
      languages: "Языки",
      preferences: "Предпочтения",
      certifications: "Сертификаты",
      activities: "Активности",
      default: "Раздел",
    },
  },
  en: {
    dashboard: "Dashboard",
    almostReady: "Almost ready",
    notBad: "Not bad",
    needFill: "Needs work",
    betterTo100: "· closer to 100%",
    readiness: "readiness",
    minimum: "Minimum: ~60%",
    strong: "Strong: 85%+",
    fix: "Fix",
    allDoneTitle: "Great! Everything is filled",
    allDoneDesc: "Check formatting and export to PDF.",
    sections: {
      basic: "Header",
      summary: "Summary",
      experience: "Experience",
      skills: "Skills",
      education: "Education",
      languages: "Languages",
      preferences: "Preferences",
      certifications: "Certifications",
      activities: "Activities",
      default: "Section",
    },
  },
} as const;

function statusPalette(status: Status) {
  if (status === "good") {
    return {
      chip: "text-success bg-success/10",
      dot: "bg-success",
      icon: "text-success",
      soft: "bg-success/8",
    };
  }
  if (status === "warn") {
    return {
      chip: "text-warning bg-warning/10",
      dot: "bg-warning",
      icon: "text-warning",
      soft: "bg-warning/8",
    };
  }
  return {
    chip: "text-danger bg-danger/10",
    dot: "bg-danger",
    icon: "text-danger",
    soft: "bg-danger/8",
  };
}

function scoreLabel(percent: number, dict: (typeof messages)["ru" | "en"]) {
  if (percent >= 85) return { text: dict.almostReady, status: "good" as const };
  if (percent >= 60) return { text: dict.notBad, status: "warn" as const };
  return { text: dict.needFill, status: "bad" as const };
}

function sectionMeta(section: string, dict: (typeof messages)["ru" | "en"]) {
  switch (section) {
    case "basic":
      return { icon: User, label: dict.sections.basic };
    case "summary":
      return { icon: FileText, label: dict.sections.summary };
    case "experience":
      return { icon: Briefcase, label: dict.sections.experience };
    case "skills":
      return { icon: Wrench, label: dict.sections.skills };
    case "education":
      return { icon: GraduationCap, label: dict.sections.education };
    case "languages":
      return { icon: Languages, label: dict.sections.languages };
    case "preferences":
      return { icon: Settings2, label: dict.sections.preferences };
    case "certifications":
      return { icon: BadgeCheck, label: dict.sections.certifications };
    case "activities":
      return { icon: HeartHandshake, label: dict.sections.activities };
    default:
      return { icon: Sparkles, label: dict.sections.default };
  }
}

function MetricPill({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: Status;
}) {
  const p = statusPalette(status);

  return (
    <motion.div
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={[
        "flex items-center justify-between gap-3 rounded-2xl px-3 py-2",
        "bg-surface2/60 backdrop-blur",
        "shadow-sm shadow-black/5 dark:shadow-black/30",
        "transition",
      ].join(" ")}
    >
      <div className="min-w-0 flex items-center gap-2">
        <span className={["h-2 w-2 shrink-0 rounded-full", p.dot].join(" ")} />
        <span className="min-w-0 truncate text-[12px] font-semibold text-text">
          {label}
        </span>
      </div>

      <span className="shrink-0 text-[12px] font-semibold tabular-nums text-text2">
        {value}
      </span>
    </motion.div>
  );
}

export function ResumeDashboard({
  onNavigate,
}: {
  onNavigate?: (section: string) => void;
}) {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const dict = messages[locale];

  const resume = useResumeStore((s) => s.resume);
  const data = useMemo(
    () => computeResumeScore(resume, locale),
    [resume, locale]
  );

  const badge = scoreLabel(data.percent, dict);
  const badgeP = statusPalette(badge.status);

  const HintIcon = data.percent >= 85 ? CheckCircle2 : AlertTriangle;
  const hintStatus: Status = data.percent >= 85 ? "good" : "warn";
  const hintP = statusPalette(hintStatus);

  const hintMeta = data.nextHint
    ? sectionMeta(data.nextHint.section, dict)
    : null;
  const HintSectionIcon = hintMeta?.icon ?? Sparkles;

  return (
    <Card
      className={[
        "!rounded-[24px] !border-0",
        "bg-surface/60 backdrop-blur-xl",
        "shadow-[0_16px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_60px_rgba(0,0,0,0.35)]",
      ].join(" ")}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-surface2/70 shadow-sm shadow-black/5 dark:shadow-black/30">
                <Sparkles className="h-4 w-4 text-text2" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Text strong className="!m-0 !text-text">
                    {dict.dashboard}
                  </Text>

                  <span
                    className={[
                      "inline-flex items-center gap-2 rounded-full px-2.5 py-1",
                      "text-[12px] font-semibold",
                      badgeP.chip,
                      "shadow-sm shadow-black/5 dark:shadow-black/30",
                    ].join(" ")}
                  >
                    <span
                      className={["h-2 w-2 rounded-full", badgeP.dot].join(" ")}
                    />
                    {badge.text}
                  </span>
                </div>

                <div className="mt-0.5 text-[12px] text-text3">
                  {data.gained}/{data.total} {dict.betterTo100}
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <div className="rounded-2xl bg-surface2/70 px-2 py-2 shadow-sm shadow-black/5 dark:shadow-black/30">
              <Progress
                type="circle"
                percent={data.percent}
                size={64}
                strokeWidth={10}
                format={() => (
                  <span className="text-[14px] font-bold tabular-nums text-text">
                    {data.percent}%
                  </span>
                )}
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-surface2/60 px-3 py-3 shadow-sm shadow-black/5 dark:shadow-black/30">
          <Progress
            percent={data.percent}
            showInfo={false}
            size="small"
            className="m-0"
          />
          <div className="mt-2 flex items-center justify-between text-[12px] text-text3">
            <span>{dict.minimum}</span>
            <span>{dict.strong}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {data.metrics.map((m) => (
            <MetricPill
              key={m.key}
              label={m.label}
              value={m.value}
              status={m.status}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-surface2/60 p-3 shadow-sm shadow-black/5 dark:shadow-black/30">
          <AnimatePresence mode="wait" initial={false}>
            {data.nextHint ? (
              <motion.div
                key="hint"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={[
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
                      hintP.soft,
                    ].join(" ")}
                  >
                    <HintIcon className={["h-5 w-5", hintP.icon].join(" ")} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-surface/70 px-2 py-1 text-[12px] font-semibold text-text2 shadow-sm shadow-black/5 dark:shadow-black/30">
                      <HintSectionIcon className="h-4 w-4" />
                      {hintMeta?.label ?? dict.sections.default}
                    </div>

                    <div className="mt-2 text-[13px] font-semibold text-text">
                      {data.nextHint.title}
                    </div>
                    <div className="mt-1 whitespace-pre-line text-[12px] text-text2">
                      {data.nextHint.description}
                    </div>
                  </div>
                </div>

                {onNavigate && (
                  <Button
                    type="primary"
                    block
                    className="!rounded-full !shadow-none"
                    onClick={() => onNavigate(data.nextHint.section)}
                    icon={<ArrowRight className="h-4 w-4" />}
                  >
                    {dict.fix}
                  </Button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex items-start gap-3"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-success/10">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                </div>

                <div className="min-w-0">
                  <div className="text-[13px] font-semibold text-text">
                    {dict.allDoneTitle}
                  </div>
                  <div className="mt-1 text-[12px] text-text2">
                    {dict.allDoneDesc}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
