"use client"

import { Card, Typography } from "antd"
import { useCurrentLocale } from "@/lib/useCurrentLocale"
import { BasicIdentitySection } from "./BasicIdentitySection"
import { BasicContactsSection } from "./BasicContactsSection"

const { Title, Text } = Typography

const messages = {
  ru: {
    sectionTitle: "Основная информация",
    sectionSubtitle: "Эти данные попадут в шапку резюме.",

    // identity
    photo: "Фото",
    photoSubtitle: "Опционально",
    removePhoto: "Удалить",
    dragDrop: "Перетащите фото сюда или нажмите для загрузки",
    errorSize: "Файл должен быть меньше 5MB",
    errorType: "Пожалуйста, загрузите изображение",
    lastName: "Фамилия",
    firstName: "Имя",
    patronymic: "Отчество",
    lastNamePlaceholder: "Иванов",
    firstNamePlaceholder: "Иван",
    patronymicPlaceholder: "Иванович",

    // rest
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
    next: "Дальше к опыту"
  },
  en: {
    sectionTitle: "Basic information",
    sectionSubtitle: "This information will appear in the header of your resume.",

    // identity
    photo: "Photo",
    photoSubtitle: "Optional",
    removePhoto: "Remove",
    dragDrop: "Drop photo here or click to upload",
    errorSize: "File must be less than 5MB",
    errorType: "Please upload an image",
    lastName: "Last name",
    firstName: "First name",
    patronymic: "Middle name",
    lastNamePlaceholder: "Doe",
    firstNamePlaceholder: "John",
    patronymicPlaceholder: "",

    // rest
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
    next: "Next: Experience"
  }
} as const

type Locale = keyof typeof messages

export function BasicSection() {
  const locale = useCurrentLocale() as Locale
  const t = messages[locale]

  return (
        <>        
        <BasicIdentitySection t={t} />
        <BasicContactsSection t={t} />
        </>
  )
}
