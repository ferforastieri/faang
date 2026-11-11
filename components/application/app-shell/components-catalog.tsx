"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";
import { useState } from "react";

import { COMPONENT_SECTIONS, type Entry } from "@/components/application/docs/components-index";
import { docSlug } from "@/utils/slug";
import { cx } from "@/utils/cx";

/**
 * The catalogue as an index, not a gallery.
 *
 * A sticky contents column on the left, and on the right the items as compact
 * rows grouped by what they are — name, one line of what it does, arrow into
 * its docs. No previews here: the previews live on the landing's showcase and
 * on each item's own page, which keeps this page fast and unlike the card wall
 * every other library ships.
 */
export function ComponentsCatalog() {
  const localize = useTemplateCopy();
  const total = COMPONENT_SECTIONS.reduce((sum, section) => sum + section.entries.length, 0);
  const [query, setQuery] = useState("");
  const term = query.trim().toLocaleLowerCase();

  const matches = (entry: Entry) =>
    !term || entry.name.toLocaleLowerCase().includes(term) || entry.description.toLocaleLowerCase().includes(term);

  return localize((
    <div className="grid w-full gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
      <nav aria-label="Catalogue" className="flex flex-col gap-2 lg:sticky lg:top-24 lg:self-start">
        <label className="flex h-9 items-center gap-2 rounded-lg border border-border-button-default bg-background-secondary-default px-3">
          <span className="sr-only">Filter the catalogue</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter…"
            className="w-full bg-transparent text-body-2-regular text-text-primary outline-none placeholder:text-text-placeholder"
          />
        </label>
        <ul className="mt-2 flex flex-col">
          {COMPONENT_SECTIONS.map((section) => (
            <li key={section.title}>
              <a
                href={`#${section.title.toLowerCase()}`}
                className="flex items-baseline justify-between gap-2 border-b border-separator-border py-2 text-body-2-medium text-text-secondary transition-colors duration-150 ease hover:text-text-primary"
              >
                {section.title}
                <span className="font-mono text-caption-1-regular text-text-tertiary">
                  {section.entries.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-caption-1-regular text-text-tertiary">{`${total} items in total`}</p>
      </nav>

      <div className="flex min-w-0 flex-col gap-14">
        {COMPONENT_SECTIONS.map((section) => {
          const entries = section.entries.filter(matches);
          if (entries.length === 0) return null;
          return (
            <section key={section.title} id={section.title.toLowerCase()} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-title-2-medium text-text-primary">{section.title}</h2>
                <p className="text-body-regular text-text-tertiary">{section.blurb}</p>
              </div>
              <ul className="flex flex-col">
                {entries.map((entry) => (
                  <li key={entry.name}>
                    <CatalogRow entry={entry} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
        {COMPONENT_SECTIONS.every((section) => section.entries.filter(matches).length === 0) ? (
          <p className="text-body-regular text-text-tertiary">Nothing matches that.</p>
        ) : null}
      </div>
    </div>
  ));
}

function CatalogRow({ entry }: { entry: Entry }) {
  const localize = useTemplateCopy();
  return localize((
    <a
      href={`/docs/${docSlug(entry.href)}`}
      className={cx(
        "group grid grid-cols-[1fr_auto] items-baseline gap-x-4 gap-y-0.5 border-t border-separator-border py-3",
        "sm:grid-cols-[minmax(0,220px)_1fr_auto]",
      )}
    >
      <span className="flex items-center gap-2 text-body-medium text-text-primary">
        {entry.icon ? (
          <entry.icon className="size-4 shrink-0 text-foreground-icon-secondary" aria-hidden />
        ) : null}
        {entry.name}
        {entry.isNew ? (
          <span className="rounded-sm bg-badge-new-background px-1 py-px text-[10px] leading-4 font-semibold tracking-wide text-badge-new-text uppercase">
            New
          </span>
        ) : null}
      </span>
      <span className="col-span-2 text-body-2-regular text-text-secondary sm:col-span-1">{entry.description}</span>
      <RiArrowRightLine
        aria-hidden
        className="size-4 shrink-0 text-foreground-icon-quaternary transition-colors duration-150 ease group-hover:text-foreground-icon-primary"
      />
    </a>
  ));
}
