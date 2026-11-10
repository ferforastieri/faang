#!/usr/bin/env node
/**
 * faang — install Faang components into a project as source.
 *
 *   npx faang@latest list
 *   npx faang@latest add button
 *   npx faang@latest add data-table stat-cards
 *   npx faang@latest add --all
 *
 * The components come from Faang's registry (a JSON index plus one file per
 * item, served by the site). Every item declares its own npm dependencies and
 * the other items it imports, so installing one pulls its whole graph in the
 * right order and prints the packages the host project still needs.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";

const DEFAULT_REGISTRY = process.env.FAANG_REGISTRY ?? "https://faang.vira.ia.br/r";
const VERSION = "0.1.0";

const HELP = `
  faang v${VERSION} — add Faang components to your project

  Usage
    faang list                     every component in the registry
    faang add <name...>            install one or more components
    faang add --all                install the whole registry
    faang add <name> --dry-run     show what would be written

  Options
    --cwd <dir>         project to write into (default: current directory)
    --registry <url>    registry to read from (default: ${DEFAULT_REGISTRY})
    --overwrite         replace files that already exist
    --dry-run           print the plan without touching disk
    --json              machine-readable output for \`list\`
    -h, --help          this text

  Registry
    FAANG_REGISTRY      same as --registry, for CI
`;

const color = process.env.NO_COLOR || !process.stdout.isTTY
  ? { dim: (s) => s, bold: (s) => s, green: (s) => s, red: (s) => s, cyan: (s) => s }
  : {
      dim: (s) => `\u001b[2m${s}\u001b[0m`,
      bold: (s) => `\u001b[1m${s}\u001b[0m`,
      green: (s) => `\u001b[32m${s}\u001b[0m`,
      red: (s) => `\u001b[31m${s}\u001b[0m`,
      cyan: (s) => `\u001b[36m${s}\u001b[0m`,
    };

function parseArgs(argv) {
  const args = { _: [], names: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--cwd":
        args.cwd = argv[++i];
        break;
      case "--registry":
        args.registry = argv[++i];
        break;
      case "--overwrite":
        args.overwrite = true;
        break;
      case "--dry-run":
        args.dryRun = true;
        break;
      case "--all":
        args.all = true;
        break;
      case "--json":
        args.json = true;
        break;
      case "-h":
      case "--help":
        args.help = true;
        break;
      case "-v":
      case "--version":
        args.version = true;
        break;
      default:
        if (arg.startsWith("-")) {
          console.error(color.red(`Unknown option: ${arg}`));
          process.exit(1);
        }
        args.names.push(arg);
    }
  }
  return args;
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} — ${url}`);
  }
  return response.json();
}

function registryUrl(args) {
  return (args.registry ?? DEFAULT_REGISTRY).replace(/\/+$/, "");
}

async function loadIndex(args) {
  try {
    return await getJson(`${registryUrl(args)}/index.json`);
  } catch (error) {
    console.error(color.red(`Could not read the registry at ${registryUrl(args)}`));
    console.error(color.dim(String(error.message ?? error)));
    console.error(color.dim("Use --registry <url> or set FAANG_REGISTRY."));
    process.exit(1);
  }
}

/** "Button", "buttons/button" and "button" all resolve to the item named button. */
function resolveName(index, wanted) {
  const term = wanted.toLowerCase().replace(/^@faang\//, "");
  return (
    index.items.find((item) => item.name === term) ??
    index.items.find((item) => item.name === term.split("/").pop()) ??
    index.items.find((item) => item.title.toLowerCase() === term)
  );
}

async function cmdList(args) {
  const index = await loadIndex(args);
  if (args.json) {
    console.log(JSON.stringify(index.items.map(({ name, title, type }) => ({ name, title, type })), null, 2));
    return;
  }
  const width = Math.max(...index.items.map((item) => item.name.length));
  for (const item of index.items) {
    console.log(`  ${item.name.padEnd(width)}  ${color.dim(item.title)}`);
  }
  console.log(color.dim(`\n  ${index.items.length} items — ${registryUrl(args)}`));
}

async function cmdAdd(args) {
  if (!args.all && args.names.length === 0) {
    console.error(color.red("Name at least one component, or pass --all."));
    console.error(color.dim("faang list"));
    process.exit(1);
  }

  const cwd = isAbsolute(args.cwd ?? "") ? args.cwd : resolve(process.cwd(), args.cwd ?? ".");
  const index = await loadIndex(args);

  let wanted;
  if (args.all) {
    wanted = index.items;
  } else {
    wanted = args.names.map((name) => {
      const item = resolveName(index, name);
      if (!item) {
        console.error(color.red(`Not in the registry: ${name}`));
        process.exit(1);
      }
      return item;
    });
  }

  // Items are summaries in the index; fetch each one for its file contents.
  const detail = async (item) => getJson(`${registryUrl(args)}/${item.path ?? `${item.name}.json`}`);
  const resolved = [];
  for (const item of wanted) resolved.push(await detail(item));

  // Resolve registry dependencies to their full items before installing.
  async function expand(item, acc, seen) {
    if (seen.has(item.name)) return;
    seen.add(item.name);
    for (const name of item.registryDependencies ?? []) {
      const summary = index.items.find((entry) => entry.name === name);
      if (!summary) continue;
      await expand(await detail(summary), acc, seen);
    }
    acc.push(item);
  }
  const ordered = [];
  const seen = new Set();
  for (const item of resolved) await expand(item, ordered, seen);

  const dependencies = new Set();
  const plan = [];
  for (const item of ordered) {
    for (const dep of item.dependencies ?? []) dependencies.add(dep);
    for (const file of item.files ?? []) plan.push({ ...file, item: item.name });
  }

  const written = [];
  const skipped = [];

  for (const file of plan) {
    const target = join(cwd, file.path);
    const exists = existsSync(target);
    if (exists && !args.overwrite) {
      skipped.push(target);
      continue;
    }
    if (!args.dryRun) {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, file.content ?? "", "utf8");
    }
    written.push(target);
  }

  const label = args.dryRun ? "would write" : "wrote";
  console.log("");
  for (const item of ordered) {
    console.log(`${color.green("✔")} ${color.bold(item.name)}`);
  }
  console.log("");
  for (const file of written) {
    console.log(`  ${color.dim(label)} ${file.replace(`${cwd}/`, "")}`);
  }
  for (const file of skipped) {
    console.log(`  ${color.dim("skipped (exists)")} ${file.replace(`${cwd}/`, "")}`);
  }

  if (dependencies.size > 0) {
    console.log(`\n  ${color.bold("npm packages")}\n`);
    console.log(`  npm install ${[...dependencies].join(" ")}`);
  }

  if (skipped.length > 0) {
    console.log(color.dim("\n  Existing files were left alone; pass --overwrite to replace them."));
  }
  if (args.dryRun) {
    console.log(color.dim("\n  Dry run: nothing was written."));
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.version) {
    console.log(VERSION);
    return;
  }
  if (args.help || args._.length === 0 && args.names.length === 0 && !args.all) {
    console.log(HELP);
    return;
  }

  const command = args.names[0] ?? args._[0];
  const rest = args.names.slice(1);

  if (command === "list") return cmdList(args);
  if (command === "add") return cmdAdd({ ...args, names: rest });
  if (command === "help") return console.log(HELP);

  console.error(color.red(`Unknown command: ${command}`));
  console.log(HELP);
  process.exit(1);
}

main().catch((error) => {
  console.error(color.red(String(error?.message ?? error)));
  process.exit(1);
});
