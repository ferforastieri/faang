import type { CSSProperties } from "react";

export const metadata = {
  title: "Cor — Faang",
  description: "Os tokens semânticos de cor, no claro e no escuro.",
};

const TOKENS = [
  { name: "Fundo", variable: "--bg", note: "A página atrás de tudo." },
  { name: "Superfície", variable: "--raised", note: "Cards, campos, barras." },
  { name: "Afundado", variable: "--sunken", note: "Trilhos e blocos de código." },
  { name: "Barra lateral", variable: "--side", note: "O papel das colunas." },
  { name: "Texto", variable: "--ink", note: "O texto principal." },
  { name: "Texto 2", variable: "--ink2", note: "Títulos e linhas densas." },
  { name: "Apoio", variable: "--muted", note: "O segundo plano do texto." },
  { name: "Fraco", variable: "--faint", note: "Metadados e legendas." },
  { name: "Linha", variable: "--line", note: "Hairline de separação." },
  { name: "Linha 2", variable: "--line2", note: "Bordas de controle." },
  { name: "Agente", variable: "--agent", note: "A cor da identidade." },
  { name: "Agente 2", variable: "--agent2", note: "O claro do gradiente." },
  { name: "Sucesso", variable: "--ok", note: "Resultado e confirmação." },
  { name: "Atenção", variable: "--warn", note: "O que espera uma pessoa." },
  { name: "Perigo", variable: "--danger", note: "Recusa e destruição." },
  { name: "Informação", variable: "--info", note: "Contexto e ajuda." },
];

function Swatch({ variable, theme }: { variable: string; theme: "light" | "dark" }) {
  return (
    <span data-theme={theme}>
      <span className="tp-swatch__chip" style={{ "--swatch": `var(${variable})` } as CSSProperties} />
    </span>
  );
}

export default function ColorPage() {
  return (
    <>
      <p className="tp-kicker">Fundamentos</p>
      <h1 className="tp-doc__title">Cor</h1>
      <p className="tp-doc__lead">
        Cada cor tem um nome de intenção, não de matiz. O tema é um atributo no <code>html</code> —{" "}
        <code>data-theme=&quot;light&quot;</code> ou <code>&quot;dark&quot;</code> — e os mesmos componentes respondem
        aos dois sem saber qual está ativo. As duas amostras de cada token mostram o valor claro e o escuro.
      </p>

      <div className="tp-color-grid">
        {TOKENS.map((token) => (
          <div key={token.variable} className="tp-color-card">
            <span className="tp-theme-pair" aria-hidden="true">
              <Swatch variable={token.variable} theme="light" />
              <Swatch variable={token.variable} theme="dark" />
            </span>
            <span className="tp-color-card__text">
              <b>{token.name}</b>
              <code>{token.variable}</code>
              <span>{token.note}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="tp-doc__block">
        <h2>Como trocar</h2>
        <pre className="tp-doc__snippet">
          <code>{`// o atributo, e todo o sistema acompanha
document.documentElement.dataset.theme = "dark";

/* no CSS, nada de dark: nos componentes */
background: var(--raised);
color: var(--ink);
border: 1px solid var(--line);`}</code>
        </pre>
      </div>

      <div className="tp-doc__block">
        <h2>Contraste</h2>
        <p className="tp-doc__lead" style={{ marginTop: 0 }}>
          Texto e apoio são medidos contra a superfície de cada tema; estado nunca é dito só por cor — sempre um ícone
          e uma palavra acompanham. O foco é um anel de 1px na cor da linha forte, visível nos dois temas.
        </p>
      </div>
    </>
  );
}
