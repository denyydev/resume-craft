"use client";

import { useResumeSave } from "@/hooks/useResumeSave";
import type { Locale } from "@/lib/useCurrentLocale";
import type { MenuProps } from "antd";
import { Button, Dropdown, Input, Modal, Tooltip, message } from "antd";
import { Check, Copy, Share2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type ShareStatus = {
  shareId: string | null;
  isShared: boolean;
  shareUrl: string | null;
};

export default function ShareResumeButton() {
  const params = useParams() as { locale: Locale };
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const { ensureResumeSaved, isAuthed, currentResumeId } =
    useResumeSave(locale);

  const resumeId = currentResumeId;
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus | null>(null);
  const [copied, setCopied] = useState(false);

  // Загружаем статус share при изменении resumeId
  useEffect(() => {
    if (!resumeId || !isAuthed) {
      setShareStatus(null);
      return;
    }

    const fetchShareStatus = async () => {
      try {
        const res = await fetch(`/api/resumes/${resumeId}/share`);
        if (res.ok) {
          const data = (await res.json()) as ShareStatus;
          setShareStatus(data);
        }
      } catch (error) {
        console.error("Failed to fetch share status:", error);
      }
    };

    fetchShareStatus();
  }, [resumeId, isAuthed]);

  const enableShare = async (
    resumeIdToUse: string
  ): Promise<ShareStatus | null> => {
    try {
      const res = await fetch(`/api/resumes/${resumeIdToUse}/share`, {
        method: "POST",
      });

      if (!res.ok) {
        const error = (await res.json()) as { error?: string };
        message.error(
          locale === "ru"
            ? error.error || "Не удалось создать ссылку, попробуйте ещё раз"
            : error.error || "Failed to create share link, please try again"
        );
        return null;
      }

      const data = (await res.json()) as ShareStatus;
      return data;
    } catch (error) {
      message.error(
        locale === "ru"
          ? "Не удалось создать ссылку, попробуйте ещё раз"
          : "Failed to create share link, please try again"
      );
      return null;
    }
  };

  const disableShare = async () => {
    if (!resumeId || !isAuthed) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/resumes/${resumeId}/share`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = (await res.json()) as { error?: string };
        message.error(
          locale === "ru"
            ? error.error || "Не удалось выключить share"
            : error.error || "Failed to disable share"
        );
        return;
      }

      const data = (await res.json()) as { isShared: boolean };
      setShareStatus((prev) =>
        prev ? { ...prev, isShared: data.isShared } : null
      );
      message.success(locale === "ru" ? "Share выключен" : "Share disabled");
      setModalOpen(false);
    } catch (error) {
      message.error(
        locale === "ru"
          ? "Ошибка при выключении share"
          : "Error disabling share"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = async () => {
    if (!isAuthed) {
      // Не авторизован - не должно происходить, т.к. кнопка disabled
      return;
    }

    // Если share уже включен, просто показываем модал с ссылкой
    if (shareStatus?.isShared && shareStatus.shareUrl) {
      setModalOpen(true);
      return;
    }

    try {
      setLoading(true);

      // Если резюме не сохранено, сначала сохраняем
      const saveResult = await ensureResumeSaved();
      if (!saveResult.success) {
        message.error(
          locale === "ru"
            ? saveResult.error ||
                "Не удалось сохранить резюме, попробуйте ещё раз"
            : saveResult.error || "Failed to save resume, please try again"
        );
        return;
      }

      const resumeIdToUse = saveResult.resumeId;

      // Включаем share и получаем статус
      const shareData = await enableShare(resumeIdToUse);
      if (shareData) {
        setShareStatus(shareData);
        setModalOpen(true);
      }
    } catch (error) {
      message.error(
        locale === "ru"
          ? "Ошибка при создании ссылки"
          : "Error creating share link"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shareStatus?.shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareStatus.shareUrl);
      setCopied(true);
      message.success(locale === "ru" ? "Ссылка скопирована" : "Link copied");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      message.error(
        locale === "ru" ? "Не удалось скопировать" : "Failed to copy"
      );
    }
  };

  // Tooltip только для неавторизованных пользователей
  const tooltipText =
    locale === "ru"
      ? "Войдите, чтобы поделиться резюме"
      : "Sign in to share your resume";

  const menuItems: MenuProps["items"] = shareStatus?.isShared
    ? [
        {
          key: "unshare",
          label: locale === "ru" ? "Выключить share" : "Disable share",
          icon: <X className="w-4 h-4" />,
          onClick: disableShare,
          danger: true,
        },
      ]
    : [];

  const button = (
    <Dropdown.Button
      type="primary"
      className="font-medium!"
      menu={menuItems.length > 0 ? { items: menuItems } : undefined}
      onClick={handleShareClick}
      disabled={!isAuthed || loading}
      loading={loading}
      icon={<Share2 className="w-4 h-4" />}
    >
      {locale === "ru" ? "Share" : "Share"}
    </Dropdown.Button>
  );

  return (
    <>
      {!isAuthed ? (
        <Tooltip title={tooltipText} placement="top">
          <span className="inline-block cursor-not-allowed">{button}</span>
        </Tooltip>
      ) : (
        button
      )}

      <Modal
        title={locale === "ru" ? "Поделиться резюме" : "Share Resume"}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="close" onClick={() => setModalOpen(false)}>
            {locale === "ru" ? "Закрыть" : "Close"}
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {locale === "ru"
              ? "Скопируйте ссылку и поделитесь ею с другими:"
              : "Copy the link and share it with others:"}
          </p>

          <Input.Group compact>
            <Input
              value={shareStatus?.shareUrl || ""}
              readOnly
              className="flex-1"
            />
            <Button
              type="primary"
              icon={
                copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )
              }
              onClick={handleCopy}
            >
              {copied
                ? locale === "ru"
                  ? "Скопировано"
                  : "Copied"
                : locale === "ru"
                ? "Копировать"
                : "Copy"}
            </Button>
          </Input.Group>

          {shareStatus?.isShared && (
            <p className="text-xs text-gray-500">
              {locale === "ru"
                ? "Любой, у кого есть эта ссылка, может просмотреть ваше резюме."
                : "Anyone with this link can view your resume."}
            </p>
          )}
        </div>
      </Modal>
    </>
  );
}
