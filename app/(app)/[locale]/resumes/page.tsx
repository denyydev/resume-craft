"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Search, FileText, Trash2, Plus, Clock, File } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { ResumeData } from "@/types/resume"
import { ResumePreviewThumb } from "@/components/resume/ResumePreviewThumb"
import { Button, Card, Empty, Input, Modal, Result, Spin, Typography, Tooltip, Row, Col, Space } from "antd"

type ResumeListItem = {
  id: string
  data: ResumeData
  createdAt: string
  updatedAt: string
}

const messages = {
  ru: {
    title: "Мои резюме",
    subtitle: "Управляйте своими профессиональными профилями",
    empty: "Нет сохранённых резюме",
    emptySubtext: "Создайте своё первое резюме, чтобы начать карьеру мечты",
    createResume: "Создать резюме",
    unauthorized: "Войдите, чтобы управлять резюме",
    goHome: "На главную",
    confirmDeleteTitle: "Удалить резюме?",
    confirmDeleteText: "Это действие нельзя отменить.",
    deleteOk: "Удалить",
    deleteCancel: "Отмена",
    searchPlaceholder: "Найти резюме...",
    newResume: "Новое резюме",
    noPosition: "Должность не указана",
    openPdf: "PDF",
    delete: "Удалить",
  },
  en: {
    title: "My Resumes",
    subtitle: "Manage your professional profiles all in one place",
    empty: "No resumes found",
    emptySubtext: "Create your first resume to kickstart your career",
    createResume: "New Resume",
    unauthorized: "Sign in to manage your resumes",
    goHome: "Go Home",
    confirmDeleteTitle: "Delete resume?",
    confirmDeleteText: "This action cannot be undone.",
    deleteOk: "Delete",
    deleteCancel: "Cancel",
    searchPlaceholder: "Search resumes...",
    newResume: "New Resume",
    noPosition: "No position specified",
    openPdf: "PDF",
    delete: "Delete",
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
          `/api/resumes?userEmail=${encodeURIComponent(session.user!.email as string)}`,
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

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!session?.user?.email) return

    Modal.confirm({
      title: t.confirmDeleteTitle,
      content: t.confirmDeleteText,
      okText: t.deleteOk,
      cancelText: t.deleteCancel,
      okButtonProps: { danger: true, loading: deletingId === id },
      onOk: async () => {
        try {
          setDeletingId(id)
          const res = await fetch(
            `/api/resumes?id=${encodeURIComponent(id)}&userEmail=${encodeURIComponent(
              session.user!.email as string,
            )}`,
            { method: "DELETE" },
          )
          if (!res.ok) {
            console.error("Failed to delete resume", await res.text())
            return
          }
          setResumes((prev) => prev.filter((r) => r.id !== id))
        } catch (err) {
          console.error(err)
        } finally {
          setDeletingId(null)
        }
      },
    })
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
        <Spin size="large" />
      </div>
    )
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50/50 px-4">
        <Result
          icon={<FileText className="w-10 h-10 text-slate-400" />}
          title={t.unauthorized}
          extra={
            <Button type="primary" onClick={() => router.push(`/${locale}`)}>
              {t.goHome}
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="mx-auto py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <Typography.Title level={2} style={{ marginBottom: 6 }}>
              {t.title}
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0, fontSize: 16 }}>
              {t.subtitle}
            </Typography.Paragraph>
          </div>

          <Link href={`/${locale}/editor`}>
            <Button type="primary" size="large" icon={<Plus className="w-4 h-4" />} className="rounded-full px-6">
              {t.createResume}
            </Button>
          </Link>
        </div>

        <div className="mb-7 max-w-md">
          <Input
            size="large"
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            prefix={<Search className="w-4 h-4 text-slate-400" />}
            className="rounded-2xl"
          />
        </div>

        <AnimatePresence mode="popLayout">
          {filteredResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <Card className="rounded-3xl" styles={{ body: { padding: 28 } }}>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div className="space-y-1">
                      <div className="text-base font-semibold text-slate-900">{t.empty}</div>
                      <div className="text-sm text-slate-500">{t.emptySubtext}</div>
                    </div>
                  }
                >
                  <Link href={`/${locale}/editor`}>
                    <Button size="large" type="default" className="rounded-full px-6">
                      {t.createResume}
                    </Button>
                  </Link>
                </Empty>
              </Card>
            </motion.div>
          ) : (
            <motion.div layout>
              <Row gutter={[16, 16]}>
                {filteredResumes.map((resume, index) => {
                  const data = (resume.data || {}) as any
                  const title = data.fullName || t.newResume
                  const subtitle = data.position || t.noPosition

                  const date = new Date(resume.updatedAt).toLocaleDateString(
                    locale === "ru" ? "ru-RU" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )

                  const isDeleting = deletingId === resume.id

                  return (
                    <Col key={resume.id} xs={24} sm={12} lg={8} xl={6}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: index * 0.04 } }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="h-full"
                      >
                       <Card
  hoverable
  className="group relative h-full rounded-2xl border border-slate-200/70"
  styles={{ body: { padding: 14 } }}
>
  <Link href={`/${locale}/editor?resumeId=${resume.id}`} className="block">
    <div className="relative">
      <ResumePreviewThumb data={data} locale={locale} className="mb-3" />
    </div>

    <div className="px-1">
      <Typography.Text strong className="block" style={{ fontSize: 16 }}>
        <span className="line-clamp-1">{title}</span>
      </Typography.Text>
      <Typography.Text type="secondary" className="block" style={{ fontSize: 13 }}>
        <span className="line-clamp-2">{subtitle}</span>
      </Typography.Text>
    </div>
  </Link>

  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-1">
    <Space size={6} className="text-slate-400">
      <Clock className="w-3.5 h-3.5" />
      <Typography.Text type="secondary" style={{ fontSize: 12 }}>
        {date}
      </Typography.Text>
    </Space>

    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      <Tooltip title={t.openPdf}>
        <Link href={`/${locale}/print/${resume.id}`} target="_blank">
          <Button type="text" shape="circle" icon={<File className="w-4 h-4" />} />
        </Link>
      </Tooltip>

      <Tooltip title={t.delete}>
        <Button
          type="text"
          danger
          shape="circle"
          loading={isDeleting}
          onClick={(e) => handleDelete(resume.id, e)}
          icon={!isDeleting ? <Trash2 className="w-4 h-4" /> : undefined}
        />
      </Tooltip>
    </div>
  </div>
</Card>

                      </motion.div>
                    </Col>
                  )
                })}
              </Row>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
