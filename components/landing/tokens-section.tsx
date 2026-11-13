import type { CSSProperties } from "react";

const SWATCHES: { name: string; variable: string }[] = [
  { name: "Agente", variable: "--agent" },
  { name: "Texto", variable: "--ink" },
  { name: "Apoio", variable: "--muted" },
  { name: "Linha", variable: "--line-strong" },
  { name: "Sucesso", variable: "--ok" },
  { name: "Atenção", variable: "--warn" },
  { name: "Perigo", variable: "--danger" },
  { name: "Informação", variable: "--info" },
];

const TYPE = [
  { className: "tp-type__display", label: "Display", size: "32 / 600" },
  { className: "tp-type__title", label: "Título", size: "17 / 600" },
  { className: "tp-type__body", label: "Corpo", size: "15 / 400" },
  { className: "tp-type__mono", label: "Código", size: "12,5 / mono" },
];

export function TokensSection() {
  return (
    <section id="tokens" className="tp-section">
      <div className="tp-shell">
        <div className="tp-section__head">
          <p className="tp-kicker">Tokens semânticos</p>
          <h2 className="tp-h2">Um sistema, dois temas.</h2>
          <p className="tp-sub">
            Cada cor, raio e espaço vem de um token com nome de intenção. O tema é um atributo no <code>html</code>:
            trocar claro por escuro não redesenha componente nenhum, só troca os valores por baixo.
          </p>
        </div>

        <div className="tp-tokens">
          <div className="tp-swatches">
            {SWATCHES.map((swatch) => (
              <div key={swatch.variable} className="tp-swatch">
                <span
                  className="tp-swatch__chip"
                  style={{ "--swatch": `var(${swatch.variable})` } as CSSProperties}
                  aria-hidden="true"
                />
                <span>
                  <span className="tp-swatch__name">{swatch.name}</span>
                  <br />
                  <span className="tp-swatch__var">{swatch.variable}</span>
                </span>
              </div>
            ))}
          </div>

          <div className="tp-type">
            {TYPE.map((row) => (
              <div key={row.label} className="tp-type__row">
                <span className={row.className}>{row.label}</span>
                <span>{row.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
