"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowLeftLine } from "@remixicon/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { InstallCommand } from "@/components/application/landing/install-command";
import type { DocSummary } from "@/components/application/docs/docs-index-view";

export type DocDetail = DocSummary;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-caption-1-semibold tracking-[0.1em] text-text-tertiary uppercase">{title}</h2>
      {children}
    </section>
  );
}

/** One registry item: what it is, how to install it, what it writes. */
export function DocItemView({ item }: { item: DocDetail }) {
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

  return localize((
    <article className="mx-auto flex w-full max-w-[900px] flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20">
      <header className="flex flex-col gap-4">
        <Link
          href="/docs"
          className="flex w-fit items-center gap-1.5 text-body-2-medium text-text-tertiary transition-colors duration-150 ease hover:text-text-primary"
        >
          <RiArrowLeftLine className="size-4" aria-hidden />
          Documentation
        </Link>
        <h1 className="text-display-3-semibold text-balance text-text-primary">{item.title}</h1>
        <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">
          {item.description}
        </p>
        <div className="mt-2 w-full max-w-md">
          <InstallCommand command={`npx faang@latest add ${item.name}`} />
        </div>
      </header>

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
  ));
}
