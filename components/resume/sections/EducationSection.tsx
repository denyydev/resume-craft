"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd"

const { Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Образование и языки",
    sectionSubtitle:
      "Формальное образование, профильные курсы и уровни владения иностранными языками.",
    educationTitle: "Образование",
    addEducation: "Добавить запись",
    educationEmpty:
      "Добавь профильный вуз, колледж или сильные курсы — только то, что усиливает твой профиль.",
    educationEntryTitle: (index: number) => `Запись #${index}`,
    delete: "Удалить",
    institution: "Учебное заведение",
    institutionPlaceholder: "НИУ ВШЭ, МГУ, Яндекс Практикум, Hexlet...",
    field: "Специальность / программа",
    fieldPlaceholder: "Прикладная математика и информатика",
    degree: "Степень / формат обучения",
    degreePlaceholder: "Бакалавр, магистр, курс, буткэмп",
    periodLabel: "Период (как будет отображаться)",
    periodPlaceholder: "2017–2021",
    startLabel: "Начало",
    startPlaceholder: "2017",
    endLabel: "Окончание",
    endPlaceholder: "2021",
    languagesTitle: "Языки",
    addLanguage: "Добавить язык",
    languagesEmpty:
      "Укажи хотя бы английский и уровень владения (CEFR: B1–C2) или «native».",
    languageLabel: "Язык",
    languagePlaceholder: "Английский",
    levelLabel: "Уровень",
    levelPlaceholder: "B2 / C1 / носитель",
    deleteLanguage: "Удалить",
  },
  en: {
    sectionTitle: "Education & languages",
    sectionSubtitle:
      "Formal education, relevant courses and your proficiency in foreign languages.",
    educationTitle: "Education",
    addEducation: "Add entry",
    educationEmpty:
      "Add a university, college or strong course that supports your target role.",
    educationEntryTitle: (index: number) => `Entry #${index}`,
    delete: "Delete",
    institution: "Institution",
    institutionPlaceholder: "HSE, MSU, university, bootcamp, course provider…",
    field: "Major / program",
    fieldPlaceholder: "Applied Mathematics and Computer Science",
    degree: "Degree / program type",
    degreePlaceholder: "Bachelor, Master, course, bootcamp",
    periodLabel: "Period (as it will appear)",
    periodPlaceholder: "2017–2021",
    startLabel: "Start",
    startPlaceholder: "2017",
    endLabel: "End",
    endPlaceholder: "2021",
    languagesTitle: "Languages",
    addLanguage: "Add language",
    languagesEmpty:
      "Add at least English and your level (CEFR: B1–C2) or “native”.",
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
    <div className="space-y-6">
      <Space direction="vertical" size={4} className="w-full">
        <Text className="text-base font-semibold text-slate-900 tracking-tight">
          {t.sectionTitle}
        </Text>
        <Text
          type="secondary"
          className="text-xs md:text-sm leading-relaxed text-slate-500"
        >
          {t.sectionSubtitle}
        </Text>
      </Space>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Text className="text-xs font-semibold uppercase tracking-wide text-slate-700">
            {t.educationTitle}
          </Text>
          <Button size="small" onClick={addEducation}>
            {t.addEducation}
          </Button>
        </div>

        {resume.education.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs md:text-sm leading-relaxed text-slate-500">
            {t.educationEmpty}
          </p>
        )}

        <div className="space-y-4">
          {resume.education.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 md:px-4 md:py-4"
            >
              <div className="flex items-center justify-between gap-2">
                <Text className="text-[11px] uppercase tracking-wide text-slate-500">
                  {t.educationEntryTitle(index + 1)}
                </Text>
                <button
                  type="button"
                  className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
                  onClick={() => removeEducation(item.id)}
                >
                  {t.delete}
                </button>
              </div>

              <Space direction="vertical" size={8} className="w-full">
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-800">
                    {t.institution}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={t.institutionPlaceholder}
                    value={item.institution}
                    onChange={(e) =>
                      updateEducation(item.id, {
                        institution: e.target.value,
                      })
                    }
                    className="rounded-lg"
                  />
                </Space>

                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-800">
                    {t.field}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={t.fieldPlaceholder}
                    value={item.field}
                    onChange={(e) =>
                      updateEducation(item.id, { field: e.target.value })
                    }
                    className="rounded-lg"
                  />
                </Space>

                <Row gutter={8}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-800">
                        {t.degree}
                      </Text>
                      <Input
                        size="middle"
                        placeholder={t.degreePlaceholder}
                        value={item.degree}
                        onChange={(e) =>
                          updateEducation(item.id, { degree: e.target.value })
                        }
                        className="rounded-lg"
                      />
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-800">
                        {t.periodLabel}
                      </Text>
                      <Input
                        size="middle"
                        placeholder={t.periodPlaceholder}
                        value={
                          item.startDate && item.endDate
                            ? `${item.startDate}–${item.endDate}`
                            : ""
                        }
                        disabled
                        className="rounded-lg"
                      />
                    </Space>
                  </Col>
                </Row>

                <Row gutter={8}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-800">
                        {t.startLabel}
                      </Text>
                      <Input
                        size="middle"
                        placeholder={t.startPlaceholder}
                        value={item.startDate}
                        onChange={(e) =>
                          updateEducation(item.id, {
                            startDate: e.target.value,
                          })
                        }
                        className="rounded-lg"
                      />
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-800">
                        {t.endLabel}
                      </Text>
                      <Input
                        size="middle"
                        placeholder={t.endPlaceholder}
                        value={item.endDate}
                        onChange={(e) =>
                          updateEducation(item.id, {
                            endDate: e.target.value,
                          })
                        }
                        className="rounded-lg"
                      />
                    </Space>
                  </Col>
                </Row>
              </Space>

              {index !== resume.education.length - 1 && (
                <Divider className="!my-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <Text className="text-xs font-semibold uppercase tracking-wide text-slate-700">
            {t.languagesTitle}
          </Text>
          <Button size="small" onClick={addLanguage}>
            {t.addLanguage}
          </Button>
        </div>

        {resume.languages.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs md:text-sm leading-relaxed text-slate-500">
            {t.languagesEmpty}
          </p>
        )}

        <div className="space-y-3">
          {resume.languages.map((lang) => (
            <div
              key={lang.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 md:flex-row md:items-center md:px-4 md:py-3"
            >
              <div className="flex-1 space-y-1.5">
                <Text className="text-xs font-medium text-slate-800">
                  {t.languageLabel}
                </Text>
                <Input
                  size="middle"
                  placeholder={t.languagePlaceholder}
                  value={lang.name}
                  onChange={(e) =>
                    updateLanguage(lang.id, { name: e.target.value })
                  }
                  className="rounded-lg"
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Text className="text-xs font-medium text-slate-800">
                  {t.levelLabel}
                </Text>
                <Input
                  size="middle"
                  placeholder={t.levelPlaceholder}
                  value={lang.level}
                  onChange={(e) =>
                    updateLanguage(lang.id, { level: e.target.value })
                  }
                  className="rounded-lg"
                />
              </div>
              <button
                type="button"
                className="self-start text-xs font-medium text-slate-400 hover:text-red-500 transition-colors md:self-center"
                onClick={() => removeLanguage(lang.id)}
              >
                {t.deleteLanguage}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
