#!/usr/bin/env node
/**
 * Writes the two files an agent needs to install this library without reading
 * the website: `public/llms.txt` (the short index from llmstxt.org) and
 * `public/docs.md` (the whole thing, in markdown).
 *
 * Both are generated from the registry the CLI reads, so an item added to
 * `components/` shows up in the docs on the next build instead of drifting.
 *
 *   node scripts/build-agent-docs.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SITE = "https://faang.vira.ia.br";
const index = JSON.parse(readFileSync(join(ROOT, "public/r/index.json"), "utf8"));

/** Descriptions written for the catalogue, keyed by title and by slug. */
const CATALOGUE = readFileSync(join(ROOT, "components/application/docs/components-index.ts"), "utf8");
const descriptions = new Map();
for (const match of CATALOGUE.matchAll(/\{\s*name:\s*"([^"]+)",\s*href:\s*"[^"]*",\s*description:\s*"([^"]+)"/g)) {
  const [, name, description] = match;
  descriptions.set(name.toLocaleLowerCase(), description);
  descriptions.set(
    name
      .toLocaleLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, ""),
    description,
  );
}

const GROUP_ORDER = ["registry:ui", "registry:block", "registry:lib", "registry:style", "registry:file"];
const GROUP_LABEL = {
  "registry:ui": "Base components",
  "registry:block": "Application blocks",
  "registry:lib": "Utilities and hooks",
  "registry:style": "Styles",
  "registry:file": "API routes",
};

function descriptionOf(item) {
  return descriptions.get(item.name) ?? descriptions.get(item.title.toLocaleLowerCase()) ?? item.title;
}

const grouped = GROUP_ORDER.map((type) => ({
  type,
  label: GROUP_LABEL[type],
  items: index.items.filter((item) => item.type === type),
})).filter((group) => group.items.length > 0);

const total = index.items.length;

const installLine = (name) => `npx faang@latest add ${name}`;

// --- llms.txt ---------------------------------------------------------------
const llms = [
  "# Faang",
  "",
  `> Faang is a React design system for agentic interfaces. ${total} installable items — components, blocks, styles, utilities and an API route — as source files you copy into the project. MIT licensed, light and dark from the same classes.`,
  "",
  "Faang is not a dependency. Each component is a file (or a small set of files) installed by a CLI that reads this site's registry. Every item declares the npm packages it uses and the other items it imports, so installing one pulls its whole graph.",
  "",
  "## Start here",
  "",
  `- [Documentation](${SITE}/docs.md): every item, its files, its npm dependencies and how to install it`,
  `- [Registry index](${SITE}/r/index.json): machine-readable list of all ${total} items`,
  `- [Package](${SITE}/r/button.json): one component's JSON — inline source, dependencies, registry dependencies`,
  "",
  "## Install",
  "",
  "```bash",
  "npx faang@latest add data-table   # one component and its graph",
  "npx faang@latest add --all        # the whole registry",
  "npx faang@latest list             # every item",
  "```",
  "",
  "The project needs Next.js (App Router), Tailwind CSS v4, the `@/` path alias and `react-aria-components`.",
  "",
  "## Rules for generated code",
  "",
  `- Use the semantic tokens in \`styles/theme.css\` (text-text-primary, bg-background-secondary-default, border-border-button-default). Never raw palette classes or hex values.`,
  `- Use the composite type utilities (\`text-title-2-medium\`, \`text-body-regular\`, \`text-caption-1-semibold\`). Never rebuild type with \`text-sm font-medium\`.`,
  `- Merge classes with \`cx()\` from \`@/utils/cx\`. No string concatenation.`,
  `- Icons come from \`@remixicon/react\`, passed as component references (\`leadingIcon={RiAddLine}\`).`,
  `- Layouts use logical properties (\`ps\`, \`pe\`, \`ms\`, \`me\`, \`start\`, \`end\`) so RTL works without a second stylesheet.`,
  "",
  "## Components",
  "",
  ...index.items.map((item) => `- [${item.name}](${SITE}/r/${item.name}.json): ${descriptionOf(item)}`),
  "",
];

writeFileSync(join(ROOT, "public/llms.txt"), `${llms.join("\n")}\n`);

