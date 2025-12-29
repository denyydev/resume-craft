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
import {
  BadgeCheck,
  BookOpen,
  FileDown,
  FileText,
  Link as LinkIcon,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";

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
    quickToolsTitle: "Быстрые инструменты",
    patternsTitle: "Готовые формулировки",
    atsScoreTitle: "ATS-проверка глазами рекрутера",
    exportTitle: "Экспорт без сюрпризов",
    items: {
      ats: { title: "Что такое ATS и почему это важно?" },
      length: { title: "Длина: 1 страница (2 — если опыта реально много)" },
      format: { title: "Формат: PDF, без фото и декоративной графики" },
      links: { title: "Ссылки: кликабельные и «живые»" },
      structure: {
        title:
          "Структура: шапка → контекст → достижения → образование → доп. инфо",
      },
      summary: { title: "Summary / «О себе»: 3–5 строк, по делу" },
      xyz: { title: "Опыт по формуле XYZ: не обязанности, а эффект" },
      keywords: { title: "Ключевые слова: для ATS и для людей" },
      mistakes: { title: "Частые ошибки, из-за которых резюме «умирает»" },
      export: { title: "Как экспортировать из билдера лучше всего" },
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
    nav: {
      overview: "Обзор",
      faq: "FAQ",
      checklist: "Чеклист",
    },
    micro: {
      good: "Хорошо",
      risky: "Рискованно",
      fix: "Как исправить",
      example: "Пример",
      patterns: {
        summary: "Шаблон Summary",
        bullets: "Шаблоны буллетов",
        skills: "Шаблон Skills",
      },
      tools: {
        jobMatch: "Сверка с вакансией",
        linkCheck: "Проверка ссылок",
        pageFit: "Укладывание в 1 страницу",
        export: "Экспорт",
      },
    },
  },
  en: {
    pageTitle: "Recommendations & FAQ (ATS-friendly resume)",
    intro:
      "This page helps you build a resume that works for both humans and ATS (Applicant Tracking Systems).",
    disclaimer:
      "There’s no single perfect resume for everyone. The goal is clarity, structure, and machine-readable formatting.",
    sectionsTitle: "TL;DR: what works",
    checklistTitle: "Pre-send checklist",
    quickToolsTitle: "Quick tools",
    patternsTitle: "Ready-to-use wording",
    atsScoreTitle: "ATS check like a recruiter",
    exportTitle: "Export without surprises",
    items: {
      ats: { title: "What is ATS and why does it matter?" },
      length: {
        title: "Length: 1 page (2 only if you truly have lots of experience)",
      },
      format: { title: "Format: PDF, no photo and no decorative graphics" },
      links: { title: "Links: clickable and valid" },
      structure: {
        title: "Structure: header → context → achievements → education → extra",
      },
      summary: { title: "Summary: 3–5 focused lines" },
      xyz: { title: "XYZ bullet formula: impact over duties" },
      keywords: { title: "Keywords: for ATS and humans" },
      mistakes: { title: "Common mistakes that kill resumes" },
      export: { title: "Best export settings in the builder" },
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
    nav: {
      overview: "Overview",
      faq: "FAQ",
      checklist: "Checklist",
    },
    micro: {
      good: "Good",
      risky: "Risky",
      fix: "Fix",
      example: "Example",
      patterns: {
        summary: "Summary template",
        bullets: "Bullet templates",
        skills: "Skills template",
      },
      tools: {
        jobMatch: "Match to job post",
        linkCheck: "Link check",
        pageFit: "Fit to 1 page",
        export: "Export",
      },
    },
  },
} as const;

function clsx(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

function Pill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl border border-slate-200 bg-slate-50">
          {icon}
        </div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
      </div>
      <div className="mt-3 text-sm text-slate-700">{children}</div>
    </div>
  );
}

