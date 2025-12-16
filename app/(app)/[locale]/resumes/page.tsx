"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Search, FileText, Edit, Trash2, Plus, Calendar, Clock, Sparkles, MoreVertical, File } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

import type { ResumeData } from "@/types/resume"
import { cn } from "@/lib/utils"

type ResumeListItem = {
  id: string
  data: ResumeData
  createdAt: string
  updatedAt: string
}

const messages = {
  // ... existing messages
  ru: {
    title: "Мои резюме",
    subtitle: "Управляйте своими профессиональными профилями",
    empty: "Нет сохранённых резюме",
    emptySubtext: "Создайте своё первое резюме, чтобы начать карьеру мечты",
    createResume: "Создать резюме",
    fullName: "Имя",
    position: "Позиция",
    createdAt: "Создано",
    updatedAt: "Обновлено",
    openEditor: "Редактировать",
    openPdf: "PDF",
    unauthorized: "Войдите, чтобы управлять резюме",
    goHome: "На главную",
    delete: "Удалить",
    deleting: "Удаление...",
    confirmDelete: "Удалить резюме навсегда?",
    searchPlaceholder: "Найти резюме...",
    loading: "Загрузка...",
  },
  en: {
    title: "My Resumes",
    subtitle: "Manage your professional profiles all in one place",
    empty: "No resumes found",
    emptySubtext: "Create your first resume to kickstart your career",
    createResume: "New Resume",
    fullName: "Name",
    position: "Position",
    createdAt: "Created",
    updatedAt: "Updated",
    openEditor: "Edit",
    openPdf: "PDF",
    unauthorized: "Sign in to manage your resumes",
    goHome: "Go Home",
    delete: "Delete",
    deleting: "Deleting...",
    confirmDelete: "Delete this resume permanently?",
    searchPlaceholder: "Search resumes...",
    loading: "Loading...",
  },
} as const

export default function MyResumesPage() {
  const params = useParams() as { locale: "ru" | "en" }
  const locale = params.locale ?? "en"
  const t = messages[locale] ?? messages.en
  const router = useRouter()

  const { data: session, status } = useSession()

  const [resumes, setResumes] = useState<ResumeListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (status === "loading") return

    if (status === "unauthenticated" || !session?.user?.email) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/resumes?userEmail=${encodeURIComponent(
            session.user!.email as string,
          )}`,
        )

        if (!res.ok) {
          console.error("Failed to load resumes", await res.text())
          return
        }

        const json = await res.json()
        setResumes(json.resumes || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [status, session?.user])

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation if wrapped in link
    e.stopPropagation()

    if (!session?.user?.email) return

    const ok = window.confirm(t.confirmDelete)
    if (!ok) return

    try {
      setDeletingId(id)

      const res = await fetch(
        `/api/resumes?id=${encodeURIComponent(
          id,
        )}&userEmail=${encodeURIComponent(session.user.email as string)}`,
        {
          method: "DELETE",
        },
      )

      if (!res.ok) {
        console.error("Failed to delete resume", await res.text())
        return
      }

      setResumes((prev) => prev.filter((r) => r.id !== id))
    } catch (e) {
      console.error(e)
    } finally {
      setDeletingId(null)
    }
  }

  const filteredResumes = useMemo(() => {
    if (!search.trim()) return resumes
    const q = search.toLowerCase()
    return resumes.filter((r) => {
      const fullName = (r.data?.fullName || "").toLowerCase()
      const position = (r.data?.position || "").toLowerCase()
      return fullName.includes(q) || position.includes(q)
    })
  }, [resumes, search])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 p-4">
        <div className="text-center max-w-sm">
          <div className="w-12 h-12 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900 mb-2">{t.unauthorized}</h2>
          <Button onClick={() => router.push(`/${locale}`)} variant="default">
            {t.goHome}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {t.title}
            </h1>
            <p className="text-slate-500 text-lg font-medium max-w-lg">
              {t.subtitle}
            </p>
          </div>

          <Link href={`/${locale}/editor`}>
            <Button size="lg" className="rounded-full px-6 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              {t.createResume}
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-md">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-slate-600 transition-colors" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Content Grid */}
        <AnimatePresence mode="popLayout">
          {filteredResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed"
            >
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">{t.empty}</h3>
              <p className="text-slate-500 mb-6">{t.emptySubtext}</p>
              <Link href={`/${locale}/editor`}>
                <Button variant="outline" className="rounded-full">
                  {t.createResume}
                </Button>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredResumes.map((resume, index) => {
                const data = resume.data || {}
                const title = data.fullName || (locale === "ru" ? "Новое резюме" : "New Resume")
                const subtitle = data.position || (locale === "ru" ? "Должность не указана" : "No position specified")

                const date = new Date(resume.updatedAt).toLocaleDateString(
                  locale === "ru" ? "ru-RU" : "en-US",
                  { month: "short", day: "numeric", year: "numeric" }
                )

                const isDeleting = deletingId === resume.id

                return (
                  <motion.div
                    layout
                    key={resume.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: index * 0.05 } }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group relative bg-white rounded-2xl p-5 border border-slate-200/60 hover:border-slate-300/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col justify-between h-[240px]"
                  >
                    <Link href={`/${locale}/editor?resumeId=${resume.id}`} className="absolute inset-0 z-0" />

                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      {/* Dropdown or Actions could go here if more complex */}
                    </div>

                    <div className="relative z-10 mt-4 mb-auto">
                      <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {title}
                      </h3>
                      <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                        {subtitle}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 flex items-center justify-between border-t border-slate-100 mt-4">
                      <span className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {date}
                      </span>

                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0 duration-200">
                        <Link href={`/${locale}/print/${resume.id}`} target="_blank">
                          <Button size="icon" variant="ghost" className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700">
                            <File className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600"
                          onClick={(e) => handleDelete(resume.id, e)}
                          disabled={isDeleting}
                        >
                          {isDeleting ? <span className="w-3 h-3 border-2 border-red-500 rounded-full animate-spin border-t-transparent" /> : <Trash2 className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
