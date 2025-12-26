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

export function BasicIdentitySection({ t }: { t: LocaleMessages }) {
  const [msgApi, contextHolder] = message.useMessage();
  const [hover, setHover] = useState(false);

  const { resume, setFullName, setPhoto } = useResumeStore();

  const name = useMemo(
    () => splitFullName(resume.fullName ?? ""),
    [resume.fullName]
  );

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

  const setPart = (patch: Partial<typeof name>) => {
    const next = { ...name, ...patch };
    setFullName(joinFullName(next.lastName, next.firstName, next.patronymic));
  };

  return (
    <Card className="w-full">
      {contextHolder}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[140px_1fr]">
        <div className="flex flex-col gap-2">
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
              {resume.photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={resume.photo}
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
                  resume.photo && hover ? "bg-black/35" : "bg-transparent",
                ].join(" ")}
              >
                {resume.photo ? (
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

          {resume.photo ? (
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
      </div>
    </Card>
  );
}
