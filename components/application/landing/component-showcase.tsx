"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { FREE_COMPONENT_PREVIEWS, FREE_PREVIEW_OPTIONS, TEMPLATE_CARD } from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
import { ShowcaseCard } from "@/components/application/docs/showcase-card";
import { SectionHeading } from "@/components/application/landing/section-heading";
import { InstallCommand } from "@/components/application/landing/install-command";
import { ButtonLink } from "@/components/base/buttons/button";

const SITE = "https://www.faang.com";

/**
 * The wall of live components. Every card is the component itself, not a
 * picture: the same previews the catalogue renders, at the same sizes.
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
    href: "/components/file-upload",
    title: "File upload",
    description: "Drag, validate and track upload progress.",
  },
  {
    href: "/components/revenue-chart-card",
    title: "Revenue chart",
    description: "This year against last, with a count-up headline.",
  },
  {
    href: "/components/orders-chart-card",
    title: "Orders chart",
    description: "Monthly bars, this year beside last year for every month.",
  },
  {
    href: "/components/settings-modal",
    title: "Settings modal",
    description: "Multi-page settings in a controlled dialog.",
  },
];

export function ComponentShowcase({ total }: { total: number }) {
  const localize = useTemplateCopy();
  return localize((
    <section id="components" className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
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

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {SHOWCASE.map((item) => {
            const Preview = FREE_COMPONENT_PREVIEWS[item.href];
            if (!Preview) return null;
            return (
              <ShowcaseCard
                key={item.href}
                external
                href={`${SITE}${item.href}`}
                title={item.title}
                description={item.description}
                {...(FREE_PREVIEW_OPTIONS[item.href] ?? {})}
              >
                <Preview />
              </ShowcaseCard>
            );
          })}
        </div>
      </div>
    </section>
  ));
}

/** The chat starter, framed wide: one complete screen rather than a component. */
export function TemplateShowcase() {
  const localize = useTemplateCopy();
  const Preview = FREE_COMPONENT_PREVIEWS["/components/chat-starter"];
  if (!Preview) return null;
  return localize((
    <section id="templates" className="mx-auto w-full max-w-[1200px] px-4 pb-20 sm:px-6 sm:pb-28">
      <div className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Templates"
          title="A whole screen, not just the parts"
          description="The chat starter wires the sidebar, the transcript, the composer and a streaming endpoint together. Bring one model key and it answers."
        >
          <ButtonLink href="/chat" trailingIcon={undefined} variant="secondary">
            Open the chat
          </ButtonLink>
        </SectionHeading>

        <ShowcaseCard
          external
          href={`${SITE}/components/chat-starter`}
          title="Chat starter"
          description="Sidebar, streaming replies, thinking indicator, a composer pill with stop control, and a history rail with local threads."
          {...TEMPLATE_CARD}
        >
          <Preview />
        </ShowcaseCard>
      </div>
    </section>
  ));
}
