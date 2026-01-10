"use client";

import { ResumePreviewThumb } from "@/components/resume/ResumePreviewThumb";
import { UnauthorizedResumesView } from "@/components/resume/UnauthorizedResumesView";
import type { ResumeData } from "@/types/resume";
import {
  Button,
  Card,
  Empty,
  Input,
  Modal,
  Pagination,
  Skeleton,
  Tooltip,
  message,
} from "antd";
import { Clock, File, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type Locale = "ru" | "en";

type ResumeListItem = {
  id: string;
  data: ResumeData;
  createdAt: string;
  updatedAt: string;
};

const messages = {
  ru: {
    title: "Мои резюме",
    subtitle: "Управляйте своими профессиональными профилями",
    empty: "Нет сохранённых резюме",
    emptySubtext: "Создайте своё первое резюме, чтобы начать карьеру мечты",
    createResume: "Создать резюме",
    confirmDeleteTitle: "Удалить резюме?",
    confirmDeleteText: "Это действие нельзя отменить.",
    deleteOk: "Удалить",
    deleteCancel: "Отмена",
    searchPlaceholder: "Найти резюме...",
    newResume: "Новое резюме",
    noPosition: "Должность не указана",
    openPdf: "PDF",
    delete: "Удалить",
    updated: "Обновлено",
    total: "Всего",
  },
  en: {
    title: "My Resumes",
    subtitle: "Manage your professional profiles all in one place",
    empty: "No resumes found",
    emptySubtext: "Create your first resume to kickstart your career",
    createResume: "New Resume",
    confirmDeleteTitle: "Delete resume?",
    confirmDeleteText: "This action cannot be undone.",
    deleteOk: "Delete",
    deleteCancel: "Cancel",
    searchPlaceholder: "Search resumes...",
    newResume: "New Resume",
    noPosition: "No position specified",
    openPdf: "PDF",
    delete: "Delete",
    updated: "Updated",
    total: "Total",
  },
} as const;

const PAGE_SIZE = 8;

function getLocale(params: unknown): Locale {
  const p = params as { locale?: Locale };
  return p?.locale ?? "en";
}

function formatDate(dateIso: string, locale: Locale) {
  return new Date(dateIso).toLocaleDateString(
    locale === "ru" ? "ru-RU" : "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
}

function filterResumes(resumes: ResumeListItem[], q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return resumes;
  return resumes.filter((r) => {
    const data = (r.data || {}) as ResumeData;
    const fullName = [data.lastName, data.firstName, data.patronymic]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const position = (data.position || "").toLowerCase();
    return fullName.includes(query) || position.includes(query);
  });
}

function PreviewThumbSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={
        "relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-sm " +
        (className ?? "")
      }
      style={{ height: 180 }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent" />

      <div className="absolute left-3 top-3 pointer-events-none">
        <div
          className="relative overflow-hidden rounded-2xl border border-slate-100 bg-white"
          style={{
            width: "calc(100vw)",
            maxWidth: 794,
            height: 1123,
            transform: "scale(0.18)",
            transformOrigin: "top left",
            boxShadow:
              "0 18px 40px rgba(15, 23, 42, 0.12), 0 1px 0 rgba(255,255,255,0.6) inset",
          }}
        >
          <div className="p-10">
            <Skeleton
              active
              title={false}
              paragraph={{
                rows: 10,
                width: [
                  "70%",
                  "90%",
                  "85%",
                  "60%",
                  "92%",
                  "88%",
                  "75%",
                  "90%",
                  "65%",
                  "85%",
                ],
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-900/5 to-transparent" />
    </div>
  );
}

function ResumeCardSkeleton() {
  return (
    <Card hoverable className="h-full rounded-2xl">
      <PreviewThumbSkeleton className="mb-3" />

      <div className="px-1"></div>

      <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 px-1">
        <div className="flex gap-5">
          <Skeleton.Button active shape="circle" className="!h-8 !w-8" />
          <Skeleton.Button active shape="circle" className="!h-8 !w-8" />
        </div>
      </div>
    </Card>
  );
}

function ResumesGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <ResumeCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function MyResumesPage() {
  const params = useParams();
  const locale = getLocale(params);
  const t = messages[locale] ?? messages.en;
  const router = useRouter();

  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ? String(session.user.email) : "";

  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const isAuthLoading = status === "loading";
  const isUnauthed =
    !isAuthLoading && (status === "unauthenticated" || !userEmail);
  const isLoading = isAuthLoading || loading;

  useEffect(() => {
    if (isAuthLoading) return;

    if (status === "unauthenticated" || !userEmail) {
      setLoading(false);
      return;
    }

    let alive = true;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/resumes?userEmail=${encodeURIComponent(userEmail)}`
        );
        if (!res.ok) return;
        const json = await res.json();
        if (!alive) return;
        setResumes(Array.isArray(json?.resumes) ? json.resumes : []);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [isAuthLoading, status, userEmail]);

  const filtered = useMemo(
    () => filterResumes(resumes, search),
    [resumes, search]
  );

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const max = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (page > max) setPage(max);
  }, [filtered.length, page]);

  const total = filtered.length;
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const showPagination = !isLoading && total > PAGE_SIZE;

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  const createHref = `/${locale}/editor`;

  const sanitizeFilename = (name: string): string => {
    return name
      .replace(/[<>:"/\\|?*]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 100)
      .trim();
  };

  const getPdfFilename = (resume: ResumeListItem): string => {
    const data = (resume.data || {}) as ResumeData;
    const fullName = [data.lastName, data.firstName, data.patronymic]
      .filter(Boolean)
      .join(" ");
    const name = fullName || data.position || "resume";
    const sanitized = sanitizeFilename(name);
    return `${sanitized}-${resume.id.substring(0, 8)}.pdf`;
  };

  const onDownloadPdf = async (resume: ResumeListItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const resumeId = resume.id;
    if (downloadingId === resumeId) return;

    try {
      setDownloadingId(resumeId);

      const pdfRes = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: resumeId, locale }),
      });

      if (!pdfRes.ok) {
        const error = (await pdfRes.json()) as { error?: string };
        message.error(
          locale === "ru"
            ? error.error || "Не удалось скачать PDF"
            : error.error || "Failed to download PDF"
        );
        return;
      }

      const blob = await pdfRes.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = getPdfFilename(resume);
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      message.error(
        locale === "ru" ? "Ошибка при скачивании PDF" : "Error downloading PDF"
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const onDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userEmail) return;

    Modal.confirm({
      title: t.confirmDeleteTitle,
      content: t.confirmDeleteText,
      okText: t.deleteOk,
      cancelText: t.deleteCancel,
      okButtonProps: { danger: true, loading: deletingId === id },
      onOk: async () => {
        try {
          setDeletingId(id);
          const res = await fetch(
            `/api/resumes?id=${encodeURIComponent(
              id
            )}&userEmail=${encodeURIComponent(userEmail)}`,
            { method: "DELETE" }
          );
          if (!res.ok) return;
          setResumes((prev) => prev.filter((r) => r.id !== id));
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  if (isUnauthed) {
    return <UnauthorizedResumesView locale={locale} />;
  }

  return (
    <div className="h-full min-h-0 overflow-auto">
      <div className="px-5 h-full min-h-0 py-5">
        <div
          className="
          h-full min-h-0
          grid gap-5
          grid-cols-1
          lg:grid-cols-[240px_minmax(0,1fr)]
        "
        >
          {/* LEFT */}
          <aside className="min-h-0">
            {/* sticky только на десктопе */}
            <div
              className="
    relative
    rounded-2xl border border-white/10 overflow-hidden
    bg-gradient-to-b from-[#0b0b0e] via-[#0f1117] to-[#0b0b0e]
    p-5
    shadow-[0_18px_45px_rgba(0,0,0,0.45)]
    lg:backdrop-blur
    will-change-transform
  "
            >
              {/* premium highlight like capsules */}
              <div
                className="
      pointer-events-none absolute inset-0
      before:absolute before:inset-0 before:rounded-2xl
      before:bg-gradient-to-b before:from-white/10 before:to-transparent
      before:opacity-25
    "
              />

              {/* soft blobs for depth */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
              </div>

              {/* subtle accent rail (ties to other sidebars) */}
              <span
                className="
      pointer-events-none absolute left-0 top-6
      h-10 w-[3px] rounded-r
      bg-[#0A84FF]/80
      shadow-[0_0_0_4px_rgba(10,132,255,0.12)]
    "
              />

              <div className="relative flex flex-col gap-4">
                {/* header */}
                <div className="flex items-start gap-3">
                  <span
                    className="
          flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
          bg-white/4 ring-1 ring-white/10
        "
                    style={{ color: "#0A84FF" }}
                  >
                    <FileText size={18} />
                  </span>

                  <div className="min-w-0">
                    <h1 className="m-0 text-2xl font-semibold tracking-tight text-white">
                      {t.title}
                    </h1>
                    <p className="m-0 mt-1 text-sm text-white/60">
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                {/* primary action */}
                <Link
                  href={createHref}
                  className={`w-full ${isLoading ? "pointer-events-none" : ""}`}
                  aria-disabled={isLoading}
                >
                  <Button
                    icon={<Plus size={16} />}
                    className="
          w-full !h-10
          !border !border-white/15
          !bg-white/[0.06]
          !text-white
          shadow-sm lg:backdrop-blur
          hover:!bg-white/[0.1] hover:!border-white/25
          focus-visible:!ring-2 focus-visible:!ring-[#0A84FF]/40
          transition-all
        "
                    disabled={isLoading}
                  >
                    {t.createResume}
                  </Button>
                </Link>

                {/* divider */}
                <div className="h-px w-full bg-white/10" />

                {/* controls */}
                <div className="flex flex-col gap-3">
                  <Input
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    prefix={<Search size={16} className="text-white/50" />}
                    disabled={isLoading}
                    className="
          !h-10
          !bg-white/[0.04]
          !border-white/15
          !text-white
          placeholder:!text-white/40
          hover:!border-white/25
          focus:!border-[#0A84FF]
          focus:!ring-1 focus:!ring-[#0A84FF]/40
          lg:backdrop-blur
        "
                  />

                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>
                      {t.total}:{" "}
                      <span className="font-medium text-white/90">
                        {isLoading ? "—" : total}
                      </span>
                    </span>

                    {showPagination ? (
                      <span>
                        {page}/{maxPage}
                      </span>
                    ) : null}
                  </div>

                  {showPagination ? (
                    <Pagination
                      current={page}
                      pageSize={PAGE_SIZE}
                      total={total}
                      simple
                      size="small"
                      showSizeChanger={false}
                      onChange={(p) => setPage(p)}
                      className="
            flex justify-center
            [&_.ant-pagination-simple-pager]:text-white/70
            [&_.ant-pagination-item-link]:text-white/70
          "
                    />
                  ) : null}
                </div>
                <div className="rounded-xl bg-white/4 ring-1 ring-white/10 px-3 py-2">
                  <div className="text-[12px] leading-5 text-white/60">
                    {locale === "ru"
                      ? "Совет: называй резюме по позиции — так проще искать."
                      : "Tip: name resumes by position — it’s easier to find later."}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT */}
          <main className="min-w-0 min-h-0">
            {isLoading ? (
              <ResumesGridSkeleton count={6} />
            ) : total === 0 ? (
              <Card className="rounded-2xl">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">{t.empty}</span>
                      <span className="text-gray-500">{t.emptySubtext}</span>
                    </div>
                  }
                >
                  <Link href={createHref}>
                    <Button type="primary" icon={<Plus size={16} />}>
                      {t.createResume}
                    </Button>
                  </Link>
                </Empty>
              </Card>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginated.map((resume) => {
                  const data = (resume.data || {}) as ResumeData;
                  const fullName = [
                    data.lastName,
                    data.firstName,
                    data.patronymic,
                  ]
                    .filter(Boolean)
                    .join(" ");
                  const title = fullName || t.newResume;
                  const subtitle = data.position || t.noPosition;
                  const date = formatDate(resume.updatedAt, locale);
                  const isDeleting = deletingId === resume.id;

                  return (
                    <Card
                      key={resume.id}
                      hoverable
                      className="h-full rounded-2xl"
                    >
                      <Link
                        href={`/${locale}/editor?resumeId=${resume.id}`}
                        className="block"
                      >
                        <ResumePreviewThumb
                          data={data}
                          locale={locale}
                          className="mb-3"
                        />

                        <div className="px-1">
                          <div className="text-base font-semibold truncate">
                            {title}
                          </div>
                          <div className="mt-0.5 text-[13px] text-gray-500 overflow-hidden [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]">
                            {subtitle}
                          </div>
                        </div>
                      </Link>

                      <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-3 px-1">
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Clock size={14} className="text-gray-400" />
                          <span className="text-xs">
                            {t.updated} • {date}
                          </span>
                        </div>

                        <div className="flex gap-1.5">
                          <Tooltip title={t.openPdf}>
                            <Button
                              type="text"
                              shape="circle"
                              loading={downloadingId === resume.id}
                              disabled={downloadingId === resume.id}
                              onClick={(e) => onDownloadPdf(resume, e)}
                              icon={<File size={16} />}
                            />
                          </Tooltip>

                          <Tooltip title={t.delete}>
                            <Button
                              type="text"
                              danger
                              shape="circle"
                              loading={isDeleting}
                              onClick={(e) => onDelete(resume.id, e)}
                              icon={
                                !isDeleting ? <Trash2 size={16} /> : undefined
                              }
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
