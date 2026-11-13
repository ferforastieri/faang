import type { CSSProperties } from "react";

export const metadata = {
  title: "Tipografia — Faang",
  description: "A escala tipográfica em tokens, sem utilitários compostos.",
};

const SCALE = [
  { token: "--text-display", size: "32 / 600", sample: "A interface do agente" },
  { token: "--text-h1", size: "28 / 600", sample: "Um sistema para conversas" },
  { token: "--text-h2", size: "20 / 600", sample: "Aprovações e ferramentas" },
  { token: "--text-h3", size: "17 / 600", sample: "O retrato do agente" },
  { token: "--text-lg", size: "16 / 400", sample: "Texto de destaque em um parágrafo." },
  { token: "--text-base", size: "15 / 400", sample: "O corpo padrão da interface." },
  { token: "--text-md", size: "14,5 / 400", sample: "Linhas densas de lista e tabela." },
  { token: "--text-sm", size: "13 / 400", sample: "Rótulos, chips e metadados." },
  { token: "--text-xs", size: "12 / 400", sample: "Legendas e notas de rodapé." },
];

export default function TypographyPage() {
  return (
    <>
      <p className="tp-kicker">Fundamentos</p>
      <h1 className="tp-doc__title">Tipografia</h1>
      <p className="tp-doc__lead">
        A escala é um conjunto de tokens de tamanho, não utilitários que empilham tamanho, peso e entrelinha. A UI
        usa <b>Source Sans 3</b>; o código usa <b>JetBrains Mono</b>. As duas entram por <code>@fontsource</code>,
        sem requisição a terceiros.
      </p>

      <div className="tp-scale">
        {SCALE.map((row) => (
          <div key={row.token} className="tp-scale__row">
            <span
              className="tp-scale__sample"
              style={{ fontSize: `var(${row.token})`, fontWeight: row.token.includes("display") || row.token.includes("h") ? 600 : 400 } as CSSProperties}
            >
              {row.sample}
            </span>
            <span className="tp-scale__meta">
              {row.token} · {row.size}
            </span>
          </div>
        ))}
      </div>

      <div className="tp-doc__block">
        <h2>Faces</h2>
        <pre className="tp-doc__snippet">
          <code>{`--font-sans: "Source Sans 3 Variable", "Source Sans 3", system-ui, sans-serif;
--font-mono: "JetBrains Mono Variable", "JetBrains Mono", ui-monospace, monospace;
--font-size-adjust: 0.52; /* Source Sans 3 desenha pequeno */`}</code>
        </pre>
        <p className="tp-doc__meta">
          <span>Latin, CJK e cirílico seguem as faces do sistema.</span>
        </p>
      </div>

      <div className="tp-doc__block">
        <h2>Números e código</h2>
        <p className="tp-doc__lead" style={{ marginTop: 0 }}>
          Números tabulares por padrão (<code>font-feature-settings: &quot;tnum&quot;</code>), para colunas que não
          dançam. Código, tokens e atalhos sempre em mono.
        </p>
      </div>
    </>
  );
}
