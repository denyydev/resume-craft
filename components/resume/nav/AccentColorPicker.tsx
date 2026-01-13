"use client";

import { useResumeStore } from "@/store/resume/useResumeStore";
import type { MenuProps } from "antd";
import { Button, Dropdown } from "antd";
import { Check, ChevronDown, Palette } from "lucide-react";
import { useMemo } from "react";

const COLORS = [
  "#1677ff",
  "#722ed1",
  "#eb2f96",
  "#f5222d",
  "#fa8c16",
  "#52c41a",
];

export type AccentColorPickerProps = {
  disabled?: boolean;
  className?: string;
};

export default function AccentColorPicker({
  disabled,
  className,
}: AccentColorPickerProps) {
  const accentColor = useResumeStore((s) => s.resume.accentColor);
  const setAccentColor = useResumeStore((s) => s.setAccentColor);

  const current = accentColor ?? COLORS[0];

  const items: MenuProps["items"] = useMemo(
    () => [
      {
        key: "palette",
        disabled: true,
        label: (
          <div className="py-1">
            <div className="mb-2 text-xs font-medium opacity-70">Accent</div>

            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((color) => {
                const active = color === current;

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAccentColor(color);
                    }}
                    aria-label={`Set accent color ${color}`}
                    className={`
                      relative h-7 w-7 rounded-full
                      ring-1 ring-black/10
                      transition-transform
                      ${
                        disabled
                          ? "opacity-60"
                          : "hover:scale-[1.06] active:scale-[0.98]"
                      }
                      ${active ? "ring-2 ring-black/20" : ""}
                    `}
                    style={{
                      backgroundColor: color,
                      boxShadow: active
                        ? `0 0 0 4px ${hexToRgba(color, 0.18)}`
                        : undefined,
                    }}
                  >
                    {active && (
                      <span className="absolute inset-0 grid place-items-center text-white">
                        <Check size={14} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2 text-[11px] opacity-60">
              {disabled ? "Disabled" : "Pick a color"}
            </div>
          </div>
        ),
      },
    ],
    [current, disabled, setAccentColor]
  );

  return (
    <Dropdown
      placement="bottomLeft"
      trigger={["click"]}
      disabled={disabled}
      menu={{ items }}
    >
      <Button
        type="default"
        disabled={disabled}
        className={`
          !h-10 !rounded-full
          !border-slate-200/80 !bg-white/80 hover:!bg-white
          shadow-sm backdrop-blur
          !px-3 flex items-center gap-2
          ${className ?? ""}
        `}
      >
        <Palette size={16} className="opacity-80" />

        <span className="text-sm font-medium">Accent</span>

        <span
          className="ml-1 inline-flex h-4 w-4 rounded-full ring-1 ring-black/10"
          style={{ backgroundColor: current }}
        />

        <ChevronDown size={16} className="opacity-70" />
      </Button>
    </Dropdown>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
