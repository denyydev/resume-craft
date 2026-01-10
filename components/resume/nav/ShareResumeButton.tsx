"use client";

import { useResumeSave } from "@/hooks/useResumeSave";
import type { Locale } from "@/lib/useCurrentLocale";
import { Button, Input, Modal, Tooltip, message } from "antd";
import { Check, Copy, Share2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type ShareStatus = {
  shareId: string | null;
  isShared: boolean;
  shareUrl: string | null;
};

const messages = {
  ru: {
    tooltip: "Войдите, чтобы поделиться резюме",
    share: "Поделиться",
    modalTitle: "Поделиться резюме",
    hint: "Скопируйте ссылку и поделитесь ею с другими:",
    close: "Закрыть",
    copy: "Копировать",
    copied: "Скопировано",
    linkCopied: "Ссылка скопирована",
    copyFailed: "Не удалось скопировать",
    anyone: "Любой, у кого есть эта ссылка, может просмотреть ваше резюме.",
    createLinkFailed: "Не удалось создать ссылку, попробуйте ещё раз",
    saveFailed: "Не удалось сохранить резюме, попробуйте ещё раз",
    createLinkError: "Ошибка при создании ссылки",
    disable: "Выключить share",
    disableOk: "Share выключен",
    disableFailed: "Не удалось выключить share",
    disableError: "Ошибка при выключении share",
  },
  en: {
    tooltip: "Sign in to share your resume",
    share: "Share",
    modalTitle: "Share Resume",
    hint: "Copy the link and share it with others:",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    linkCopied: "Link copied",
    copyFailed: "Failed to copy",
    anyone: "Anyone with this link can view your resume.",
    createLinkFailed: "Failed to create share link, please try again",
    saveFailed: "Failed to save resume, please try again",
    createLinkError: "Error creating share link",
    disable: "Disable share",
    disableOk: "Share disabled",
    disableFailed: "Failed to disable share",
    disableError: "Error disabling share",
  },
} as const;

export default function ShareResumeButton() {
  const params = useParams() as { locale: Locale };
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const { ensureResumeSaved, isAuthed, currentResumeId } =
    useResumeSave(locale);

  const resumeId = currentResumeId;

  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<ShareStatus | null>(null);
  const [copied, setCopied] = useState(false);

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
      } catch {
        setShareStatus(null);
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
        message.error(error.error || t.createLinkFailed);
        return null;
      }

      return (await res.json()) as ShareStatus;
    } catch {
      message.error(t.createLinkFailed);
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
        message.error(error.error || t.disableFailed);
        return;
      }

      const data = (await res.json()) as { isShared: boolean };
      setShareStatus((prev) =>
        prev ? { ...prev, isShared: data.isShared } : null
      );
      message.success(t.disableOk);
      setModalOpen(false);
    } catch {
      message.error(t.disableError);
    } finally {
      setLoading(false);
    }
  };

  const handleShareClick = async () => {
    if (!isAuthed) return;

    if (shareStatus?.isShared && shareStatus.shareUrl) {
      setModalOpen(true);
      return;
    }

    try {
      setLoading(true);

      const saveResult = await ensureResumeSaved();
      if (!saveResult.success) {
        message.error(saveResult.error || t.saveFailed);
        return;
      }

      const shareData = await enableShare(saveResult.resumeId);
      if (shareData) {
        setShareStatus(shareData);
        setModalOpen(true);
      }
    } catch {
      message.error(t.createLinkError);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!shareStatus?.shareUrl) return;

    try {
      await navigator.clipboard.writeText(shareStatus.shareUrl);
      setCopied(true);
      message.success(t.linkCopied);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      message.error(t.copyFailed);
    }
  };

  const footer = useMemo(() => {
    const items = [
      <Button key="close" onClick={() => setModalOpen(false)}>
        {t.close}
      </Button>,
    ];

    if (shareStatus?.isShared) {
      items.unshift(
        <Button key="disable" danger onClick={disableShare} loading={loading}>
          {t.disable}
        </Button>
      );
    }

    return items;
  }, [t.close, t.disable, shareStatus?.isShared, loading]);

  const button = (
    <Button
      type="dashed"
      size="small"
      className="font-medium! rounded-sm!"
      onClick={handleShareClick}
      disabled={!isAuthed || loading}
      loading={loading}
      icon={<Share2 className="w-4 h-4" />}
    >
      {t.share}
    </Button>
  );

  return (
    <>
      {!isAuthed ? (
        <Tooltip title={t.tooltip} placement="top">
          <span className="inline-block cursor-not-allowed">{button}</span>
        </Tooltip>
      ) : (
        button
      )}

      <Modal
        title={null}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={520}
        destroyOnClose
        closable={false}
      >
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-black/5">
                <Share2 className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <div className="text-base font-semibold leading-6">
                  {t.modalTitle}
                </div>
                <div className="mt-1 text-sm text-black/60">{t.hint}</div>
              </div>
            </div>

            <Button
              type="text"
              size="small"
              onClick={() => setModalOpen(false)}
              icon={<X className="h-4 w-4" />}
            />
          </div>

          <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-2">
                <Input
                  value={shareStatus?.shareUrl || ""}
                  readOnly
                  bordered={false}
                  className="flex-1 !p-0"
                  placeholder="—"
                  onFocus={(e) => e.target.select()}
                />

                <Button
                  type="primary"
                  onClick={handleCopy}
                  disabled={!shareStatus?.shareUrl}
                  icon={
                    copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )
                  }
                />
              </div>

              {shareStatus?.isShared ? (
                <div className="flex items-start gap-2 text-xs text-black/55">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/5">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                  </span>
                  <span className="leading-5">{t.anyone}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            {shareStatus?.isShared ? (
              <Button danger onClick={disableShare} loading={loading}>
                {t.disable}
              </Button>
            ) : null}

            <Button onClick={() => setModalOpen(false)}>{t.close}</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
