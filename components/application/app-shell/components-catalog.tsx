"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";

import { COMPONENT_SECTIONS, type Entry } from "@/components/application/docs/components-index";
import {
  FREE_COMPONENT_PREVIEWS,
  FREE_PREVIEW_OPTIONS,
  TEMPLATE_CARD,
  TemplateFrame,
} from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
import { docSlug } from "@/utils/slug";
import { cx } from "@/utils/cx";

/**
 * The catalogue: a documentation index, not a wall of cards.
 *
 * Each entry is a bare preview frame with its caption underneath, laid out on
 * the same fluid grid the section headings sit on — so the column runs to the
 * edge of the page instead of leaving a strip of nothing on the right. Rows
 * without a preview fall into a compact list, which is what they are.
 */
export function ComponentsCatalog() {
  const localize = useTemplateCopy();
  const total = COMPONENT_SECTIONS.reduce((sum, section) => sum + section.entries.length, 0);

  return localize((
    <div className="flex w-full flex-col gap-16">
      <p className="max-w-2xl text-body-regular text-text-secondary">
        {`Every component, block, chart and template in Faang, ${total} in all, and every one of them is already in this project as source. Each item opens its docs, with the install command and the files it writes.`}
      </p>
      {COMPONENT_SECTIONS.map((section) => {
        const previews = section.entries.filter(hasPreview);
        const plain = section.entries.filter((entry) => !hasPreview(entry));
        return (
          <section key={section.title} id={section.title.toLowerCase()} className="flex flex-col gap-6">
            <div className="flex items-baseline gap-2 border-b border-separator-border pb-3">
              <h2 className="text-title-2-medium text-text-primary">{section.title}</h2>
              <span className="text-body-medium text-text-tertiary">{section.entries.length}</span>
              <span className="hidden text-body-regular text-text-tertiary sm:inline">{section.blurb}</span>
            </div>

            {previews.length > 0 ? (
              <div className="grid w-full grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {previews.map((entry) => (
                  <PreviewTile key={entry.name} entry={entry} wide={section.wide} />
                ))}
              </div>
            ) : null}

            {plain.length > 0 ? (
              <ul className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
                {plain.map((entry) => (
                  <li key={entry.name}>
                    <CatalogRow entry={entry} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  ));
}

const hasPreview = (entry: Entry) => Boolean(FREE_COMPONENT_PREVIEWS[entry.href as PreviewHref]);

function PreviewTile({ entry, wide = false }: { entry: Entry; wide?: boolean }) {
  const localize = useTemplateCopy();
  const Preview = FREE_COMPONENT_PREVIEWS[entry.href as PreviewHref];
  if (!Preview) return null;
  const template = entry.href === "/components/chat-starter";
  return localize((
    <div className="group flex flex-col gap-3">
      {/* The preview is a picture of the component: its own links would nest
          inside this tile's link, and would navigate to routes of a sample app
          that does not exist here. */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none relative overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default",
          "transition-colors duration-150 ease group-hover:border-border-button-hover",
          template ? "h-[260px]" : "h-[220px]",
        )}
      >
        <Preview />
        <div className="absolute inset-x-0 bottom-0 h-14 bg-linear-to-b from-transparent to-background-secondary-default" />
      </div>
      <a href={`/docs/${docSlug(entry.href)}`} className="flex items-start justify-between gap-3">
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="flex items-center gap-2 text-body-medium text-text-primary">
            {entry.name}
            {entry.isNew ? <Tag>New</Tag> : null}
          </span>
          <span className="line-clamp-2 text-body-2-regular text-pretty text-text-secondary">
            {entry.description}
          </span>
        </span>
        <RiArrowRightLine
          aria-hidden
          className="mt-1 size-4 shrink-0 text-foreground-icon-quaternary transition-colors duration-150 ease group-hover:text-foreground-icon-primary"
        />
      </a>
    </div>
  ));
}

/** No preview to show: a documented row is more honest than an empty frame. */
function CatalogRow({ entry }: { entry: Entry }) {
  const localize = useTemplateCopy();
  const template = entry.href === "/components/chat-starter";
  return localize((
    <a
      href={`/docs/${docSlug(entry.href)}`}
      className="group flex items-start justify-between gap-4 border-b border-separator-border py-3"
    >
      <span className="flex min-w-0 items-baseline gap-2">
        {entry.icon ? (
          <entry.icon className="size-4 shrink-0 text-foreground-icon-secondary" aria-hidden />
        ) : null}
        <span className="text-body-medium whitespace-nowrap text-text-primary">{entry.name}</span>
        <span className="truncate text-body-2-regular text-text-tertiary">{entry.description}</span>
      </span>
      <RiArrowRightLine
        aria-hidden
        className="mt-1 size-4 shrink-0 text-foreground-icon-quaternary transition-colors duration-150 ease group-hover:text-foreground-icon-primary"
      />
    </a>
  ));
}

function Tag({ children }: { children: string }) {
  const localize = useTemplateCopy();
  return localize((
    <span className="inline-flex items-center rounded-sm bg-badge-new-background px-1 py-px text-[10px] leading-4 font-semibold tracking-wide text-badge-new-text uppercase">
      {children}
    </span>
  ));
}

export { TemplateFrame, TEMPLATE_CARD };
