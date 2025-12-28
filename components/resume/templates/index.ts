"use client";

import { AtsFriendlyTemplate } from "./AtsFriendlyTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { GridTemplate } from "./GridTemplate";
import { NeoTemplate } from "./NeoTemplate";
import { SidebarTemplate } from "./SidebarTemplate";
import { TimelineTemplate } from "./TimelineTemplate";

export const templateMap = {
  default: NeoTemplate,
  classic: SidebarTemplate,
  minimal: NeoTemplate,
  modern: CompactTemplate,
  neo: NeoTemplate,
  sidebar: SidebarTemplate,
  compact: CompactTemplate,
  simple: AtsFriendlyTemplate,
  timeline: TimelineTemplate,
  grid: GridTemplate,
} as const;

export type TemplateKey = keyof typeof templateMap;
