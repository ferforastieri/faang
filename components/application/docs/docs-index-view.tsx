"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

import { DocsShell } from "@/components/application/docs/docs-sidebar";
import { InstallCommand } from "@/components/application/landing/install-command";

export type DocSummary = {
  name: string;
  title: string;
  type: string;
  description: string;
  files: { path: string }[];
  dependencies: string[];
  registryDependencies: string[];
};

const GROUP_LABEL: Record<string, string> = {
  "registry:ui": "Base components",
  "registry:block": "Blocks",
  "registry:lib": "Utilities and hooks",
  "registry:style": "Styles",
  "registry:file": "Files",
};

const GROUP_ORDER = ["registry:ui", "registry:block", "registry:lib", "registry:style", "registry:file"];

/** The documentation index: every item in the registry, grouped by what it is. */
export function DocsIndexView({ items }: { items: DocSummary[] }) {
  const localize = useTemplateCopy();
  const groups = GROUP_ORDER.map((type) => ({
    type,
    label: GROUP_LABEL[type] ?? type,
    items: items.filter((item) => item.type === type),
  })).filter((group) => group.items.length > 0);

  return localize((
    <DocsShell items={items}>
    <div className="flex flex-col gap-12">
      <header className="flex flex-col gap-4">
        <p className="flex items-center gap-3 font-mono text-caption-1-medium tracking-[0.14em] text-text-tertiary uppercase">
          <span className="h-px w-8 bg-accent-500" aria-hidden />
          Documentation
        </p>
        <h1 className="text-display-3-semibold text-balance text-text-primary">
          {`${items.length} things you can install`}
        </h1>
        <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">
          Every item in the registry, with the files it writes, the packages it needs and what it
          pulls in. Open one for its source and the command that installs it.
        </p>
        <div className="mt-2 flex w-full max-w-md flex-col gap-3">
          <InstallCommand command="npx faang@latest add --all" />
        </div>
      </header>

      {groups.map((group) => (
        <section key={group.type} className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-2-medium text-text-primary">{group.label}</h2>
            <span className="text-body-medium text-text-tertiary">{group.items.length}</span>
          </div>
          <ul className="grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {group.items.map((item) => (
              <li key={item.name}>
                <Link
                  href={`/docs/${item.name}`}
                  className="group flex items-start justify-between gap-4 border-b border-separator-border py-3"
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="text-body-medium text-text-primary">{item.title}</span>
                    <span className="truncate text-body-2-regular text-text-tertiary">
                      {item.description}
                    </span>
                  </span>
                  <RiArrowRightLine
                    aria-hidden
                    className="mt-1 size-4 shrink-0 text-foreground-icon-quaternary transition-colors duration-150 ease group-hover:text-foreground-icon-primary"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
    </DocsShell>
  ));
}
