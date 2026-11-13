"use client";

import { Button } from "@ui/components/Button";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/brand/brand-logo";
import { GithubMark } from "@/components/brand/github-mark";

import { QuickSearch } from "./quick-search";
import { ThemeToggle } from "./theme-toggle";

const REPOSITORY = "https://github.com/ferforastieri/faang";

const PAGES = [
  { href: "/components", label: "Componentes" },
  { href: "/dashboard", label: "Demo" },
  { href: "/docs", label: "Docs" },
];

/**
 * The public header: the logo, the three places to go, search, GitHub, the
 * theme and the library's front door. On a phone the same items fold into one
 * menu, so nothing disappears on the way down.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header className={`tp-header${scrolled ? " tp-header--scrolled" : ""}${menu ? " tp-header--open" : ""}`}>
      <div className="tp-shell tp-header__bar">
        <a href="/" className="tp-brand" aria-label="Faang, início">
          <BrandLogo height={26} />
        </a>

        <nav className="tp-nav" aria-label="Navegação">
          {PAGES.map((page) => (
            <a key={page.href} href={page.href} aria-current={pathname === page.href ? "page" : undefined}>
              {page.label}
            </a>
          ))}
        </nav>

        <span className="tp-header__spacer" />

        <div className="tp-header__actions">
          <QuickSearch />

          <Button variant="ghost" size="sm" iconOnly asChild className="tp-header__github">
            <a href={REPOSITORY} target="_blank" rel="noreferrer" aria-label="Faang no GitHub">
              <GithubMark size={18} />
            </a>
          </Button>

          <ThemeToggle />

          <Button variant="primary" size="sm" asChild className="tp-header__cta">
            <a href="/components">Abrir a biblioteca</a>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            icon={menu ? "close" : "menu"}
            iconOnly
            className="tp-header__menu-btn"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            aria-controls="tp-header-menu"
            onClick={() => setMenu((current) => !current)}
          />
        </div>
      </div>

      {menu ? (
        <div id="tp-header-menu" className="tp-header__menu">
          <div className="tp-shell">
            <nav aria-label="Menu">
              {PAGES.map((page) => (
                <a key={page.href} href={page.href} aria-current={pathname === page.href ? "page" : undefined}>
                  {page.label}
                </a>
              ))}
              <a href={REPOSITORY} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
            <Button variant="primary" size="md" block asChild>
              <a href="/components">Abrir a biblioteca</a>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
