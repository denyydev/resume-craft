"use client";

import type { Locale } from "@/lib/useCurrentLocale";
import {
  Alert,
  Card,
  Collapse,
  Divider,
  List,
  Space,
  Tag,
  Typography,
} from "antd";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";

import {
  BadgeCheck,
  FileDown,
  FileText,
  Link as LinkIcon,
  Search,
  ShieldCheck,
  Target,
  TriangleAlert,
} from "lucide-react";

const { Title, Paragraph, Text } = Typography;

type FaqItem = {
  key: string;
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  tags?: string[];
};

const messages = {
  ru: {
    pageTitle: "Рекомендации и FAQ (ATS-friendly резюме)",
    intro:
      "Эта страница помогает собрать резюме так, чтобы оно хорошо читалось и людьми, и ATS (системами отбора резюме).",
    disclaimer:
      "Нет «идеального» резюме для всех. Цель — сделать документ понятным, структурированным и машиночитаемым.",
    sectionsTitle: "Коротко: что работает",
    checklistTitle: "Чеклист перед отправкой",
    items: {
      ats: {
        title: "Что такое ATS и почему это важно?",
      },
      length: {
        title: "Длина: 1 страница (2 — если опыта реально много)",
      },
      format: {
        title: "Формат: PDF, без фото и декоративной графики",
      },
      links: {
        title: "Ссылки: кликабельные и «живые»",
      },
      structure: {
        title:
          "Структура: шапка → контекст → достижения → образование → доп. инфо",
      },
      summary: {
        title: "Summary / «О себе»: 3–5 строк, по делу",
      },
      xyz: {
        title: "Опыт по формуле XYZ: не обязанности, а эффект",
      },
      keywords: {
        title: "Ключевые слова: для ATS и для людей",
      },
      mistakes: {
        title: "Частые ошибки, из-за которых резюме «умирает»",
      },
      export: {
        title: "Как экспортировать из билдера лучше всего",
      },
    },
    checklist: [
      "Есть Summary 3–5 строк",
      "Опыт описан через достижения, а не обязанности",
      "Есть цифры/метрики хотя бы в части буллетов",
      "Ссылки начинаются с https:// и кликабельны в PDF",
      "Включён ATS-friendly шаблон (если откликаешься через сайты/формы)",
      "Резюме помещается на 1 страницу (или 2 при большом опыте)",
      "Секции включены по смыслу (лишнее скрыто)",
    ],
  },
  en: {
    pageTitle: "Recommendations & FAQ (ATS-friendly resume)",
    intro:
      "This page helps you build a resume that works for both humans and ATS (Applicant Tracking Systems).",
    disclaimer:
      "There’s no single perfect resume for everyone. The goal is clarity, structure, and machine-readable formatting.",
    sectionsTitle: "TL;DR: what works",
    checklistTitle: "Pre-send checklist",
    items: {
      ats: {
        title: "What is ATS and why does it matter?",
      },
      length: {
        title: "Length: 1 page (2 only if you truly have lots of experience)",
      },
      format: {
        title: "Format: PDF, no photo and no decorative graphics",
      },
      links: {
        title: "Links: clickable and valid",
      },
      structure: {
        title: "Structure: header → context → achievements → education → extra",
      },
      summary: {
        title: "Summary: 3–5 focused lines",
      },
      xyz: {
        title: "XYZ bullet formula: impact over duties",
      },
      keywords: {
        title: "Keywords: for ATS and humans",
      },
      mistakes: {
        title: "Common mistakes that kill resumes",
      },
      export: {
        title: "Best export settings in the builder",
      },
    },
    checklist: [
      "Summary is 3–5 lines",
      "Experience is written as achievements, not duties",
      "Some bullets include numbers/metrics",
      "Links start with https:// and are clickable in PDF",
      "ATS-friendly template is enabled (for online applications)",
      "Fits on 1 page (or 2 if necessary)",
      "Only relevant sections are enabled (hide noise)",
    ],
  },
} as const;

