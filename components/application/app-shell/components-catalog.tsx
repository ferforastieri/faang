"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";

import { COMPONENT_SECTIONS, type Entry } from "@/components/application/docs/components-index";
import {
  FREE_COMPONENT_PREVIEWS,
  FREE_PREVIEW_OPTIONS,
  TEMPLATE_CARD,
} from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
import { ShowcaseCard } from "@/components/application/docs/showcase-card";
import { cx } from "@/utils/cx";

const SITE = "https://www.faang.com";

/**
 * The faang.com components index, as the starter shows it: the same
 * sections, names and descriptions, every card opening its docs page on the
 * site in a new tab. Each component renders its live preview, because every
 * component in the catalogue ships in this repository as source.
 */
export function ComponentsCatalog() {
  const localize = useTemplateCopy();
  const total = COMPONENT_SECTIONS.reduce((sum, section) => sum + section.entries.length, 0);
  return localize((
    // The shell's column is narrowed to 964px for this page (two 472px
    // template cards and a gap), so the heading and every grid share one edge.
    <div className="flex w-full flex-col gap-10">
      <p className="max-w-2xl text-body-regular text-text-secondary">
        {`Every component, block, chart and template in Faang, ${total} in all, and every one of them is already in this project as source. Each card opens its docs on faang.com, with the install command and the props.`}
      </p>
      {COMPONENT_SECTIONS.map((section) => (
        <section key={section.title} id={section.title.toLowerCase()} className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-title-2-medium text-text-primary">{section.title}</h2>
            <span className="text-body-medium text-text-tertiary">{section.entries.length}</span>
            <span className="hidden text-body-regular text-text-tertiary sm:inline">{section.blurb}</span>
          </div>
          <div
            className={cx(
              "grid w-full grid-cols-1 gap-x-5 gap-y-3 sm:gap-5",
              section.wide ? "xl:grid-cols-[repeat(2,472px)]" : "sm:grid-cols-2 xl:grid-cols-[repeat(3,304px)]",
            )}
          >
            {section.entries.filter(hasPreview).map((entry) => (
              <PreviewCard key={entry.name} entry={entry} />
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {section.entries.filter((entry) => !hasPreview(entry)).map((entry) => (
              <CatalogCard key={entry.name} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ));
}

const hasPreview = (entry: Entry) => Boolean(FREE_COMPONENT_PREVIEWS[entry.href as PreviewHref]);

/** A shipped component, rendered live in the same frame the site uses. */
function PreviewCard({ entry }: { entry: Entry }) {
  const localize = useTemplateCopy();
  const Preview = FREE_COMPONENT_PREVIEWS[entry.href as PreviewHref];
  if (!Preview) return null;
  return localize((
    <ShowcaseCard
      external
      href={`${SITE}${entry.href}`}
      title={entry.name}
      description={entry.description}
      {...(FREE_PREVIEW_OPTIONS[entry.href] ?? {})}
      {...(entry.href === "/components/chat-starter" ? TEMPLATE_CARD : {})}
    >
      <Preview />
    </ShowcaseCard>
  ));
}

function CatalogCard({ entry }: { entry: Entry }) {
  const localize = useTemplateCopy();
  return localize((
    <a
      href={`${SITE}${entry.href}`}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "group relative flex flex-col gap-1 rounded-2lg border border-border-button-default bg-background-primary-default p-4",
        "transition-[background-color,box-shadow] duration-150 ease",
        "hover:bg-background-primary-hover hover:shadow-xs",
        "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2",
      )}
    >
      <div className="flex items-center gap-2">
        {entry.icon && (
          <entry.icon className="size-[18px] shrink-0 text-foreground-icon-secondary" aria-hidden />
        )}
        <span className="text-body-medium text-text-primary">{entry.name}</span>
        {entry.isNew && <Tag tone="new">New</Tag>}
      </div>
      <span className="text-body-regular text-text-secondary">{entry.description}</span>
      <RiArrowRightLine
        aria-hidden
        className={cx(
          "absolute top-4 end-4 size-4 text-foreground-icon-secondary",
          "-translate-x-1 opacity-0 transition-[opacity,translate] duration-150 ease",
          "group-hover:translate-x-0 group-hover:opacity-100",
        )}
      />
    </a>
  ));
}

/** The docs index's small uppercase tags, as they are drawn on the site. */
function Tag({ tone = "neutral", children }: { tone?: "neutral" | "new"; children: string }) {
  const localize = useTemplateCopy();
  return localize((
    <span
      className={cx(
        "inline-flex items-center rounded-sm px-1 py-px text-[10px] leading-4 font-semibold tracking-wide uppercase",
        tone === "new"
          ? "bg-badge-new-background text-badge-new-text"
          : "bg-background-tertiary-default text-text-secondary",
      )}
    >
      {children}
    </span>
  ));
}

