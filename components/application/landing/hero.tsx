"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine, RiBearSmileLine, RiReactjsLine, RiTailwindCssLine } from "@remixicon/react";
import { useEffect, useState } from "react";

import { FREE_COMPONENT_PREVIEWS } from "@/components/application/docs/component-previews-free";
import { HeroRays } from "@/components/application/landing/hero-rays/hero-rays";
import { HERO_RAYS_DEFAULTS, type HeroRaysConfig } from "@/components/application/landing/hero-rays/hero-rays-config";
import { InstallCommand } from "@/components/application/landing/install-command";
import { useThemeMode } from "@/components/application/theme/theme-toggle";
import { ButtonLink } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

/** The brand's own ray field: the same shader the Pro card used, re-tinted. */
const HERO_RAYS: HeroRaysConfig = {
  ...HERO_RAYS_DEFAULTS,
  count: 9,
  colorA: "#ffb4aa",
  colorB: "#ffd8ca",
  colorC: "#ffc5d2",
  intensity: 1.6,
  exposure: 1.15,
  glow: 0.34,
  softness: 0.97,
  grain: 0.03,
  backgroundAlpha: 0.9,
  height: 820,
};

const STACK = [
  { label: "React", version: "v19.2", Icon: RiReactjsLine },
  { label: "Tailwind CSS", version: "v4", Icon: RiTailwindCssLine },
  { label: "React Aria", version: "v1.17", Icon: RiBearSmileLine },
];

/**
 * A left-hand statement, a right-hand screen. Deliberately not the centred
 * hero with a wall of cards under it: the copy is a column here, and the
 * product shows up as one framed window instead of a marquee.
 */
export function Hero({ total }: { total: number }) {
  const localize = useTemplateCopy();
  const [reduceMotion, setReduceMotion] = useState(false);
  const theme = useThemeMode();

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // The canvas paints its own opaque background, so the dark variant has to be
  // swapped in whole — otherwise a white band sits under a dark page.
  const rays: HeroRaysConfig =
    theme === "dark"
      ? { ...HERO_RAYS, background: HERO_RAYS.backgroundDark, grain: HERO_RAYS.grainDark }
      : HERO_RAYS;

  const Sidebar = FREE_COMPONENT_PREVIEWS["/components/sidebar"];
  const Revenue = FREE_COMPONENT_PREVIEWS["/components/revenue-chart-card"];

  return localize((
    <section className="relative isolate overflow-hidden border-b border-separator-border">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 end-0 -z-10 w-full opacity-80 [mask-image:radial-gradient(70%_60%_at_75%_20%,#000,transparent)] lg:w-[62%]"
      >
        <HeroRays config={rays} paused={reduceMotion} className="size-full" />
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-14 px-4 pt-8 pb-16 sm:px-6 sm:pb-24 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="flex flex-col items-start">
          <p className="flex items-center gap-3 font-mono text-caption-1-medium tracking-[0.14em] text-text-tertiary uppercase">
            <span className="h-px w-8 bg-accent-500" aria-hidden />
            {`${total} components · MIT`}
          </p>

          <h1 className="mt-6 text-display-3-semibold text-balance text-text-primary sm:text-display-1-semibold">
            React design system{" "}
            <span className="block text-accent-600">for agent interfaces</span>
          </h1>

          <p className="mt-6 max-w-xl text-title-3-regular text-pretty text-text-secondary">
            {`Faang is a React design system with ${total} components, charts and templates, plus 400+ design tokens, built in Figma. The parts an AI product needs and the parts every dashboard needs, in one visual language, as source files in your project.`}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
            <ButtonLink href="/components" size="medium" trailingIcon={RiArrowRightLine}>
              Browse the library
            </ButtonLink>
            <ButtonLink href="/chat" size="medium" variant="secondary">
              See the chat starter
            </ButtonLink>
          </div>

          <div className="mt-6 w-full max-w-md">
            <InstallCommand command="npx faang@latest add --all" />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-body-2-regular text-text-secondary">
            {STACK.map(({ label, version, Icon }) => (
              <span key={label} className="inline-flex items-center gap-1.5">
                <Icon className="size-4 text-foreground-icon-secondary" aria-hidden />
                {label}
                <span className="text-text-tertiary">{version}</span>
              </span>
            ))}
            <span className="hidden items-center gap-1.5 sm:inline-flex">
              <span className="size-1 rounded-full bg-text-tertiary" aria-hidden />
              TanStack Table
              <span className="text-text-tertiary">v8.21</span>
            </span>
          </div>
        </div>

        {/* One framed window, tilted out of the grid: the app, not a collage. */}
        <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
          <div className="relative rounded-[26px] border border-border-button-default bg-background-secondary-default p-2 shadow-2xl">
            <div className="pointer-events-none relative h-[380px] overflow-hidden rounded-[18px] bg-background-full sm:h-[440px]">
              {Sidebar ? <Sidebar /> : null}
            </div>
          </div>

          {Revenue ? (
            <div
              className={cx(
                "pointer-events-none absolute -bottom-8 -start-4 hidden h-[168px] w-[280px] overflow-hidden rounded-2xl border border-border-button-default bg-background-primary-default shadow-xl sm:block lg:-start-10",
              )}
            >
              <Revenue />
            </div>
          ) : null}

          <div
            aria-hidden
            className="absolute -top-3 -end-3 -z-10 size-24 rounded-[28px] border border-border-button-default bg-background-secondary-default"
          />
        </div>
      </div>
    </section>
  ));
}
