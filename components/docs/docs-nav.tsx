"use client";

import { ENTRIES, GROUPS } from "@/components/catalog/entries";
import { usePathname } from "next/navigation";

export function DocsNav() {
  const path = usePathname();

  const link = (href: string, label: string) => (
    <a key={href} href={href} aria-current={path === href ? "page" : undefined}>
      {label}
    </a>
  );

  return (
    <nav className="tp-doc__nav" aria-label="Documentação">
      <div>
        <h2>Começo</h2>
        {link("/docs", "Visão geral")}
        {link("/docs/color", "Cor")}
        {link("/docs/typography", "Tipografia")}
      </div>

      {GROUPS.map((group) => (
        <div key={group}>
          <h2>{group}</h2>
          {ENTRIES.filter((entry) => entry.group === group).map((entry) =>
            link(`/docs/${entry.slug}`, entry.name),
          )}
        </div>
      ))}
    </nav>
  );
}
