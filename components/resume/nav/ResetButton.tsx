"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/resume/useResumeStore";
import { Button, Modal } from "antd";
import { RotateCcw } from "lucide-react";

const messages = {
  ru: {
    button: "Сбросить",
    title: "Сбросить резюме?",
    content:
      "Все данные будут удалены, и резюме вернётся к состоянию по умолчанию.",
    ok: "Сбросить",
    cancel: "Отмена",
  },
  en: {
    button: "Reset",
    title: "Reset resume?",
    content:
      "All data will be removed and the resume will be reset to default.",
    ok: "Reset",
    cancel: "Cancel",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

type ResetResumeButtonProps = {
  className?: string;
};

export function ResetResumeButton({ className }: ResetResumeButtonProps) {
  const reset = useResumeStore((s) => s.reset);

  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale);
  const t = messages[locale];

  const handleClick = () => {
    Modal.confirm({
      title: t.title,
      content: t.content,
      okText: t.ok,
      cancelText: t.cancel,
      okButtonProps: { danger: true },
      centered: true,
      onOk: () => reset(),
    });
  };

  return (
    <Button onClick={handleClick} danger>
      <RotateCcw size={16} className="opacity-70" />
      {t.button}
    </Button>
  );
}
