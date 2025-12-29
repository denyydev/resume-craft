"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { FileText } from "lucide-react";
import Link from "next/link";

export function BrandLink({ href }: { href: string }) {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme === "dark";

  return (
    <Link href={href} className="group flex items-center gap-2.5 select-none">
      <div
        className={[
          "relative grid h-8 w-8 place-items-center overflow-hidden rounded-lg border shadow-sm transition-all",
          isDark
            ? "border-[rgba(148,163,184,0.20)] bg-[#0A84FF]"
            : "border-[rgba(2,6,23,0.12)] bg-[#020617]",
          "group-hover:shadow-md group-hover:-translate-y-[0.5px]",
        ].join(" ")}
      >
        <div
          className={[
            "pointer-events-none absolute -right-3 -top-3 h-10 w-10 rounded-full blur-xl opacity-70 transition-opacity",
            isDark ? "bg-white/30" : "bg-[#0A84FF]/30",
            "group-hover:opacity-90",
          ].join(" ")}
        />
        <FileText className="relative h-4 w-4 text-white" />
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={[
            "text-[16px] font-semibold tracking-tight transition-colors",
            isDark ? "text-white" : "text-[#020617]",
          ].join(" ")}
        >
          ResumeCraft
        </span>
        <span
          className={[
            "mt-0.5 text-[11px] tracking-wide transition-colors",
            isDark ? "text-white/60" : "text-slate-500",
          ].join(" ")}
        >
          Simple builder
        </span>
      </div>
    </Link>
  );
}
