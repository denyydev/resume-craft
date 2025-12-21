"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Briefcase,
  MapPin,
  Globe2,
  ShieldCheck,
  Plus,
  Trash2,
  BadgeCheck,
  Link as LinkIcon,
  Github,
  HandHeart,
  Users,
  Building2
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, Button, Select, Switch } from "antd"

const { Option } = Select

// ---------- Shared small UI ----------
const FloatingInput = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
  disabled = false
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  icon?: any
  type?: string
  disabled?: boolean
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-800 transition-colors">
          <Icon size={16} />
        </div>
      )}
      <input
        type={type}
        disabled={disabled}
        className={`w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-2.5 transition-all outline-none placeholder:text-slate-400 ${
          Icon ? "pl-9" : ""
        } ${disabled ? "opacity-50 cursor-not-allowed bg-slate-100" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

const FloatingTextarea = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon
}: {
  label: string
  value: string
  onChange: (val: string) => void
  placeholder?: string
  icon?: any
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-3 text-slate-400 group-focus-within:text-slate-800 transition-colors">
          <Icon size={16} />
        </div>
      )}
      <textarea
        className={`w-full min-h-[100px] bg-white border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 block p-3 transition-all outline-none resize-y placeholder:text-slate-400 ${
          Icon ? "pl-9" : ""
        }`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
)

const MultiSelect = ({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  options
}: {
  label: string
  value: string[]
  onChange: (val: string[]) => void
  placeholder?: string
  icon?: any
  options: { value: string; label: string }[]
}) => (
  <div className="space-y-1.5 w-full">
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <div className="relative group">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10 pointer-events-none group-focus-within:text-slate-800 transition-colors">
          <Icon size={16} />
        </div>
      )}
      <Select
        mode="multiple"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-8" : ""}`}
        style={{ width: "100%" }}
      >
        {options.map((o) => (
          <Option key={o.value} value={o.value}>
            {o.label}
          </Option>
        ))}
      </Select>
    </div>
  </div>
)

const messages = {
  ru: {
    employment: {
      title: "Предпочтения по работе",
      subtitle: "Тип занятости, формат, релокация и прочее.",
      employmentType: "Тип занятости",
      employmentTypePh: "Выбери подходящие варианты",
      workFormat: "Формат работы",
      workFormatPh: "Remote / Hybrid / Onsite",
      relocation: "Готов(а) к релокации",
      timezone: "Таймзона",
      timezonePh: "Например: Europe/Warsaw",
      authorization: "Разрешение на работу",
      authorizationPh: "Например: EU citizen / Work permit"
    },
    certifications: {
      title: "Сертификации",
      subtitle: "Добавь сертификаты и курсы, которые важны для роли.",
      add: "Добавить сертификат",
      empty: "Пока нет сертификатов. Добавь первый — это повысит доверие.",
      name: "Название",
      namePh: "AWS Certified Developer – Associate",
      issuer: "Организация",
      issuerPh: "Amazon Web Services",
      year: "Год",
      yearPh: "2025",
      link: "Ссылка",
      linkPh: "https://..."
    },
    activities: {
      title: "Open Source / Волонтерство",
      subtitle: "Проекты, комьюнити, вклад в OSS, волонтёрская деятельность.",
      add: "Добавить активность",
      empty: "Пока нет активностей. Добавь open-source/волонтёрство — это хороший плюс.",
      type: "Тип",
      name: "Проект / Организация",
      namePh: "Например: React Query / GDG / Foo NGO",
      role: "Роль",
      rolePh: "Contributor / Speaker / Volunteer",
      link: "Ссылка",
      linkPh: "https://github.com/...",
      description: "Описание",
      descriptionPh: "Коротко: что делал(а), какой вклад, результат."
    }
  },
  en: {
    employment: {
      title: "Employment preferences",
      subtitle: "Employment type, work format, relocation, and more.",
      employmentType: "Employment type",
      employmentTypePh: "Choose applicable options",
      workFormat: "Work format",
      workFormatPh: "Remote / Hybrid / Onsite",
      relocation: "Open to relocation",
      timezone: "Timezone",
      timezonePh: "e.g. Europe/Warsaw",
      authorization: "Work authorization",
      authorizationPh: "e.g. EU citizen / Work permit"
    },
    certifications: {
      title: "Certifications",
      subtitle: "Add certifications and courses relevant to your role.",
      add: "Add certification",
      empty: "No certifications yet. Add your first one to boost credibility.",
      name: "Name",
      namePh: "AWS Certified Developer – Associate",
      issuer: "Issuer",
      issuerPh: "Amazon Web Services",
      year: "Year",
      yearPh: "2025",
      link: "Link",
      linkPh: "https://..."
    },
    activities: {
      title: "Open Source / Volunteering",
      subtitle: "OSS contributions, community work, volunteering activities.",
      add: "Add activity",
      empty: "No activities yet. Add open-source/volunteering — it's a strong plus.",
      type: "Type",
      name: "Project / Organization",
      namePh: "e.g. React Query / GDG / Foo NGO",
      role: "Role",
      rolePh: "Contributor / Speaker / Volunteer",
      link: "Link",
      linkPh: "https://github.com/...",
      description: "Description",
      descriptionPh: "Briefly: what you did, your impact, the result."
    }
  }
} as const

