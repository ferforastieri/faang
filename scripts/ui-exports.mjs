import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..", "packages/ui");
const SRC = path.join(ROOT, "src");

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

const exportsMap = { ".": "./src/index.ts", "./styles.css": "./src/styles/index.css" };

for (const file of walk(SRC).sort()) {
  if (!/\.(ts|tsx|js)$/.test(file)) continue;
  if (file.endsWith(".d.ts")) continue;
  if (file.includes(`${path.sep}styles${path.sep}`)) continue;
  const rel = path.relative(SRC, file).replaceAll(path.sep, "/");
  const key = `./${rel.replace(/\.(ts|tsx|js)$/, "")}`;
  exportsMap[key] = `./src/${rel}`;
  if (rel.endsWith("/index.ts")) exportsMap[`./${rel.slice(0, -"index.ts".length)}`] = `./src/${rel}`;
}

const pkg = {
  name: "faang-ui",
  version: "0.3.0",
  description:
    "A design system for agent interfaces: conversation, tools, approvals, tokens and pixel portraits, in React and plain CSS.",
  license: "MIT",
  type: "module",
  main: "./src/index.ts",
  types: "./src/index.ts",
  exports: exportsMap,
  files: ["src", "README.md", "LICENSE"],
  sideEffects: ["*.css"],
  scripts: { typecheck: "tsc -p tsconfig.json" },
  peerDependencies: { react: ">=19", "react-dom": ">=19" },
  dependencies: { "radix-ui": "^1.8.1", uqr: "0.1.3" },
};

fs.writeFileSync(path.join(ROOT, "package.json"), `${JSON.stringify(pkg, null, 2)}\n`);
console.log(Object.keys(exportsMap).length, "exports");
