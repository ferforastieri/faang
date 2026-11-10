"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowUpLine, RiAttachment2, RiMicLine, RiStopCircleLine } from "@remixicon/react";

import { ComposerLoader } from "@/components/application/composer-loader/composer-loader";
import { InstallCommand } from "@/components/application/landing/install-command";
import { SectionHeading } from "@/components/application/landing/section-heading";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

/** A composer at rest, lit by the loader while the agent works. */
function ComposerDemo() {
  const localize = useTemplateCopy();
  return localize((
    <div className="relative mx-auto w-full max-w-[520px]">
      <ComposerLoader
        active
        radius={26}
        colors={["#ef0c0c", "#ff7a59", "#ffb3a7", "#ffe0da"]}
        speed={5}
        intensity={0.85}
        line={2}
        bloom={9}
        bloomStrength={0.28}
        className="w-full shadow-lg"
      >
        <div className="flex w-full flex-col gap-3 rounded-[26px] p-3">
          <p className="px-1 text-body-medium text-text-placeholder">
            Build a revenue dashboard with stat cards and an area chart.
          </p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              <span className="flex size-8 items-center justify-center rounded-full text-foreground-icon-secondary">
                <RiAttachment2 className="size-[18px]" aria-hidden />
              </span>
              <span className="rounded-full bg-background-secondary-default px-2.5 py-1 text-body-2-medium text-text-secondary">
                Model 2.5
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="flex size-8 items-center justify-center rounded-full text-foreground-icon-secondary">
                <RiMicLine className="size-[18px]" aria-hidden />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-500 text-white">
                <RiArrowUpLine className="size-[18px]" aria-hidden />
              </span>
            </div>
          </div>
        </div>
      </ComposerLoader>

      <div className="mt-5 flex items-center justify-center gap-2 text-body-2-regular text-text-tertiary">
        <RiStopCircleLine className="size-4" aria-hidden />
        Stop stays in reach the whole time
      </div>
    </div>
  ));
}

const MCP_CONFIG = `{
  "mcpServers": {
    "faang": {
      "command": "npx",
      "args": ["-y", "faang@latest", "mcp"]
    }
  }
}`;

/** The MCP block: the config an agent needs, and what it can do with it. */
export function FeatureSections() {
  const localize = useTemplateCopy();
  return localize((
    <>
      <section className="mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <ComposerDemo />
          </div>
          <div className="order-1 flex flex-col items-start gap-5 lg:order-2">
            <SectionHeading
              index="03"
              eyebrow="Loading states"
              title="A loading state worth looking at"
              description="The composer loader wraps your input in a light orbiting the rim while the agent works, glass controls included. Pick the colours; it follows the theme."
            >
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/chat" variant="secondary">
                  See it in the chat
                </ButtonLink>
                <ButtonLink
                  href="https://www.faang.com/components/composer-loader"
                  variant="secondary"
                >
                  Component docs
                </ButtonLink>
              </div>
            </SectionHeading>
          </div>
        </div>
      </section>

      <section className="border-y border-separator-border bg-background-secondary-default">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <SectionHeading
              index="04"
              eyebrow="MCP"
              title="Install it with your agent"
              description="Faang speaks MCP. Connect your agent once and it can browse every component with real usage examples, configure your project and install the source files."
            />
            <div className="w-full max-w-md">
              <InstallCommand command="claude mcp add faang -- npx -y faang@latest mcp" />
            </div>
            <p className="max-w-md text-body-2-regular text-text-tertiary">
              Cursor and any other MCP client take the same server in their config. Then ask in
              plain words: <span className="text-text-secondary">“build a revenue dashboard with
              stat cards and an area chart.”</span>
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border-button-default bg-background-primary-default">
            <div className="flex items-center gap-1.5 border-b border-separator-border px-4 py-2.5">
              <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
              <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
              <span className="size-2.5 rounded-full bg-background-quaternary-default" aria-hidden />
              <span className="ms-2 font-mono text-caption-1-regular text-text-tertiary">mcp.json</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-body-2-regular leading-6 text-text-secondary">
              <code>{MCP_CONFIG}</code>
            </pre>
          </div>
        </div>
      </section>
    </>
  ));
}

/** The band before the FAQ: three promises, no cards-in-cards. */
export function ValueRow() {
  const localize = useTemplateCopy();
  const values = [
    { title: "Source, not a dependency", body: "npx faang add copies the files in. Change anything." },
    { title: "One visual language", body: "400+ semantic tokens, light and dark from the same classes." },
    { title: "Accessible by default", body: "React Aria underneath, Tailwind v4 on top, no runtime CSS." },
  ];
  return localize((
    <section className="mx-auto w-full max-w-[1200px] px-4 py-16 sm:px-6">
      <div className={cx("grid gap-8 sm:grid-cols-3 sm:gap-12")}>
        {values.map((value, position) => (
          <div key={value.title} className="flex flex-col gap-2 border-t border-separator-border pt-5">
            <span className="font-mono text-caption-1-medium text-accent-600">{`0${position + 1}`}</span>
            <h3 className="text-title-3-semibold text-text-primary">{value.title}</h3>
            <p className="text-body-2-regular text-text-secondary">{value.body}</p>
          </div>
        ))}
      </div>
    </section>
  ));
}
