"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Tooltip, message } from "antd";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const messages = {
  ru: {
    signInTooltip: "Войдите, чтобы сохранять резюме",
    save: "Сохранить",
    update: "Обновить",
    saveAsNew: "Сохранить как новое",
    saved: "Резюме сохранено",
    updated: "Резюме обновлено",
    saveFailed: "Не удалось сохранить резюме",
    updateFailed: "Не удалось обновить резюме",
    saveError: "Ошибка при сохранении резюме",
    updateError: "Ошибка при обновлении резюме",
    notFoundOrDenied: "Резюме не найдено или у вас нет доступа",
  },
  en: {
    signInTooltip: "Sign in to save your resume",
    save: "Save",
    update: "Update",
    saveAsNew: "Save as new",
    saved: "Resume saved",
    updated: "Resume updated",
    saveFailed: "Failed to save resume",
    updateFailed: "Failed to update resume",
    saveError: "Error saving resume",
    updateError: "Error updating resume",
    notFoundOrDenied: "Resume not found or access denied",
  },
} as const;

export function SaveResumeButton() {
  const { data: session } = useSession();
  const isAuthed = Boolean(session?.user?.email);

  const { resume } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams() as { locale: Locale };
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const existingId = searchParams.get("resumeId");

  const getTitle = () => {
    const fullName = [resume.lastName, resume.firstName, resume.patronymic]
      .filter(Boolean)
      .join(" ");
    return resume.position || fullName || "Untitled resume";
  };

  const createResume = async () => {
    if (!isAuthed) return;

    try {
      setLoading(true);

      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: getTitle(),
        }),
      });

      if (!res.ok) {
        const error = (await res.json()) as { error?: string };
        message.error(error.error || t.saveFailed);
        return;
      }

      const { id: newId } = (await res.json()) as { id: string };

      if (newId && newId !== existingId) {
        const usp = new URLSearchParams(searchParams.toString());
        usp.set("resumeId", newId);
        router.replace(`/${locale}/editor?${usp.toString()}`);
      }

      message.success(t.saved);
    } catch {
      message.error(t.saveError);
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (resumeId: string) => {
    if (!isAuthed || !resumeId) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/resumes?resumeId=${resumeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: getTitle(),
        }),
      });

      if (!res.ok) {
        const error = (await res.json()) as { error?: string };
        if (res.status === 403 || res.status === 404) {
          message.error(t.notFoundOrDenied);
        } else {
          message.error(error.error || t.updateFailed);
        }
        return;
      }

      message.success(t.updated);
    } catch {
      message.error(t.updateError);
    } finally {
      setLoading(false);
    }
  };

  const icon = loading ? <LoadingOutlined /> : <SaveOutlined />;

  const menuItems: MenuProps["items"] = useMemo(() => {
    if (!existingId) return [];
    return [
      {
        key: "update",
        label: t.update,
        onClick: () => updateResume(existingId),
        disabled: loading,
      },
      {
        key: "save-as-new",
        label: t.saveAsNew,
        onClick: () => createResume(),
        disabled: loading,
      },
    ];
  }, [existingId, loading, t.update, t.saveAsNew]);

  const baseButton = (
    <Button
      type="dashed"
      size="small"
      className="font-medium! rounded-sm!"
      disabled={!isAuthed || loading}
      loading={loading}
      icon={icon}
      onClick={!existingId ? createResume : undefined}
    >
      {t.save}
    </Button>
  );

  const buttonNode = existingId ? (
    <Dropdown
      trigger={["click"]}
      menu={{ items: menuItems }}
      disabled={!isAuthed || loading}
    >
      <span onClick={(e) => e.preventDefault()}>{baseButton}</span>
    </Dropdown>
  ) : (
    baseButton
  );

  return !isAuthed ? (
    <Tooltip title={t.signInTooltip} placement="top">
      <span className="inline-flex cursor-not-allowed">{buttonNode}</span>
    </Tooltip>
  ) : (
    buttonNode
  );
}
