"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { LoadingOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
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

  const handleClick = async () => {
    if (!isAuthed) return;

    try {
      setLoading(true);

      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session!.user!.email!,
        }),
      });

      if (!res.ok) return;

      const { id: newId } = (await res.json()) as { id: string };

      if (newId && newId !== existingId) {
        const usp = new URLSearchParams(searchParams.toString());
        usp.set("resumeId", newId);
        router.replace(`/${locale}/editor?${usp.toString()}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const label =
    locale === "ru"
      ? existingId
        ? "Сохранить как новое"
        : "Сохранить резюме"
      : existingId
      ? "Save as new"
      : "Save resume";

  const tooltipText =
    locale === "ru"
      ? "Войдите, чтобы сохранять резюме"
      : "Sign in to save your resume";

  const button = (
    <Button
      type="text"
      onClick={handleClick}
      disabled={!isAuthed || loading}
      loading={loading}
      icon={loading ? <LoadingOutlined /> : <SaveOutlined />}
    >
      {label}
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
