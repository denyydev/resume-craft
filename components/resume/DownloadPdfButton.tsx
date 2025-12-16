"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, FileDown } from "lucide-react"
import { useSession } from "next-auth/react"
import { type Locale } from "@/lib/useCurrentLocale"
import { useResumeStore } from "@/store/useResumeStore"

type Props = {
  locale: Locale
}

export function DownloadPdfButton({ locale }: Props) {
  const [loading, setLoading] = useState(false)
  const resume = useResumeStore((s) => s.resume)
  const { data: session } = useSession()

  const handleClick = async () => {
    if (!session?.user?.email) {
      console.warn("No user email in session, user is not authenticated")
      return
    }

    try {
      setLoading(true)

      const saveRes = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session.user.email,
        }),
      })

      if (!saveRes.ok) {
        console.error("Failed to save resume", await saveRes.text())
        return
      }

      const { id } = (await saveRes.json()) as { id: string }
      console.log("Saved resume id:", id)

      const pdfRes = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, locale }),
      })

      if (!pdfRes.ok) {
        console.error("Failed to generate PDF", await pdfRes.text())
        return
      }

      const blob = await pdfRes.blob()
      const url = URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = `resume-${id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const labelByLocale: Record<Locale, string> = {
    ru: "PDF",
    en: "PDF",
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full gap-2 border-slate-200"
      disabled={!session?.user?.email || loading}
      onClick={handleClick}
    >
      {loading ? (
        <div className="w-3.5 h-3.5 border-2 border-slate-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      {labelByLocale[locale]}
    </Button>
  )
}
