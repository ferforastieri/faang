"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiGithubFill } from "@remixicon/react";
import Link from "next/link";

import { LanguageSwitcher } from "@/components/application/landing/landing-copy";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { LogoLockup } from "@/components/foundations/brand/logo";
import { cx } from "@/utils/cx";

const LINKS: { label: string; href: string; external?: boolean }[] = [
  { label: "Components", href: "/components" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chat starter", href: "/chat" },
  { label: "Sign in", href: "/login" },
  { label: "Sign up", href: "/signup" },
  { label: "Getting started", href: "https://www.faang.com/getting-started", external: true },
  { label: "Install", href: "https://www.faang.com/installation", external: true },
  { label: "llms.txt", href: "/llms.txt", external: true },
  { label: "docs.md", href: "/docs.md", external: true },
  { label: "MCP server", href: "https://www.faang.com/mcp", external: true },
  { label: "RTL support", href: "https://www.faang.com/rtl", external: true },
  { label: "License", href: "https://github.com/ferforastieri/faang/blob/master/LICENSE", external: true },
];

/**
 * A band, not a sitemap: the links run inline under the brand instead of
 * stacking into the four columns every design system footer uses.
 */
export function SiteFooter() {
  const localize = useTemplateCopy();
  return localize((
    <footer className="border-t border-separator-border bg-background-full">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-sm flex-col gap-4">
            <Link href="/" className="w-fit" aria-label="Faang home">
              <LogoLockup height={24} />
            </Link>
            <p className="text-body-2-regular text-text-secondary">
              A React design system for agentic interfaces. Source files in your project, MIT
              licensed, light and dark from the same classes.
            </p>
            <a
              href="https://github.com/ferforastieri/faang"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-2 text-body-2-medium text-text-secondary transition-colors duration-150 ease hover:text-text-primary"
            >
              <RiGithubFill className="size-[18px]" aria-hidden />
              github.com/ferforastieri/faang
            </a>
          </div>

          <nav aria-label="Footer" className="flex max-w-xl flex-wrap gap-x-5 gap-y-2.5">
            {LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cx(
                    "text-body-2-regular text-text-secondary transition-colors duration-150 ease hover:text-text-primary",
                  )}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-body-2-regular text-text-secondary transition-colors duration-150 ease hover:text-text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-separator-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-body-2-regular text-text-tertiary">
            {`© ${new Date().getFullYear()} Faang. MIT licensed.`}
          </p>
          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeToggle appearance="icon" />
          </div>
        </div>
      </div>
    </footer>
  ));
}
