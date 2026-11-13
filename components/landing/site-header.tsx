import { Button } from "@ui/components/Button";
import { LogoMark } from "@ui/components/Logo";

import { ThemeToggle } from "./theme-toggle";

const REPOSITORY = "https://github.com/ferforastieri/faang";

const PAGES = [
  { href: "/components", label: "Componentes" },
  { href: "/docs", label: "Docs" },
  { href: "/chat", label: "Chat" },
  { href: "/dashboard", label: "Dashboard" },
];

export function SiteHeader() {
  return (
    <header className="tp-header">
      <div className="tp-shell tp-header__bar">
        <a href="/" className="tp-brand" aria-label="Faang, início">
          <LogoMark className="tp-brand__mark" />
          <span className="tp-brand__name" aria-hidden="true">
            <b>Faang</b> <span>UI</span>
          </span>
        </a>

        <nav className="tp-nav" aria-label="Navegação">
          {PAGES.map((page) => (
            <a key={page.href} href={page.href}>
              {page.label}
            </a>
          ))}
        </nav>

        <span className="tp-header__spacer" />

        <div className="tp-header__actions">
          <ThemeToggle />
          <Button variant="primary" size="sm" asChild>
            <a href={REPOSITORY} target="_blank" rel="noreferrer">
              Ver o código
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
