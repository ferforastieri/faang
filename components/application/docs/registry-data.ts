import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ALL_ENTRIES } from "@/components/application/docs/components-index";
import type { DocSummary } from "@/components/application/docs/docs-index-view";

/**
 * Server-side access to the registry the CLI reads. `public/r/` is written by
 * `scripts/build-registry.mjs` on `predev`, `prebuild` and `predeploy`, so the
 * docs pages and the install command can never disagree about what exists.
 */
type RegistryFile = {
  name: string;
  title: string;
  type: string;
  files: { path: string; content?: string }[];
  dependencies: string[];
  registryDependencies: string[];
};

type RegistryIndex = { items: Omit<RegistryFile, "files">[] & { files: { path: string }[] }[] };

const slug = (value: string) =>
  value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Catalogue copy, when the item is one of the components the landing lists. */
const DESCRIPTIONS = new Map(ALL_ENTRIES.map((entry) => [slug(entry.name), entry.description]));

function read<T>(file: string): T {
  return JSON.parse(readFileSync(join(process.cwd(), "public/r", file), "utf8")) as T;
}

export function readDocsIndex(): DocSummary[] {
  const index = read<{ items: (Omit<RegistryFile, "files" | "dependencies" | "registryDependencies"> & {
    files: { path: string }[];
    dependencies: string[];
    registryDependencies: string[];
  })[] }>("index.json");

  return index.items.map((item) => ({
    name: item.name,
    title: item.title,
    type: item.type,
    description: DESCRIPTIONS.get(item.name) ?? `${item.title} — installed as source.`,
    files: item.files,
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
  }));
}

export function readDocItem(name: string) {
  const item = read<RegistryFile>(`${name}.json`);
  const first = item.files[0];
  return {
    name: item.name,
    title: item.title,
    type: item.type,
    description: DESCRIPTIONS.get(item.name) ?? `${item.title} — installed as source.`,
    files: item.files.map((file) => ({ path: file.path })),
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
    source: first?.content ?? "",
    sourcePath: first?.path ?? "",
  };
}
