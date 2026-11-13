"use client";

import { Button } from "@ui/components/Button";
import { Icon } from "@ui/icons/Icon";
import { useState } from "react";

import { ENTRIES } from "@/components/catalog/entries";
import { CatalogPreview } from "@/components/catalog/previews";

import { InstallCommand } from "./install-command";
import { SectionHeading } from "./section-heading";

const SHOWCASE = [
  "data-table",
  "sidebar",
  "notification-center",
  "stat-card",
  "date-picker",
  "composer",
  "approval-card",
  "message",
  "settings-dialog",
]
  .map((slug) => ENTRIES.find((entry) => entry.slug === slug))
  .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

/**
 * A chooser, not a wall: the names on the left, one live component at a useful
 * size in the middle and what it is on the right. Pointing at a name swaps the
 * preview, so nothing moves while you read.
 */
export function Showcase() {
  const [active, setActive] = useState(SHOWCASE[0].slug);
  const entry = SHOWCASE.find((item) => item.slug === active) ?? SHOWCASE[0];

  return (
    <section id="componentes" className="tp-section tp-section--plain">
      <div className="tp-shell">
        <div className="tp-showcase__head">
          <SectionHeading
            index="01"
            eyebrow="Instalação"
            title="Escolha uma peça e veja funcionando."
            description="Cada nome à esquerda é um componente vivo da biblioteca: o mesmo código que o catálogo, a documentação e o comando de instalação leem."
          />
          <div className="tp-showcase__aside">
            <InstallCommand command="npx faang@latest add data-table" />
            <Button asChild>
              <a href="/components">Abrir o índice</a>
            </Button>
          </div>
        </div>

        <div className="tp-showcase">
          <div className="tp-showcase__list">
            {SHOWCASE.map((item) => {
              const selected = item.slug === active;
              return (
                <button
                  key={item.slug}
                  type="button"
                  className="tp-showcase__name"
                  data-chosen={selected || undefined}
                  aria-pressed={selected}
                  onMouseEnter={() => setActive(item.slug)}
                  onFocus={() => setActive(item.slug)}
                  onClick={() => setActive(item.slug)}
                >
                  {item.name}
                  <Icon name="chevronRight" size={14} />
                </button>
              );
            })}
          </div>

          <div className="tp-showcase__preview">
            <CatalogPreview slug={entry.slug} />
          </div>

          <div className="tp-showcase__copy">
            <h3>{entry.name}</h3>
            <p>{entry.summary}</p>
            <a href={`/docs/${entry.slug}`} className="tp-showcase__link">
              Abrir a documentação
              <Icon name="chevronRight" size={14} />
            </a>
            <InstallCommand command={`npx faang@latest add ${entry.slug}`} />
          </div>
        </div>
      </div>
    </section>
  );
}
