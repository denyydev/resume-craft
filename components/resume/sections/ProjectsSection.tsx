"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { Button,Card } from "antd"
import {
  Plus,
  Trash2,
  FolderGit2,
  ExternalLink,
  Layers,
  StickyNote
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Reusable Floating Input
const FloatingInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  placeholder?: string,
  icon?: any
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
          <Icon size={16} />
        </div>
      )}
      <input
        type="text"
        className={`w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-2.5 transition-all outline-none placeholder:text-slate-400 ${Icon ? 'pl-9' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

const messages = {
  ru: {
    sectionTitle: "Проекты и кейсы",
    sectionSubtitle: "Pet-проекты, опенсорс и продукты, по которым лучше всего видно твой уровень.",
    addButton: "Добавить проект",
    emptyState: "Добавь 2–4 проекта, чтобы показать стек, подход к задачам и реальный опыт разработки.",
    delete: "Удалить",
    name: "Название проекта",
    namePlaceholder: "Сервис генерации резюме",
    role: "Роль",
    rolePlaceholder: "Frontend Engineer / автор проекта",
    stack: "Технологии и стек",
    stackPlaceholder: "Next.js, TypeScript, Tailwind, Prisma",
    link: "Ссылка",
    linkPlaceholder: "GitHub, прод или демо: https://...",
    description: "Краткое описание и результаты",
    descriptionPlaceholder: "1–3 предложения: цель проекта, твой вклад, ключевые задачи и заметные результаты.",
  },
  en: {
    sectionTitle: "Projects and case studies",
    sectionSubtitle: "Side projects, open source and key products that best showcase your skills.",
    addButton: "Add project",
    emptyState: "Add 2–4 projects to demonstrate your tech stack, problem-solving approach and real development experience.",
    delete: "Delete",
    name: "Project name",
    namePlaceholder: "Resume generator service",
    role: "Role",
    rolePlaceholder: "Frontend engineer / creator",
    stack: "Tech stack",
    stackPlaceholder: "Next.js, TypeScript, Tailwind, Prisma",
    link: "Link",
    linkPlaceholder: "GitHub, production or demo: https://...",
    description: "Short description and impact",
    descriptionPlaceholder: "1–3 sentences: goal of the project, your contribution, key tasks and measurable results.",
  },
} as const

export function ProjectsSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const { resume, addProject, updateProject, removeProject } = useResumeStore()

  return (
<Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-blue-500" />
            {t.sectionTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.sectionSubtitle}</p>
        </div>
        <Button onClick={addProject} >
          <Plus className="w-4 h-4 mr-2" />
          {t.addButton}
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {resume.projects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <FolderGit2 className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 max-w-xs text-center">{t.emptyState}</p>
            </motion.div>
          )}

          {resume.projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: 'hidden' }}
              className="group relative bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-5 transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                  {index + 1}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 -mt-1 -mr-1"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <FloatingInput
                  label={t.name}
                  placeholder={t.namePlaceholder}
                  value={project.name}
                  onChange={(v) => updateProject(project.id, { name: v })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label={t.role}
                    placeholder={t.rolePlaceholder}
                    value={project.role}
                    onChange={(v) => updateProject(project.id, { role: v })}
                  />
                  <FloatingInput
                    label={t.stack}
                    placeholder={t.stackPlaceholder}
                    value={project.stack}
                    onChange={(v) => updateProject(project.id, { stack: v })}
                    icon={Layers}
                  />
                </div>

                <FloatingInput
                  label={t.link}
                  placeholder={t.linkPlaceholder}
                  value={project.link}
                  onChange={(v) => updateProject(project.id, { link: v })}
                  icon={ExternalLink}
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{t.description}</label>
                  <textarea
                    className="w-full min-h-[80px] bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-3 transition-all outline-none resize-y placeholder:text-slate-400"
                    placeholder={t.descriptionPlaceholder}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, { description: e.target.value })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {resume.projects.length > 0 && (
          <Button variant="outline" onClick={addProject} className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50">
            <Plus className="w-4 h-4 mr-2" />
            {t.addButton}
          </Button>
        )}
      </div>
</Card>
  )
}
