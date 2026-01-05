"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { message } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

type SaveResult =
  | { success: true; resumeId: string }
  | { success: false; error: string };

/**
 * Хук для сохранения резюме
 * Возвращает функцию ensureResumeSaved, которая:
 * - Если resumeId есть - возвращает его сразу
 * - Если resumeId нет - создает новое резюме и возвращает новый ID
 * - Обновляет URL с resumeId
 */
export function useResumeSave(locale: Locale) {
  const { data: session } = useSession();
  const isAuthed = Boolean(session?.user?.email);
  const { resume } = useResumeStore();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getTitle = () => {
    const fullName = [resume.lastName, resume.firstName, resume.patronymic].filter(Boolean).join(" ");
    return resume.position || fullName || "Untitled resume";
  };

  /**
   * Обеспечивает, что резюме сохранено в БД
   * Возвращает resumeId или ошибку
   */
  const ensureResumeSaved = async (): Promise<SaveResult> => {
    if (!isAuthed) {
      return {
        success: false,
        error: locale === "ru" ? "Не авторизован" : "Not authenticated",
      };
    }

    const existingId = searchParams.get("resumeId");
    if (existingId) {
      return { success: true, resumeId: existingId };
    }

    try {
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
        return {
          success: false,
          error:
            locale === "ru"
              ? error.error || "Не удалось сохранить резюме"
              : error.error || "Failed to save resume",
        };
      }

      const { id: newId } = (await res.json()) as { id: string };

      if (newId) {
        // Обновляем URL с новым resumeId
        const usp = new URLSearchParams(searchParams.toString());
        usp.set("resumeId", newId);
        router.replace(`/${locale}/editor?${usp.toString()}`);
      }

      return { success: true, resumeId: newId };
    } catch (error) {
      return {
        success: false,
        error:
          locale === "ru"
            ? "Ошибка при сохранении резюме"
            : "Error saving resume",
      };
    }
  };

  return {
    ensureResumeSaved,
    isAuthed,
    currentResumeId: searchParams.get("resumeId"),
  };
}

