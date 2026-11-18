import type { MetadataRoute } from "next";

import { ENTRIES } from "@/components/catalog/entries";

const SITE = "https://faang.fer.tec.br";

type Page = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

/**
 * The public surface: the landing, the catalogue, the docs (the hand-written
 * pages and one per catalogued component), the two demos — and the two files
 * agents read, `/llms.txt` and `/docs.md`, so a crawler that only reads the
 * sitemap still finds them.
 */
const PAGES: Page[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/components", priority: 0.9, changeFrequency: "weekly" },
  { path: "/docs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/docs/color", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/layout", priority: 0.7, changeFrequency: "monthly" },
  { path: "/docs/typography", priority: 0.7, changeFrequency: "monthly" },
  { path: "/chat", priority: 0.5, changeFrequency: "monthly" },
  { path: "/dashboard", priority: 0.5, changeFrequency: "monthly" },
  { path: "/llms.txt", priority: 0.4, changeFrequency: "monthly" },
  { path: "/docs.md", priority: 0.4, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = PAGES.map((page) => ({
    url: page.path === "/" ? SITE : `${SITE}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const documented = ENTRIES.map((entry) => ({
    url: `${SITE}/docs/${entry.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...documented];
}
