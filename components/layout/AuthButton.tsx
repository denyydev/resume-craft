"use client";

import type { MenuProps } from "antd";
import { Avatar, Dropdown, Spin } from "antd";
import { ChevronDown, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center">
        <Spin size="small" />
      </div>
    );
  }

  const capsuleBase = `
    relative inline-flex items-center
    rounded-full p-[1px]
    border border-white/10
    bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]
    backdrop-blur
    shadow-[0_10px_30px_rgba(0,0,0,0.45)]
    transition-all duration-300
    hover:-translate-y-0.5
    before:absolute before:inset-0 before:rounded-full
    before:bg-gradient-to-b before:from-white/10 before:to-transparent
    before:opacity-30 before:pointer-events-none
  `;

  const capsuleInner = `
    relative z-10 inline-flex items-center gap-2
    h-8 rounded-full
    px-3
    text-sm font-medium
    text-white/80 hover:text-white
    transition-colors
  `;

  if (!session) {
    return (
      <button
        type="button"
        onClick={() => signIn("google")}
        className={`${capsuleBase} group`}
      >
        <span className={capsuleInner}>Войти</span>
      </button>
    );
  }

  const { name = "User", email = "", image } = session.user ?? {};

  const items: MenuProps["items"] = [
    {
      key: "profile",
      disabled: true,
      label: (
        <div className="flex items-center gap-3 px-2 py-1 max-w-[260px]">
          <Avatar
            size={32}
            src={image || undefined}
            icon={!image ? <User className="h-4 w-4" /> : undefined}
          />
          <div className="min-w-0 leading-tight">
            <div className="font-medium truncate text-white/90">{name}</div>
            {email ? (
              <div className="text-xs text-white/60 truncate">{email}</div>
            ) : null}
          </div>
        </div>
      ),
    },
    { type: "divider" },
    {
      key: "logout",
      icon: <LogOut className="h-4 w-4" />,
      label: <span className="text-red-400">Выйти</span>,
      danger: true,
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
        className: `
          !rounded-2xl !p-1 shadow-xl
          !bg-[#0b0b0e] !border !border-white/10
        `,
      }}
      dropdownRender={(menu) => (
        <div
          className="
            overflow-hidden rounded-2xl
            border border-white/10
            bg-[#0b0b0e]/95
            shadow-xl backdrop-blur
          "
        >
          {menu}
        </div>
      )}
    >
      <button type="button" className={`${capsuleBase} group`}>
        <span
          className={`
            ${capsuleInner}
            pl-1 pr-2
          `}
        >
          <Avatar
            size={24}
            src={image || undefined}
            icon={!image ? <User className="h-3.5 w-3.5" /> : undefined}
            className="!bg-white/10"
          />

          <span className="hidden md:inline max-w-[140px] truncate">
            {name}
          </span>

          <ChevronDown className="h-3.5 w-3.5 text-white/45 group-hover:text-white/70 transition-colors" />
        </span>
      </button>
    </Dropdown>
  );
}
