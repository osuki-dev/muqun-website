import { featureCopy, type FeatureId } from "@/i18n/feature-copy";
import type { SiteLocale } from "@/lib/locales";

export interface Feature {
  id: FeatureId;
  title: string;
  description: string;
  icon: string;
  status: "available" | "source" | "development";
  spotlight?: "ssh" | "theme" | "simfarm";
  media?: { src: string; alt: string };
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
    { id: "approve", icon: "↗", status: "available" },
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
