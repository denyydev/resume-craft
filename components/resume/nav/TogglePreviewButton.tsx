"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { Button } from "antd";
import { Eye, EyeOff } from "lucide-react";

const messages = {
  ru: {
    hide: "Скрыть превью",
    show: "Показать превью",
  },
  en: {
    hide: "Hide preview",
    show: "Show preview",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

export type TogglePreviewButtonProps = {
  showPreview: boolean;
  onToggle: () => void;
  className?: string;
};

export function TogglePreviewButton({
  showPreview,
  onToggle,
  className,
}: TogglePreviewButtonProps) {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale);
  const t = messages[locale];

  return (
    <Button onClick={onToggle} className={className}>
      {showPreview ? (
        <EyeOff size={16} className="opacity-70" />
      ) : (
        <Eye size={16} className="opacity-70" />
      )}
      {showPreview ? t.hide : t.show}
    </Button>
  );
}
