"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";

import { InstallCommand } from "@/components/application/landing/install-command";
import { SectionHeading } from "@/components/application/landing/section-heading";

const FILES = [
  {
    href: "/llms.txt",
    path: "/llms.txt",
    title: "llms.txt",
    description:
      "The one page an agent reads first: what Faang is, how to install it, the rules for generated code, and every item in one line.",
  },
  {
    href: "/docs.md",
    path: "/docs.md",
    title: "docs.md",
    description:
      "The whole library in markdown: each item with its files, its npm packages and everything it pulls in.",
  },
  {
    href: "/r/index.json",
    path: "/r/index.json",
    title: "registry",
    description:
      "The machine-readable index the CLI reads — one JSON per item, source inline, dependencies declared.",
  },
];

/** Section 06: the files that let an agent install this without reading the page. */
export function AgentSection() {
  const localize = useTemplateCopy();
  return localize((
    <section className="border-t border-separator-border">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          index="06"
          eyebrow="For agents"
          title="Docs your agent reads first"
          description="Three files describe the library in the shape a model can use — no scraping, no guessing which package a component needs."
        >
          <div className="w-full max-w-sm">
            <InstallCommand command="npx faang@latest add --all" />
          </div>
        </SectionHeading>

        <ul className="flex flex-col">
          {FILES.map((file) => (
            <li key={file.path}>
              <a
                href={file.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-6 border-b border-separator-border py-6 first:pt-0"
              >
                <span className="flex min-w-0 flex-col gap-1.5">
                  <span className="font-mono text-body-2-medium text-accent-600">{file.path}</span>
                  <span className="text-body-regular text-pretty text-text-secondary">
                    {file.description}
                  </span>
                </span>
                <RiArrowRightLine
                  aria-hidden
                  className="mt-1 size-4 shrink-0 text-foreground-icon-quaternary transition-colors duration-150 ease group-hover:text-foreground-icon-primary"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  ));
}
