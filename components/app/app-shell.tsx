import type { ReactNode } from "react";

import { Avatar } from "@ui/components/Avatar";
import { Chip } from "@ui/components/Chip";
import { LogoMark } from "@ui/components/Logo";
import { Icon, type IconName } from "@ui/icons/Icon";

import { ThemeToggle } from "@/components/landing/theme-toggle";

const CONVERSATIONS: { href: string; label: string; icon: IconName; count?: number }[] = [
  { href: "/chat", label: "geral", icon: "channel" },
  { href: "/chat?c=eng", label: "eng", icon: "thread", count: 3 },
  { href: "/chat?c=design", label: "design", icon: "channel" },
  { href: "/chat?c=incidentes", label: "incidentes", icon: "alert" },
];

const AGENTS = [
  { name: "Ada", color: "violet" as const, note: "código" },
  { name: "Bento", color: "green" as const, note: "dados" },
  { name: "Cora", color: "rose" as const, note: "design" },
];

/**
 * The full-height shell of the two app screens: the workspace rail on the
 * left, the screen's own top bar and body on the right. No site header or
 * footer — a 100vh frame would never reach them.
 */
export function AppShell({
  active,
  title,
  subtitle,
  actions,
  children,
}: {
  active: "chat" | "dashboard";
  title: ReactNode;
  subtitle: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="tp-app">
      <aside className="tp-app__side">
        <a href="/" className="tp-app__brand" aria-label="Faang, início">
          <LogoMark size={24} />
          <span aria-hidden="true">
            <b>Faang</b>
          </span>
        </a>

        <div className="tp-app__item" aria-hidden="true">
          <Avatar name="Acme" initials="A" size="xs" />
          <span>Acme</span>
          <Chip>time</Chip>
        </div>

        <nav aria-label="Telas">
          <p className="tp-app__label">Workspace</p>
          <a className="tp-app__item" href="/chat" aria-current={active === "chat" ? "page" : undefined}>
            <Icon name="message" size={16} />
            Chat
          </a>
          <a className="tp-app__item" href="/dashboard" aria-current={active === "dashboard" ? "page" : undefined}>
            <Icon name="chart" size={16} />
            Dashboard
          </a>
        </nav>

        <nav aria-label="Conversas">
          <p className="tp-app__label">Conversas</p>
          {CONVERSATIONS.map((conversation, index) => (
            <a
              key={conversation.label}
              className={`tp-app__item${active === "chat" && index === 1 ? " tp-app__item--chosen" : ""}`}
              href={conversation.href}
            >
              <Icon name={conversation.icon} size={16} />
              {conversation.label}
              {conversation.count ? <Chip>{conversation.count}</Chip> : null}
            </a>
          ))}
        </nav>

        <nav aria-label="Agentes">
          <p className="tp-app__label">Agentes</p>
          {AGENTS.map((agent) => (
            <a key={agent.name} className="tp-app__item" href={`/chat?agent=${agent.name.toLowerCase()}`}>
              <Avatar kind="agent" name={agent.name} appearance={{ color: agent.color }} size="xs" />
              {agent.name}
              <span className="tp-app__me-name">
                <span>{agent.note}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="tp-app__me">
          <Avatar name="Fernando" size="sm" />
          <span className="tp-app__me-name">
            <b>Fernando</b>
            <span>fundador</span>
          </span>
          <a className="tp-app__item" href="/docs" aria-label="Ajustes" style={{ marginInlineStart: "auto" }}>
            <Icon name="settings" size={16} />
          </a>
        </div>
      </aside>

      <div className="tp-app__main">
        <header className="tp-app__top">
          <a className="tp-app__home" href="/" aria-label="Faang, início">
            <LogoMark size={22} />
          </a>

          <span className="tp-app__title">
            <b>{title}</b>
            <span>{subtitle}</span>
          </span>

          <div className="tp-app__top-actions">
            <a
              className="tp-app__switch"
              href={active === "chat" ? "/dashboard" : "/chat"}
              aria-label={active === "chat" ? "Abrir o dashboard" : "Abrir o chat"}
            >
              <Icon name={active === "chat" ? "chart" : "message"} size={16} />
            </a>
            {actions}
            <ThemeToggle />
          </div>
        </header>

        <div className="tp-app__body">{children}</div>
      </div>
    </div>
  );
}
