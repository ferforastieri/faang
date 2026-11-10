import { ALL_ENTRIES } from "@/components/application/docs/components-index";
import type { DocSummary } from "@/components/application/docs/docs-index-view";
import { REGISTRY_ITEMS, type RegistryItem } from "@/components/application/docs/registry.generated";

/**
 * The docs pages read the registry from a module, not from `public/r`.
 *
 * On Cloudflare the Worker has no `public/` on disk — reading it at request
 * time threw `no such file or directory, readAll '/bundle/public/r/index.json'`
 * and the page answered 500. `scripts/build-agent-docs.mjs` writes the same data
 * as `registry.generated.ts`, so the bundler inlines it and the pages are truly
 * static on every host.
 */
const slug = (value: string) =>
  value
    .toLocaleLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Catalogue copy, when the item is one of the components the landing lists. */
const DESCRIPTIONS = new Map(ALL_ENTRIES.map((entry) => [slug(entry.name), entry.description]));

const SORTED = Object.values(REGISTRY_ITEMS).sort((a, b) => a.name.localeCompare(b.name));

function summaryOf(item: RegistryItem): DocSummary {
  return {
    name: item.name,
    title: item.title,
    type: item.type,
    description: DESCRIPTIONS.get(item.name) ?? `${item.title} — installed as source.`,
    files: item.files,
    dependencies: item.dependencies,
    registryDependencies: item.registryDependencies,
  };
}

export function readDocsIndex(): DocSummary[] {
  return SORTED.map(summaryOf);
}

export function readDocItem(name: string) {
  const item = REGISTRY_ITEMS[name];
  if (!item) return null;
  return summaryOf(item);
}
