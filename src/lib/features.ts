import { featureCopy, featureMediaAlt, type FeatureId } from "@/i18n/feature-copy";
import type { SiteLocale } from "@/lib/locales";

export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  icon: string;
  status: "available" | "source" | "development";
  spotlight?: "ssh" | "theme" | "simfarm";
  /** A real capture, not a mock-up. Width and height are the file's own. */
  media?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
}
/** Stable IDs never derive from translated labels. Add copy in feature-copy.ts. */
export function getFeatures(locale: SiteLocale): Feature[] {
  const definitions: Omit<Feature, "title" | "description">[] = [
    { id: "ssh", icon: "⌁", status: "available", spotlight: "ssh" },
    {
      id: "themes",
      icon: "✳",
      status: "development",
      spotlight: "theme",
    },
    {
      id: "simulator",
      icon: "▣",
      status: "source",
      spotlight: "simfarm",
    },
    // 3.1 first: what is new leads, the everyday tools follow.
    { id: "agents", icon: "◇", status: "available" },
    { id: "approve", icon: "↗", status: "available" },
    { id: "renderer", icon: "◐", status: "available" },
    {
      id: "changes",
      icon: "±",
      status: "available",
      media: { src: "/shots/feature-changes-tree-light.webp", alt: featureMediaAlt[locale].changes, width: 1200, height: 441 },
    },
    {
      id: "keyboard",
      icon: "⌃",
      status: "available",
      media: { src: "/shots/feature-pad-keyboard-light.webp", alt: featureMediaAlt[locale].keyboard, width: 1200, height: 446 },
    },
    { id: "pad", icon: "▭", status: "available" },
    { id: "transitions", icon: "≈", status: "available" },
    { id: "watch", icon: "⌘", status: "available" },
    { id: "send", icon: "+", status: "available" },
    { id: "files", icon: "≡", status: "available" },
    { id: "serve", icon: "◎", status: "available" },
    { id: "away", icon: "◷", status: "available" },
  ];
  return definitions.map((feature) => ({
    ...feature,
    title: featureCopy[locale][feature.id][0],
    description: featureCopy[locale][feature.id][1],
  }));
}
