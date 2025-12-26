"use client";

import { EyeOutlined } from "@ant-design/icons";
import { Button, Divider, Space, theme } from "antd";
import type { ReactNode } from "react";

export function EditorBottomBar({
  previewLabel,
  onOpenPreview,
  actions,
}: {
  previewLabel: string;
  onOpenPreview: () => void;
  actions: ReactNode;
}) {
  const { token } = theme.useToken();

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div
        style={{
          background: token.colorBgContainer,
          borderTop: `1px solid ${token.colorBorderSecondary}`,
          boxShadow: token.boxShadowSecondary,
        }}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between py-2">
          <Button type="text" icon={<EyeOutlined />} onClick={onOpenPreview}>
            {previewLabel}
          </Button>

          <Space separator={<Divider orientation="vertical" />} size={0}>
            {actions}
          </Space>
        </div>
      </div>
    </div>
  );
}
