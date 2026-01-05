"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Tooltip, message } from "antd";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function SaveResumeButton() {
  const { data: session } = useSession();
  const isAuthed = Boolean(session?.user?.email);

  const { resume } = useResumeStore();
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams() as { locale: Locale };
  const locale: Locale = params?.locale === "en" ? "en" : "ru";

  const existingId = searchParams.get("resumeId");

  const getTitle = () => {
    const fullName = [resume.lastName, resume.firstName, resume.patronymic].filter(Boolean).join(" ");
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
        message.error(
          locale === "ru"
            ? error.error || "Не удалось сохранить резюме"
            : error.error || "Failed to save resume"
        );
        return;
      }

      const { id: newId } = (await res.json()) as { id: string };

      if (newId && newId !== existingId) {
        const usp = new URLSearchParams(searchParams.toString());
        usp.set("resumeId", newId);
        router.replace(`/${locale}/editor?${usp.toString()}`);
      }

      message.success(locale === "ru" ? "Резюме сохранено" : "Resume saved");
    } catch (error) {
      message.error(
        locale === "ru" ? "Ошибка при сохранении резюме" : "Error saving resume"
      );
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
          message.error(
            locale === "ru"
              ? "Резюме не найдено или у вас нет доступа"
              : "Resume not found or access denied"
          );
        } else {
          message.error(
            locale === "ru"
              ? error.error || "Не удалось обновить резюме"
              : error.error || "Failed to update resume"
          );
        }
        return;
      }

      const { id } = (await res.json()) as { id: string };
      message.success(locale === "ru" ? "Резюме обновлено" : "Resume updated");
    } catch (error) {
      message.error(
        locale === "ru"
          ? "Ошибка при обновлении резюме"
          : "Error updating resume"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = () => {
    if (existingId) {
      updateResume(existingId);
    }
  };

  const handleSaveAsNew = () => {
    createResume();
  };

  const tooltipText =
    locale === "ru"
      ? "Войдите, чтобы сохранять резюме"
      : "Sign in to save your resume";

  if (!existingId) {
    const button = (
      <Button
        type="text"
        onClick={handleSaveAsNew}
        disabled={!isAuthed || loading}
        loading={loading}
        icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
      >
        {locale === "ru" ? "Сохранить резюме" : "Saving your resume..."}
      </Button>
    );

    return !isAuthed ? (
      <Tooltip title={tooltipText} placement="top">
        <span className="inline-flex cursor-not-allowed">{button}</span>
      </Tooltip>
    ) : (
      button
    );
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "save-as-new",
      label: locale === "ru" ? "Сохранить как новое" : "Save as new",
      onClick: handleSaveAsNew,
    },
  ];

  const dropdownButton = (
    <Dropdown.Button
      type="text"
      menu={{ items: menuItems }}
      onClick={handleUpdate}
      disabled={!isAuthed || loading}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
    >
      {locale === "ru" ? "Обновить" : "Update"}
    </Dropdown.Button>
  );

  return !isAuthed ? (
    <Tooltip title={tooltipText} placement="top">
      <span className="inline-flex cursor-not-allowed">{dropdownButton}</span>
    </Tooltip>
  ) : (
    dropdownButton
  );
}
