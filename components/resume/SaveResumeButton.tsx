"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter, useParams } from "next/navigation"
import { useResumeStore } from "@/store/useResumeStore"
import type { Locale } from "@/lib/useCurrentLocale"

export function SaveResumeButton() {
  const { data: session } = useSession()
  const { resume } = useResumeStore()
  const [loading, setLoading] = useState(false)

  const searchParams = useSearchParams()
  const router = useRouter()
  const params = useParams() as { locale: Locale }
  const locale: Locale = params?.locale === "en" ? "en" : "ru"

  const existingId = searchParams.get("resumeId")

  const handleClick = async () => {
    if (!session?.user?.email) {
      console.warn("No user email in session, user is not authenticated")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/resumes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: resume,
          locale,
          title: resume.position || resume.fullName || "Untitled resume",
          userEmail: session.user.email,
        }),
      })

      if (!res.ok) {
        console.error("Failed to save resume", await res.text())
        return
      }

      const json = await res.json()
      const newId: string = json.id

      if (newId && newId !== existingId) {
        const usp = new URLSearchParams(searchParams.toString())
        usp.set("resumeId", newId)
        router.replace(`/${locale}/editor?${usp.toString()}`)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const label =
    locale === "ru"
      ? existingId
        ? "Сохранить как новое"
        : "Сохранить резюме"
      : existingId
        ? "Save as new"
        : "Save resume"

  return (
    <Button
      variant="default"
      size="sm"
      disabled={!session?.user?.email || loading}
      onClick={handleClick}
      className="rounded-full bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
      ) : null}
      {label}
    </Button>
  )
}
