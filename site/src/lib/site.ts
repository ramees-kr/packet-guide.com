import type { CollectionEntry } from "astro:content";

export const siteTitle = "Packet Guide";
export const siteDescription =
  "Field notes from networking, cloud infrastructure, automation, and the command line.";

export function slugFromEntry(entry: CollectionEntry<"blog" | "projects">) {
  return entry.id.split("/").pop()?.replace(/\.md$/, "") ?? entry.id;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function readingMinutes(body = "") {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function sortByNewest<T extends { data: { date: Date } }>(items: T[]) {
  return items.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
