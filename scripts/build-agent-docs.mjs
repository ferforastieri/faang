import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..");
const COMPONENTS = path.join(ROOT, "packages/ui/src/components");

const names = fs
  .readdirSync(COMPONENTS)
  .filter((file) => /\.(ts|tsx)$/.test(file))
  .map((file) => file.replace(/\.(ts|tsx)$/, ""))
  .sort();

const items = names.map((name) => ({ name, path: `components/${name}` }));
fs.writeFileSync(path.join(ROOT, "cli/components.json"), `${JSON.stringify({ items }, null, 2)}\n`);

const header = `# Faang UI

A design system for agent interfaces: conversation, tools, approvals and pixel
portraits, in React and plain CSS. MIT.

## Install

npm i faang-ui

// app/layout.tsx
import "faang-ui/styles.css";

## Components

Every component has its own export, e.g. \`import { Button } from "faang-ui/components/Button"\`.
`;

const list = items.map((item) => `- ${item.name} — faang-ui/${item.path}`).join("\n");

fs.mkdirSync(path.join(ROOT, "public"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "public/llms.txt"), `${header}\n${list}\n`);
fs.writeFileSync(
  path.join(ROOT, "public/docs.md"),
  `${header}\n${list}\n\n## Tokens\n\nAll colors, radii and spacing are CSS custom properties in\n\`faang-ui/styles.css\`. The theme is \`data-theme="light|dark"\` on \`<html>\`.\n`,
);

console.log(`${items.length} components → public/llms.txt, public/docs.md, cli/components.json`);
