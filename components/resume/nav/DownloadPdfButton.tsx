"use client";

import { type Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Button, Tooltip } from "antd";
import { FileDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  locale: Locale;
};

export function DownloadPdfButton({ locale }: Props) {
  const [loading, setLoading] = useState(false);
  const resume = useResumeStore((s) => s.resume);
  const { data: session } = useSession();

  const isAuthed = Boolean(session?.user?.email);

  const handleClick = async () => {
    if (!isAuthed) return;

    try {
      setLoading(true);

      const saveRes = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session!.user!.email!,
        }),
      });

      if (!saveRes.ok) return;

      const { id } = (await saveRes.json()) as { id: string };

      const pdfRes = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, locale }),
      });

      if (!pdfRes.ok) return;

      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  const labelByLocale: Record<Locale, string> = {
    ru: "Скачать PDF",
    en: "Download PDF",
  };

  const tooltipByLocale: Record<Locale, string> = {
    ru: "Войдите или зарегистрируйтесь, чтобы скачать PDF",
    en: "Sign in to download your PDF",
  };

  const button = (
    <Button
      type="primary"
      className="rounded-full w-full"
      disabled={!isAuthed || loading}
      onClick={handleClick}
      icon={<FileDown className="w-4 h-4" />}
      loading={loading}
    >
      {labelByLocale[locale]}
    </Button>
  );

  return !isAuthed ? (
    <Tooltip title={tooltipByLocale[locale]} placement="top">
      <span className="inline-block w-full cursor-not-allowed">{button}</span>
    </Tooltip>
  ) : (
    button
  );
}
