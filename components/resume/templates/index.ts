"use client";

import { NeoTemplate } from "./NeoTemplate";
import { SidebarTemplate } from "./SidebarTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { SimpleTemplate } from "./SimpleTemplate";
import { TimelineTemplate } from "./TimelineTemplate";
import { GridTemplate } from "./GridTemplate";

export const templateMap = {
  default: NeoTemplate,
  classic: SidebarTemplate,
  minimal: NeoTemplate,
  modern: CompactTemplate,
  neo: NeoTemplate,
  sidebar: SidebarTemplate,
  compact: CompactTemplate,
  simple: SimpleTemplate,
  timeline: TimelineTemplate,
  grid: GridTemplate,
} as const;

export type TemplateKey = keyof typeof templateMap;
