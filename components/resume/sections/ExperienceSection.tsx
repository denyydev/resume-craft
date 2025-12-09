"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Input,
  Row,
  Space,
  Typography,
} from "antd"

const { TextArea } = Input
const { Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Опыт работы",
    sectionSubtitle: "Укажи самые релевантные позиции за последние годы.",
    addButton: "Добавить место работы",
    emptyState:
      "Пока нет ни одной записи. Нажми «Добавить место работы», чтобы начать заполнять опыт.",
    itemTitle: (index: number) => `Опыт #${index}`,
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
    description: "Краткое описание, задачи и достижения",
    descriptionPlaceholder:
      "Опиши 3–6 пунктов: чем занимался, каких результатов добился, с чем работал.",
  },
  en: {
    sectionTitle: "Work experience",
    sectionSubtitle: "List the most relevant positions from recent years.",
    addButton: "Add experience",
    emptyState:
      "No experience added yet. Click “Add experience” to start filling it in.",
    itemTitle: (index: number) => `Experience #${index}`,
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
    description: "Short description, responsibilities and achievements",
    descriptionPlaceholder:
      "Describe 3–6 bullet points: what you did, results achieved, tech stack.",
  },
} as const

export function ExperienceSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const { resume, addExperience, updateExperience, removeExperience } =
    useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Space direction="vertical" size={2}>
          <Text className="text-sm font-semibold text-slate-900">
            {t.sectionTitle}
          </Text>
          <Text type="secondary" className="text-xs">
            {t.sectionSubtitle}
          </Text>
        </Space>
        <Button size="small" type="primary" onClick={addExperience}>
          {t.addButton}
        </Button>
      </div>

      {resume.experience.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
          {t.emptyState}
        </p>
      )}

      <div className="space-y-4">
        {resume.experience.map((item, index) => (
          <div
            key={item.id}
            className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3"
          >
            <div className="flex items-center justify-between gap-2">
              <Text className="text-xs font-medium text-slate-600">
                {t.itemTitle(index + 1)}
              </Text>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-red-500"
                onClick={() => removeExperience(item.id)}
              >
                {t.delete}
              </button>
            </div>

            <Row gutter={[12, 12]}>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    {t.company}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={t.companyPlaceholder}
                    value={item.company}
                    onChange={(e) =>
                      updateExperience(item.id, { company: e.target.value })
                    }
                  />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    {t.position}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={t.positionPlaceholder}
                    value={item.position}
                    onChange={(e) =>
                      updateExperience(item.id, { position: e.target.value })
                    }
                  />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    {t.location}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={t.locationPlaceholder}
                    value={item.location}
                    onChange={(e) =>
                      updateExperience(item.id, { location: e.target.value })
                    }
                  />
                </Space>
              </Col>
              <Col xs={24} md={12}>
                <Row gutter={8}>
                  <Col span={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        {t.startDate}
                      </Text>
                      <Input
                        size="middle"
                        type="month"
                        value={item.startDate}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            startDate: e.target.value,
                          })
                        }
                      />
                    </Space>
                  </Col>
                  <Col span={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        {t.endDate}
                      </Text>
                      <Input
                        size="middle"
                        type="month"
                        disabled={item.isCurrent}
                        value={item.endDate}
                        onChange={(e) =>
                          updateExperience(item.id, {
                            endDate: e.target.value,
                          })
                        }
                      />
                    </Space>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox
                checked={item.isCurrent}
                onChange={(e) =>
                  updateExperience(item.id, {
                    isCurrent: e.target.checked,
                    endDate: e.target.checked ? "" : item.endDate,
                  })
                }
              />
              <Text className="text-xs text-slate-600">
                {t.currentCheckbox}
              </Text>
            </div>

            <Space direction="vertical" size={4} className="w-full pt-1">
              <Text className="text-xs font-medium text-slate-700">
                {t.description}
              </Text>
              <TextArea
                autoSize={{ minRows: 4, maxRows: 8 }}
                placeholder={t.descriptionPlaceholder}
                value={item.description}
                onChange={(e) =>
                  updateExperience(item.id, { description: e.target.value })
                }
              />
            </Space>

            {index !== resume.experience.length - 1 && (
              <Divider className="!my-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
