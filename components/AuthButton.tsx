"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { Dropdown, MenuProps } from "antd"
import { LogOut, User, ChevronDown, LogIn } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
    )
  }

  if (!session) {
    return (
      <Button
        onClick={() => signIn("google")}
        size="sm"
        className="rounded-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white shadow-sm transition-all"
      >
        <span className="font-medium px-2">Войти</span>
      </Button>
    )
  }

  const items: MenuProps["items"] = [
    {
      key: "user",
      label: (
        <div className="flex items-center gap-3 px-1 py-1 min-w-[160px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name || "User"}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-4 w-4 text-slate-400 dark:text-slate-300" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {session.user?.name || "User"}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate opacity-80">
              {session.user?.email}
            </span>
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
      className: "!my-1 !border-slate-100 dark:!border-slate-700",
    },
    {
      key: "logout",
      label: (
        <div className="flex items-center gap-2 px-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
          <LogOut className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">Выйти</span>
        </div>
      ),
      onClick: () => signOut(),
    },
  ]

  return (
    <Dropdown
      menu={{
        items,
        className: "!bg-white/95 dark:!bg-slate-800/95 !backdrop-blur-xl !border !border-slate-200/60 dark:!border-slate-700/60 !rounded-xl !p-1.5 !shadow-xl !shadow-slate-200/20 dark:!shadow-slate-900/50",
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <button className="flex items-center gap-2 rounded-full p-1 pl-1 pr-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group outline-none">
        <div className="h-7 w-7 rounded-full bg-slate-100 dark:bg-slate-700 border border-slate-200/50 dark:border-slate-600/50 overflow-hidden">
          {session.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-3.5 w-3.5 text-slate-400 dark:text-slate-300" />
            </div>
          )}
        </div>
        <ChevronDown className="h-3 w-3 text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
      </button>
    </Dropdown>
  )
}