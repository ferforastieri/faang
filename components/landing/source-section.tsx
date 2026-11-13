import { Icon } from "@ui/icons/Icon";

const CHECKS = [
  "Radix por baixo: foco, teclado e leitor de tela já resolvidos.",
  "Dois temas por um atributo no html; nenhum dark: espalhado pelo código.",
  "CSS com nomes ac-* e tokens semânticos; nenhum runtime de estilo.",
  "TypeScript estrito, React 19 e licença MIT.",
];

/** The tree, line by line: `dir` is a folder or file, `note` the gray aside. */
const TREE: { text: string; tone?: "dir" | "note" }[] = [
  { text: "packages/ui/", tone: "note" },
  { text: "├── src/", tone: "dir" },
  { text: "│   ├── components/  # as 80 peças", tone: "note" },
  { text: "│   ├── agent/       # o motor do retrato", tone: "note" },
  { text: "│   ├── sky/         # o céu em pixel", tone: "note" },
  { text: "│   ├── tokens/      # valores compartilhados", tone: "note" },
  { text: "│   ├── i18n/        # locale e menções", tone: "note" },
  { text: "│   └── styles/      # tokens + componentes em CSS", tone: "note" },
  { text: "└── package.json     # os exports do pacote", tone: "note" },
  { text: "" },
  { text: "npm i faang-ui", tone: "dir" },
  { text: "" },
  { text: "// app/layout.tsx" },
  { text: 'import "faang-ui/styles.css";' },
  { text: "" },
  { text: "// em qualquer componente" },
  { text: 'import { Button } from "faang-ui/components/Button";' },
];

export function SourceSection() {
  return (
    <section id="codigo" className="tp-section">
      <div className="tp-shell">
        <div className="tp-section__head">
          <p className="tp-kicker">Biblioteca publicada</p>
          <h2 className="tp-h2">Instale ou copie.</h2>
          <p className="tp-sub">
            A UI é um pacote npm: <code>faang-ui</code>. O CSS entra uma vez, os componentes entram por import. E o
            código-fonte fica em <code>packages/ui</code>, no seu repositório, para quem quiser mudar por dentro.
          </p>
        </div>

        <div className="tp-source">
          <ul className="tp-checks">
            {CHECKS.map((check) => (
              <li key={check}>
                <Icon name="check" size={16} />
                <span>{check}</span>
              </li>
            ))}
          </ul>

          <div className="tp-terminal">
            {TREE.map((line, index) => (
              <div key={index} className={line.tone ? `tp-terminal__${line.tone}` : undefined}>
                {line.text || " "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
