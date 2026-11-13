"use client";

import { Card } from "@ui/components/Surfaces";
import { Segmented } from "@ui/components/Segmented";
import { useState } from "react";

import { type CatalogGroup, ENTRIES, GROUPS } from "./entries";
import { CatalogPreview } from "./previews";

type Filter = "todos" | CatalogGroup;

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("todos");
  const shown = filter === "todos" ? ENTRIES : ENTRIES.filter((entry) => entry.group === filter);

  return (
    <>
      <div className="tp-catalog__bar">
        <Segmented
          value={filter}
          onValueChange={setFilter}
          label="Filtrar por grupo"
          size="sm"
          options={[
            { value: "todos", label: "Todos", count: ENTRIES.length },
            ...GROUPS.map((group) => ({
              value: group,
              label: group,
              count: ENTRIES.filter((entry) => entry.group === group).length,
            })),
          ]}
        />
        <span className="tp-catalog__count">
          {shown.length} {shown.length === 1 ? "peça" : "peças"}
        </span>
      </div>

      <div className="tp-catalog">
        {shown.map((entry) => (
          <Card as="div" key={entry.slug} className="tp-catalog__card" id={entry.slug}>
            <div className="tp-catalog__head">
              <p className="tp-catalog__group">{entry.group}</p>
              <h3 className="tp-catalog__name">{entry.name}</h3>
              <p className="tp-catalog__summary">{entry.summary}</p>
            </div>

            <div className="tp-catalog__preview">
              <CatalogPreview slug={entry.slug} />
            </div>

            <div className="tp-catalog__foot">
              <code>{entry.importPath}</code>
              <a href={`/docs/${entry.slug}`}>Docs</a>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