// =========================
// 1) EmploymentPreferencesSection
// =========================
export function EmploymentPreferencesSection() {
  const locale = useCurrentLocale()
  const t = messages[locale].employment
  const { resume, setEmploymentPreferences } = useResumeStore()

  const pref = resume.employmentPreferences

  const employmentTypeOptions = [
    { value: "full-time", label: locale === "ru" ? "Полная занятость" : "Full-time" },
    { value: "part-time", label: locale === "ru" ? "Частичная" : "Part-time" },
    { value: "contract", label: locale === "ru" ? "Контракт" : "Contract" },
    { value: "freelance", label: locale === "ru" ? "Фриланс" : "Freelance" }
  ]

  const workFormatOptions = [
    { value: "remote", label: "Remote" },
    { value: "hybrid", label: "Hybrid" },
    { value: "onsite", label: "Onsite" }
  ]

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-slate-700" />
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>
      </div>

      <div className="space-y-5 pt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MultiSelect
            label={t.employmentType}
            value={pref.employmentType ?? []}
            onChange={(v) => setEmploymentPreferences({ employmentType: v })}
            placeholder={t.employmentTypePh}
            icon={Briefcase}
            options={employmentTypeOptions}
          />
          <MultiSelect
            label={t.workFormat}
            value={pref.workFormat ?? []}
            onChange={(v) => setEmploymentPreferences({ workFormat: v })}
            placeholder={t.workFormatPh}
            icon={MapPin}
            options={workFormatOptions}
          />
        </div>

        <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-slate-500" />
            <div>
              <div className="text-sm font-medium text-slate-800">{t.relocation}</div>
              <div className="text-xs text-slate-500">{locale === "ru" ? "Если актуально — включи" : "Toggle if applicable"}</div>
            </div>
          </div>
          <Switch
            checked={Boolean(pref.relocation)}
            onChange={(checked) => setEmploymentPreferences({ relocation: checked })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingInput
            label={t.timezone}
            placeholder={t.timezonePh}
            value={pref.timezone ?? ""}
            onChange={(v) => setEmploymentPreferences({ timezone: v })}
            icon={Globe2}
          />
          <FloatingInput
            label={t.authorization}
            placeholder={t.authorizationPh}
            value={pref.workAuthorization ?? ""}
            onChange={(v) => setEmploymentPreferences({ workAuthorization: v })}
            icon={ShieldCheck}
          />
        </div>
      </div>
    </Card>
  )
}

