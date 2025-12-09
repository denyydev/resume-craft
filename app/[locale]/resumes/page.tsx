"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Input, List, Tag, Button } from "antd"
import { SearchOutlined, FileTextOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"

type ResumeListItem = {
  id: string
  data: any
  createdAt: string
  updatedAt: string
}

const messages = {
  ru: {
    title: "Мои резюме",
    subtitle: "Здесь хранятся все ваши сохранённые резюме.",
    empty: "У вас пока нет сохранённых резюме.",
    fullName: "Имя",
    position: "Позиция",
    createdAt: "Создано",
    updatedAt: "Обновлено",
    openEditor: "Открыть в редакторе",
    openPdf: "Открыть PDF",
    unauthorized: "Чтобы увидеть свои резюме, войдите в аккаунт.",
    goHome: "На главную",
    delete: "Удалить",
    deleting: "Удаление...",
    confirmDelete: "Точно удалить это резюме? Отменить будет нельзя.",
    searchPlaceholder: "Поиск по имени или позиции...",
  },
  en: {
    title: "My resumes",
    subtitle: "Here you can find all your saved resumes.",
    empty: "You don't have any saved resumes yet.",
    fullName: "Name",
    position: "Position",
    createdAt: "Created at",
    updatedAt: "Updated at",
    openEditor: "Open in editor",
    openPdf: "Open PDF",
    unauthorized: "You need to sign in to see your resumes.",
    goHome: "Go to homepage",
    delete: "Delete",
    deleting: "Deleting...",
    confirmDelete:
      "Are you sure you want to delete this resume? This cannot be undone.",
    searchPlaceholder: "Search by name or position...",
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

  const handleDelete = async (id: string) => {
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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-sm text-slate-600">
        Loading...
      </div>
    )
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-8 bg-white rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-sm text-slate-700 mb-4">
            {t.unauthorized}
          </p>
          <button
            className="inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs text-slate-800"
            onClick={() => router.push(`/${locale}`)}
          >
            {t.goHome}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              {t.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {t.subtitle}
            </p>
          </div>
          <div className="w-full sm:w-64">
            <Input
              allowClear
              size="middle"
              placeholder={t.searchPlaceholder}
              prefix={<SearchOutlined className="text-slate-400" />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        {filteredResumes.length === 0 ? (
          <p className="text-sm text-slate-500">
            {t.empty}
          </p>
        ) : (
          <List
            itemLayout="horizontal"
            dataSource={filteredResumes}
            pagination={{
              pageSize: 5,
              size: "small",
            }}
            renderItem={(resume) => {
              const data = resume.data || {}
              const fullName = data.fullName || "—"
              const position = data.position || "—"

              const createdAt = new Date(resume.createdAt).toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-US",
              )
              const updatedAt = new Date(resume.updatedAt).toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-US",
              )

              const isDeleting = deletingId === resume.id

              return (
                <List.Item
                  actions={[
                    <Link
                      key="editor"
                      href={`/${locale}/editor?resumeId=${resume.id}`}
                    >
                      <Button
                        type="default"
                        size="small"
                        icon={<EditOutlined />}
                      >
                        {t.openEditor}
                      </Button>
                    </Link>,
                    <Link
                      key="pdf"
                      href={`/${locale}/print/${resume.id}`}
                      target="_blank"
                    >
                      <Button
                        type="default"
                        size="small"
                        icon={<FileTextOutlined />}
                      >
                        {t.openPdf}
                      </Button>
                    </Link>,
                    <Button
                      key="delete"
                      type="default"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      loading={isDeleting}
                      onClick={() => handleDelete(resume.id)}
                    >
                      {isDeleting ? t.deleting : t.delete}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-slate-900">
                          {fullName}
                        </span>
                        <span className="text-xs text-slate-600">
                          {position}
                        </span>
                      </div>
                    }
                    description={
                      <div className="mt-1 flex flex-wrap gap-2 text-[11px]">
                        <Tag bordered={false} color="default">
                          {t.createdAt}: {createdAt}
                        </Tag>
                        <Tag bordered={false} color="default">
                          {t.updatedAt}: {updatedAt}
                        </Tag>
                      </div>
                    }
                  />
                </List.Item>
              )
            }}
          />
        )}
      </div>
    </div>
  )
}
