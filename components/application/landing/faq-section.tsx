"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { Accordion } from "@/components/base/accordion/accordion";
import { InstallCommand } from "@/components/application/landing/install-command";
import { SectionHeading } from "@/components/application/landing/section-heading";
import { ButtonLink } from "@/components/base/buttons/button";

const FAQ = [
  {
    id: "free",
    question: "Is the whole library free?",
    answer:
      "Yes. Every component, block, chart, template and token in this repository is MIT licensed and installs as source. There is no paid tier, no license key and no login.",
  },
  {
    id: "install",
    question: "How do I install a component?",
    answer:
      "With the CLI — npx faang@latest add data-table — or by asking your agent, once the MCP server is connected. Either way the files land in your project, with their dependencies, and you edit them like your own code.",
  },
  {
    id: "ownership",
    question: "Is the code mine?",
    answer:
      "It is. Components are copied into your repository, so you own the copy you ship. There is nothing to update from us unless you choose to re-run the CLI.",
  },
  {
    id: "commercial",
    question: "Can I use it in commercial and client projects?",
    answer:
      "Yes. MIT allows commercial use, modification and redistribution. Keep the license notice with the parts you redistribute.",
  },
  {
    id: "tech",
    question: "Which technologies does it use?",
    answer:
      "React 19 and Next.js on the app side, Tailwind CSS v4 for styling, React Aria Components for interaction and accessibility, TanStack Table for the data table, and Recharts behind the chart cards.",
  },
  {
    id: "dark",
    question: "Does it support dark mode?",
    answer:
      "Every component reads semantic tokens instead of raw colours, and the dark theme swaps those tokens through a class on the document root. Nothing is written twice.",
  },
  {
    id: "rtl",
    question: "Does it support right-to-left languages?",
    answer:
      "Yes. Layouts use logical properties, and DirectionProvider feeds React Aria the locale, so keyboard navigation, calendars and portalled menus follow the direction too.",
  },
];

export function FaqSection() {
  const localize = useTemplateCopy();
  return localize((
    <section id="faq" className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Everything about installing and shipping"
          description="Licensing, the CLI and what the components run on. Anything else, the GitHub issues answer."
        >
          <ButtonLink href="https://github.com/ferforastieri/faang/issues" variant="secondary">
            Ask on GitHub
          </ButtonLink>
        </SectionHeading>
        <div className="w-full">
          <Accordion items={FAQ} />
        </div>
      </div>
    </section>
  ));
}

/** The last thing on the page: one command and two ways in. */
export function FinalCta() {
  const localize = useTemplateCopy();
  return localize((
    <section className="mx-auto w-full max-w-[1200px] px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-[32px] border border-border-button-default bg-background-secondary-default px-6 py-16 sm:px-12">
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-display-3-semibold text-balance text-text-primary">
            Start building agent interfaces
          </h2>
          <p className="text-title-3-regular text-pretty text-text-secondary">
            A chat starter, the dashboard components and the tokens under both. Install what you
            need with one command — the code is yours.
          </p>
          <div className="w-full max-w-md">
            <InstallCommand command="npx faang@latest add --all" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/components" size="medium">
              Explore components
            </ButtonLink>
            <ButtonLink href="/chat" size="medium" variant="secondary">
              Open the chat starter
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  ));
}
