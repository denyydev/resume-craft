"use client"

import { useMemo, useRef, useState } from "react"
import { User, Camera, Trash2 } from "lucide-react"
import { Upload, Button, Typography, message, Space, Input, Form, Card } from "antd"
import type { UploadProps } from "antd"
import { useResumeStore } from "@/store/useResumeStore"

const { Text } = Typography

type LocaleMessages = {
  lastName: string
  firstName: string
  patronymic: string
  lastNamePlaceholder: string
  firstNamePlaceholder: string
  patronymicPlaceholder: string
  photo: string
  photoSubtitle: string
  removePhoto: string
  dragDrop: string
  errorSize: string
  errorType: string
}

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  return {
    lastName: parts[0] ?? "",
    firstName: parts[1] ?? "",
    patronymic: parts.slice(2).join(" ") ?? ""
  }
}

function joinFullName(lastName: string, firstName: string, patronymic: string) {
  return [lastName, firstName, patronymic].map((s) => s.trim()).filter(Boolean).join(" ")
}

export function BasicIdentitySection({ t }: { t: LocaleMessages }) {
  const [msgApi, contextHolder] = message.useMessage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isHoverPhoto, setIsHoverPhoto] = useState(false)

  const { resume, setFullName, setPhoto } = useResumeStore()

  const name = useMemo(() => splitFullName(resume.fullName), [resume.fullName])

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isImage = file.type.startsWith("image/")
    if (!isImage) {
      msgApi.error(t.errorType)
      return Upload.LIST_IGNORE
    }

    const isLt5M = file.size < 5 * 1024 * 1024
    if (!isLt5M) {
      msgApi.error(t.errorSize)
      return Upload.LIST_IGNORE
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result
      if (typeof result === "string") setPhoto(result)
    }
    reader.readAsDataURL(file)

    return Upload.LIST_IGNORE
  }

  const setPart = (patch: Partial<typeof name>) => {
    const next = { ...name, ...patch }
    setFullName(joinFullName(next.lastName, next.firstName, next.patronymic))
  }

  return (
    <Card>
      {contextHolder}

      <div className="grid grid-cols-1 gap-4">
        <Text strong>{t.photo}</Text>

        <Upload.Dragger
          accept="image/*"
          multiple={false}
          showUploadList={false}
          beforeUpload={beforeUpload}
          className="rounded-2xl"
        >
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
                {resume.photo ? (
                  <img
                    src={resume.photo}
                    alt="Avatar"
                    className="h-full w-full object-cover"
                    onMouseEnter={() => setIsHoverPhoto(true)}
                    onMouseLeave={() => setIsHoverPhoto(false)}
                  />
                ) : (
                  <User className="opacity-60" />
                )}
              </div>

              {resume.photo && (
                <div
                  className={[
                    "pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl",
                    isHoverPhoto ? "bg-black/40 opacity-100" : "opacity-0"
                  ].join(" ")}
                >
                  <Camera className="text-white" />
                </div>
              )}
            </div>

            <Space direction="vertical" size={2} align="center">
              <Text>{t.dragDrop}</Text>
              <Text type="secondary">{t.photoSubtitle}</Text>
            </Space>
          </div>
        </Upload.Dragger>

        {resume.photo && (
          <Button
            danger
            type="default"
            icon={<Trash2 size={16} />}
            onClick={() => setPhoto(undefined)}
            className="w-full"
          >
            {t.removePhoto}
          </Button>
        )}
      </div>

      <Form layout="vertical" colon={false} className="grid grid-cols-1 gap-4">
        <Form.Item label={t.lastName} style={{ marginBottom: 0 }}>
          <Input
            size="large"
            prefix={<User size={16} />}
            placeholder={t.lastNamePlaceholder}
            value={name.lastName}
            onChange={(e) => setPart({ lastName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label={t.firstName} style={{ marginBottom: 0 }}>
          <Input
            size="large"
            prefix={<User size={16} />}
            placeholder={t.firstNamePlaceholder}
            value={name.firstName}
            onChange={(e) => setPart({ firstName: e.target.value })}
          />
        </Form.Item>

        <Form.Item label={t.patronymic} style={{ marginBottom: 0 }}>
          <Input
            size="large"
            prefix={<User size={16} />}
            placeholder={t.patronymicPlaceholder}
            value={name.patronymic}
            onChange={(e) => setPart({ patronymic: e.target.value })}
          />
        </Form.Item>
      </Form>
    </Card>
  )
}
