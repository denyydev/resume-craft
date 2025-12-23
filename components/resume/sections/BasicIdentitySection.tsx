"use client";

import { useResumeStore } from "@/store/useResumeStore";
import type { UploadProps } from "antd";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Space,
  theme,
  Typography,
  Upload,
} from "antd";
import { Camera, Trash2, User } from "lucide-react";
import { useMemo, useState } from "react";

const { Text } = Typography;

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
  const { token } = theme.useToken();
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

  const avatarSize = 96;

  return (
    <Card>
      {contextHolder}

      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Space direction="vertical" size={6} style={{ width: "100%" }}>
          <Text strong>{t.photo}</Text>

          <Upload.Dragger
            accept="image/*"
            multiple={false}
            showUploadList={false}
            beforeUpload={beforeUpload}
            style={{
              borderRadius: 16,
              background: token.colorFillQuaternary,
              borderColor: token.colorBorderSecondary,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: 16,
              }}
            >
              <div
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  width: avatarSize,
                  height: avatarSize,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: `1px solid ${token.colorBorderSecondary}`,
                  background: token.colorFillSecondary,
                  position: "relative",
                  flex: "0 0 auto",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {resume.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={resume.photo}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <User size={32} style={{ opacity: 0.6 }} />
                )}

                {resume.photo && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: hover ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
                      transition: "background 180ms ease",
                      pointerEvents: "none",
                    }}
                  >
                    <Camera
                      size={18}
                      color="#fff"
                      style={{ opacity: hover ? 1 : 0 }}
                    />
                  </div>
                )}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <Space direction="vertical" size={2} style={{ width: "100%" }}>
                  <Text>{t.dragDrop}</Text>
                  <Text type="secondary">{t.photoSubtitle}</Text>

                  {resume.photo ? (
                    <Space wrap style={{ marginTop: 8 }}>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {t.replacePhoto ??
                          (typeof t.replacePhoto === "string"
                            ? t.replacePhoto
                            : "")}
                      </Text>
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
                    </Space>
                  ) : null}
                </Space>
              </div>
            </div>
          </Upload.Dragger>
        </Space>

        <Form layout="vertical" colon={false}>
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

          <Form.Item label={t.patronymic}>
            <Input
              prefix={<User size={16} />}
              placeholder={t.patronymicPlaceholder}
              value={name.patronymic}
              onChange={(e) => setPart({ patronymic: e.target.value })}
              allowClear
            />
          </Form.Item>
        </Form>
      </Space>
    </Card>
  );
}
