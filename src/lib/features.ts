import { featureCopy, type FeatureId } from "@/i18n/feature-copy";
import type { SiteLocale } from "@/lib/locales";

export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  icon: string;
  status: "available" | "source" | "development";
  group: "work" | "tools" | "appearance";
  spotlight?: "ssh" | "theme" | "simfarm";
  /** A real capture, not a mock-up. Width and height are the file's own. */
  media?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
}
/** Stable IDs never derive from translated labels. Add copy in feature-copy.ts. */
export function getFeatures(locale: SiteLocale): Feature[] {
  const definitions: Omit<Feature, "title" | "description">[] = [
    { id: "composer", icon: "↗", group: "work", status: "available" },
    { id: "tasks", icon: "⋮", group: "work", status: "available" },
    { id: "agents", icon: "◇", group: "work", status: "available" },
    { id: "approve", icon: "✓", group: "work", status: "available" },
    { id: "voice", icon: "♪", group: "work", status: "available" },
    { id: "media", icon: "▷", group: "work", status: "available" },
    { id: "worktrees", icon: "⑂", group: "work", status: "available" },
    { id: "changes", icon: "±", group: "work", status: "available" },
    { id: "pad", icon: "▭", group: "work", status: "available" },
    {
      id: "ssh",
      icon: "⌁",
      group: "tools",
      status: "available",
      spotlight: "ssh",
    },
    { id: "watch", icon: "⌘", group: "tools", status: "available" },
    { id: "keyboard", icon: "⌃", group: "tools", status: "available" },
    { id: "send", icon: "+", group: "tools", status: "available" },
    { id: "files", icon: "≡", group: "tools", status: "available" },
    { id: "serve", icon: "◎", group: "tools", status: "available" },
    { id: "away", icon: "◷", group: "tools", status: "available" },
    { id: "stage", icon: "◈", group: "appearance", status: "available" },
    {
      id: "themes",
      icon: "✳",
      group: "appearance",
      status: "available",
      spotlight: "theme",
    },
    { id: "transitions", icon: "≈", group: "appearance", status: "available" },
    { id: "renderer", icon: "◐", group: "appearance", status: "available" },
    { id: "storage", icon: "▤", group: "appearance", status: "available" },
    { id: "updates", icon: "↓", group: "appearance", status: "available" },
    {
      id: "simulator",
      icon: "▣",
      group: "appearance",
      status: "source",
      spotlight: "simfarm",
    },
  ];
  return definitions.map((feature) => ({
    ...feature,
    title: featureCopy[locale][feature.id][0],
    description: featureCopy[locale][feature.id][1],
  }));
}
