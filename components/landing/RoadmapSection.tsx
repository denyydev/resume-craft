"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Clock, Wrench } from "lucide-react"

const roadmap = [
  {
    status: "done",
    title: "PDF templates refactor",
    description: "Обновлены шаблоны под новую модель данных.",
  },
  {
    status: "done",
    title: "Skills block redesign",
    description: "Теги, анимации, разделение hard / soft skills.",
  },
  {
    status: "done",
    title: "Zustand state model",
    description: "Единый источник правды для всех шаблонов.",
  },
  {
    status: "progress",
    title: "Smart progress dashboard",
    description: "Подсчёт заполненности и качества резюме.",
  },
  {
    status: "planned",
    title: "DOCX export",
    description: "Экспорт в Word без потери форматирования.",
  },
  {
    status: "planned",
    title: "AI content hints",
    description: "Подсказки для summary, experience и skills.",
  },
]

const statusMeta = {
  done: {
    icon: CheckCircle2,
    label: "Готово",
    color: "text-emerald-400",
  },
  progress: {
    icon: Clock,
    label: "В работе",
    color: "text-cyan-400",
  },
  planned: {
    icon: Wrench,
    label: "В планах",
    color: "text-neutral-400",
  },
}

export function RoadmapSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Roadmap проекта
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300">
            Пет-проект с продуктовым мышлением и планом развития.
          </p>
        </motion.div>

        <div className="mt-14 space-y-4">
          {roadmap.map((item, i) => {
            const meta = statusMeta[item.status]
            const Icon = meta.icon

            return (
              <motion.div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Icon className={`mt-0.5 h-5 w-5 ${meta.color}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white">{item.title}</h3>
                    <span className={`text-xs ${meta.color}`}>
                      {meta.label}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-neutral-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
