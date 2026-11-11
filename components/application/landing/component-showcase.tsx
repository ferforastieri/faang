"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine } from "@remixicon/react";
import { useState } from "react";

import { FREE_COMPONENT_PREVIEWS } from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
import { InstallCommand } from "@/components/application/landing/install-command";
import { SectionHeading } from "@/components/application/landing/section-heading";
import { ButtonLink } from "@/components/base/buttons/button";
import { docSlug } from "@/utils/slug";
import { cx } from "@/utils/cx";

/**
 * The showcase is a chooser, not a wall: a list of names on the left and one
 * large live preview on the right. Pointing at a name swaps what is rendered,
 * so a visitor sees a component at a useful size instead of twelve thumbnails
 * at a useless one.
 */
const SHOWCASE: { href: PreviewHref; title: string; description: string }[] = [
  {
    href: "/components/data-table",
    title: "Data table",
    description: "Filter, sort and paginate complex data in a responsive table.",
  },
  {
    href: "/components/sidebar",
    title: "Sidebar",
    description: "Navigation with search, badges and account controls.",
  },
  {
    href: "/components/agent-thinking",
    title: "Agent thinking",
    description: "Reasoning, search and writing indicators for a working agent.",
  },
  {
    href: "/components/composer-loader",
    title: "Composer loader",
    description: "A light orbiting the composer while the agent works.",
  },
  {
    href: "/components/stat-cards",
    title: "Stat cards",
    description: "KPI cards with delta chips and a footer band.",
  },
  {
    href: "/components/notification-center",
    title: "Notification center",
    description: "Grouped activity inbox with tabs, unread state and actions.",
  },
  {
    href: "/components/auth-card",
    title: "Auth card",
    description: "Sign-in and sign-up with providers, inline or stacked.",
  },
  {
    href: "/components/date-picker",
    title: "Date picker",
    description: "Popover calendar, and a meeting scheduler in the same chrome.",
  },
  {
    href: "/components/orders-chart-card",
    title: "Orders chart",
    description: "Monthly bars, this year beside last year for every month.",
  },
];

export function ComponentShowcase({ total }: { total: number }) {
  const localize = useTemplateCopy();
  const [activeHref, setActiveHref] = useState<PreviewHref>(SHOWCASE[0].href);
  const active = SHOWCASE.find((item) => item.href === activeHref) ?? SHOWCASE[0];
  const Preview = FREE_COMPONENT_PREVIEWS[activeHref];

  return localize((
    <section id="components" className="w-full px-3 py-20 sm:py-24">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="01"
            eyebrow="Install"
            title="A pile of interactive dashboard components"
            description={`Components for agent products, forms, calendars and meeting scheduling — ${total} in all, shipped as source you own.`}
          />
          <div className="flex w-full max-w-xs flex-col gap-3">
            <InstallCommand command="npx faang@latest add data-table" />
            <ButtonLink href="/components" variant="secondary" className="w-full">
              See every component
            </ButtonLink>
          </div>
        </div>

        {/* Three columns: the names, the component at its own size, and what
            it is. Reading down the list keeps the preview in place, so the
            page does not jump while you look. */}
        <div className="grid gap-8 border-t border-separator-border pt-8 lg:grid-cols-[minmax(0,260px)_360px_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col">
            {SHOWCASE.map((item) => {
              const selected = item.href === activeHref;
              return (
                <button
                  key={item.href}
                  type="button"
                  onMouseEnter={() => setActiveHref(item.href)}
                  onFocus={() => setActiveHref(item.href)}
                  onClick={() => setActiveHref(item.href)}
                  aria-pressed={selected}
                  className={cx(
                    "group flex cursor-pointer items-baseline justify-between gap-3 border-b border-separator-border py-3 text-start",
                    "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
                  )}
                >
                  <span
                    className={cx(
                      "text-body-medium transition-colors duration-150 ease",
                      selected ? "text-accent-600" : "text-text-secondary group-hover:text-text-primary",
                    )}
                  >
                    {item.title}
                  </span>
                  <RiArrowRightLine
                    aria-hidden
                    className={cx(
                      "size-4 shrink-0 transition-opacity duration-150 ease",
                      selected ? "opacity-100 text-accent-600" : "opacity-0 text-foreground-icon-quaternary",
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default">
            {Preview ? <Preview /> : null}
          </div>

          <div className="flex flex-col gap-4 lg:pt-1">
            <h3 className="text-title-2-medium text-text-primary">{active.title}</h3>
            <p className="max-w-sm text-body-regular text-pretty text-text-secondary">
              {active.description}
            </p>
            <a
              href={`/docs/${docSlug(active.href)}`}
              className="inline-flex w-fit items-center gap-1.5 text-body-2-medium text-accent-600 hover:text-accent-700"
            >
              Open docs
              <RiArrowRightLine className="size-4" aria-hidden />
            </a>
            <div className="mt-2 w-full max-w-xs">
              <InstallCommand command={`npx faang@latest add ${docSlug(active.href)}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  ));
}

/** The chat starter, wide, inside a browser frame rather than a plain card. */
export function TemplateShowcase() {
  const localize = useTemplateCopy();
  const Preview = FREE_COMPONENT_PREVIEWS["/components/chat-starter"];
  if (!Preview) return null;
  return localize((
    <section id="templates" className="w-full px-3 pb-20 sm:pb-24">
      <div className="flex flex-col gap-8">
        <SectionHeading
          index="02"
          eyebrow="Screens"
          title="A whole screen, not just the parts"
          description="The chat starter wires the sidebar, the transcript, the composer and a streaming endpoint together. The model is the Worker's own binding, so there is no key to add."
        >
          <ButtonLink href="/chat" variant="secondary">
            Open the chat
          </ButtonLink>
        </SectionHeading>

        <div className="overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default">
          <div className="flex items-center gap-2 border-b border-separator-border px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
            <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
            <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
            <span className="ms-2 font-mono text-caption-1-regular text-text-tertiary">
              faang.fer.tec.br/chat
            </span>
          </div>
          <div className="relative h-[560px]">
            <Preview />
          </div>
        </div>
      </div>
    </section>
  ));
}
