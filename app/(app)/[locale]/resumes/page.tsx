"use client";

import { ResumePreviewThumb } from "@/components/resume/ResumePreviewThumb";
import type { ResumeData } from "@/types/resume";
import {
  Button,
  Card,
  Col,
  Empty,
  Grid,
  Input,
  Modal,
  Pagination,
  Result,
  Row,
  Space,
  Spin,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, File, FileText, Plus, Search, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

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
    updated: "Обновлено",
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
    updated: "Updated",
  },
} as const;

export default function MyResumesPage() {
  const { token } = theme.useToken();
  const screens = Grid.useBreakpoint();

  const params = useParams() as { locale?: "ru" | "en" };
  const locale = params?.locale ?? "en";
  const t = messages[locale] ?? messages.en;
  const router = useRouter();

  const { data: session, status } = useSession();

  const [resumes, setResumes] = useState<ResumeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const pageSize = 8;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || !session?.user?.email) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetch(
          `/api/resumes?userEmail=${encodeURIComponent(
            session.user!.email as string
          )}`
        );
        if (!res.ok) {
          console.error("Failed to load resumes", await res.text());
          return;
        }
        const json = await res.json();
        setResumes(json.resumes || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [status, session?.user]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session?.user?.email) return;

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
            )}&userEmail=${encodeURIComponent(session.user!.email as string)}`,
            { method: "DELETE" }
          );
          if (!res.ok) {
            console.error("Failed to delete resume", await res.text());
            return;
          }
          setResumes((prev) => prev.filter((r) => r.id !== id));
        } catch (err) {
          console.error(err);
        } finally {
          setDeletingId(null);
        }
      },
    });
  };

  const filteredResumes = useMemo(() => {
    if (!search.trim()) return resumes;
    const q = search.toLowerCase();
    return resumes.filter((r) => {
      const fullName = (r.data?.fullName || "").toLowerCase();
      const position = (r.data?.position || "").toLowerCase();
      return fullName.includes(q) || position.includes(q);
    });
  }, [resumes, search]);

  useEffect(() => setPage(1), [search]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(filteredResumes.length / pageSize));
    if (page > maxPage) setPage(maxPage);
  }, [filteredResumes.length, page]);

  const paginatedResumes = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredResumes.slice(start, start + pageSize);
  }, [filteredResumes, page]);

  const pageWrapStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: token.colorBgLayout,
    padding: screens.md ? 24 : 16,
    paddingBottom: 56,
    width: "100%",
  };

  if (status === "loading" || loading) {
    return (
      <div style={{ ...pageWrapStyle, display: "grid", placeItems: "center" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user?.email) {
    return (
      <div style={{ ...pageWrapStyle, display: "grid", placeItems: "center" }}>
        <Result
          icon={
            <FileText size={42} style={{ color: token.colorTextSecondary }} />
          }
          title={t.unauthorized}
          extra={
            <Button type="primary" onClick={() => router.push(`/${locale}`)}>
              {t.goHome}
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div style={pageWrapStyle}>
      <Space
        direction="vertical"
        size="large"
        style={{ width: "100%", maxWidth: 1120, margin: "0 auto" }}
      >
        <Card>
          <div
            style={{
              display: "flex",
              gap: 16,
              alignItems: screens.md ? "flex-end" : "flex-start",
              justifyContent: "space-between",
              flexDirection: screens.md ? "row" : "column",
            }}
          >
            <div style={{ maxWidth: 720 }}>
              <Typography.Title level={2} style={{ margin: 0 }}>
                {t.title}
              </Typography.Title>
              <Typography.Paragraph
                type="secondary"
                style={{ margin: 0, fontSize: 16 }}
              >
                {t.subtitle}
              </Typography.Paragraph>
            </div>

            <Link href={`/${locale}/editor`}>
              <Button type="primary" icon={<Plus size={16} />}>
                {t.createResume}
              </Button>
            </Link>
          </div>
        </Card>

        <Card>
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: screens.md ? "row" : "column",
            }}
          >
            <Input
              allowClear
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              prefix={
                <Search size={16} style={{ color: token.colorTextTertiary }} />
              }
              style={{ maxWidth: screens.md ? 420 : "100%" }}
            />

            {filteredResumes.length > pageSize && (
              <Pagination
                current={page}
                pageSize={pageSize}
                total={filteredResumes.length}
                showSizeChanger={false}
                onChange={(p) => setPage(p)}
              />
            )}
          </div>
        </Card>

        <AnimatePresence mode="popLayout">
          {filteredResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <Card>
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Space direction="vertical" size={4}>
                      <Typography.Text strong>{t.empty}</Typography.Text>
                      <Typography.Text type="secondary">
                        {t.emptySubtext}
                      </Typography.Text>
                    </Space>
                  }
                >
                  <Link href={`/${locale}/editor`}>
                    <Button type="primary" icon={<Plus size={16} />}>
                      {t.createResume}
                    </Button>
                  </Link>
                </Empty>
              </Card>
            </motion.div>
          ) : (
            <motion.div layout>
              <Row gutter={[16, 16]}>
                {paginatedResumes.map((resume, index) => {
                  const data = (resume.data || {}) as any;
                  const title = data.fullName || t.newResume;
                  const subtitle = data.position || t.noPosition;

                  const date = new Date(resume.updatedAt).toLocaleDateString(
                    locale === "ru" ? "ru-RU" : "en-US",
                    { month: "short", day: "numeric", year: "numeric" }
                  );

                  const isDeleting = deletingId === resume.id;

                  const showActionsAlways = !screens.lg; // mobile/tablet: actions always visible

                  return (
                    <Col key={resume.id} xs={24} sm={12} lg={8} xl={6}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: index * 0.03 },
                        }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        style={{ height: "100%" }}
                      >
                        <Card
                          hoverable
                          style={{ height: "100%" }}
                          styles={{ body: { padding: 14 } }}
                        >
                          <Link
                            href={`/${locale}/editor?resumeId=${resume.id}`}
                            style={{ display: "block" }}
                          >
                            <ResumePreviewThumb
                              data={data}
                              locale={locale}
                              className="mb-3"
                            />

                            <div style={{ paddingInline: 4 }}>
                              <Typography.Text
                                strong
                                style={{ fontSize: 16, display: "block" }}
                              >
                                <span
                                  style={{
                                    display: "block",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {title}
                                </span>
                              </Typography.Text>
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: 13, display: "block" }}
                              >
                                <span
                                  style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                  }}
                                >
                                  {subtitle}
                                </span>
                              </Typography.Text>
                            </div>
                          </Link>

                          <div
                            style={{
                              marginTop: 12,
                              paddingTop: 12,
                              borderTop: `1px solid ${token.colorBorderSecondary}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              paddingInline: 4,
                            }}
                          >
                            <Space size={6}>
                              <Clock
                                size={14}
                                style={{ color: token.colorTextTertiary }}
                              />
                              <Typography.Text
                                type="secondary"
                                style={{ fontSize: 12 }}
                              >
                                {t.updated} • {date}
                              </Typography.Text>
                            </Space>

                            <div
                              style={{
                                display: "flex",
                                gap: 6,
                                opacity: showActionsAlways ? 1 : 0,
                                transition: "opacity 160ms ease",
                              }}
                              className="resume-actions"
                            >
                              <Tooltip title={t.openPdf}>
                                <Link
                                  href={`/${locale}/print/${resume.id}`}
                                  target="_blank"
                                >
                                  <Button
                                    type="text"
                                    shape="circle"
                                    icon={<File size={16} />}
                                  />
                                </Link>
                              </Tooltip>

                              <Tooltip title={t.delete}>
                                <Button
                                  type="text"
                                  danger
                                  shape="circle"
                                  loading={isDeleting}
                                  onClick={(e) => handleDelete(resume.id, e)}
                                  icon={
                                    !isDeleting ? (
                                      <Trash2 size={16} />
                                    ) : undefined
                                  }
                                />
                              </Tooltip>
                            </div>
                          </div>

                          {!showActionsAlways && (
                            <style jsx>{`
                              :global(.ant-card:hover .resume-actions) {
                                opacity: 1 !important;
                              }
                            `}</style>
                          )}
                        </Card>
                      </motion.div>
                    </Col>
                  );
                })}
              </Row>
            </motion.div>
          )}
        </AnimatePresence>
      </Space>
    </div>
  );
}
