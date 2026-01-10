"use client";

import {
  Alert,
  Card,
  List,
  Space,
  Tag,
  Typography,
} from "antd";
import {
  FileDown,
  ScanText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import type { Locale } from "@/content/recommendations/types";
import { messages } from "@/content/recommendations/messages";
import {
  getAtsRules,
  getCommonWins,
  getExportQaChecklist,
  getPatterns,
  getQuickTools,
  getTldrItems,
} from "@/content/recommendations/data";
import { Pill } from "./components/Pill";
import { RuleRow } from "./components/RuleRow";
import { SectionHeader } from "./components/SectionHeader";

const { Title, Paragraph, Text } = Typography;

export function OverviewSection({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const isRu = locale === "ru";

  const tldrItems = getTldrItems(locale);
  const patterns = getPatterns(locale);
  const atsRules = getAtsRules(locale);
  const quickTools = getQuickTools(locale, t);
  const commonWins = getCommonWins(locale);
  const exportQa = getExportQaChecklist(locale);

  return (
    <Space direction="vertical" size={20} className="w-full">
      <Card>
        <Title level={2} style={{ margin: 0, marginBottom: 12 }}>
          {t.pageTitle}
        </Title>
        <Paragraph style={{ margin: 0, fontSize: 15 }}>
          {t.intro}
        </Paragraph>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Pill
            icon={<Search size={16} />}
            title="ATS"
            desc={
              isRu
                ? "Простая структура + ключевые слова текстом."
                : "Simple structure + keywords as text."
            }
          />
          <Pill
            icon={<Target size={16} />}
            title={isRu ? "Длина" : "Length"}
            desc={
              isRu
                ? "1 страница — стандарт. 2 — только если необходимо."
                : "1 page is standard. 2 only if necessary."
            }
          />
          <Pill
            icon={<ShieldCheck size={16} />}
            title="PDF"
            desc={
              isRu
                ? "Один столбец, минимум декора, без фото."
                : "One column, minimal decoration, no photo."
            }
          />
          <Pill
            icon={<Sparkles size={16} />}
            title={isRu ? "Удар по сути" : "Impact"}
            desc={
              isRu
                ? "XYZ-буллеты + метрики: что изменилось."
                : "XYZ bullets + metrics: what changed."
            }
          />
        </div>
      </Card>

      <Card>
        <SectionHeader
          icon={<Sparkles size={16} />}
          title={t.commonWinsTitle}
          level={3}
        />
        <div className="mt-4">
          <List
            size="small"
            dataSource={commonWins}
            renderItem={(x) => (
              <List.Item>
                <Space size={8}>
                  <Target size={14} className="text-[var(--ant-colorPrimary)]" />
                  <span className="text-sm">{x}</span>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <SectionHeader
            icon={<Sparkles size={16} />}
            title={t.sectionsTitle}
            level={4}
          />
          <div className="mt-4">
            <List
              size="small"
              dataSource={tldrItems}
              renderItem={(x) => <List.Item>• {x}</List.Item>}
            />
          </div>
        </Card>

        <Card>
          <SectionHeader
            icon={<Wand2 size={16} />}
            title={t.quickToolsTitle}
            level={4}
          />
          <div className="mt-4 space-y-3">
            {quickTools.map((tool) => (
              <div key={tool.title} className="flex gap-3">
                <span className="mt-0.5 shrink-0 text-[var(--ant-colorTextSecondary)]">
                  {tool.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--ant-colorText)]">
                    {tool.title}
                  </div>
                  <div className="mt-1 text-xs text-[var(--ant-colorTextSecondary)] leading-relaxed">
                    {tool.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <SectionHeader
          icon={<ScanText size={16} />}
          title={t.atsScoreTitle}
          level={3}
        />
        <div className="mt-6 space-y-4">
          {atsRules.map((rule) => (
            <RuleRow key={rule.title} {...rule} locale={locale} />
          ))}
        </div>
      </Card>

      <Card>
        <SectionHeader
          icon={<Sparkles size={16} />}
          title={t.patternsTitle}
          level={3}
        />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div>
            <div className="mb-3 text-sm font-semibold text-[var(--ant-colorText)]">
              {t.micro.patterns.summary}
            </div>
            <div className="space-y-2">
              {patterns.summary.map((x, i) => (
                <Card key={i} size="small" styles={{ body: { padding: 12 } }}>
                  <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
                    {x}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-[var(--ant-colorText)]">
              {t.micro.patterns.bullets}
            </div>
            <div className="space-y-2">
              {patterns.bullets.map((x, i) => (
                <Card key={i} size="small" styles={{ body: { padding: 12 } }}>
                  <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
                    {x}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 text-sm font-semibold text-[var(--ant-colorText)]">
              {t.micro.patterns.skills}
            </div>
            <Card size="small" styles={{ body: { padding: 12 } }} className="mb-3">
              <div className="text-xs text-[var(--ant-colorText)] leading-relaxed">
                {patterns.skills}
              </div>
            </Card>
            <Alert
              type="warning"
              showIcon
              icon={<TriangleAlert size={14} />}
              message={
                isRu
                  ? "Навыки должны быть текстом, без иконок вместо названий."
                  : "Skills must be plain text (avoid icons replacing names)."
              }
            />
          </div>
        </div>
      </Card>

      <Card>
        <SectionHeader
          icon={<FileDown size={16} />}
          title={t.exportTitle}
          level={3}
        />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card size="small">
            <Space size={10}>
              <ShieldCheck size={16} />
              <span className="text-sm font-medium text-[var(--ant-colorText)]">
                {isRu ? "Безопасный режим" : "Safe mode"}
              </span>
            </Space>
            <div className="mt-2 text-xs text-[var(--ant-colorTextSecondary)] leading-relaxed">
              {isRu
                ? "ATS-шаблон: 1 колонка, минимум декоративных элементов, стандартные заголовки секций."
                : "ATS template: 1 column, minimal decoration, standard section headings."}
            </div>
          </Card>

          <Card size="small">
            <Space size={10}>
              <TriangleAlert size={16} />
              <span className="text-sm font-medium text-[var(--ant-colorText)]">
                {isRu ? "Проверка" : "Checks"}
              </span>
            </Space>
            <div className="mt-2 text-xs text-[var(--ant-colorTextSecondary)] leading-relaxed">
              {isRu
                ? "Текст выделяется/копируется, ссылки кликаются, на телефоне всё читаемо."
                : "Text selectable/copyable, links clickable, readable on mobile."}
            </div>
          </Card>
        </div>

        <div className="mt-6">
          <Title level={5} style={{ margin: 0, marginBottom: 12 }}>
            {t.exportQaTitle}
          </Title>
          <List
            size="small"
            bordered
            dataSource={exportQa}
            renderItem={(x) => (
              <List.Item>
                <Space size={8}>
                  <ShieldCheck size={14} className="text-[var(--ant-colorSuccess)]" />
                  <span className="text-sm">{x}</span>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </Card>
    </Space>
  );
}

