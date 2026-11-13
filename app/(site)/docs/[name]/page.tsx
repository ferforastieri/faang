import { notFound } from "next/navigation";

import { ENTRIES, entryBySlug } from "@/components/catalog/entries";
import { CatalogPreview } from "@/components/catalog/previews";

export function generateStaticParams() {
  return ENTRIES.map((entry) => ({ name: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const entry = entryBySlug(name);
  return {
    title: entry ? `${entry.name} — Faang` : "Componente — Faang",
    description: entry?.summary,
  };
}

export default async function ComponentDocPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const entry = entryBySlug(name);
  if (!entry) notFound();

  const index = ENTRIES.indexOf(entry);
  const previous = ENTRIES[index - 1];
  const next = ENTRIES[index + 1];

  return (
    <>
      <p className="tp-kicker">{entry.group}</p>
      <h1 className="tp-doc__title">{entry.name}</h1>
      <p className="tp-doc__lead">{entry.summary}</p>

      <div className="tp-doc__block">
        <h2>Prévia</h2>
        <div className="tp-doc__preview">
          <CatalogPreview slug={entry.slug} />
        </div>
      </div>

      <div className="tp-doc__block">
        <h2>Uso</h2>
        <pre className="tp-doc__snippet">
          <code>{`import ${entry.imports ?? `{ ${entry.name} }`} from "${entry.importPath}";\n\n${entry.code}`}</code>
        </pre>
        <p className="tp-doc__meta">
          <span>Import: {entry.importPath}</span>
          <span>Pacote: faang-ui</span>
          <span>Licença: MIT</span>
        </p>
      </div>

      <div className="tp-doc__block">
        <h2>No projeto</h2>
        <p className="tp-doc__lead" style={{ marginTop: 0 }}>
          O código-fonte fica em <code>packages/ui/src/components</code>. Para mudar o comportamento, edite o arquivo;
          o site usa a mesma peça, então a mudança aparece aqui antes de sair no pacote.
        </p>
      </div>

      <nav className="tp-doc__meta" aria-label="Componentes vizinhos" style={{ marginTop: 28 }}>
        {previous && (
          <a href={`/docs/${previous.slug}`} style={{ color: "var(--agent)", textDecoration: "none" }}>
            ← {previous.name}
          </a>
        )}
        {next && (
          <a
            href={`/docs/${next.slug}`}
            style={{ marginInlineStart: "auto", color: "var(--agent)", textDecoration: "none" }}
          >
            {next.name} →
          </a>
        )}
      </nav>
    </>
  );
}