function RuleRow({
  title,
  good,
  risky,
  fix,
  example,
  locale,
}: {
  title: string;
  good: string;
  risky: string;
  fix: string;
  example: string;
  locale: Locale;
}) {
  const t = messages[locale];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3">
              <div className="text-xs font-semibold text-emerald-800">
                {t.micro.good}
              </div>
              <div className="mt-1 text-xs text-slate-700">{good}</div>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3">
              <div className="text-xs font-semibold text-amber-900">
                {t.micro.risky}
              </div>
              <div className="mt-1 text-xs text-slate-700">{risky}</div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="text-xs font-semibold text-slate-900">
                {t.micro.fix}
              </div>
              <div className="mt-1 text-xs text-slate-700">{fix}</div>
            </div>
          </div>
          <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="text-xs font-semibold text-slate-900">
              {t.micro.example}
            </div>
            <div className="mt-1 text-xs text-slate-700">{example}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RecommendationsFaqPage() {
  const params = useParams<{ locale: Locale }>();
  const locale: Locale = params?.locale === "en" ? "en" : "ru";
  const t = messages[locale];

  const [activeSection, setActiveSection] = useState<
    "overview" | "faq" | "checklist"
  >("overview");

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
            <Paragraph style={{ margin: 0 }}>
              <Text strong>ATS</Text>{" "}
              {isRu
                ? "— системы, которые читают и сортируют резюме. Они ищут структуру и ключевые слова и могут «не понять» сложную верстку."
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
            <Paragraph style={{ margin: 0 }}>
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
            <Paragraph style={{ margin: 0 }}>
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
            <Paragraph style={{ margin: 0 }}>
              {isRu
                ? "LinkedIn / GitHub / портфолио должны быть кликабельными и корректными. Правило: всегда добавляй https://"
                : "LinkedIn / GitHub / portfolio should be valid and clickable. Rule: always include https://"}
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
            <Paragraph style={{ margin: 0 }}>
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
                <Tag>Header</Tag>
                <Tag>Summary</Tag>
                <Tag>Experience</Tag>
                <Tag>Projects</Tag>
                <Tag>Skills</Tag>
                <Tag>Education</Tag>
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
            <Paragraph style={{ margin: 0 }}>
              {isRu
                ? "Summary — один из самых важных блоков. 3–5 строк: кто ты, сильные стороны, стек/домены, какую задачу ищешь."
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
            <Paragraph style={{ margin: 0 }}>
              {locale === "ru"
                ? "Вместо «что делал» — «что изменил». XYZ: достижение → действие → результат (цифры/эффект)."
                : "Replace “what I did” with “what changed”. XYZ: achievement → action → result (numbers/impact)."}
            </Paragraph>
            <Card size="small">
              <Text strong>{locale === "ru" ? "Примеры:" : "Examples:"}</Text>
              <Divider style={{ margin: "10px 0" }} />
              <List
                size="small"
                dataSource={[
                  locale === "ru"
                    ? "Снизил время загрузки на 35% оптимизацией bundle splitting и кеширования."
                    : "Reduced page load time by 35% via bundle splitting and caching.",
                  locale === "ru"
                    ? "Уменьшил количество багов в проде на 20% внедрив e2e smoke и CI-правила."
                    : "Decreased production bugs by 20% by introducing e2e smoke tests and CI rules.",
                  locale === "ru"
                    ? "Сократил cycle time с 10 до 6 дней улучшив review process."
                    : "Reduced cycle time from 10 to 6 days by improving the review process.",
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
        tags: [locale === "ru" ? "ключевые слова" : "keywords"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph style={{ margin: 0 }}>
              {locale === "ru"
                ? "Ключевые слова должны быть в резюме текстом: технологии, инструменты, домены. Идеально — и в Skills, и в Experience."
                : "Keywords should appear as plain text: technologies, tools, domains. Ideally both in Skills and in Experience."}
            </Paragraph>
            <Alert
              type="info"
              showIcon
              message={
                locale === "ru"
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
        tags: [locale === "ru" ? "ошибки" : "mistakes"],
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
        tags: [locale === "ru" ? "экспорт" : "export"],
        content: (
          <Space direction="vertical" size={10}>
            <Paragraph style={{ margin: 0 }}>
              {locale === "ru"
                ? "Делай отдельный ATS-friendly шаблон: 1 колонка, минимум декора, нормальные заголовки секций."
                : "Use a dedicated ATS-friendly template: one column, minimal decoration, standard section headings."}
            </Paragraph>
            <List
              size="small"
              bordered
              dataSource={[
                locale === "ru"
                  ? "Экспортируй PDF из ATS-шаблона: без фото, без иконок, 1 колонка."
                  : "Export PDF from ATS template: no photo, no icons, one column.",
                locale === "ru"
                  ? "Проверь, что текст выделяется/копируется."
                  : "Check that text is selectable/copyable.",
                locale === "ru"
                  ? "Открой PDF на телефоне и в браузере — всё должно читаться одинаково."
                  : "Open the PDF on mobile and in browser — it should read consistently.",
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
      isRu ? "PDF, без фото/графики для ATS" : "PDF, no photo/graphics for ATS",
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

  const patterns = useMemo(() => {
    const isRu = locale === "ru";
    return {
      summary: isRu
        ? [
            "Frontend Engineer (React/TypeScript), 3+ года. Делаю быстрые интерфейсы, улучшаю DX и качество релизов.",
            "Опыт: дизайн-системы, производительность, интеграции, A/B. Ищу продуктовую команду с фокусом на качество.",
          ]
        : [
            "Frontend Engineer (React/TypeScript), 3+ years. I build fast UIs, improve DX, and raise release quality.",
            "Experience: design systems, performance, integrations, A/B. Looking for a product team focused on quality.",
          ],
      bullets: isRu
        ? [
            "Снизил(а) {метрика} на {X%} за счёт {действие}; результат: {эффект}.",
            "Ускорил(а) {процесс} с {A} до {B} благодаря {изменение}.",
            "Внедрил(а) {практика} → снизил(а) {риски/баги} на {X%}.",
          ]
        : [
            "Reduced {metric} by {X%} via {action}; outcome: {impact}.",
            "Improved {process} from {A} to {B} by {change}.",
            "Introduced {practice} → decreased {bugs/risks} by {X%}.",
          ],
      skills: isRu
        ? "Skills: React, TypeScript, Next.js, CSS, Testing (Playwright/Jest), Performance, Accessibility, CI/CD"
        : "Skills: React, TypeScript, Next.js, CSS, Testing (Playwright/Jest), Performance, Accessibility, CI/CD",
    };
  }, [locale]);

  const atsRules = useMemo(() => {
    const isRu = locale === "ru";
    return [
      {
        title: isRu ? "Заголовки секций" : "Section headings",
        good: isRu
          ? "Experience, Skills, Education — стандартные названия."
          : "Use standard headings: Experience, Skills, Education.",
        risky: isRu
          ? "Креативные заголовки (“My Journey”, “What I did”)."
          : "Creative headings (“My Journey”, “What I did”).",
        fix: isRu
          ? "Верни стандартные названия секций."
          : "Switch back to standard section titles.",
        example: isRu
          ? "Experience / Projects / Skills / Education"
          : "Experience / Projects / Skills / Education",
      },
      {
        title: isRu ? "Ссылки" : "Links",
        good: isRu
          ? "Полные URL с https://, кликабельные."
          : "Full https:// URLs, clickable.",
        risky: isRu
          ? "“github.com/me” без схемы, не кликается."
          : "Naked domains without scheme, not clickable.",
        fix: isRu
          ? "Добавь https:// и проверь в PDF."
          : "Add https:// and verify in PDF.",
        example: "https://github.com/username",
      },
      {
        title: isRu ? "Буллеты" : "Bullets",
        good: isRu
          ? "3–6 буллетов, акцент на результат."
          : "3–6 bullets per role, impact-focused.",
        risky: isRu
          ? "Полотна текста, “responsible for”."
          : "Paragraph walls, “responsible for”.",
        fix: isRu
          ? "Перепиши в XYZ, добавь метрики."
          : "Rewrite using XYZ and add metrics.",
        example: isRu
          ? "Снизил время загрузки на 35% оптимизацией bundle splitting."
          : "Reduced page load time by 35% via bundle splitting.",
      },
    ];
  }, [locale]);

  const quickTools = useMemo(() => {
    const isRu = locale === "ru";
    return [
      {
        icon: <ScanText size={16} />,
        title: t.micro.tools.jobMatch,
        desc: isRu
          ? "Скопируй 8–12 ключевых слов из вакансии и проверь, что они есть текстом в Skills/Experience."
          : "Copy 8–12 key terms from the job post and ensure they appear as text in Skills/Experience.",
      },
      {
        icon: <LinkIcon size={16} />,
        title: t.micro.tools.linkCheck,
        desc: isRu
          ? "Открой PDF в браузере и кликни каждую ссылку. Если не кликается — добавь https://."
          : "Open the PDF in browser and click every link. If it’s not clickable — add https://.",
      },
      {
        icon: <Wand2 size={16} />,
        title: t.micro.tools.pageFit,
        desc: isRu
          ? "Спрячь второстепенные секции, урежь контекст компании до 1 строки, оставь 3–6 буллетов."
          : "Hide secondary sections, keep company context to 1 line, use 3–6 bullets per role.",
      },
      {
        icon: <FileDown size={16} />,
        title: t.micro.tools.export,
        desc: isRu
          ? "Проверь, что текст выделяется мышью: это сигнал нормального текстового слоя для ATS."
          : "Ensure text is selectable: it often indicates a proper text layer for ATS.",
      },
    ];
  }, [locale, t]);

  const navItems = useMemo(
    () => [
      {
        key: "overview" as const,
        label: t.nav.overview,
        icon: <Sparkles size={16} />,
      },
      { key: "faq" as const, label: t.nav.faq, icon: <BookOpen size={16} /> },
      {
        key: "checklist" as const,
        label: t.nav.checklist,
        icon: <BadgeCheck size={16} />,
      },
    ],
    [t]
  );

  return (
    <div className="mx-auto w-full max-w-[1120px] px-4 py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                <FileText size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-slate-900">
                  {t.pageTitle}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-slate-600">
                  {t.intro}
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              {navItems.map((it) => (
                <button
                  key={it.key}
                  type="button"
                  onClick={() => setActiveSection(it.key)}
                  className={clsx(
                    "w-full rounded-xl border px-3 py-2 text-left transition",
                    activeSection === it.key
                      ? "border-slate-300 bg-slate-50"
                      : "border-slate-200 bg-white hover:bg-slate-50"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-slate-700">{it.icon}</span>
                    <span className="text-sm font-medium text-slate-900">
                      {it.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4">
              <Alert type="info" showIcon message={t.disclaimer} />
            </div>
          </div>
        </aside>

        <main>
          {activeSection === "overview" ? (
            <Space direction="vertical" size={14} className="w-full">
              <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-5 shadow-sm">
                <Title level={2} style={{ margin: 0 }}>
                  {t.pageTitle}
                </Title>
                <Paragraph style={{ margin: "10px 0 0 0" }}>
                  {t.intro}
                </Paragraph>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Pill
                    icon={<Search size={16} />}
                    title="ATS"
                    desc={
                      locale === "ru"
                        ? "Простая структура + ключевые слова текстом."
                        : "Simple structure + keywords as text."
                    }
                  />
                  <Pill
                    icon={<Target size={16} />}
                    title={locale === "ru" ? "Длина" : "Length"}
                    desc={
                      locale === "ru"
                        ? "1 страница — стандарт. 2 — только если необходимо."
                        : "1 page is standard. 2 only if necessary."
                    }
                  />
                  <Pill
                    icon={<ShieldCheck size={16} />}
                    title="PDF"
                    desc={
                      locale === "ru"
                        ? "Один столбец, минимум декора, без фото."
                        : "One column, minimal decoration, no photo."
                    }
                  />
                  <Pill
                    icon={<Sparkles size={16} />}
                    title={locale === "ru" ? "Удар по сути" : "Impact"}
                    desc={
                      locale === "ru"
                        ? "XYZ-буллеты + метрики: что изменилось."
                        : "XYZ bullets + metrics: what changed."
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <MiniCard title={t.sectionsTitle} icon={<Sparkles size={16} />}>
                  <List
                    size="small"
                    dataSource={tldrItems}
                    renderItem={(x) => <List.Item>• {x}</List.Item>}
                  />
                </MiniCard>

                <MiniCard title={t.quickToolsTitle} icon={<Wand2 size={16} />}>
                  <div className="grid grid-cols-1 gap-3">
                    {quickTools.map((x) => (
                      <div
                        key={x.title}
                        className="rounded-xl border border-slate-200 bg-white p-3"
                      >
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5 text-slate-700">{x.icon}</div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900">
                              {x.title}
                            </div>
                            <div className="mt-1 text-xs text-slate-600">
                              {x.desc}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </MiniCard>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    <ScanText size={16} />
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.atsScoreTitle}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  {atsRules.map((r) => (
                    <RuleRow
                      key={r.title}
                      title={r.title}
                      good={r.good}
                      risky={r.risky}
                      fix={r.fix}
                      example={r.example}
                      locale={locale}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    <Sparkles size={16} />
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.patternsTitle}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="text-xs font-semibold text-slate-900">
                      {t.micro.patterns.summary}
                    </div>
                    <div className="mt-2 space-y-2 text-xs text-slate-700">
                      {patterns.summary.map((x, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200 bg-white p-3"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="text-xs font-semibold text-slate-900">
                      {t.micro.patterns.bullets}
                    </div>
                    <div className="mt-2 space-y-2 text-xs text-slate-700">
                      {patterns.bullets.map((x, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-200 bg-white p-3"
                        >
                          {x}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="text-xs font-semibold text-slate-900">
                      {t.micro.patterns.skills}
                    </div>
                    <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700">
                      {patterns.skills}
                    </div>
                    <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50/40 p-3">
                      <div className="flex items-start gap-2">
                        <TriangleAlert size={14} className="mt-0.5" />
                        <div className="text-xs text-slate-700">
                          {locale === "ru"
                            ? "Навыки должны быть текстом, без иконок вместо названий."
                            : "Skills must be plain text (avoid icons replacing names)."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    <FileDown size={16} />
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.exportTitle}
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} />
                      <div className="text-xs font-semibold text-slate-900">
                        {locale === "ru" ? "Безопасный режим" : "Safe mode"}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-700">
                      {locale === "ru"
                        ? "ATS-шаблон: 1 колонка, минимум декоративных элементов, стандартные заголовки секций."
                        : "ATS template: 1 column, minimal decoration, standard section headings."}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <TriangleAlert size={16} />
                      <div className="text-xs font-semibold text-slate-900">
                        {locale === "ru" ? "Проверка" : "Checks"}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-700">
                      {locale === "ru"
                        ? "Текст выделяется/копируется, ссылки кликаются, на телефоне всё читаемо."
                        : "Text selectable/copyable, links clickable, readable on mobile."}
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          ) : activeSection === "faq" ? (
            <Space direction="vertical" size={14} className="w-full">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    <BookOpen size={16} />
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.nav.faq}
                  </div>
                </div>
                <div className="mt-4">
                  <Collapse
                    items={faqItems.map((it) => ({
                      key: it.key,
                      label: (
                        <Space size={10} wrap>
                          <span className="flex items-center text-slate-700">
                            {it.icon}
                          </span>
                          <span className="text-slate-900">{it.title}</span>
                          {!!it.tags?.length && (
                            <Space size={6} wrap>
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
                </div>
              </div>
            </Space>
          ) : (
            <Space direction="vertical" size={14} className="w-full">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                    <BadgeCheck size={16} />
                  </span>
                  <div className="text-sm font-semibold text-slate-900">
                    {t.checklistTitle}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
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
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5 text-slate-700">
                        <TriangleAlert size={16} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-900">
                          {locale === "ru"
                            ? "Перед отправкой"
                            : "Before sending"}
                        </div>
                        <div className="mt-1 text-xs text-slate-700">
                          {locale === "ru"
                            ? "Открой PDF и попробуй: выделить текст, скопировать, кликнуть ссылки, открыть на телефоне."
                            : "Open the PDF and try: select text, copy, click links, open on mobile."}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center gap-2">
                        <ShieldCheck size={14} />
                        <div className="text-xs font-semibold text-slate-900">
                          {locale === "ru" ? "ATS-сейф" : "ATS-safe"}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-700">
                        {locale === "ru"
                          ? "Если сомневаешься — отправляй ATS-friendly версию."
                          : "When in doubt — submit the ATS-friendly version."}
                      </div>
                    </div>

                    <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3">
                      <div className="flex items-center gap-2">
                        <Wand2 size={14} />
                        <div className="text-xs font-semibold text-slate-900">
                          {locale === "ru"
                            ? "Быстрый апгрейд"
                            : "Quick upgrade"}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-slate-700">
                        {locale === "ru"
                          ? "Добавь 2–3 метрики в опыт и перепиши 3 буллета по XYZ — это часто даёт самый большой прирост."
                          : "Add 2–3 metrics and rewrite 3 bullets using XYZ — biggest ROI in minutes."}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Space>
          )}
        </main>
      </div>
    </div>
  );
}