export default function RecommendationsFaqPage() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const faqItems: FaqItem[] = useMemo(() => {
    const isRu = locale === "ru";
    return [
      {
        key: "ats",
        icon: <Search size={16} />,
        title: t.items.ats.title,
        tags: ["ATS"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              <Text strong>{isRu ? "ATS" : "ATS"}</Text>{" "}
              {isRu
                ? "— это системы, которые автоматически читают и сортируют резюме. Они ищут структуру и ключевые слова и могут «не понять» сложную верстку."
                : "is software that parses resumes and ranks them. It looks for structure and keywords and may fail on complex layouts."}
            </Paragraph>
            <Alert
              type="info"
              showIcon
              message={
                isRu
                  ? "Если откликаешься через сайты/формы — ATS-friendly шаблон почти всегда лучший выбор."
                  : "If you apply via job boards/forms, an ATS-friendly template is usually the safest choice."
              }
            />
          </Space>
        ),
      },
      {
        key: "length",
        icon: <Target size={16} />,
        title: t.items.length.title,
        tags: [isRu ? "1 страница" : "1 page"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "1 страница — идеальный стандарт. 2 страницы допустимы, если опыта реально много и каждая строка несёт пользу."
                : "1 page is the gold standard. 2 pages are acceptable only when your experience genuinely requires it and every line earns its place."}
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                isRu
                  ? "Скрывай второстепенные секции (activities/certifications), если не помещается."
                  : "Hide secondary sections (activities/certifications) if you don’t fit.",
                isRu
                  ? "Делай 3–6 буллетов на роль вместо полотна текста."
                  : "Prefer 3–6 bullets per role over long paragraphs.",
                isRu
                  ? "Сокращай «описание компании», оставляя 1 строку контекста."
                  : "Keep company context to ~1 line.",
              ]}
              renderItem={(x) => <List.Item>{x}</List.Item>}
            />
          </Space>
        ),
      },
      {
        key: "format",
        icon: <ShieldCheck size={16} />,
        title: t.items.format.title,
        tags: ["PDF", "ATS"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Для ATS важны простая структура, один столбец и отсутствие декоративных элементов. Фото и графика часто мешают парсингу."
                : "For ATS, a simple one-column layout and minimal decoration matter. Photos and graphics often break parsing."}
            </Paragraph>
            <Alert
              type="warning"
              showIcon
              icon={<TriangleAlert size={16} />}
              message={
                isRu
                  ? "Не используй таблицы/две колонки/иконки вместо текста в ATS-шаблоне."
                  : "Avoid tables/two columns/icons as replacements for text in an ATS template."
              }
            />
          </Space>
        ),
      },
      {
        key: "links",
        icon: <LinkIcon size={16} />,
        title: t.items.links.title,
        tags: [isRu ? "ссылки" : "links"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "LinkedIn / GitHub / портфолио должны быть кликабельными и корректными. Лучшее правило: всегда добавляй https://"
                : "LinkedIn / GitHub / portfolio should be valid and clickable. Best rule: always include https://"}
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                isRu
                  ? "Проверь, что ссылки кликаются в итоговом PDF."
                  : "Verify links are clickable in the final PDF.",
                isRu
                  ? "Лучше короткие и понятные URL (или clean domain)."
                  : "Prefer short, clean URLs when possible.",
              ]}
              renderItem={(x) => <List.Item>{x}</List.Item>}
            />
          </Space>
        ),
      },
      {
        key: "structure",
        icon: <FileText size={16} />,
        title: t.items.structure.title,
        tags: [isRu ? "структура" : "structure"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Читаемость важнее креатива. Стандартные заголовки секций помогают и ATS, и рекрутеру."
                : "Readability beats creativity. Standard section headings help both ATS and recruiters."}
            </Paragraph>
            <Card size="small">
              <Text strong>
                {isRu ? "Рекомендуемый порядок:" : "Suggested order:"}
              </Text>
              <Divider style={{ margin: "10px 0" }} />
              <Space wrap>
                <Tag>{isRu ? "Header" : "Header"}</Tag>
                <Tag>{isRu ? "Summary" : "Summary"}</Tag>
                <Tag>{isRu ? "Experience" : "Experience"}</Tag>
                <Tag>{isRu ? "Projects" : "Projects"}</Tag>
                <Tag>{isRu ? "Skills" : "Skills"}</Tag>
                <Tag>{isRu ? "Education" : "Education"}</Tag>
                <Tag>
                  {isRu ? "Certifications/Extras" : "Certifications/Extras"}
                </Tag>
              </Space>
            </Card>
          </Space>
        ),
      },
      {
        key: "summary",
        icon: <BadgeCheck size={16} />,
        title: t.items.summary.title,
        tags: ["Summary"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Summary — один из самых важных блоков. 3–5 строк: кто ты, в чём сильный, какой стек/домены, какую задачу ищешь."
                : "Summary is one of the most important blocks. 3–5 lines: who you are, strengths, stack/domains, and what you’re looking for."}
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                isRu
                  ? "Пиши конкретно: «Frontend (React/TS), 3+ years, performance & DX»."
                  : "Be concrete: “Frontend (React/TS), 3+ years, performance & DX”.",
                isRu
                  ? "Не повторяй опыт целиком — только тезисы."
                  : "Don’t restate the whole experience — only highlights.",
              ]}
              renderItem={(x) => <List.Item>{x}</List.Item>}
            />
          </Space>
        ),
      },
      {
        key: "xyz",
        icon: <Target size={16} />,
        title: t.items.xyz.title,
        tags: ["XYZ"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Вместо «что делал» — «что изменил». Формула XYZ: достижение → что делал → результат (цифры/эффект)."
                : "Replace “what I did” with “what changed”. XYZ: achievement → action → result (numbers/impact)."}
            </Paragraph>
            <Card size="small">
              <Text strong>{isRu ? "Примеры:" : "Examples:"}</Text>
              <Divider style={{ margin: "10px 0" }} />
              <List
                size="small"
                dataSource={[
                  isRu
                    ? "Снизил время загрузки на 35% оптимизацией bundle splitting и кеширования."
                    : "Reduced page load time by 35% via bundle splitting and caching.",
                  isRu
                    ? "Уменьшил количество багов в проде на 20% внедрив e2e smoke и CI-правила."
                    : "Decreased production bugs by 20% by introducing e2e smoke tests and CI rules.",
                  isRu
                    ? "Ускорил выпуск фич: сократил cycle time с 10 до 6 дней за счёт улучшений в review process."
                    : "Improved delivery: reduced cycle time from 10 to 6 days by improving the review process.",
                ]}
                renderItem={(x) => <List.Item>• {x}</List.Item>}
              />
            </Card>
          </Space>
        ),
      },
      {
        key: "keywords",
        icon: <Search size={16} />,
        title: t.items.keywords.title,
        tags: [isRu ? "ключевые слова" : "keywords"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Ключевые слова должны быть в резюме текстом: технологии, инструменты, домены. Лучше всего — и в Skills, и в Experience."
                : "Keywords should appear as plain text: technologies, tools, domains. Ideally both in Skills and in Experience."}
            </Paragraph>
            <Alert
              type="info"
              showIcon
              message={
                isRu
                  ? "Практика: возьми описание вакансии и проверь, что важные слова реально присутствуют в резюме."
                  : "Practice: copy the job description and ensure key terms actually appear in your resume."
              }
            />
          </Space>
        ),
      },
      {
        key: "mistakes",
        icon: <TriangleAlert size={16} />,
        title: t.items.mistakes.title,
        tags: [isRu ? "ошибки" : "mistakes"],
        content: (
          <List
            size="small"
            bordered
            dataSource={[
              locale === "ru"
                ? "Две колонки, таблицы, декоративные элементы — ATS может сломать парсинг."
                : "Two columns, tables, heavy decoration — ATS may fail parsing.",
              locale === "ru"
                ? "Длинные полотна текста вместо буллетов."
                : "Long walls of text instead of bullets.",
              locale === "ru"
                ? "«Отвечал за / занимался» без результата и метрик."
                : "“Responsible for” without results or metrics.",
              locale === "ru"
                ? "Ссылки без https:// или не кликабельные в PDF."
                : "Links without https:// or not clickable in PDF.",
              locale === "ru"
                ? "Слишком много второстепенного — размывает сильные стороны."
                : "Too much secondary info dilutes your strongest points.",
            ]}
            renderItem={(x) => <List.Item>• {x}</List.Item>}
          />
        ),
      },
      {
        key: "export",
        icon: <FileDown size={16} />,
        title: t.items.export.title,
        tags: [isRu ? "экспорт" : "export"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph>
              {isRu
                ? "Если у тебя есть несколько шаблонов — добавь отдельный «ATS-friendly». Для откликов через сайты это будет дефолт."
                : "If you have multiple templates, add a dedicated “ATS-friendly” one. For online applications, it should be the default choice."}
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                isRu
                  ? "Экспортируй PDF из ATS-шаблона: без фото, без иконок, 1 колонка."
                  : "Export PDF from ATS template: no photo, no icons, one column.",
                isRu
                  ? "Проверь, что текст выделяется/копируется — это косвенно подтверждает нормальный текстовый слой."
                  : "Check that text is selectable/copyable — it often indicates a proper text layer.",
                isRu
                  ? "Открой PDF на телефоне/в браузере: если всё читаемо — ты в хорошей зоне."
                  : "Open the PDF on mobile/in browser: if it’s readable everywhere, you’re in a good place.",
              ]}
              renderItem={(x) => <List.Item>{x}</List.Item>}
            />
          </Space>
        ),
      },
    ];
  }, [locale, t]);

  const tldrItems = useMemo(() => {
    const isRu = locale === "ru";
    return [
      isRu
        ? "1 страница (2 — если реально нужно)"
        : "1 page (2 only if necessary)",
      isRu
        ? "PDF, без фото и графики для ATS"
        : "PDF, no photo/graphics for ATS",
      isRu ? "Кликабельные ссылки (https://)" : "Clickable links (https://)",
      isRu ? "Стандартная структура секций" : "Standard section structure",
      isRu
        ? "XYZ-буллеты: эффект → действие → результат"
        : "XYZ bullets: impact → action → result",
      isRu
        ? "Ключевые слова из вакансии в тексте"
        : "Job keywords present as text",
    ];
  }, [locale]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <Space direction="vertical" size={14} className="w-full">
        <Title level={2} style={{ margin: 0 }}>
          {t.pageTitle}
        </Title>

        <Paragraph style={{ margin: 0 }}>{t.intro}</Paragraph>

        <Alert type="info" showIcon message={t.disclaimer} />

        <Card size="small" title={t.sectionsTitle}>
          <List
            size="small"
            dataSource={tldrItems}
            renderItem={(x) => <List.Item>• {x}</List.Item>}
          />
        </Card>

        <Collapse
          items={faqItems.map((it) => ({
            key: it.key,
            label: (
              <Space size={10}>
                <span className="flex items-center">{it.icon}</span>
                <span>{it.title}</span>
                {!!it.tags?.length && (
                  <Space size={6}>
                    {it.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </Space>
                )}
              </Space>
            ),
            children: <div className="pt-1">{it.content}</div>,
          }))}
        />

        <Card size="small" title={t.checklistTitle}>
          <List
            size="small"
            dataSource={t.checklist}
            renderItem={(x) => (
              <List.Item>
                <Space size={10}>
                  <BadgeCheck size={16} />
                  <span>{x}</span>
                </Space>
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </div>
  );
}
