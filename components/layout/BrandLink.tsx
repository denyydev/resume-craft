"use client";

import Link from "next/link";

export function BrandLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="ResumeCraft"
      className="
        group relative flex h-8 w-24 select-none items-center justify-center
      "
    >
      {/* outer glow (air) */}
      <span
        className="
          pointer-events-none absolute -inset-2 rounded-2xl
          bg-black/40 blur-xl
          opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        "
      />

      {/* body */}
      <div
        className="
          relative z-10 flex h-full w-full items-center justify-center
          rounded-xl p-[1px]
          border border-white/10

          /* same gradient as nav */
          bg-gradient-to-b
          from-[#0b0b0e]
          via-[#0f1117]
          to-[#0b0b0e]

          backdrop-blur
          shadow-[0_8px_20px_rgba(0,0,0,0.45)]
          transition-all duration-300
          group-hover:-translate-y-0.5
        "
      >
        {/* inner surface */}
        <div
          className="
            relative flex h-full w-full items-center justify-center
            rounded-[10px]

            /* subtle inner highlight */
            bg-gradient-to-b
            from-white/10
            to-transparent
          "
        >
          {/* letters */}
          <span className="text-[13px] font-semibold tracking-tight text-white/90">
            ResumeCraft
          </span>
        </div>
      </div>
    </Link>
  );
}
