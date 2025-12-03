"use client"

import { useResumeStore } from "@/store/useResumeStore"
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

export function ExperienceSection() {
  const { resume, addExperience, updateExperience, removeExperience } =
    useResumeStore()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <Space direction="vertical" size={2}>
          <Text className="text-sm font-semibold text-slate-900">
            Опыт работы
          </Text>
          <Text type="secondary" className="text-xs">
            Укажи самые релевантные позиции за последние годы.
          </Text>
        </Space>
        <Button size="small" type="primary" onClick={addExperience}>
          Добавить место работы
        </Button>
      </div>

      {resume.experience.length === 0 && (
        <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
          Пока нет ни одной записи. Нажми «Добавить место работы», чтобы начать
          заполнять опыт.
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
                Опыт #{index + 1}
              </Text>
              <button
                type="button"
                className="text-xs text-slate-400 hover:text-red-500"
                onClick={() => removeExperience(item.id)}
              >
                Удалить
              </button>
            </div>

            <Row gutter={[12, 12]}>
              <Col xs={24} md={12}>
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    Компания
                  </Text>
                  <Input
                    size="middle"
                    placeholder="ООО «Рога и Копыта»"
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
                    Должность
                  </Text>
                  <Input
                    size="middle"
                    placeholder="Frontend Developer"
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
                    Локация
                  </Text>
                  <Input
                    size="middle"
                    placeholder="Москва / Remote"
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
                        Начало
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
                        Окончание
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
                Работаю здесь сейчас
              </Text>
            </div>

            <Space direction="vertical" size={4} className="w-full pt-1">
              <Text className="text-xs font-medium text-slate-700">
                Краткое описание, задачи и достижения
              </Text>
              <TextArea
                autoSize={{ minRows: 4, maxRows: 8 }}
                placeholder="Опиши 3–6 пунктов: чем занимался, каких результатов добился, с чем работал."
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
