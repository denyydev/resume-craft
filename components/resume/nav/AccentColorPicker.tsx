"use client";

import { useResumeStore } from "@/store/useResumeStore";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

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

  const items: MenuProps["items"] = COLORS.map((color) => ({
    key: color,
    label: (
      <div className="flex items-center justify-center py-1">
        <span
          className="h-4 w-4 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    ),
  }));

  return (
    <Dropdown
      placement="topLeft"
      trigger={["click"]}
      disabled={disabled}
      menu={{
        items,
        selectable: true,
        selectedKeys: [current],
        onClick: ({ key }) => setAccentColor(String(key)),
      }}
    >
      <button
        type="button"
        disabled={disabled}
        className={`h-8 w-8 rounded-full border bg-white flex items-center justify-center cursor-pointer ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "hover:scale-105 active:scale-95"
        } ${className ?? ""}`}
        style={{ backgroundColor: current }}
      />
    </Dropdown>
  );
}
