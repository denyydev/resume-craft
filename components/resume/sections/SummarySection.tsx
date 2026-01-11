"use client";

import { useCurrentLocale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import type { UploadProps } from "antd";
import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Space,
  Typography,
  Upload,
} from "antd";
import { Camera, Trash2, User } from "lucide-react";

const { Title, Text } = Typography;

const messages = {
  ru: {
    sectionTitle: "Основная информация",
    sectionSubtitle: "Имя, краткое описание и фото для шапки резюме.",
    position: "Желаемая позиция",
    positionPlaceholder: "Frontend Developer / React",
    lastName: "Фамилия",
    firstName: "Имя",
    patronymic: "Отчество",
    lastNamePlaceholder: "Иванов",
    firstNamePlaceholder: "Иван",
    patronymicPlaceholder: "Иванович",
    photo: "Фото",
    photoSubtitle: "Опционально",
    removePhoto: "Удалить",
    dragDrop: "Перетащите фото или нажмите для загрузки",
    errorSize: "Файл должен быть меньше 5MB",
    errorType: "Пожалуйста, загрузите изображение",
    replacePhoto: "Нажмите, чтобы заменить фото",
    summary: "Краткое описание",
    summaryPlaceholder:
      "2–3 предложения о вашем опыте, сильных сторонах и желаемой роли.",
    summaryHint: "До 300 символов",
  },
  en: {
    sectionTitle: "Basic info",
    sectionSubtitle: "Name, short summary and photo for resume header.",
    position: "Desired position",
    positionPlaceholder: "Frontend Developer / React",
    lastName: "Last name",
    firstName: "First name",
    patronymic: "Middle name",
    lastNamePlaceholder: "Doe",
    firstNamePlaceholder: "John",
    patronymicPlaceholder: "",
    photo: "Photo",
    photoSubtitle: "Optional",
    removePhoto: "Remove",
    dragDrop: "Drop photo or click to upload",
    errorSize: "File must be less than 5MB",
    errorType: "Please upload an image",
    replacePhoto: "Click to replace photo",
    summary: "Summary",
    summaryPlaceholder:
      "2–3 sentences about your experience, strengths and desired role.",
    summaryHint: "Up to 300 characters",
  },
} as const;

type Locale = keyof typeof messages;

function normalizeLocale(value: unknown): Locale {
  if (typeof value !== "string" || value.length === 0) return "ru";
  const base = value.split("-")[0]?.toLowerCase();
  return base === "en" ? "en" : "ru";
}

type SectionsVisibility = NonNullable<
  ReturnType<typeof useResumeStore.getState>["resume"]["sectionsVisibility"]
>;

function useVisible(sectionKey: keyof SectionsVisibility) {
  const sectionsVisibility = useResumeStore((s) => s.resume.sectionsVisibility);
  return sectionsVisibility?.[sectionKey] !== false;
}

function PhotoBlock({ t }: { t: (typeof messages)[Locale] }) {
  const [msgApi, contextHolder] = message.useMessage();

  const photo = useResumeStore((s) => s.resume.photo);
  const setPhoto = useResumeStore((s) => s.setPhoto);

  const visible = useVisible("photo");
  if (!visible) return null;

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    if (!file.type?.startsWith("image/")) {
      msgApi.error(t.errorType);
      return Upload.LIST_IGNORE;
    }

    if (file.size >= 5 * 1024 * 1024) {
      msgApi.error(t.errorSize);
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setPhoto(e.target.result);
      }
    };
    reader.readAsDataURL(file);

    return Upload.LIST_IGNORE;
  };

  return (
    <div className="flex items-center gap-4">
      {contextHolder}

      <div className="relative size-12 overflow-hidden rounded-full border border-[var(--ant-colorBorderSecondary)] bg-[var(--ant-colorFillSecondary)]">
        {photo ? (
          <img
            src={photo}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <User size={20} className="opacity-50" />
          </div>
        )}
      </div>

      <Upload
        accept="image/*"
        multiple={false}
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <Button type="default" icon={<Camera size={16} />}>
          {photo ? "Change photo" : "Upload photo"}
        </Button>
      </Upload>

      {photo && (
        <Button
          type="text"
          danger
          size="small"
          icon={<Trash2 size={16} />}
          onClick={() => setPhoto(undefined)}
        />
      )}
    </div>
  );
}

function NameInputsBlock({ t }: { t: (typeof messages)[Locale] }) {
  const position = useResumeStore((s) => s.resume.position);
  const lastName = useResumeStore((s) => s.resume.lastName);
  const firstName = useResumeStore((s) => s.resume.firstName);
  const patronymic = useResumeStore((s) => s.resume.patronymic);

  const setPosition = useResumeStore((s) => s.setPosition);
  const setLastName = useResumeStore((s) => s.setLastName);
  const setFirstName = useResumeStore((s) => s.setFirstName);
  const setPatronymic = useResumeStore((s) => s.setPatronymic);

  const MAX = 30;

  return (
    <Form layout="vertical" colon={false} className="space-y-1">
      <Form.Item label={t.position}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.positionPlaceholder}
          value={position}
          onChange={(e) => setPosition(e.target.value.slice(0, MAX))}
          maxLength={MAX}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item label={t.lastName}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.lastNamePlaceholder}
          value={lastName}
          onChange={(e) => setLastName(e.target.value.slice(0, MAX))}
          maxLength={MAX}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item label={t.firstName}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.firstNamePlaceholder}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value.slice(0, MAX))}
          maxLength={MAX}
          showCount
          allowClear
        />
      </Form.Item>

      <Form.Item label={t.patronymic} className="mb-0">
        <Input
          prefix={<User size={16} />}
          placeholder={t.patronymicPlaceholder}
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value.slice(0, MAX))}
          maxLength={MAX}
          showCount
          allowClear
        />
      </Form.Item>
    </Form>
  );
}

function SummaryBlock({ t }: { t: (typeof messages)[Locale] }) {
  const visible = useVisible("summary");
  const summary = useResumeStore((s) => s.resume.summary);
  const setSummary = useResumeStore((s) => s.setSummary);

  if (!visible) return null;

  return (
    <Form layout="vertical" colon={false}>
      <Form.Item
        label={t.summary}
        extra={
          <span className="text-xs text-[var(--ant-colorTextSecondary)]">
            {t.summaryHint}
          </span>
        }
      >
        <Input.TextArea
          value={summary}
          onChange={(e) => setSummary(e.target.value.slice(0, 300))}
          placeholder={t.summaryPlaceholder}
          maxLength={300}
          showCount
          autoSize={{ minRows: 3, maxRows: 5 }}
          allowClear
        />
      </Form.Item>
    </Form>
  );
}

export function SummarySection() {
  const rawLocale = useCurrentLocale();
  const locale = normalizeLocale(rawLocale) satisfies Locale;
  const t = messages[locale];

  const photoVisible = useResumeStore(
    (s) => s.resume.sectionsVisibility?.photo !== false
  );

  return (
    <section className="flex h-full w-full flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <Flex align="center" gap={10}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
            <User size={18} />
          </span>
          <Title level={4} className="!m-0">
            {t.sectionTitle}
          </Title>
        </Flex>

        <Text type="secondary" className="text-sm">
          {t.sectionSubtitle}
        </Text>

        <Divider className="my-4" />
      </div>

      <div className="flex-1 overflow-auto p-5">
        <Space orientation="vertical" size={12} className="w-full">
          {photoVisible && <PhotoBlock t={t} />}
          <NameInputsBlock t={t} />
          <SummaryBlock t={t} />
        </Space>
      </div>
    </section>
  );
}
