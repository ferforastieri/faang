"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

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
    <section id="faq" className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 sm:py-24">
      <div className="flex flex-col gap-10">
        <SectionHeading
          index="05"
          eyebrow="FAQ"
          title="Everything about installing and shipping"
          description="Licensing, the CLI and what the components run on. Anything else, the GitHub issues answer."
        >
          <ButtonLink href="https://github.com/ferforastieri/faang/issues" variant="secondary">
            Ask on GitHub
          </ButtonLink>
        </SectionHeading>

        {/* Questions and answers as a two-column list: nothing to open, nothing
            to miss. The accordion is still in the library, this page no longer
            needs it. */}
        <div className="flex flex-col">
          {FAQ.map((item, index) => (
            <div
              key={item.id}
              className="grid gap-1.5 border-t border-separator-border py-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] sm:gap-10"
            >
              <h3 className="flex items-baseline gap-3 text-title-3-medium text-text-primary">
                <span className="font-mono text-caption-1-regular text-accent-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.question}
              </h3>
              <p className="text-body-regular text-pretty text-text-secondary sm:pt-0.5">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  ));
}

/** The last thing on the page: a band, not a centred card. */
export function FinalCta() {
  const localize = useTemplateCopy();
  return localize((
    <section className="border-t border-separator-border bg-background-secondary-default">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto]">
        <div className="max-w-2xl">
          <h2 className="text-display-3-semibold text-balance text-text-primary">
            Start building agent interfaces
          </h2>
          <p className="mt-4 text-title-3-regular text-pretty text-text-secondary">
            A chat starter, the dashboard components and the tokens under both. Install what you
            need with one command — the code is yours.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 lg:w-[360px]">
          <InstallCommand command="npx faang@latest add --all" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/components" size="medium" className="sm:flex-1">
              Explore components
            </ButtonLink>
            <ButtonLink href="/chat" size="medium" variant="secondary" className="sm:flex-1">
              Open the chat starter
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  ));
}
