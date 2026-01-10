"use client";

import Link from "next/link";

export function BrandLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="ResumeCraft"
      className="
        group inline-flex items-center
        h-10 px-3 rounded-full
        border border-white/10
        bg-white/[0.03]
        backdrop-blur
        shadow-[0_8px_20px_rgba(0,0,0,0.35)]
        transition-all duration-200
        select-none no-underline
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25
      "
    >
      <span className="text-sm font-semibold tracking-tight text-white/90">
        ResumeCraft
      </span>
      <span
        className="
          ml-2 h-1.5 w-1.5 rounded-full bg-[#0A84FF]
          shadow-[0_0_0_4px_rgba(10,132,255,0.14)]
        "
      />
    </Link>
  );
}
