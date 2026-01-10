"use client";

import { UnauthorizedResumesView } from "@/components/resume/UnauthorizedResumesView";
import type { Locale, SectionKey } from "@/content/recommendations/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ChecklistSection } from "./ChecklistSection";
import { FaqSection } from "./FaqSection";
import { OverviewSection } from "./OverviewSection";
import { SidebarNav } from "./SidebarNav";

export function RecommendationsFaqPage({ locale }: { locale: Locale }) {
  const { data: session, status } = useSession();
  const [activeSection, setActiveSection] = useState<SectionKey>("overview");

  const isAuthLoading = status === "loading";
  const isUnauthed =
    !isAuthLoading && (status === "unauthenticated" || !session?.user);

  if (isUnauthed) {
    return <UnauthorizedResumesView locale={locale} />;
  }

  if (isAuthLoading) {
    return (
      <div className="w-full py-6 ">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <aside className="lg:sticky lg:top-6 lg:self-start">
              <div className="h-64 animate-pulse rounded-2xl bg-[var(--ant-colorFillTertiary)]" />
            </aside>
            <main className="min-w-0">
              <div className="h-96 animate-pulse rounded-2xl bg-[var(--ant-colorFillTertiary)]" />
            </main>
          </div>
        </div>
      </div>
    );
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
            {/* sticky только на lg+ */}
            <div className="lg:sticky lg:top-20 lg:h-[calc(100dvh-5rem)]">
              <SidebarNav
                locale={locale}
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
            </div>
          </aside>

          {/* RIGHT */}
          <main className="min-w-0 min-h-0">
            {activeSection === "overview" && (
              <OverviewSection locale={locale} />
            )}
            {activeSection === "faq" && <FaqSection locale={locale} />}
            {activeSection === "checklist" && (
              <ChecklistSection locale={locale} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
