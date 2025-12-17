"use client"

import React, { useEffect, useMemo, useRef, useState } from "react"
import type { Resume } from "@/types/resume"
import type { Locale } from "@/lib/useCurrentLocale"
import { ResumePrint } from "@/components/resume/ResumePrint"

const A4_W = 794
const A4_H = 1123

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect?.width ?? 0
      setWidth(w)
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return { ref, width }
}

export function ResumePreviewThumb({
  data,
  locale,
  className,
}: {
  data: Resume
  locale: Locale
  className?: string
}) {
  const { ref, width } = useElementWidth<HTMLDivElement>()
  const scale = useMemo(() => {
    // небольшой padding “под рамку”
    const inner = Math.max(0, width - 24)
    return inner > 0 ? inner / A4_W : 0.18
  }, [width])

  return (
    <div
      ref={ref}
      className={
        "relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm " +
        (className ?? "")
      }
      style={{
        // фикс высоты “окна” под лист, чтобы карточки были ровные
        height: 180,
      }}
    >
      {/* лёгкий “глянец”, как у продуктовых превью */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent" />

      {/* A4 лист */}
      <div
        className="absolute left-3 top-3 origin-top-left pointer-events-none"
        style={{
          width: A4_W,
          height: A4_H,
          transform: `scale(${scale})`,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 18px 40px rgba(15, 23, 42, 0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
          background: "#fff",
        }}
      >
        {/* важно: pointer-events-none, чтобы клики шли по карточке */}
        <ResumePrint data={data} locale={locale} />
      </div>

      {/* лёгкое затемнение снизу для глубины */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/5 to-transparent" />
    </div>
  )
}
