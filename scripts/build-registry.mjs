#!/usr/bin/env node
/**
 * Builds the install registry the `faang` CLI reads.
 *
 * One item per source file: the component, the foundations it imports and the
 * stylesheet are the units, and every `@/…` import becomes a
 * `registryDependencies` entry so the CLI can pull the graph in order. File
 * contents travel inline, so installing a component is one request per file and
 * never a path guess.
 *
 *   node scripts/build-registry.mjs
 */
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "r");

const SOURCE_DIRS = ["components", "utils", "hooks", "styles"];
const EXTRA_FILES = ["app/api/chat/route.ts"];

/** Packages the host project already has; never worth printing an install for. */
const ALREADY_THERE = new Set(["react", "react-dom", "next"]);

const EXTENSIONS = [".tsx", ".ts", ".css"];

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(join(ROOT, dir), { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel));
    else if (EXTENSIONS.some((ext) => entry.name.endsWith(ext))) out.push(rel);
  }
  return out;
}

/** Site-only files: the docs pages and their generated data are not library items. */
const NOT_INSTALLABLE = [
  "components/application/docs/registry.generated.ts",
  "components/application/docs/registry-data.ts",
  "components/application/docs/docs-index-view.tsx",
  "components/application/docs/doc-item-view.tsx",
];

const FILES = [...SOURCE_DIRS.flatMap(walk), ...EXTRA_FILES].filter(
  (file) => existsSync(join(ROOT, file)) && !NOT_INSTALLABLE.includes(file) && !file.endsWith(".generated.ts"),
);

/** A stable, unique name per file: the basename, or the parent folder when two collide. */
function nameFor(file) {
  const base = file.split("/").pop().replace(/\.(tsx|ts|css)$/, "");
  return base;
}

const byName = new Map();
for (const file of FILES) {
  let name = nameFor(file);
  if (byName.has(name)) {
    name = `${nameFor(dirname(file))}-${name}`;
  }
  byName.set(name, file);
}

const nameByFile = new Map([...byName].map(([name, file]) => [file, name]));

/** `@/components/base/buttons/button` → the file on disk. */
function resolveAlias(specifier) {
  const rel = specifier.replace(/^@\//, "");
  for (const candidate of [rel, `${rel}/index`]) {
    for (const ext of EXTENSIONS) {
      const path = `${candidate}${ext}`;
      if (existsSync(join(ROOT, path))) return path;
    }
  }
  return null;
}

const IMPORT_RE = /(?:from\s+|import\s+)["']([^"']+)["']/g;
const CSS_IMPORT_RE = /@import\s+["']([^"']+)["']/g;

function scan(file) {
  const source = readFileSync(join(ROOT, file), "utf8");
  const dependencies = new Set();
  const registryDependencies = new Set();

  const specs = [];
  for (const match of source.matchAll(IMPORT_RE)) specs.push(match[1]);
  for (const match of source.matchAll(CSS_IMPORT_RE)) specs.push(match[1]);

  for (const spec of specs) {
    if (spec.startsWith("@/")) {
      const target = resolveAlias(spec);
      const name = target ? nameByFile.get(target) : null;
      if (name) registryDependencies.add(name);
      continue;
    }
    if (spec.startsWith(".")) {
      // A relative CSS import inside styles/ (globals → theme, typography).
      const target = resolve(dirname(join(ROOT, file)), spec);
      const rel = relative(ROOT, target);
      const name = nameByFile.get(rel) ?? nameByFile.get(`${rel}.css`);
      if (name) registryDependencies.add(name);
      continue;
    }
    const pkg = spec.startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0];
    if (!ALREADY_THERE.has(pkg)) dependencies.add(pkg);
  }

  return { dependencies: [...dependencies].sort(), registryDependencies: [...registryDependencies].sort() };
}

function typeFor(file) {
  if (file.endsWith(".css")) return "registry:style";
  if (file.startsWith("app/")) return "registry:file";
  if (file.startsWith("utils/") || file.startsWith("hooks/")) return "registry:lib";
  if (file.startsWith("components/base/")) return "registry:ui";
  return "registry:block";
}

function titleFor(name) {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const index = [];

for (const [name, file] of [...byName].sort(([a], [b]) => a.localeCompare(b))) {
  const { dependencies, registryDependencies } = scan(file);
  const content = readFileSync(join(ROOT, file), "utf8");
  const item = {
    name,
    title: titleFor(name),
    type: typeFor(file),
    files: [{ path: file, type: typeFor(file), content }],
    dependencies,
    registryDependencies,
  };

  writeFileSync(join(OUT, `${name}.json`), `${JSON.stringify(item, null, 2)}\n`);

  const { content: _content, files, ...summary } = item;
  index.push({ ...summary, path: `${name}.json`, files: files.map((entry) => ({ path: entry.path, type: entry.type })) });
}

writeFileSync(
  join(OUT, "index.json"),
  `${JSON.stringify(
    {
      name: "faang",
      homepage: "https://faang.vira.ia.br",
      items: index,
    },
    null,
    2,
  )}\n`,
);

console.log(`registry: ${index.length} items in public/r/`);
