#!/usr/bin/env node
/**
 * faang — install Faang UI in a project.
 *
 *   npx faang list
 *   npx faang add button
 *   npx faang add button chip --cwd ./apps/site
 *   npx faang init --write
 *
 * The library ships on npm as `faang-ui`. This CLI resolves the component
 * names, installs the package with the project's own package manager and
 * prints the exact imports; `init` wires the stylesheet into the root layout.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const VERSION = "0.2.0";
const PACKAGE = "faang-ui";
const ITEMS = JSON.parse(readFileSync(new URL("./components.json", import.meta.url), "utf8")).items;

const color =
  process.env.NO_COLOR || !process.stdout.isTTY
    ? { dim: (s) => s, bold: (s) => s, green: (s) => s, red: (s) => s, cyan: (s) => s }
    : {
        dim: (s) => `\u001b[2m${s}\u001b[0m`,
        bold: (s) => `\u001b[1m${s}\u001b[0m`,
        green: (s) => `\u001b[32m${s}\u001b[0m`,
        red: (s) => `\u001b[31m${s}\u001b[0m`,
        cyan: (s) => `\u001b[36m${s}\u001b[0m`,
      };

const HELP = `
  faang v${VERSION} — add Faang UI to your project

  Usage
    faang list                     every component and its import
    faang add <name...>            install faang-ui and print the imports
    faang add --all                install the whole library
    faang init                     wire the stylesheet into the root layout
    faang init --write             do it (otherwise only prints the line)

  Options
    --cwd <dir>         project to work in (default: current directory)
    --write             init: edit the layout file
    --dry-run           print the plan without installing or writing
    --json              machine-readable output for \`list\`
    -h, --help          this text
    -v, --version       the version

  The library
    npm i faang-ui
    import "faang-ui/styles.css";
    import { Button } from "faang-ui/components/Button";
`;

function parseArgs(argv) {
  const args = { _: [], names: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    switch (arg) {
      case "--cwd":
        args.cwd = argv[++i];
        break;
      case "--write":
        args.write = true;
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
        args._.push(arg);
        if (args._.length > 1) args.names.push(arg);
    }
  }
  return args;
}

function resolveName(term) {
  const wanted = term.toLowerCase().replace(/^faang-ui\//, "").replace(/^components\//, "");
  return ITEMS.find((item) => item.name.toLowerCase() === wanted) ?? ITEMS.find((item) => item.path.toLowerCase() === wanted);
}

function packageManager(cwd) {
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb"))) return "bun";
  if (existsSync(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(cwd, "yarn.lock"))) return "yarn";
  return "npm";
}

function hasPackage(cwd) {
  for (const file of ["package.json"]) {
    const path = join(cwd, file);
    if (!existsSync(path)) continue;
    const pkg = JSON.parse(readFileSync(path, "utf8"));
    if (pkg.dependencies?.[PACKAGE] || pkg.devDependencies?.[PACKAGE]) return true;
  }
  return false;
}

function install(cwd, dryRun) {
  if (hasPackage(cwd)) {
    console.log(color.dim(`  ${PACKAGE} is already in package.json`));
    return true;
  }

  const pm = packageManager(cwd);
  const command = pm === "npm" ? ["npm", ["install", PACKAGE]] : [pm, ["add", PACKAGE]];
  const line = `${command[0]} ${command[1].join(" ")}`;

  if (dryRun) {
    console.log(color.dim(`  would run ${line}`));
    return true;
  }

  console.log(color.dim(`  ${line}`));
  const result = spawnSync(command[0], command[1], { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (result.status !== 0) {
    console.error(color.red(`Could not install ${PACKAGE}. Run it yourself: ${line}`));
    return false;
  }
  return true;
}

function cmdList(args) {
  if (args.json) {
    console.log(JSON.stringify(ITEMS.map(({ name, path }) => ({ name, import: `${PACKAGE}/${path}` })), null, 2));
    return;
  }
  const width = Math.max(...ITEMS.map((item) => item.name.length));
  for (const item of ITEMS) {
    console.log(`  ${item.name.padEnd(width)}  ${color.dim(`${PACKAGE}/${item.path}`)}`);
  }
  console.log(color.dim(`\n  ${ITEMS.length} components — ${PACKAGE}`));
}

function cmdAdd(args) {
  if (!args.all && args.names.length === 0) {
    console.error(color.red("Name at least one component, or pass --all."));
    console.error(color.dim("faang list"));
    process.exit(1);
  }

  const cwd = resolve(args.cwd ?? ".");
  const wanted = args.all
    ? ITEMS
    : args.names.map((name) => {
        const item = resolveName(name);
        if (!item) {
          console.error(color.red(`Not in the library: ${name}`));
          process.exit(1);
        }
        return item;
      });

  if (!install(cwd, args.dryRun)) process.exit(1);

  console.log("");
  for (const item of wanted) {
    console.log(`${color.green("✔")} ${color.bold(item.name)}`);
    console.log(color.dim(`  import { ${item.name} } from "${PACKAGE}/${item.path}";`));
  }
  console.log("");
  console.log(color.dim(`  the stylesheet is imported once, in the root layout:`));
  console.log(color.dim(`  import "${PACKAGE}/styles.css";`));
  console.log(color.dim(`  (faang init${args.dryRun ? "" : " --write"})`));
}

function cmdInit(args) {
  const cwd = resolve(args.cwd ?? ".");
  const candidates = [
    "app/layout.tsx",
    "src/app/layout.tsx",
    "app/layout.jsx",
    "src/app/layout.jsx",
  ];
  const layout = candidates.map((file) => join(cwd, file)).find((file) => existsSync(file));
  const line = `import "${PACKAGE}/styles.css";`;

  if (!install(cwd, args.dryRun)) process.exit(1);

  console.log("");
  if (!layout) {
    console.log(color.red("No App Router layout found (app/layout.tsx)."));
    console.log(color.dim(`Add the line yourself: ${line}`));
    return;
  }

  const source = readFileSync(layout, "utf8");
  if (source.includes(`${PACKAGE}/styles.css`)) {
    console.log(color.green("✔") + ` ${layout} already imports the stylesheet`);
    return;
  }

  if (!args.write || args.dryRun) {
    console.log(color.dim(`${layout} — add:`));
    console.log(`  ${line}`);
    console.log(color.dim(args.dryRun ? "\n  dry run: the file was not touched" : "\n  rerun with --write to edit the file"));
    return;
  }

  const lines = source.split("\n");
  let last = -1;
  lines.forEach((text, index) => {
    if (/^\s*import\s/.test(text)) last = index;
  });
  lines.splice(last + 1, 0, line);
  writeFileSync(layout, lines.join("\n"), "utf8");
  console.log(color.green("✔") + ` ${layout}`);
  console.log(color.dim(`  added ${line}`));
}

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(HELP);
  process.exit(0);
}
if (args.version) {
  console.log(VERSION);
  process.exit(0);
}

const command = args._[0];
if (command === "list") cmdList(args);
else if (command === "add") cmdAdd(args);
else if (command === "init") cmdInit(args);
else {
  console.log(HELP);
  process.exit(command ? 1 : 0);
}
