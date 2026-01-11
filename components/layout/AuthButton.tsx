"use client";

import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  ConfigProvider,
  Dropdown,
  Space,
  Spin,
  Typography,
} from "antd";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

const { Text } = Typography;

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Spin size="small" />;
  }

  const baseTheme = {
    token: {
      borderRadius: 14,
      borderRadiusLG: 16,
      controlHeight: 36,
    },
    components: {
      Button: {
        borderRadius: 999,
        controlHeight: 36,
        paddingInline: 12,
        fontWeight: 600,
      },
      Dropdown: {
        borderRadiusLG: 16,
      },
      Menu: {
        itemBorderRadius: 12,
        activeBarBorderWidth: 0,
        itemHeight: 38,
      },
      Avatar: {
        borderRadius: 999,
      },
    },
  } as const;

  if (!session) {
    return (
      <ConfigProvider theme={baseTheme}>
        <Button
          type="primary"
          onClick={() => signIn("google")}
          style={{
            borderRadius: 999,
            height: 36,
            paddingInline: 14,
            boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
          }}
        >
          Войти
        </Button>
      </ConfigProvider>
    );
  }

  const { name = "User", email = "", image } = session.user ?? {};

  const items: MenuProps["items"] = [
    {
      key: "profile",
      disabled: true,
      label: (
        <div style={{ padding: 8, maxWidth: 280 }}>
          <Space align="center" size={12}>
            <Avatar
              size={32}
              src={image || undefined}
              icon={!image ? <User size={16} /> : undefined}
            />
            <div style={{ minWidth: 0, lineHeight: 1.2 }}>
              <div
                style={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {name}
              </div>
              {email ? (
                <Text
                  type="secondary"
                  style={{
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "block",
                  }}
                >
                  {email}
                </Text>
              ) : null}
            </div>
          </Space>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      danger: true,
      label: "Выйти",
    },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") signOut();
  };

  return (
    <ConfigProvider theme={baseTheme}>
      <Dropdown
        trigger={["click"]}
        placement="bottomRight"
        menu={{ items, onClick: onMenuClick }}
        popupRender={(menu) => (
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              background: "rgba(255,255,255,0.92)",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 18px 50px rgba(0,0,0,0.12)",
              backdropFilter: "blur(10px)",
            }}
          >
            {menu}
          </div>
        )}
      >
        <Button
          type="default"
          style={{
            borderRadius: 999,
            height: 36,
            paddingInline: 10,
            boxShadow: "0 10px 24px rgba(0,0,0,0.10)",
          }}
        >
          <Space size={8}>
            <Avatar
              size={24}
              src={image || undefined}
              icon={!image ? <User size={14} /> : undefined}
              style={{ background: "rgba(0,0,0,0.04)" }}
            />
            <span
              style={{
                maxWidth: 160,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              className="hidden md:inline"
            >
              {name}
            </span>
            <ChevronDown size={16} style={{ opacity: 0.55 }} />
          </Space>
        </Button>
      </Dropdown>
    </ConfigProvider>
  );
}
