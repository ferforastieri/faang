import { ENTRIES, GROUPS } from "@/components/catalog/entries";

export const metadata = {
  title: "Documentação — Faang",
  description: "Fundamentos, tokens e as peças do Faang UI, uma a uma.",
};

const FUNDAMENTALS = [
  { href: "/docs/color", name: "Cor", note: "Tokens semânticos, dois temas por atributo." },
  { href: "/docs/typography", name: "Tipografia", note: "A escala em tokens, sem utilitários compostos." },
  { href: "/components", name: "Catálogo", note: "As 20 peças com prévia viva." },
];

export default function DocsIndexPage() {
  return (
    <>
      <p className="tp-kicker">Documentação</p>
      <h1 className="tp-doc__title">O kit, por dentro.</h1>
      <p className="tp-doc__lead">
        Cada peça é um arquivo com export próprio e CSS semântico. Comece pelos fundamentos, depois escolha o
        componente que você precisa — a prévia é o componente de verdade, com estado.
      </p>

      <div className="tp-doc__block">
        <h2>Fundamentos</h2>
        <div className="tp-index-grid" style={{ marginTop: 0 }}>
          {FUNDAMENTALS.map((item) => (
            <a key={item.href} href={item.href} className="tp-index-card">
              <span className="tp-index-card__name">{item.name}</span>
              <span className="tp-index-card__note">{item.note}</span>
            </a>
          ))}
        </div>
      </div>

      {GROUPS.map((group) => (
        <div key={group} className="tp-doc__block">
          <h2>{group}</h2>
          <div className="tp-index-grid" style={{ marginTop: 0 }}>
            {ENTRIES.filter((entry) => entry.group === group).map((entry) => (
              <a key={entry.slug} href={`/docs/${entry.slug}`} className="tp-index-card">
                <span className="tp-index-card__name">{entry.name}</span>
                <span className="tp-index-card__note">{entry.summary}</span>
              </a>
            ))}
          </div>
        </div>
      ))}

      <div className="tp-doc__block">
        <h2>Instalação</h2>
        <pre className="tp-doc__snippet">
          <code>{`npm i faang-ui

// app/layout.tsx
import "faang-ui/styles.css";

// em qualquer componente
import { Button } from "faang-ui/components/Button";`}</code>
        </pre>
        <p className="tp-doc__meta">
          <span>MIT</span>
          <span>React 19</span>
          <span>Radix por baixo</span>
          <span>CSS puro</span>
        </p>
      </div>
    </>
  );
}
