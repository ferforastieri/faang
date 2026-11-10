"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiGithubFill } from "@remixicon/react";
import Link from "next/link";

import { LogoLockup } from "@/components/foundations/brand/logo";
import { LanguageSwitcher } from "@/components/application/landing/landing-copy";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";

const COLUMNS: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/components" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Chat starter", href: "/chat" },
      { label: "Sign in", href: "/login" },
      { label: "Sign up", href: "/signup" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Getting started", href: "https://www.faang.com/getting-started", external: true },
      { label: "Install", href: "https://www.faang.com/installation", external: true },
      { label: "MCP server", href: "https://www.faang.com/mcp", external: true },
      { label: "Agent skills", href: "https://www.faang.com/skill", external: true },
      { label: "RTL support", href: "https://www.faang.com/rtl", external: true },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: "https://github.com/ferforastieri/faang", external: true },
      { label: "License", href: "https://github.com/ferforastieri/faang/blob/master/LICENSE", external: true },
    ],
  },
];

const linkClass =
  "text-body-2-regular text-text-secondary transition-colors duration-150 ease hover:text-text-primary";

/** Closes the landing: brand and the whole link map, then the small print. */
export function SiteFooter() {
  const localize = useTemplateCopy();
  return localize((
    <footer className="border-t border-separator-border bg-background-full">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="flex max-w-sm flex-col gap-4">
            <Link href="/" className="w-fit" aria-label="Faang home">
              <LogoLockup height={26} />
            </Link>
            <p className="text-body-2-regular text-text-secondary">
              A React design system for agentic interfaces. Source files in your project, MIT
              licensed, light and dark from the same classes.
            </p>
            <div className="flex items-center gap-1">
              {[{ href: "https://github.com/ferforastieri/faang", label: "GitHub", Icon: RiGithubFill }].map(
                ({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-9 items-center justify-center rounded-lg text-foreground-icon-secondary transition-colors duration-150 ease hover:bg-background-secondary-default hover:text-text-primary"
                  >
                    <Icon className="size-[18px]" aria-hidden />
                  </a>
                ),
              )}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-3">
              <h2 className="text-body-2-semibold text-text-primary">{column.title}</h2>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-separator-border pt-6 sm:flex-row sm:items-center sm:justify-between">
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