// =========================
// 2) CertificationsSection
// =========================
export function CertificationsSection() {
  const locale = useCurrentLocale()
  const t = messages[locale].certifications
  const { resume, addCertification, updateCertification, removeCertification } = useResumeStore()

  const list = resume.certifications ?? []

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <BadgeCheck className="w-5 h-5 text-slate-700" />
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>
        <Button
          onClick={addCertification}
          size="sm"
          className="rounded-full bg-slate-900 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.add}
        </Button>
      </div>

      <div className="space-y-6 pt-5">
        <AnimatePresence initial={false}>
          {list.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 max-w-xs text-center">{t.empty}</p>
            </motion.div>
          )}

          {list.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
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
                  onClick={() => removeCertification(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label={t.name}
                  placeholder={t.namePh}
                  value={item.name ?? ""}
                  onChange={(v) => updateCertification(item.id, { name: v })}
                  icon={BadgeCheck}
                />
                <FloatingInput
                  label={t.issuer}
                  placeholder={t.issuerPh}
                  value={item.issuer ?? ""}
                  onChange={(v) => updateCertification(item.id, { issuer: v })}
                  icon={Building2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  label={t.year}
                  placeholder={t.yearPh}
                  value={(item as any).year ?? ""}
                  onChange={(v) => updateCertification(item.id, { year: v } as any)}
                  icon={Calendar}
                />
                <FloatingInput
                  label={t.link}
                  placeholder={t.linkPh}
                  value={item.link ?? ""}
                  onChange={(v) => updateCertification(item.id, { link: v })}
                  icon={LinkIcon}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {list.length > 0 && (
          <Button
            variant="outline"
            onClick={addCertification}
            className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.add}
          </Button>
        )}
      </div>
    </Card>
  )
}

// =========================
// 3) ActivitiesSection (Open Source / Volunteering)
// =========================
export function ActivitiesSection() {
  const locale = useCurrentLocale()
  const t = messages[locale].activities
  const { resume, addActivity, updateActivity, removeActivity } = useResumeStore()

  const list = resume.activities ?? []

  const typeOptions: { value: "open-source" | "volunteering" | "community"; label: string; icon: any }[] = [
    { value: "open-source", label: locale === "ru" ? "Open Source" : "Open Source", icon: Github },
    { value: "volunteering", label: locale === "ru" ? "Волонтерство" : "Volunteering", icon: HandHeart },
    { value: "community", label: locale === "ru" ? "Комьюнити" : "Community", icon: Users }
  ]

  const typeIcon = (type?: string) => {
    const found = typeOptions.find((o) => o.value === type)
    return found?.icon ?? Github
  }

  return (
    <Card>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Github className="w-5 h-5 text-slate-700" />
            {t.title}
          </h2>
          <p className="text-sm text-slate-500 mt-1">{t.subtitle}</p>
        </div>
        <Button
          onClick={() => addActivity("open-source")}
          size="sm"
          className="rounded-full bg-slate-900 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          {t.add}
        </Button>
      </div>

      <div className="space-y-6 pt-5">
        <AnimatePresence initial={false}>
          {list.length === 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Github className="w-5 h-5 text-slate-400" />
              </div>
              <p className="text-sm text-slate-500 max-w-xs text-center">{t.empty}</p>
            </motion.div>
          )}

          {list.map((item, index) => {
            const Icon = typeIcon(item.type)
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0, overflow: "hidden" }}
                className="group relative bg-slate-50/50 rounded-2xl border border-slate-200 p-5 space-y-5 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-500 shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                      <Icon className="w-4 h-4 text-slate-600" />
                      {locale === "ru" ? "Активность" : "Activity"}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50 -mt-1 -mr-1"
                    onClick={() => removeActivity(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5 w-full">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {t.type}
                    </label>
                    <Select
                      value={item.type}
                      onChange={(v) => updateActivity(item.id, { type: v })}
                      style={{ width: "100%" }}
                    >
                      {typeOptions.map((o) => (
                        <Option key={o.value} value={o.value}>
                          {o.label}
                        </Option>
                      ))}
                    </Select>
                  </div>

                  <FloatingInput
                    label={t.name}
                    placeholder={t.namePh}
                    value={item.name ?? ""}
                    onChange={(v) => updateActivity(item.id, { name: v })}
                    icon={Building2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput
                    label={t.role}
                    placeholder={t.rolePh}
                    value={item.role ?? ""}
                    onChange={(v) => updateActivity(item.id, { role: v })}
                    icon={Briefcase}
                  />
                  <FloatingInput
                    label={t.link}
                    placeholder={t.linkPh}
                    value={item.link ?? ""}
                    onChange={(v) => updateActivity(item.id, { link: v })}
                    icon={LinkIcon}
                  />
                </div>

                <FloatingTextarea
                  label={t.description}
                  placeholder={t.descriptionPh}
                  value={item.description ?? ""}
                  onChange={(v) => updateActivity(item.id, { description: v })}
                  icon={MapPin}
                />
              </motion.div>
            )
          })}
        </AnimatePresence>

        {list.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => addActivity("open-source")}
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              {locale === "ru" ? "Open Source" : "Open Source"}
            </Button>
            <Button
              variant="outline"
              onClick={() => addActivity("volunteering")}
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              {locale === "ru" ? "Волонтерство" : "Volunteering"}
            </Button>
            <Button
              variant="outline"
              onClick={() => addActivity("community")}
              className="w-full border-dashed border-2 py-6 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              {locale === "ru" ? "Комьюнити" : "Community"}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}
