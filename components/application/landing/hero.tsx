"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import {
  RiArrowRightLine,
  RiBearSmileLine,
  RiReactjsLine,
  RiTailwindCssLine,
} from "@remixicon/react";
import { useEffect, useState } from "react";

import { FREE_COMPONENT_PREVIEWS } from "@/components/application/docs/component-previews-free";
import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";
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

const BAND: PreviewHref[] = [
  "/components/stat-cards",
  "/components/data-table",
  "/components/sidebar",
  "/components/revenue-chart-card",
];

export function Hero({ total }: { total: number }) {
  const localize = useTemplateCopy();
  const [reduceMotion, setReduceMotion] = useState(false);
  const theme = useThemeMode();
  // The canvas paints its own opaque background, so the dark variant has to be
  // swapped in whole — otherwise a white band sits under a dark page.
  const rays: HeroRaysConfig =
    theme === "dark"
      ? { ...HERO_RAYS, background: HERO_RAYS.backgroundDark, grain: HERO_RAYS.grainDark }
      : HERO_RAYS;

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return localize((
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] [mask-image:linear-gradient(180deg,#000_35%,transparent_92%)]"
      >
        <HeroRays config={rays} paused={reduceMotion} className="size-full" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 pt-14 text-center sm:px-6 sm:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-border-button-default bg-background-primary-default/80 px-3 py-1 text-body-2-medium text-text-secondary backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent-500" aria-hidden />
          {`${total} components, charts and templates. All MIT.`}
        </span>

        <h1 className="mt-6 max-w-[900px] text-display-2-semibold text-balance text-text-primary sm:text-display-1-semibold">
          React design system{" "}
          <span className="block text-accent-600">for agent interfaces</span>
        </h1>

        <p className="mt-5 max-w-2xl text-title-3-regular text-pretty text-text-secondary">
          {`Faang is a React design system with ${total} components, charts and templates, plus 400+ design tokens, built in Figma. The parts an AI product needs and the parts every dashboard needs, in one visual language, as source files in your project.`}
        </p>

        <div className="mt-8 flex w-full max-w-md flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <ButtonLink
            href="/components"
            size="medium"
            trailingIcon={RiArrowRightLine}
            className="w-full sm:w-auto"
          >
            Browse the library
          </ButtonLink>
          <ButtonLink href="/chat" size="medium" variant="secondary" className="w-full sm:w-auto">
            See the chat starter
          </ButtonLink>
        </div>

        <div className="mt-6 w-full max-w-md">
          <InstallCommand command="npx faang@latest add --all" />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-body-2-regular text-text-secondary">
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

      {/* The band: live components, cropped by the section, the way the site
          shows a wall of them above the fold. */}
      <div className="relative mx-auto mt-14 w-full max-w-[1200px] px-4 sm:px-6">
        <div className="flex h-[360px] w-full items-start justify-center gap-4 overflow-hidden [mask-image:linear-gradient(180deg,#000_70%,transparent)]">
          {BAND.map((href, index) => {
            const Preview = FREE_COMPONENT_PREVIEWS[href];
            if (!Preview) return null;
            return (
              <div
                key={href}
                className={cx(
                  "relative h-[420px] shrink-0 overflow-hidden rounded-2xl border border-border-button-default bg-background-secondary-default shadow-lg",
                  index === 0 || index === 3
                    ? "hidden w-[330px] lg:block"
                    : index === 1
                      ? "hidden w-[330px] sm:block"
                      : "w-[330px] flex-1 sm:flex-none",
                )}
              >
                <Preview />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ));
}
