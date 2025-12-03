"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { Button, Col, Input, Row, Space, Typography } from "antd"

const { TextArea } = Input
const { Title, Text } = Typography

export function BasicSection() {
  const { resume, setFullName, setPosition, setContacts, setSummary, reset } =
    useResumeStore()

  return (
    <div className="space-y-6">
      <Space direction="vertical" size={4} className="w-full">
        <Title level={5} className="!mb-0">
          Основная информация
        </Title>
        <Text type="secondary" className="text-xs">
          Эти данные попадут в шапку резюме.
        </Text>
      </Space>

      <Space direction="vertical" size={16} className="w-full">
        <Space direction="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            Полное имя
          </Text>
          <Input
            size="middle"
            placeholder="Иванов Иван Иванович"
            value={resume.fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Space>

        <Space direction="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            Желаемая позиция
          </Text>
          <Input
            size="middle"
            placeholder="Frontend Developer / React"
            value={resume.position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </Space>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">Email</Text>
              <Input
                size="middle"
                placeholder="you@example.com"
                value={resume.contacts.email}
                onChange={(e) => setContacts({ email: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                Телефон
              </Text>
              <Input
                size="middle"
                placeholder="+7 ..."
                value={resume.contacts.phone}
                onChange={(e) => setContacts({ phone: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">Город</Text>
              <Input
                size="middle"
                placeholder="Москва / Санкт-Петербург / Remote"
                value={resume.contacts.location}
                onChange={(e) => setContacts({ location: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                Telegram
              </Text>
              <Input
                size="middle"
                placeholder="@username"
                value={resume.contacts.telegram ?? ""}
                onChange={(e) => setContacts({ telegram: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                GitHub
              </Text>
              <Input
                size="middle"
                placeholder="https://github.com/username"
                value={resume.contacts.github ?? ""}
                onChange={(e) => setContacts({ github: e.target.value })}
              />
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={6} className="w-full">
              <Text className="text-xs font-medium text-slate-700">
                LinkedIn
              </Text>
              <Input
                size="middle"
                placeholder="https://linkedin.com/in/username"
                value={resume.contacts.linkedin ?? ""}
                onChange={(e) => setContacts({ linkedin: e.target.value })}
              />
            </Space>
          </Col>
        </Row>

        <Space direction="vertical" size={6} className="w-full">
          <Text className="text-xs font-medium text-slate-700">
            Краткое резюме
          </Text>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 8 }}
            placeholder="2–4 предложения о твоём опыте, стеке и сильных сторонах."
            value={resume.summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Space>
      </Space>

      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          className="text-xs text-slate-400 hover:text-slate-600"
          onClick={reset}
        >
          Сбросить все поля
        </button>
        <Button type="default" size="small">
          Дальше к опыту
        </Button>
      </div>
    </div>
  )
}
