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

        bg-white/[0.03]
        backdrop-blur
        shadow-[0_8px_20px_rgba(0,0,0,0.35)]
        transition-all duration-200
        select-none no-underline
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25
      "
    >
      <span className="text-xl italic font-semibold text-white tracking-wide">
        Resumify
      </span>
    </Link>
  );
}
