"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";

import type { DocSummary } from "@/components/application/docs/docs-index-view";
import { cx } from "@/utils/cx";

const GROUP_ORDER = ["registry:ui", "registry:block", "registry:lib", "registry:style", "registry:file"];
const GROUP_LABEL: Record<string, string> = {
  "registry:ui": "Base components",
  "registry:block": "Blocks",
  "registry:lib": "Utilities and hooks",
  "registry:style": "Styles",
  "registry:file": "Files",
};

/** The two token pages, which are documentation but not registry items. */
const FOUNDATIONS = [
  { name: "color", title: "Color", href: "/docs/color" },
  { name: "typography", title: "Typography", href: "/docs/typography" },
];

/**
 * The documentation's left column. It is deliberately the same measure as the
 * app's sidebar and the catalogue's contents column, so every screen in the
 * product keeps its content at the same x instead of jumping when you move
 * between them.
 */
export function DocsSidebar({ items, current }: { items: DocSummary[]; current?: string }) {
  const localize = useTemplateCopy();
  const groups = GROUP_ORDER.map((type) => ({
    type,
    label: GROUP_LABEL[type] ?? type,
    entries: items.filter((entry) => entry.type === type),
  })).filter((group) => group.entries.length > 0);

  const contents = (
    <>
      <div className="flex flex-col">
        <p className="pb-1 font-mono text-caption-1-regular tracking-[0.1em] text-text-tertiary uppercase">
          Tokens
        </p>
        <ul className="flex flex-col">
          {FOUNDATIONS.map((entry) => {
            const active = entry.name === current;
            return (
              <li key={entry.name}>
                <Link
                  href={entry.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "block border-b border-separator-border py-1.5 text-body-2-regular transition-colors duration-150 ease",
                    active ? "text-accent-600" : "text-text-secondary hover:text-text-primary",
                  )}
                >
                  {entry.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {groups.map((group) => (
        <div key={group.type} className="flex flex-col">
          <p className="pb-1 font-mono text-caption-1-regular tracking-[0.1em] text-text-tertiary uppercase">
            {group.label}
          </p>
          <ul className="flex flex-col">
            {group.entries.map((entry) => {
              const active = entry.name === current;
              return (
                <li key={entry.name}>
                  <Link
                    href={`/docs/${entry.name}`}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "block border-b border-separator-border py-1.5 text-body-2-regular transition-colors duration-150 ease",
                      active ? "text-accent-600" : "text-text-secondary hover:text-text-primary",
                    )}
                  >
                    {entry.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );

  return localize((
    <nav
      aria-label="Documentation"
      className="flex flex-col gap-3 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto"
    >
      <Link
        href="/docs"
        className="flex w-fit items-center gap-1.5 text-body-2-medium text-text-tertiary transition-colors duration-150 ease hover:text-text-primary"
      >
        <RiArrowLeftLine className="size-4" aria-hidden />
        Documentation
      </Link>

      {/* On phones the full index would push the page's own content 120 rows
          down, so it collapses into a single disclosure; from lg it is the
          sticky column. */}
      <details className="lg:hidden">
        <summary className="cursor-pointer list-none border-b border-separator-border py-1.5 text-body-2-medium text-text-primary [&::-webkit-details-marker]:hidden">
          All components
        </summary>
        <div className="flex flex-col gap-3 pt-2">{contents}</div>
      </details>
      <div className="hidden flex-col gap-3 lg:flex">{contents}</div>
    </nav>
  ));
}

/** The docs frame: the sidebar at the page's margin, the content at x=288. */
export function DocsShell({
  items,
  current,
  children,
}: {
  items: DocSummary[];
  current?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr] lg:gap-14">
      <DocsSidebar items={items} current={current} />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
