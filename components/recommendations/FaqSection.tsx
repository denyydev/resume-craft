"use client";

import { Card, Collapse, Space, Tag } from "antd";
import type { Locale } from "@/content/recommendations/types";
import { messages } from "@/content/recommendations/messages";
import { getFaqItems } from "@/content/recommendations/data";
import { SectionHeader } from "./components/SectionHeader";
import { BookOpen } from "lucide-react";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const faqItems = getFaqItems(locale, t);

  return (
    <Card>
      <SectionHeader
        icon={<BookOpen size={16} />}
        title={t.nav.faq}
        level={2}
      />
      <div className="mt-6">
        <Collapse
          items={faqItems.map((it) => ({
            key: it.key,
            label: (
              <Space size={10} wrap>
                <span className="flex items-center">{it.icon}</span>
                <span>{it.title}</span>
                {!!it.tags?.length && (
                  <Space size={6} wrap>
                    {it.tags.map((tag) => (
                      <Tag key={tag}>
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                )}
              </Space>
            ),
            children: <div className="pt-2">{it.content}</div>,
          }))}
        />
      </div>
    </Card>
  );
}

