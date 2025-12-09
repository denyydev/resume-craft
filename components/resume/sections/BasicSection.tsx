"use client"

import { useResumeStore } from "@/store/useResumeStore"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import {
  Button,
  Col,
  Input,
  Row,
  Typography,
  Upload,
  UploadProps,
  App,
} from "antd"
import { 
  CameraOutlined, 
  DeleteOutlined, 
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SendOutlined,
  LinkOutlined,
  GithubOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
  ReloadOutlined
} from "@ant-design/icons"
import { motion, AnimatePresence } from "framer-motion"
import { useMemo, useState } from "react"

const { TextArea } = Input
const { Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Основная информация",
    sectionSubtitle: "Эти данные попадут в шапку резюме.",
    fullName: "Полное имя",
    fullNamePlaceholder: "Иванов Иван Иванович",
    position: "Желаемая позиция",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Телефон",
    phonePlaceholder: "+7 ...",
    city: "Город",
    cityPlaceholder: "Москва / Санкт-Петербург / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
    summary: "Краткое резюме",
    summaryPlaceholder: "2–4 предложения о твоём опыте, стеке и сильных сторонах.",
    reset: "Сбросить все поля",
    next: "Дальше к опыту",
    photo: "Фото",
    photoSubtitle: "Опционально, но повышает доверие.",
    removePhoto: "Удалить фото",
    uploadPhoto: "Загрузить фото",
    dragDrop: "Перетащите или кликните",
  },
  en: {
    sectionTitle: "Basic information",
    sectionSubtitle: "This information will appear in the header of your resume.",
    fullName: "Full name",
    fullNamePlaceholder: "John Doe",
    position: "Desired position",
    positionPlaceholder: "Frontend Developer / React",
    email: "Email",
    emailPlaceholder: "you@example.com",
    phone: "Phone",
    phonePlaceholder: "+1 ...",
    city: "City",
    cityPlaceholder: "Berlin / Amsterdam / Remote",
    telegram: "Telegram",
    telegramPlaceholder: "@username",
    github: "GitHub",
    githubPlaceholder: "username",
    linkedin: "LinkedIn",
    linkedinPlaceholder: "username",
    summary: "Summary",
    summaryPlaceholder: "2–4 sentences about your experience, stack and strengths.",
    reset: "Reset all fields",
    next: "Next: Experience",
    photo: "Photo",
    photoSubtitle: "Optional, but can increase trust.",
    removePhoto: "Remove photo",
    uploadPhoto: "Upload photo",
    dragDrop: "Drag & drop or click",
  },
} as const

const InputIcon = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center w-5 h-5 text-slate-400">
    {children}
  </div>
)

