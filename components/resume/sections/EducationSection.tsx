"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { Button, Col, Divider, Input, Row, Space, Typography } from "antd"

const { Text } = Typography

export function EducationSection() {
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
        <Text className="text-sm font-semibold text-slate-900">
          Образование и языки
        </Text>
        <Text type="secondary" className="text-xs">
          Формальное образование и владение языками.
        </Text>
      </Space>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Text className="text-xs font-semibold text-slate-700">
            Образование
          </Text>
          <Button size="small" onClick={addEducation}>
            Добавить
          </Button>
        </div>

        {resume.education.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
            Добавь хотя бы один вуз или курс, если это релевантно.
          </p>
        )}

        <div className="space-y-4">
          {resume.education.map((item, index) => (
            <div
              key={item.id}
              className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <Text className="text-xs font-medium text-slate-600">
                  Запись #{index + 1}
                </Text>
                <button
                  type="button"
                  className="text-xs text-slate-400 hover:text-red-500"
                  onClick={() => removeEducation(item.id)}
                >
                  Удалить
                </button>
              </div>

              <Space direction="vertical" size={8} className="w-full">
                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    Учебное заведение
                  </Text>
                  <Input
                    size="middle"
                    placeholder="НИУ ВШЭ, МГУ..."
                    value={item.institution}
                    onChange={(e) =>
                      updateEducation(item.id, {
                        institution: e.target.value,
                      })
                    }
                  />
                </Space>

                <Space direction="vertical" size={4} className="w-full">
                  <Text className="text-xs font-medium text-slate-700">
                    Специальность / программа
                  </Text>
                  <Input
                    size="middle"
                    placeholder="Прикладная математика и информатика"
                    value={item.field}
                    onChange={(e) =>
                      updateEducation(item.id, { field: e.target.value })
                    }
                  />
                </Space>

                <Row gutter={8}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        Степень
                      </Text>
                      <Input
                        size="middle"
                        placeholder="Бакалавр, магистр..."
                        value={item.degree}
                        onChange={(e) =>
                          updateEducation(item.id, { degree: e.target.value })
                        }
                      />
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        Период (как будет отображаться)
                      </Text>
                      <Input
                        size="middle"
                        placeholder="2017–2021"
                        value={
                          item.startDate && item.endDate
                            ? `${item.startDate}–${item.endDate}`
                            : ""
                        }
                        disabled
                      />
                    </Space>
                  </Col>
                </Row>

                <Row gutter={8}>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        Начало
                      </Text>
                      <Input
                        size="middle"
                        placeholder="2017"
                        value={item.startDate}
                        onChange={(e) =>
                          updateEducation(item.id, {
                            startDate: e.target.value,
                          })
                        }
                      />
                    </Space>
                  </Col>
                  <Col xs={24} md={12}>
                    <Space direction="vertical" size={4} className="w-full">
                      <Text className="text-xs font-medium text-slate-700">
                        Окончание
                      </Text>
                      <Input
                        size="middle"
                        placeholder="2021"
                        value={item.endDate}
                        onChange={(e) =>
                          updateEducation(item.id, {
                            endDate: e.target.value,
                          })
                        }
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

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <Text className="text-xs font-semibold text-slate-700">Языки</Text>
          <Button size="small" onClick={addLanguage}>
            Добавить
          </Button>
        </div>

        {resume.languages.length === 0 && (
          <p className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs text-slate-500">
            Добавь хотя бы английский и уровень владения.
          </p>
        )}

        <div className="space-y-3">
          {resume.languages.map((lang, index) => (
            <div
              key={lang.id}
              className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 md:flex-row md:items-center"
            >
              <div className="flex-1 space-y-1.5">
                <Text className="text-xs font-medium text-slate-700">
                  Язык
                </Text>
                <Input
                  size="middle"
                  placeholder="English"
                  value={lang.name}
                  onChange={(e) =>
                    updateLanguage(lang.id, { name: e.target.value })
                  }
                />
              </div>
              <div className="flex-1 space-y-1.5">
                <Text className="text-xs font-medium text-slate-700">
                  Уровень
                </Text>
                <Input
                  size="middle"
                  placeholder="B2, C1, native..."
                  value={lang.level}
                  onChange={(e) =>
                    updateLanguage(lang.id, { level: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className="self-start text-xs text-slate-400 hover:text-red-500 md:self-center"
                onClick={() => removeLanguage(lang.id)}
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
