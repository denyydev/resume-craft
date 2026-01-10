"use client";

import { AtsFriendlyTemplate } from "./AtsFriendlyTemplate";
import { CompactTemplate } from "./CompactTemplate";
import { CreativeTemplate } from "./CreativeTemplate";
import { GridTemplate } from "./GridTemplate";
import { NeoTemplate } from "./NeoTemplate";
import { SidebarTemplate } from "./SidebarTemplate";
import { TimelineTemplate } from "./TimelineTemplate";

export const templateMap = {
  default: NeoTemplate,
  classic: SidebarTemplate,
  minimal: NeoTemplate,
  modern: CompactTemplate,
  timeline: TimelineTemplate,
  simple: AtsFriendlyTemplate,
  grid: GridTemplate,
  creative: CreativeTemplate,
} as const;

export type TemplateKey = keyof typeof templateMap;
