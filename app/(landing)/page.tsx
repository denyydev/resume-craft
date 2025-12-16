"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Sparkles,
  Zap,
  CheckCircle2,
  Palette,
  FileText,
  Globe,
  Users,
  Shield,
  Clock,
  Download,
  Star,
  TrendingUp,
} from "lucide-react"
import { useState } from "react"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
})

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
}

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <div className={inter.className}>
      <div className="fixed inset-0 -z-30 bg-neutral-950" />

      <div className="fixed inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-emerald-500/5 via-transparent to-sky-500/5 blur-3xl"
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="pt-16">
        <section className="relative py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-neutral-200">
                Выбор профессионалов по всему миру
              </span>
            </motion.div>

            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
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

              <motion.div
                className="flex flex-wrap items-center gap-4"
                variants={fadeInUp}
                transition={{ delay: 0.1 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/api/auth/signin"
                    className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-cyan-500/25 lg:text-lg"
                  >
                    <span className="relative">Начать бесплатно</span>
                    <ArrowRight className="relative h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href="/editor"
                    className="rounded-full border border-white/20 bg-white/5 px-6 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 lg:text-lg"
                  >
                    Открыть редактор
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                variants={fadeInUp}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-2 rounded-full bg-cyan-500/10 px-4 py-2">
                  <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium text-cyan-300">Дружит с ATS</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">Превью в реальном времени</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2">
                  <Palette className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-300">20+ шаблонов</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Мультиязычность</span>
                </div>
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
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-2">
                          <Users className="h-5 w-5 text-cyan-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Для любой профессии</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
                        Подходит для IT, маркетинга, финансов, медицины, образования и креативных индустрий.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-2">
                          <Shield className="h-5 w-5 text-emerald-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Приватность прежде всего</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
                        Данные под контролем: экспортируйте и удаляйте в любой момент. Без скрытых подписок.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-2">
                          <Clock className="h-5 w-5 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-white">Экономит время</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-neutral-300 lg:text-base">
                        Профессиональное резюме за минуты, а не часы. Обновления — в один клик.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-semibold tracking-tight text-white lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm text-neutral-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-white">
                Почему тысячи выбирают
                <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {" "}
                  ResumeCraft
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300 lg:text-xl">
                Всё, что нужно для успешного поиска работы
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                    hoveredCard === index
                      ? "border-cyan-500/50 bg-white/5"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  whileHover={{ y: -4 }}
                >
                  <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 p-3">
                    <feature.icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-300 lg:text-base">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-semibold tracking-tight text-white">Профессионалы рекомендуют</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-neutral-300 lg:text-xl">
                Что говорят пользователи о своём опыте
              </p>
            </motion.div>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/10 p-6 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed text-neutral-300 lg:text-base">
                    “{testimonial.text}”
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20">
                      <span className="text-sm font-semibold text-white">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white">{testimonial.name}</div>
                      <div className="text-sm text-neutral-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              className="relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/10 to-emerald-500/20" />

              <div className="relative px-8 py-16 text-center lg:px-16">
                <motion.div
                  className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
                  animate={floatAnimation}
                >
                  <Sparkles className="h-4 w-4 text-cyan-400" />
                  <span className="text-sm font-medium text-neutral-200">
                    Готовы приблизить работу мечты?
                  </span>
                </motion.div>

                <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white lg:text-5xl">
                  Начните путь к
                  <span className="block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                    карьерному росту
                  </span>
                  уже сегодня
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200 lg:text-xl">
                  Присоединяйтесь к профессионалам, которые обновили резюме и ускорили развитие карьеры
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/api/auth/signin"
                      className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-10 py-4 text-base font-semibold text-white shadow-2xl shadow-cyan-500/25 lg:text-lg"
                    >
                      Создать аккаунт бесплатно
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="/examples"
                      className="rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 lg:text-lg"
                    >
                      Посмотреть шаблоны
                    </Link>
                  </motion.div>
                </div>

                <p className="mt-8 text-sm text-neutral-400">Бесплатный тариф навсегда • Карта не нужна</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

const features = [
  {
    icon: FileText,
    title: "Профессиональные шаблоны",
    description: "20+ шаблонов, оптимизированных под ATS — для любых отраслей и уровней.",
  },
  {
    icon: Zap,
    title: "Редактор в реальном времени",
    description: "Изменения видны сразу: редактируйте текст, переключайте шаблоны и мгновенно смотрите результат.",
  },
  {
    icon: Download,
    title: "Идеальный экспорт",
    description: "Скачивайте PDF, DOCX или простой текст — форматирование и внешний вид сохраняются.",
  },
  {
    icon: Globe,
    title: "Мультиязычность",
    description: "Создавайте резюме на английском, испанском, немецком, французском и других языках в один клик.",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Ваши данные остаются приватными. Экспортируйте и удаляйте информацию в любой момент.",
  },
  {
    icon: TrendingUp,
    title: "Подсказки по карьере",
    description: "Рекомендации по содержанию, ключевым словам и оформлению, чтобы выделиться для рекрутеров.",
  },
]

const stats = [
  { value: "50K+", label: "Создано резюме" },
  { value: "94%", label: "Довольны сервисом" },
  { value: "2.3×", label: "Больше интервью" },
  { value: "30+", label: "Стран" },
]

const testimonials = [
  {
    name: "Alex Morgan",
    role: "Менеджер по маркетингу",
    text: "После ResumeCraft получил 3 приглашения на интервью уже в первую неделю. Шаблоны — современные и аккуратные.",
  },
  {
    name: "Sarah Chen",
    role: "Инженер-разработчик",
    text: "Наконец-то конструктор резюме, который понимает, что важно для тех-рекрутеров. Оптимизация под ATS — точная.",
  },
  {
    name: "David Wilson",
    role: "Финансовый аналитик",
    text: "Перешёл с классических шаблонов на ResumeCraft и почти сразу заметил больше ответов на отклики.",
  },
]
