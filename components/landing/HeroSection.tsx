"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, CheckCircle2, Palette, Globe } from "lucide-react"
import { fadeInUp, staggerContainer } from "./landing.motion"
import { heroBadges, heroHighlights } from "./landing.constants"
import { signIn } from "next-auth/react"

function Badge({ tone, children }: { tone: "cyan" | "emerald" | "purple" | "blue"; children: React.ReactNode }) {
  const map = {
    cyan: "bg-cyan-500/10 text-cyan-300",
    emerald: "bg-emerald-500/10 text-emerald-300",
    purple: "bg-purple-500/10 text-purple-300",
    blue: "bg-blue-500/10 text-blue-300",
  } as const

  return <div className={`flex items-center gap-2 rounded-full px-4 py-2 ${map[tone]}`}>{children}</div>
}

export default function HeroSection() {
  return (
    <section className="relative py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-medium text-neutral-200">Выбор профессионалов по всему миру</span>
        </motion.div>

        <motion.div className="space-y-8" variants={staggerContainer} initial="hidden" animate="visible">
          <motion.div variants={fadeInUp}>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-tight text-white lg:text-7xl">
              Резюме, которые
              <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                помогают устроиться быстрее
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 lg:text-xl">
              Профессиональный конструктор резюме: современные шаблоны, оптимизация под ATS и экспорт,
              который действительно выглядит достойно. Дизайн-навыки не нужны.
            </p>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-4" variants={fadeInUp} transition={{ delay: 0.1 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/ru/editor" })}
                className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 lg:text-lg cursor-pointer"
              >
                <span className="relative">Начать бесплатно</span>
                <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>

            </motion.div>
          </motion.div>

          <motion.div className="flex flex-wrap gap-4 pt-4" variants={fadeInUp} transition={{ delay: 0.2 }}>
            <Badge tone="cyan">
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium">Дружит с ATS</span>
            </Badge>
            <Badge tone="emerald">
              <Zap className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium">Превью в реальном времени</span>
            </Badge>
            <Badge tone="purple">
              <Palette className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">20+ шаблонов</span>
            </Badge>
            <Badge tone="blue">
              <Globe className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">Мультиязычность</span>
            </Badge>
          </motion.div>
        </motion.div>

        <motion.div className="relative mt-20" variants={fadeInUp} transition={{ delay: 0.3 }}>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-emerald-500/20 blur-3xl" />

          <motion.div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="p-8">
              <div className="grid gap-8 md:grid-cols-3">
                {heroHighlights.map((h) => (
                  <div key={h.title} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-2">
                        <h.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{h.title}</h3>
                    </div>
                    <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
