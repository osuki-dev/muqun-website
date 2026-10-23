import { featureCopy, type FeatureId } from "@/i18n/feature-copy";
import type { SiteLocale } from "@/lib/locales";

export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  icon: string;
  status: "available" | "source" | "development";
  /** `new` draws a tile in the 4.0 gallery; `everyday` a row in the compact list. */
  group: "new" | "everyday";
  spotlight?: "ssh" | "theme" | "simfarm";
  /** A real capture, not a mock-up. Width and height are the file's own. */
  media?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
}
/**
 * Stable IDs never derive from translated labels. Add copy in feature-copy.ts.
 * Copy exists for more ids than are listed here (simulator, transitions,
 * renderer, pad, away, themes): the home page shows sixteen, not everything.
 */
export function getFeatures(locale: SiteLocale): Feature[] {
  const definitions: Omit<Feature, "title" | "description">[] = [
    // New in 4.0: six tiles, in the order the release notes tell it.
    { id: "stage", icon: "◈", group: "new", status: "available" },
    { id: "composer", icon: "↗", group: "new", status: "available" },
    { id: "tasks", icon: "⋮", group: "new", status: "available" },
    { id: "voice", icon: "♪", group: "new", status: "available" },
    { id: "worktrees", icon: "⑂", group: "new", status: "available" },
    { id: "updates", icon: "↓", group: "new", status: "available" },
    // The everyday workspace: one line each, no media.
    { id: "approve", icon: "✓", group: "everyday", status: "available" },
    { id: "watch", icon: "⌘", group: "everyday", status: "available" },
    { id: "keyboard", icon: "⌃", group: "everyday", status: "available" },
    { id: "changes", icon: "±", group: "everyday", status: "available" },
    { id: "files", icon: "≡", group: "everyday", status: "available" },
    { id: "serve", icon: "◎", group: "everyday", status: "available" },
    { id: "send", icon: "+", group: "everyday", status: "available" },
    { id: "media", icon: "▷", group: "everyday", status: "available" },
    { id: "ssh", icon: "⌁", group: "everyday", status: "available" },
    { id: "storage", icon: "▤", group: "everyday", status: "available" },
  ];
  return definitions.map((feature) => ({
    ...feature,
    title: featureCopy[locale][feature.id][0],
    description: featureCopy[locale][feature.id][1],
  }));
}
