"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { FREE_COMPONENT_PREVIEWS } from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
import type { DocSummary } from "@/components/application/docs/docs-index-view";
import { InstallCommand } from "@/components/application/landing/install-command";
import { cx } from "@/utils/cx";

export type DocDetail = DocSummary;

const GROUP_ORDER = ["registry:ui", "registry:block", "registry:lib", "registry:style", "registry:file"];
const GROUP_LABEL: Record<string, string> = {
  "registry:ui": "Base components",
  "registry:block": "Blocks",
  "registry:lib": "Utilities and hooks",
  "registry:style": "Styles",
  "registry:file": "Files",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-caption-1-semibold tracking-[0.1em] text-text-tertiary uppercase">{title}</h2>
      {children}
    </section>
  );
}

/**
 * One registry item, with the catalogue's index beside it: the left column is
 * how you move between components without going back, the right one is the
 * component itself (live, when there is a preview) followed by what it writes.
 */
export function DocItemView({ item, items }: { item: DocDetail; items: DocSummary[] }) {
  const localize = useTemplateCopy();
  // The source is fetched from the registry's static asset, not bundled: the
  // whole library inlined here cost 1.1 MB of Worker memory and every request
  // hit Cloudflare's CPU limit.
  const [source, setSource] = useState<{ path: string; content: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/r/${item.name}.json`)
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { files?: { path: string; content?: string }[] } | null) => {
        const first = data?.files?.[0];
        if (!cancelled && first?.content) setSource({ path: first.path, content: first.content });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [item.name]);

  const Preview = FREE_COMPONENT_PREVIEWS[`/components/${item.name}` as PreviewHref];
  const groups = GROUP_ORDER.map((type) => ({
    type,
    label: GROUP_LABEL[type] ?? type,
    entries: items.filter((entry) => entry.type === type),
  })).filter((group) => group.entries.length > 0);

  return localize((
    <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[240px_1fr] lg:gap-14">
      <nav aria-label="Documentation" className="flex flex-col gap-3 lg:sticky lg:top-24 lg:max-h-[calc(100dvh-8rem)] lg:self-start lg:overflow-y-auto">
        <Link
          href="/docs"
          className="flex w-fit items-center gap-1.5 text-body-2-medium text-text-tertiary transition-colors duration-150 ease hover:text-text-primary"
        >
          <RiArrowLeftLine className="size-4" aria-hidden />
          Documentation
        </Link>
        {groups.map((group) => (
          <div key={group.type} className="flex flex-col">
            <p className="pb-1 font-mono text-caption-1-regular tracking-[0.1em] text-text-tertiary uppercase">
              {group.label}
            </p>
            <ul className="flex flex-col">
              {group.entries.map((entry) => {
                const current = entry.name === item.name;
                return (
                  <li key={entry.name}>
                    <Link
                      href={`/docs/${entry.name}`}
                      aria-current={current ? "page" : undefined}
                      className={cx(
                        "block border-b border-separator-border py-1.5 text-body-2-regular transition-colors duration-150 ease",
                        current ? "text-accent-600" : "text-text-secondary hover:text-text-primary",
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
      </nav>

      <article className="flex min-w-0 flex-col gap-10">
        <header className="flex flex-col gap-4">
          <h1 className="text-display-3-semibold text-balance text-text-primary">{item.title}</h1>
          <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">{item.description}</p>
          <div className="mt-1 w-full max-w-md">
            <InstallCommand command={`npx faang@latest add ${item.name}`} />
          </div>
        </header>

        {Preview ? (
          <div className="relative h-[360px] overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default">
            <Preview />
          </div>
        ) : null}

        <div className="grid gap-10 sm:grid-cols-2">
          <Section title="Files it writes">
            <ul className="flex flex-col gap-1.5">
              {item.files.map((file) => (
                <li key={file.path} className="font-mono text-body-2-regular break-all text-text-secondary">
                  {file.path}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="npm packages">
            {item.dependencies.length > 0 ? (
              <ul className="flex flex-col gap-1.5">
                {item.dependencies.map((dependency) => (
                  <li key={dependency} className="font-mono text-body-2-regular text-text-secondary">
                    {dependency}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-body-2-regular text-text-tertiary">None.</p>
            )}
          </Section>
        </div>

        {item.registryDependencies.length > 0 ? (
          <Section title="Pulls in">
            <div className="flex flex-wrap gap-2">
              {item.registryDependencies.map((dependency) => (
                <Link
                  key={dependency}
                  href={`/docs/${dependency}`}
                  className="rounded-full border border-border-button-default px-2.5 py-1 font-mono text-body-2-regular text-text-secondary transition-colors duration-150 ease hover:border-border-button-hover hover:text-text-primary"
                >
                  {dependency}
                </Link>
              ))}
            </div>
          </Section>
        ) : null}

        <Section title={source?.path ?? "Source"}>
          <div className="overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default">
            <pre className="max-h-[520px] overflow-auto p-4 font-mono text-body-2-regular leading-6 text-text-secondary">
              <code>{source?.content ?? "…"}</code>
            </pre>
          </div>
        </Section>
      </article>
    </div>
  ));
}