export function BasicSection() {
  const locale = useCurrentLocale()
  const t = messages[locale]
  const { message } = App.useApp()
  const [isDragging, setIsDragging] = useState(false)

  const {
    resume,
    setFullName,
    setPosition,
    setContacts,
    setSummary,
    setPhoto,
    reset,
  } = useResumeStore()

  const uploadProps: UploadProps = {
    beforeUpload: (file) => {
      if (!file.type.startsWith('image/')) {
        message.error(t.locale === 'ru' ? 'Пожалуйста, загрузите изображение' : 'Please upload an image')
        return false
      }

      if (file.size > 5 * 1024 * 1024) {
        message.error(t.locale === 'ru' ? 'Файл должен быть меньше 5MB' : 'File must be less than 5MB')
        return false
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === "string") {
          setPhoto(result)
          message.success(t.locale === 'ru' ? 'Фото загружено' : 'Photo uploaded')
        }
      }
      reader.readAsDataURL(file)
      return false
    },
    showUploadList: false,
    onDrop: () => setIsDragging(false),
    onDragOver: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  }

  const handleReset = () => {
    reset()
    message.success(t.locale === 'ru' ? 'Все поля сброшены' : 'All fields reset')
  }

  const contactFields = useMemo(() => [
    {
      key: 'email',
      label: t.email,
      placeholder: t.emailPlaceholder,
      value: resume.contacts.email,
      icon: <MailOutlined />,
      onChange: (value: string) => setContacts({ email: value }),
      colSpan: { xs: 24, md: 12 },
    },
    {
      key: 'phone',
      label: t.phone,
      placeholder: t.phonePlaceholder,
      value: resume.contacts.phone,
      icon: <PhoneOutlined />,
      onChange: (value: string) => setContacts({ phone: value }),
      colSpan: { xs: 24, md: 12 },
    },
    {
      key: 'location',
      label: t.city,
      placeholder: t.cityPlaceholder,
      value: resume.contacts.location,
      icon: <EnvironmentOutlined />,
      onChange: (value: string) => setContacts({ location: value }),
      colSpan: { xs: 24, md: 12 },
    },
    {
      key: 'telegram',
      label: t.telegram,
      placeholder: t.telegramPlaceholder,
      value: resume.contacts.telegram ?? "",
      icon: <SendOutlined />,
      prefix: "@",
      onChange: (value: string) => setContacts({ telegram: value }),
      colSpan: { xs: 24, md: 12 },
    },
    {
      key: 'github',
      label: t.github,
      placeholder: t.githubPlaceholder,
      value: resume.contacts.github ?? "",
      icon: <GithubOutlined />,
      prefix: "github.com/",
      onChange: (value: string) => setContacts({ github: value }),
      colSpan: { xs: 24, md: 12 },
    },
    {
      key: 'linkedin',
      label: t.linkedin,
      placeholder: t.linkedinPlaceholder,
      value: resume.contacts.linkedin ?? "",
      icon: <LinkedinOutlined />,
      prefix: "linkedin.com/in/",
      onChange: (value: string) => setContacts({ linkedin: value }),
      colSpan: { xs: 24, md: 12 },
    },
  ], [resume.contacts, t, setContacts])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >

      <div className="space-y-2">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Text className="text-base font-semibold text-slate-900 tracking-tight">
            {t.sectionTitle}
          </Text>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Text type="secondary" className="text-sm text-slate-500">
            {t.sectionSubtitle}
          </Text>
        </motion.div>
      </div>

      <div className="space-y-8">

        <Row gutter={[24, 24]} align="top">

          <Col xs={24} md={6}>
            <div className="space-y-3">
              <div>
                <Text className="text-sm font-medium text-slate-800">
                  {t.photo}
                </Text>
                <Text type="secondary" className="text-xs text-slate-500 block mt-1">
                  {t.photoSubtitle}
                </Text>
              </div>

              <Upload {...uploadProps}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center 
                    border-2 border-dashed cursor-pointer transition-all duration-200 overflow-hidden
                    ${isDragging 
                      ? 'border-blue-500 bg-blue-50' 
                      : resume.photo 
                        ? 'border-transparent' 
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }
                  `}
                >
                  <AnimatePresence mode="wait">
                    {resume.photo ? (
                      <motion.div
                        key="photo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative w-full h-full"
                      >
                        <img
                          src={resume.photo}
                          alt="Avatar"
                          className="w-full h-full object-cover rounded-2xl"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl"
                        >
                          <CameraOutlined className="text-white text-lg" />
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upload"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-2 text-slate-400"
                      >
                        <div className="p-3 rounded-full bg-white border border-slate-100">
                          <CameraOutlined className="text-lg" />
                        </div>
                        <Text className="text-xs text-center px-2">
                          {t.dragDrop}
                        </Text>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Upload>

              <AnimatePresence>
                {resume.photo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Button
                      size="small"
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      className="text-xs"
                      onClick={() => setPhoto(undefined)}
                    >
                      {t.removePhoto}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Col>

          {/* ФИО + позиция */}
          <Col xs={24} md={18}>
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-2"
              >
                <Text className="text-sm font-medium text-slate-800">
                  {t.fullName}
                </Text>
                <Input
                  size="large"
                  placeholder={t.fullNamePlaceholder}
                  value={resume.fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  prefix={<InputIcon><UserOutlined /></InputIcon>}
                  className="rounded-lg"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-2"
              >
                <Text className="text-sm font-medium text-slate-800">
                  {t.position}
                </Text>
                <Input
                  size="large"
                  placeholder={t.positionPlaceholder}
                  value={resume.position}
                  onChange={(e) => setPosition(e.target.value)}
                  prefix={<InputIcon><LinkOutlined /></InputIcon>}
                  className="rounded-lg"
                />
              </motion.div>
            </div>
          </Col>
        </Row>

        {/* Контакты */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Row gutter={[16, 16]}>
            {contactFields.map((field, index) => (
              <Col key={field.key} {...field.colSpan}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="space-y-2"
                >
                  <Text className="text-sm font-medium text-slate-800">
                    {field.label}
                  </Text>
                  <Input
                    size="middle"
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    prefix={field.prefix}
                    addonBefore={field.icon}
                    className="rounded-lg"
                  />
                </motion.div>
              </Col>
            ))}
          </Row>
        </motion.div>


        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div>
            <Text className="text-sm font-medium text-slate-800">
              {t.summary}
            </Text>
            <Text type="secondary" className="text-xs text-slate-500 block mt-1">
              {resume.summary.length}/300
            </Text>
          </div>
          <TextArea
            autoSize={{ minRows: 4, maxRows: 6 }}
            placeholder={t.summaryPlaceholder}
            value={resume.summary}
            onChange={(e) => setSummary(e.target.value.slice(0, 300))}
            className="rounded-lg resize-none"
            maxLength={300}
          />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex items-center justify-between pt-4 border-t border-slate-100"
      >
        <Button
          type="text"
          size="middle"
          icon={<ReloadOutlined />}
          onClick={handleReset}
          className="text-slate-500 hover:text-slate-700"
        >
          {t.reset}
        </Button>
        <Button 
          type="primary" 
          size="middle"
          icon={<ArrowRightOutlined />}
          iconPosition="end"
          className="px-6 rounded-lg"
        >
          {t.next}
        </Button>
      </motion.div>
    </motion.div>
  )
}