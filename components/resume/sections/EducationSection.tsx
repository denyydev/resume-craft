"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Trash2,
  GraduationCap,
  Languages,
  BookOpen,
  Calendar
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "antd"

// Reusable Floating Input
const FloatingInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  disabled = false
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  placeholder?: string,
  icon?: any,
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
        type="text"
        disabled={disabled}
        className={`w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-2.5 transition-all outline-none placeholder:text-slate-400 ${Icon ? 'pl-9' : ''} ${disabled ? 'bg-slate-100 cursor-not-allowed text-slate-500' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

const messages = {
  ru: {
    sectionTitle: "Образование и языки",
    sectionSubtitle: "Формальное образование, профильные курсы и уровни владения иностранными языками.",
    educationTitle: "Образование",
    addEducation: "Добавить запись",
    educationEmpty: "Добавь профильный вуз, колледж или сильные курсы.",
    delete: "Удалить",
    institution: "Учебное заведение",
    institutionPlaceholder: "НИУ ВШЭ, МГУ, Яндекс Практикум...",
    field: "Специальность / программа",
    fieldPlaceholder: "Прикладная математика и информатика",
    degree: "Степень / формат обучения",
    degreePlaceholder: "Бакалавр, магистр, курс",
    periodLabel: "Период",
    periodPlaceholder: "2017–2021",
    startLabel: "Начало",
    startPlaceholder: "2017",
    endLabel: "Окончание",
    endPlaceholder: "2021",
    languagesTitle: "Языки",
    addLanguage: "Добавить язык",
    languagesEmpty: "Укажи хотя бы английский и уровень владения.",
    languageLabel: "Язык",
    languagePlaceholder: "Английский",
    levelLabel: "Уровень",
    levelPlaceholder: "B2 / C1 / носитель",
    deleteLanguage: "Удалить",
  },
  en: {
    sectionTitle: "Education & languages",
    sectionSubtitle: "Formal education, relevant courses and your proficiency in foreign languages.",
    educationTitle: "Education",
    addEducation: "Add entry",
    educationEmpty: "Add a university, college or strong course.",
    delete: "Delete",
    institution: "Institution",
    institutionPlaceholder: "HSE, MSU, university...",
    field: "Major / program",
    fieldPlaceholder: "Computer Science",
    degree: "Degree / program type",
    degreePlaceholder: "Bachelor, Master, course",
    periodLabel: "Period",
    periodPlaceholder: "2017–2021",
    startLabel: "Start",
    startPlaceholder: "2017",
    endLabel: "End",
    endPlaceholder: "2021",
    languagesTitle: "Languages",
    addLanguage: "Add language",
    languagesEmpty: "Add at least English and your level.",
    languageLabel: "Language",
    languagePlaceholder: "English",
    levelLabel: "Level",
    levelPlaceholder: "B2 / C1 / native",
    deleteLanguage: "Delete",
  },
} as const

export function EducationSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const {
    resume,
    addEducation,
    updateEducation,
    removeEducation,
    addLanguage,
    updateLanguage,
    removeLanguage,
  } = useResumeStore()

  return (
<Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-500" />
            {t.sectionTitle}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.sectionSubtitle}</p>
        </div>
      </div>

      {/* Education List */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-slate-400" />
            {t.educationTitle}
          </h3>
          <Button size="sm" variant="ghost" onClick={addEducation} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
            <Plus className="w-4 h-4 mr-2" />
            {t.addEducation}
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {resume.education.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <p className="text-xs text-slate-500">{t.educationEmpty}</p>
            </div>
          )}

          {resume.education.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="group relative bg-slate-50/50 rounded-xl border border-slate-200 p-4 space-y-4 transition-all hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label={t.institution}
                    placeholder={t.institutionPlaceholder}
                    value={item.institution}
                    onChange={(v) => updateEducation(item.id, { institution: v })}
                  />
                  <FloatingInput
                    label={t.field}
                    placeholder={t.fieldPlaceholder}
                    value={item.field}
                    onChange={(v) => updateEducation(item.id, { field: v })}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 -mt-1 -mr-1 ml-4"
                  onClick={() => removeEducation(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label={t.degree}
                  placeholder={t.degreePlaceholder}
                  value={item.degree}
                  onChange={(v) => updateEducation(item.id, { degree: v })}
                />
                <div className="flex gap-2">
                  <FloatingInput
                    label={t.startLabel}
                    placeholder={t.startPlaceholder}
                    value={item.startDate}
                    onChange={(v) => updateEducation(item.id, { startDate: v })}
                  />
                  <FloatingInput
                    label={t.endLabel}
                    placeholder={t.endPlaceholder}
                    value={item.endDate}
                    onChange={(v) => updateEducation(item.id, { endDate: v })}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Languages List */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Languages className="w-4 h-4 text-slate-400" />
            {t.languagesTitle}
          </h3>
          <Button size="sm" variant="ghost" onClick={addLanguage} className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
            <Plus className="w-4 h-4 mr-2" />
            {t.addLanguage}
          </Button>
        </div>

        <div className="space-y-3">
          {resume.languages.map((lang) => (
            <motion.div
              key={lang.id}
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
              className="flex flex-col md:flex-row gap-3 items-end md:items-center rounded-xl border border-slate-200 bg-slate-50/50 p-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex-1 w-full">
                <FloatingInput
                  label={t.languageLabel}
                  placeholder={t.languagePlaceholder}
                  value={lang.name}
                  onChange={(v) => updateLanguage(lang.id, { name: v })}
                />
              </div>
              <div className="flex-1 w-full">
                <FloatingInput
                  label={t.levelLabel}
                  placeholder={t.levelPlaceholder}
                  value={lang.level}
                  onChange={(v) => updateLanguage(lang.id, { level: v })}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50"
                onClick={() => removeLanguage(lang.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}
