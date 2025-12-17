"use client"

import { motion } from "framer-motion"
import {
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
  Layout,
  Download,
} from "lucide-react"

const items = [
  {
    icon: Layout,
    title: "Чёткая структура",
    description: "Секции выстроены так, как ожидают рекрутеры и ATS.",
  },
  {
    icon: Layers,
    title: "Разделённые навыки",
    description: "Hard и soft skills — отдельно, без текстовой каши.",
  },
  {
    icon: Sparkles,
    title: "Современная типографика",
    description: "Аккуратные шрифты, интервалы и визуальная иерархия.",
  },
  {
    icon: CheckCircle2,
    title: "ATS-friendly формат",
    description: "Без таблиц, нестабильных колонок и ломки текста.",
  },
  {
    icon: FileText,
    title: "Единая модель данных",
    description: "Все шаблоны используют одну структуру резюме.",
  },
  {
    icon: Download,
    title: "Чистый PDF-экспорт",
    description: "То, что вы видите — именно то, что скачаете.",
  },
]

export function WhatInsideSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Что внутри конструктора
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Не просто шаблоны — а набор решений, которые делают резюме сильнее.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-3">
                <item.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
