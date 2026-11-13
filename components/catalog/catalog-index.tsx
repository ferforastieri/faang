"use client";

import { Icon } from "@ui/icons/Icon";
import { SearchField } from "@ui/components/Toolbar";
import { useState } from "react";

import { SECTIONS, SECTION_TOTAL, type IndexSection } from "./sections";

/**
 * The catalogue as an index, not a gallery: a sticky contents column on the
 * left and the items as compact rows grouped by what they are. The previews
 * live on the landing's showcase and on each item's own page.
 */
export function CatalogIndex() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const matches = (section: IndexSection) =>
    !term
      ? section.items
      : section.items.filter(
          (item) =>
            item.name.toLowerCase().includes(term) || item.description.toLowerCase().includes(term),
        );

  const shown = SECTIONS.map((section) => ({ ...section, shown: matches(section) })).filter(
    (section) => section.shown.length > 0,
  );

  const count = shown.reduce((sum, section) => sum + section.shown.length, 0);

  return (
    <div className="tp-doc">
      <nav aria-label="Catálogo" className="tp-doc__nav">
        <SearchField
          size="sm"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onClear={() => setQuery("")}
          clearLabel="Limpar busca"
          placeholder="Filtrar…"
          aria-label="Filtrar o catálogo"
        />

        <div>
          <h2>Seções</h2>
          {SECTIONS.map((section) => (
            <a key={section.key} href={`#${section.key}`}>
              {section.title}
              <span className="tp-doc__count">{section.items.length}</span>
            </a>
          ))}
        </div>

        <p className="tp-doc__note">
          {count} de {SECTION_TOTAL} itens
        </p>
      </nav>

      <div className="tp-doc__body">
        <p className="tp-kicker">Biblioteca</p>
        <h1 className="tp-doc__title">Componentes e blocos</h1>
        <p className="tp-doc__lead">
          Os 52 componentes documentados, organizados em seções. Cada linha abre a página da peça,
          com prévia, código e o caminho do import.
        </p>

        {shown.map((section) => (
          <section key={section.key} id={section.key} className="tp-index__section">
            <div className="tp-index__head">
              <h2>{section.title}</h2>
              <p>{section.blurb}</p>
            </div>

            <ul className="tp-index__list">
              {section.shown.map((item) => (
                <li key={item.key}>
                  <a href={item.href} className="tp-indexrow">
                    <span className="tp-indexrow__name">{item.name}</span>
                    <span className="tp-indexrow__desc">{item.description}</span>
                    <Icon name="chevronRight" size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {shown.length === 0 ? <p className="tp-doc__lead">Nada encontrado.</p> : null}
      </div>
    </div>
  );
}