// --- docs.md ----------------------------------------------------------------
const docs = [
  "# Faang",
  "",
  `A React design system for agentic interfaces — ${total} installable items (components, blocks, styles, utilities, an API route), installed as source files. MIT licensed.`,
  "",
  "This file is written for a coding agent: it lists every installable item, the files each one writes, the npm packages it needs and the other items it pulls in.",
  "",
  "## Install",
  "",
  "```bash",
  "npx faang@latest list              # every item, one line each",
  "npx faang@latest add button        # one item and everything it imports",
  "npx faang@latest add --all         # the whole registry",
  "npx faang@latest add all           # same thing",
  "```",
  "",
  "Options: `--cwd <dir>` (project to write into), `--overwrite` (replace files that exist), `--dry-run` (print the plan), `--registry <url>`.",
  "",
  "Without the published package, the same CLI runs from the repository:",
  "",
  "```bash",
  "node cli/index.mjs add data-table",
  "```",
  "",
  "## What the host project needs",
  "",
  "1. Next.js with the App Router and the `@/` alias pointing at the project root.",
  "2. Tailwind CSS v4 (`@import \"tailwindcss\"` in the entry stylesheet).",
  "3. The styles: `npx faang@latest add globals` pulls `styles/globals.css`, `theme.css` and `typography.css`. Import `globals.css` in the root layout.",
  "4. `react-aria-components` for the interactive components, installed by the CLI's printed command.",
  "",
  "## Rules for generated code",
  "",
  "- Colours ride semantic tokens only: `text-text-primary`, `bg-background-secondary-default`, `border-border-button-default`, `text-text-error-primary`. No palette classes, no hex.",
  "- Type uses the composite utilities: `text-display-2-semibold`, `text-title-3-medium`, `text-body-regular`, `text-caption-1-semibold`.",
  "- Merge classes with `cx()` from `@/utils/cx`.",
  "- Icons come from `@remixicon/react` as component references (`leadingIcon={RiAddLine}`), never as inline SVG.",
  "- Forms and overlays build on React Aria Components; reuse the installed components instead of raw inputs.",
  "- Direction-aware styles: `ps`/`pe`, `ms`/`me`, `start`/`end`, `text-start`. Wrap the app in `DirectionProvider` with an explicit locale.",
  "",
  "## Items",
  "",
];

for (const group of grouped) {
  docs.push(`### ${group.label}`, "");
  for (const item of group.items) {
    docs.push(`#### ${item.name}`, "");
    docs.push(descriptionOf(item), "");
    docs.push(`- Files: ${item.files.map((file) => `\`${file.path}\``).join(", ")}`);
    if (item.dependencies.length > 0) {
      docs.push(`- npm: ${item.dependencies.map((dep) => `\`${dep}\``).join(", ")}`);
    }
    if (item.registryDependencies.length > 0) {
      docs.push(`- Pulls in: ${item.registryDependencies.map((dep) => `\`${dep}\``).join(", ")}`);
    }
    docs.push(`- Install: \`${installLine(item.name)}\``);
    docs.push("");
  }
}

docs.push(
  "## Registry",
  "",
  `${SITE}/r/index.json is the index. Each item is also its own file, for example ${SITE}/r/checkbox.json:`,
  "",
  "```json",
  "{",
  '  "name": "checkbox",',
  '  "type": "registry:ui",',
  '  "files": [{ "path": "components/base/checkbox/checkbox.tsx", "content": "…" }],',
  '  "dependencies": ["react-aria-components"],',
  '  "registryDependencies": ["cx"]',
  "}",
  "```",
  "",
  "## Licence",
  "",
  "MIT. Copy, change, ship.",
  "",
);

writeFileSync(join(ROOT, "public/docs.md"), `${docs.join("\n")}\n`);

console.log(`agent docs: llms.txt + docs.md (${total} items)`);

// --- registry as a module ----------------------------------------------------
// The docs pages must not touch the filesystem at request time: on Cloudflare the
// Worker has no `public/` on disk. Emitting the same data as a module lets the
// bundler inline it, so the pages are static everywhere.
const modulePath = join(ROOT, "components/application/docs/registry.generated.ts");
const detail = {};
for (const summary of index.items) {
  const item = JSON.parse(readFileSync(join(ROOT, "public/r", `${summary.name}.json`), "utf8"));
  // Summaries only. Inlining the source here put 1.1 MB into the Worker bundle
  // and every request blew the CPU limit (Cloudflare 1102); the code block
  // fetches /r/<name>.json from the assets binding instead.
  detail[summary.name] = {
    name: item.name,
    title: item.title,
    type: item.type,
    files: (item.files ?? []).map((file) => ({ path: file.path })),
    dependencies: item.dependencies ?? [],
    registryDependencies: item.registryDependencies ?? [],
  };
}

writeFileSync(
  modulePath,
  `// Generated by scripts/build-agent-docs.mjs — do not edit.\n` +
    `export type RegistryItem = {\n` +
    `  name: string;\n  title: string;\n  type: string;\n` +
    `  files: { path: string }[];\n  dependencies: string[];\n  registryDependencies: string[];\n};\n\n` +
    `export const REGISTRY_ITEMS: Record<string, RegistryItem> = ${JSON.stringify(detail)};\n`,
);
console.log(`agent docs: registry.generated.ts (${Object.keys(detail).length} items)`);
