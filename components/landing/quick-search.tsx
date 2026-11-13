"use client";

import { Dialog, DialogBody } from "@ui/components/Dialog";
import { Button } from "@ui/components/Button";
import { SearchField } from "@ui/components/Toolbar";
import { useEffect, useMemo, useState } from "react";

import { ENTRIES } from "@/components/catalog/entries";

/** The header's quick search: one field, the documented components, Cmd/Ctrl+K. */
export function QuickSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = term
      ? ENTRIES.filter(
          (entry) =>
            entry.name.toLowerCase().includes(term) ||
            entry.summary.toLowerCase().includes(term) ||
            entry.group.toLowerCase().includes(term),
        )
      : ENTRIES;
    return matches.slice(0, 10);
  }, [query]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        icon="search"
        iconOnly
        aria-label="Buscar componentes"
        onClick={() => setOpen(true)}
      />

      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Buscar"
        description={`${ENTRIES.length} componentes documentados, com prévia e código.`}
        closeLabel="Fechar"
        width={560}
      >
        <DialogBody>
          <SearchField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onClear={() => setQuery("")}
            clearLabel="Limpar busca"
            placeholder="Button, Table, Sidebar…"
            aria-label="Buscar componentes"
            autoFocus
          />

          <ul className="tp-searchlist">
            {results.map((entry) => (
              <li key={entry.slug}>
                <a href={`/docs/${entry.slug}`} onClick={() => setOpen(false)}>
                  <span className="tp-searchlist__name">
                    {entry.name}
                    <small>{entry.group}</small>
                  </span>
                  <span className="tp-searchlist__summary">{entry.summary}</span>
                </a>
              </li>
            ))}
          </ul>

          {results.length === 0 ? <p className="tp-searchlist__empty">Nada encontrado.</p> : null}
        </DialogBody>
      </Dialog>
    </>
  );
}
