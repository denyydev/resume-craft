"use client";

import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Spin } from "antd";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Spin size="small" />;

  if (!session) {
    return (
      <Button
        type="primary"
        shape="round"
        onClick={() => signIn("google")}
        className="!h-8"
      >
        Войти
      </Button>
    );
  }

  const { name = "User", email = "", image } = session.user ?? {};

  const items: MenuProps["items"] = [
    {
      key: "profile",
      disabled: true,
      label: (
        <div className="flex items-center gap-3 px-2 py-1 max-w-[240px]">
          <Avatar
            size={32}
            src={image || undefined}
            icon={!image ? <User className="h-4 w-4" /> : undefined}
          />
          <div className="min-w-0 leading-tight">
            <div className="font-medium truncate">{name}</div>
            {email ? (
              <div className="text-xs opacity-70 truncate">{email}</div>
            ) : null}
          </div>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      danger: true,
      icon: <LogOut className="h-4 w-4" />,
      label: "Выйти",
    },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") signOut();
  };

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        items,
        onClick: onMenuClick,
        className: "!rounded-xl !p-1 shadow-lg",
      }}
    >
      <Button
        size="small"
        shape="round"
        className="flex items-center gap-2 !px-2"
        icon={
          <Avatar
            size={24}
            src={image || undefined}
            icon={!image ? <User className="h-3.5 w-3.5" /> : undefined}
          />
        }
      >
        <ChevronDown className="h-3.5 w-3.5 opacity-60" />
      </Button>
    </Dropdown>
  );
}

