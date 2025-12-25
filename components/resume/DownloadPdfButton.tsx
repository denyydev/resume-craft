"use client";

import { type Locale } from "@/lib/useCurrentLocale";
import { useResumeStore } from "@/store/useResumeStore";
import { Button } from "antd";
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

  const handleClick = async () => {
    if (!session?.user?.email) {
      console.warn("No user email in session, user is not authenticated");
      return;
    }

    try {
      setLoading(true);

      const saveRes = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session.user.email,
        }),
      });

      if (!saveRes.ok) {
        console.error("Failed to save resume", await saveRes.text());
        return;
      }

      const { id } = (await saveRes.json()) as { id: string };
      console.log("Saved resume id:", id);

      const pdfRes = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, locale }),
      });

      if (!pdfRes.ok) {
        console.error("Failed to generate PDF", await pdfRes.text());
        return;
      }

      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const labelByLocale: Record<Locale, string> = {
    ru: "Скачать PDF",
    en: "Download PDF",
  };

  return (
    <Button
      type="primary"
      className="rounded-full w-full"
      disabled={!session?.user?.email || loading}
      onClick={handleClick}
      icon={<FileDown className="w-4 h-4" />}
      loading={loading}
    >
      {labelByLocale[locale]}
    </Button>
  );
}
