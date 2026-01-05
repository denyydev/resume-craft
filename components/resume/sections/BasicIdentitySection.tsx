"use client";

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
import { useState } from "react";

const { Title, Text } = Typography;

type LocaleMessages = {
  lastName: string;
  firstName: string;
  patronymic: string;
  lastNamePlaceholder: string;
  firstNamePlaceholder: string;
  patronymicPlaceholder: string;
  photo: string;
  photoSubtitle: string;
  removePhoto: string;
  dragDrop: string;
  errorSize: string;
  errorType: string;
  replacePhoto?: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
};

type SectionsVisibility = NonNullable<
  ReturnType<typeof useResumeStore.getState>["resume"]["sectionsVisibility"]
>;

function useVisible(sectionKey: keyof SectionsVisibility) {
  const sectionsVisibility = useResumeStore((s) => s.resume.sectionsVisibility);
  return sectionsVisibility?.[sectionKey] !== false;
}

function PhotoBlock({ t }: { t: LocaleMessages }) {
  const [msgApi, contextHolder] = message.useMessage();
  const [hover, setHover] = useState(false);

  const photo = useResumeStore((s) => s.resume.photo);
  const setPhoto = useResumeStore((s) => s.setPhoto);

  const visible = useVisible("photo");
  if (!visible) return null;

  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isImage = file.type?.startsWith("image/");
    if (!isImage) {
      msgApi.error(t.errorType);
      return Upload.LIST_IGNORE;
    }

    const isLt5M = file.size < 5 * 1024 * 1024;
    if (!isLt5M) {
      msgApi.error(t.errorSize);
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") setPhoto(result);
    };
    reader.readAsDataURL(file);

    return Upload.LIST_IGNORE;
  };

  return (
    <div className="flex flex-col gap-2">
      {contextHolder}

      <Text strong>{t.photo}</Text>

      <div className="flex items-center gap-3">
        <Upload
          accept="image/*"
          multiple={false}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <button
            type="button"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className={[
              "relative grid place-items-center",
              "size-24 overflow-hidden rounded-full",
              "border border-[var(--ant-colorBorderSecondary)]",
              "bg-[var(--ant-colorFillSecondary)]",
              "transition hover:brightness-[0.98]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--ant-colorPrimary)] focus:ring-offset-2 focus:ring-offset-transparent",
            ].join(" ")}
            aria-label={photo ? "Change photo" : "Upload photo"}
          >
            {photo ? (
              <img
                src={photo}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={28} className="opacity-60" />
            )}

            <div
              className={[
                "pointer-events-none absolute inset-0 grid place-items-center transition",
                hover ? "bg-black/35" : "bg-transparent",
              ].join(" ")}
            >
              <Camera
                size={18}
                className={hover ? "opacity-100" : "opacity-0"}
                color="#fff"
              />
            </div>
          </button>
        </Upload>

        <div className="min-w-0 space-y-1">
          <Text type="secondary" className="text-xs">
            {t.photoSubtitle}
          </Text>

          {!photo ? (
            <Text type="secondary" className="text-xs">
              {t.dragDrop}
            </Text>
          ) : (
            <div className="flex flex-col gap-2">
              {t.replacePhoto ? (
                <Text type="secondary" className="text-xs">
                  {t.replacePhoto}
                </Text>
              ) : null}

              <Button
                danger
                size="small"
                type="default"
                icon={<Trash2 size={14} />}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPhoto(undefined);
                }}
              >
                {t.removePhoto}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NameInputsBlock({ t }: { t: LocaleMessages }) {
  const lastName = useResumeStore((s) => s.resume.lastName);
  const firstName = useResumeStore((s) => s.resume.firstName);
  const patronymic = useResumeStore((s) => s.resume.patronymic);

  const setLastName = useResumeStore((s) => s.setLastName);
  const setFirstName = useResumeStore((s) => s.setFirstName);
  const setPatronymic = useResumeStore((s) => s.setPatronymic);

  const MAX_NAME_LEN = 30;

  const maxLenRule = {
    validator(_: unknown, value: string) {
      if (!value) return Promise.resolve();
      if (value.trim().length <= MAX_NAME_LEN) return Promise.resolve();
      return Promise.reject(new Error(`Максимум ${MAX_NAME_LEN} символов`));
    },
  };

  return (
    <Form layout="vertical" colon={false} className="space-y-1">
      <Form.Item label={t.lastName} rules={[maxLenRule]}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.lastNamePlaceholder}
          value={lastName}
          onChange={(e) => setLastName(e.target.value.slice(0, MAX_NAME_LEN))}
          allowClear
          maxLength={MAX_NAME_LEN}
          showCount
        />
      </Form.Item>

      <Form.Item label={t.firstName} rules={[maxLenRule]}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.firstNamePlaceholder}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value.slice(0, MAX_NAME_LEN))}
          allowClear
          maxLength={MAX_NAME_LEN}
          showCount
        />
      </Form.Item>

      <Form.Item label={t.patronymic} className="mb-0" rules={[maxLenRule]}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.patronymicPlaceholder}
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value.slice(0, MAX_NAME_LEN))}
          allowClear
          maxLength={MAX_NAME_LEN}
          showCount
        />
      </Form.Item>
    </Form>
  );
}

export function BasicIdentitySection({ t }: { t: LocaleMessages }) {
  const photoVisible = useResumeStore(
    (s) => s.resume.sectionsVisibility?.photo !== false
  );

  return (
    <section id="summary" className="w-full h-full min-h-0 flex flex-col">
      <div className="sticky top-0 z-10 bg-white px-5 pt-5">
        <div className="pt-1">
          <Flex align="center" gap={10} wrap>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-black/5">
              <User size={18} />
            </span>
            <Title level={4} className="!m-0">
              {t.sectionTitle ?? "Основная информация"}
            </Title>
          </Flex>

          <Text type="secondary" className="text-sm">
            {t.sectionSubtitle ?? "Имя и фото для шапки резюме (по желанию)."}
          </Text>

          <Divider className="my-4" />
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto p-5">
        <Space direction="vertical" size={12} className="w-full">
          {photoVisible ? <PhotoBlock t={t} /> : null}
          <NameInputsBlock t={t} />
        </Space>
      </div>
    </section>
  );
}
