"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiCloseLine, RiGithubFill, RiMenuLine, RiSearchLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LanguageSwitcher } from "@/components/application/landing/landing-copy";
import { QuickSearch } from "@/components/application/landing/quick-search";
import { LogoLockup } from "@/components/foundations/brand/logo";
import { ThemeToggle } from "@/components/application/theme/theme-toggle";
import { ButtonLink } from "@/components/base/buttons/button";
import { IconButton } from "@/components/base/buttons/icon-button";
import { cx } from "@/utils/cx";

const NAV: { label: string; href: string; external?: boolean }[] = [
  { label: "Components", href: "/components" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Chat", href: "/chat" },
  { label: "Docs", href: "/docs" },
];

/**
 * The landing's own header, not the app's app-shell: marketing pages sit on the
 * page background with no sidebar, so the navigation is a single bar that
 * sticks and blurs once the page moves under it.
 */
export function SiteHeader() {
  const localize = useTemplateCopy();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // A route change should never leave the phone menu hanging open behind it.
  useEffect(() => setOpen(false), [pathname]);

  return localize((
    <header
      className={cx(
        "sticky top-0 z-50 w-full border-b transition-colors duration-200",
        scrolled || open
          ? "border-separator-border bg-background-full/85 backdrop-blur-xl"
          : "border-transparent bg-background-full",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-8 px-4 sm:px-6">
        <Link
          href="/"
          className="rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          aria-label="Faang home"
        >
          <LogoLockup height={26} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 md:flex">
          {NAV.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3 py-2 text-body-2-medium text-text-secondary transition-colors duration-150 ease hover:text-text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-3 py-2 text-body-2-medium text-text-secondary transition-colors duration-150 ease hover:text-text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <QuickSearch appearance="icon" open={searchOpen} onOpenChange={setSearchOpen} />
          <a
            href="https://github.com/ferforastieri/faang"
            target="_blank"
            rel="noreferrer"
            aria-label="Faang on GitHub"
            className="hidden size-9 items-center justify-center rounded-lg text-foreground-icon-secondary transition-colors duration-150 ease hover:bg-background-secondary-default hover:text-text-primary sm:flex"
          >
            <RiGithubFill className="size-5" aria-hidden />
          </a>
          <LanguageSwitcher />
          <ThemeToggle appearance="icon" />
          <ButtonLink href="/components" size="small" className="ms-1.5 hidden md:inline-flex">
            Open the library
          </ButtonLink>
          <IconButton
            icon={open ? RiCloseLine : RiMenuLine}
            size="small"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="md:hidden"
          />
        </div>
      </div>

      {open ? (
        <div className="border-t border-separator-border md:hidden">
          <nav aria-label="Main" className="mx-auto flex max-w-[1200px] flex-col gap-1 px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-lg px-2 py-2.5 text-body-medium text-text-secondary hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setSearchOpen(true);
              }}
              className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-body-medium text-text-secondary hover:text-text-primary"
            >
              <RiSearchLine className="size-[18px]" aria-hidden />
              Quick search
            </button>
            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher />
              <ButtonLink href="/components" size="small">
                Open the library
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  ));
}
