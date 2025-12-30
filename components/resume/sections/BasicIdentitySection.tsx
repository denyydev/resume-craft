"use client";

import { useResumeStore } from "@/store/useResumeStore";
import type { UploadProps } from "antd";
import { Button, Card, Form, Input, message, Upload } from "antd";
import { Camera, Trash2, User } from "lucide-react";
import { useMemo, useState } from "react";

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
};

function splitFullName(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  return {
    lastName: parts[0] ?? "",
    firstName: parts[1] ?? "",
    patronymic: parts.slice(2).join(" ") ?? "",
  };
}

function joinFullName(lastName: string, firstName: string, patronymic: string) {
  return [lastName, firstName, patronymic]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(" ");
}

function useVisible(
  sectionKey: keyof ReturnType<
    typeof useResumeStore
  >["resume"]["sectionsVisibility"]
) {
  const sectionsVisibility = useResumeStore((s) => s.resume.sectionsVisibility);
  return sectionsVisibility?.[sectionKey] !== false;
}

function PhotoBlock({ t }: { t: LocaleMessages }) {
  const [msgApi, contextHolder] = message.useMessage();
  const [hover, setHover] = useState(false);

  const photo = useResumeStore((s) => s.resume.photo);
  const setPhoto = useResumeStore((s) => s.setPhoto);

  const visible = useVisible("photo");

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

  if (!visible) return null;

  return (
    <div className="flex flex-col gap-2">
      {contextHolder}

      <div className="text-sm font-semibold">{t.photo}</div>

      <Upload.Dragger
        accept="image/*"
        multiple={false}
        showUploadList={false}
        beforeUpload={beforeUpload}
        className="!rounded-2xl"
      >
        <div
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[var(--ant-colorBorderSecondary)] bg-[var(--ant-colorFillSecondary)]"
        >
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photo}
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User size={32} className="opacity-60" />
            </div>
          )}

          <div
            className={[
              "pointer-events-none absolute inset-0 flex items-center justify-center transition-colors duration-150",
              photo && hover ? "bg-black/35" : "bg-transparent",
            ].join(" ")}
          >
            {photo ? (
              <Camera
                size={18}
                className={hover ? "opacity-100" : "opacity-0"}
                color="#fff"
              />
            ) : null}
          </div>
        </div>
      </Upload.Dragger>

      <div className="text-xs text-[var(--ant-colorTextSecondary)]">
        {t.photoSubtitle}
      </div>

      {photo ? (
        <div className="flex flex-col gap-2">
          {t.replacePhoto ? (
            <div className="text-xs text-[var(--ant-colorTextSecondary)]">
              {t.replacePhoto}
            </div>
          ) : null}

          <Button
            danger
            type="default"
            icon={<Trash2 size={16} />}
            onClick={(e) => {
              e.stopPropagation();
              setPhoto(undefined);
            }}
          >
            {t.removePhoto}
          </Button>
        </div>
      ) : (
        <div className="text-xs text-[var(--ant-colorTextSecondary)]">
          {t.dragDrop}
        </div>
      )}
    </div>
  );
}

function NameInputsBlock({ t }: { t: LocaleMessages }) {
  const fullName = useResumeStore((s) => s.resume.fullName);
  const setFullName = useResumeStore((s) => s.setFullName);

  const name = useMemo(() => splitFullName(fullName ?? ""), [fullName]);

  const setPart = (patch: Partial<typeof name>) => {
    const next = { ...name, ...patch };
    setFullName(joinFullName(next.lastName, next.firstName, next.patronymic));
  };

  return (
    <Form layout="vertical" colon={false} className="space-y-1">
      <Form.Item label={t.lastName}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.lastNamePlaceholder}
          value={name.lastName}
          onChange={(e) => setPart({ lastName: e.target.value })}
          allowClear
        />
      </Form.Item>

      <Form.Item label={t.firstName}>
        <Input
          prefix={<User size={16} />}
          placeholder={t.firstNamePlaceholder}
          value={name.firstName}
          onChange={(e) => setPart({ firstName: e.target.value })}
          allowClear
        />
      </Form.Item>

      <Form.Item label={t.patronymic} className="mb-0">
        <Input
          prefix={<User size={16} />}
          placeholder={t.patronymicPlaceholder}
          value={name.patronymic}
          onChange={(e) => setPart({ patronymic: e.target.value })}
          allowClear
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
    <Card id="summary">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[140px_1fr]">
        {photoVisible ? <PhotoBlock t={t} /> : <div />}
        <NameInputsBlock t={t} />
      </div>
    </Card>
  );
}
