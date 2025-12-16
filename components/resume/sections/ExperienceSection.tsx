"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Plus,
  Trash2,
  Briefcase,
  MapPin,
  Calendar,
  Building2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, Button } from "antd"

// Reusable Floating Input for this section
const FloatingInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  disabled = false
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  placeholder?: string,
  icon?: any,
  type?: string,
  disabled?: boolean
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
        type={type}
        disabled={disabled}
        className={`w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-2.5 transition-all outline-none placeholder:text-slate-400 ${Icon ? 'pl-9' : ''} ${disabled ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

const messages = {
  // ... existing messages
  ru: {
    sectionTitle: "Опыт работы",
    sectionSubtitle: "Укажи самые релевантные позиции за последние годы.",
    addButton: "Добавить место работы",
    emptyState: "Пока нет ни одной записи. Нажми кнопку ниже, чтобы добавить опыт.",
    delete: "Удалить",
    company: "Компания",
    companyPlaceholder: "ООО «Рога и Копыта»",
    position: "Должность",
    positionPlaceholder: "Frontend Developer",
    location: "Локация",
    locationPlaceholder: "Москва / Remote",
    startDate: "Начало",
    endDate: "Окончание",
    currentCheckbox: "Работаю здесь сейчас",
    description: "Описание",
    descriptionPlaceholder: "Опиши задачи и достижения...",
  },
  en: {
    sectionTitle: "Work experience",
    sectionSubtitle: "List the most relevant positions from recent years.",
    addButton: "Add experience",
    emptyState: "No experience added yet. Click the button below to add experience.",
    delete: "Delete",
    company: "Company",
    companyPlaceholder: "Acme Inc.",
    position: "Position",
    positionPlaceholder: "Frontend Developer",
    location: "Location",
    locationPlaceholder: "Berlin / Remote",
    startDate: "Start date",
    endDate: "End date",
    currentCheckbox: "I currently work here",
    description: "Description",
    descriptionPlaceholder: "Describe tasks and achievements...",
  },
} as const

export function ExperienceSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const { resume, addExperience, updateExperience, removeExperience } = useResumeStore()

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            {t.sectionTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.sectionSubtitle}</p>
        </div>
        <Button onClick={addExperience} size="sm" className="rounded-full bg-slate-900 text-white shadow-md hover:shadow-lg transition-all">
          <Plus className="w-4 h-4 mr-2" />
          {t.addButton}
        </Button>
      </div>

      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {resume.experience.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Briefcase className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 max-w-xs text-center">{t.emptyState}</p>
            </motion.div>
          )}

          {resume.experience.map((item, index) => (
            <motion.div
              key={item.id}
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
                  onClick={() => removeExperience(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label={t.company}
                  placeholder={t.companyPlaceholder}
                  value={item.company}
                  onChange={(v) => updateExperience(item.id, { company: v })}
                  icon={Building2}
                />
                <FloatingInput
                  label={t.position}
                  placeholder={t.positionPlaceholder}
                  value={item.position}
                  onChange={(v) => updateExperience(item.id, { position: v })}
                  icon={Briefcase}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label={t.location}
                  placeholder={t.locationPlaceholder}
                  value={item.location}
                  onChange={(v) => updateExperience(item.id, { location: v })}
                  icon={MapPin}
                />
                <div className="flex gap-4">
                  <FloatingInput
                    label={t.startDate}
                    type="month"
                    value={item.startDate}
                    onChange={(v) => updateExperience(item.id, { startDate: v })}
                  />
                  <FloatingInput
                    label={t.endDate}
                    type="month"
                    disabled={item.isCurrent}
                    value={item.endDate}
                    onChange={(v) => updateExperience(item.id, { endDate: v })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isCurrent}
                  onChange={(e) => updateExperience(item.id, { isCurrent: e.target.checked, endDate: e.target.checked ? "" : item.endDate })}
                  className="w-4 h-4 text-slate-900 bg-slate-100 border-slate-300 rounded focus:ring-slate-900 focus:ring-2"
                  id={`current-${item.id}`}
                />
                <label htmlFor={`current-${item.id}`} className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                  {t.currentCheckbox}
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">{t.description}</label>
                <textarea
                  className="w-full min-h-[100px] bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-3 transition-all outline-none resize-y placeholder:text-slate-400"
                  placeholder={t.descriptionPlaceholder}
                  value={item.description}
                  onChange={(e) => updateExperience(item.id, { description: e.target.value })}
                />
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        {resume.experience.length > 0 && (
          <Button variant="outline" onClick={addExperience} className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50">
            <Plus className="w-4 h-4 mr-2" />
            {t.addButton}
          </Button>
        )}
      </div>
    </Card>
  )
}
