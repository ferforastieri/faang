import { Button } from "@ui/components/Button";
import { FactStrip, type Fact } from "@ui/components/FactStrip";
import { Icon } from "@ui/icons/Icon";

import { AgentSection } from "@/components/landing/agent-section";
import { ChatDemo } from "@/components/landing/chat-demo";
import { FaqSection } from "@/components/landing/faq-section";
import { Pieces } from "@/components/landing/pieces";
import { SourceSection } from "@/components/landing/source-section";
import { TokensSection } from "@/components/landing/tokens-section";

const FACTS: Fact[] = [
  { key: "pieces", icon: "layers", label: "Peças", value: "101 componentes" },
  { key: "themes", icon: "preference", label: "Temas", value: "Claro e escuro" },
  { key: "keys", icon: "keyboard", label: "Teclado", value: "Foco em tudo" },
  { key: "css", icon: "code", label: "Estilo", value: "CSS puro" },
];

export default function LandingPage() {
  return (
    <>
      <section id="top" className="tp-hero">
        <span className="tp-hero__glow" aria-hidden="true" />
        <div className="tp-shell">
          <div className="tp-hero__grid">
            <div>
              <span className="tp-eyebrow">
                <Icon name="agent" size={14} />
                Sistema de design para agentes
              </span>

              <h1 className="tp-h1">
                A interface que o seu <em>agente</em> merece.
              </h1>

              <p className="tp-lead">
                Conversa, ferramentas, aprovações e o retrato do agente na mesma linguagem visual. Uma biblioteca React
                com 100+ peças, dois temas e acessibilidade de verdade — sem Tailwind e sem runtime de estilo.
              </p>

              <div className="tp-actions">
                <Button variant="primary" asChild>
                  <a href="#pecas">Explorar as peças</a>
                </Button>
                <Button asChild>
                  <a href="#tokens">Ler os tokens</a>
                </Button>
              </div>

              <p className="tp-meta">
                <span>
                  <Icon name="check" size={14} /> MIT
                </span>
                <span>
                  <Icon name="check" size={14} /> React 19
                </span>
                <span>
                  <Icon name="check" size={14} /> Radix por baixo
                </span>
              </p>
            </div>

            <ChatDemo />
          </div>

          <div className="tp-facts">
            <FactStrip facts={FACTS} />
          </div>
        </div>
      </section>

      <section id="pecas" className="tp-section tp-section--plain">
        <div className="tp-shell">
          <div className="tp-section__head">
            <p className="tp-kicker">As peças</p>
            <h2 className="tp-h2">O que um agente precisa, na mesma linguagem.</h2>
            <p className="tp-sub">
              Do botão à aprovação de uma ação sensível. Cada peça é um arquivo TypeScript com CSS próprio — sem
              utilitários, sem tema paralelo, sem dependência de layout.
            </p>
          </div>
          <Pieces />
        </div>
      </section>

      <AgentSection />
      <TokensSection />
      <SourceSection />

      <section id="ia" className="tp-section">
        <div className="tp-shell">
          <div className="tp-source">
            <div className="tp-section__head">
              <p className="tp-kicker">Runtime</p>
              <h2 className="tp-h2">O agente responde de verdade.</h2>
              <p className="tp-sub">
                No Worker, <code>/api/chat</code> fala com o Workers AI pelo binding <code>AI</code> — sem chave de
                modelo e com teto por visitante. No <code>next dev</code> não há binding, e o mesmo chat cai num
                roteiro para a página continuar viva; a tela diz qual dos dois está no ar.
              </p>
              <div className="tp-actions">
                <Button variant="primary" asChild>
                  <a href="/chat">Abrir o chat</a>
                </Button>
              </div>
            </div>

            <div className="tp-terminal">
              <div className="tp-terminal__note">{"// wrangler.jsonc"}</div>
              <div>{'"ai": {'}</div>
              <div>{'  "binding": "AI",'}</div>
              <div>{'  "remote": true'}</div>
              <div>{"}"}</div>
              <div> </div>
              <div className="tp-terminal__note">{"// app/api/chat/route.ts"}</div>
              <div>{'const answer = await ai.run(chosenModel, {'}</div>
              <div>{'  messages, stream: true, max_tokens: 1024,'}</div>
              <div>{"});"}</div>
            </div>
          </div>
        </div>
      </section>

      <FaqSection />

      <section className="tp-section">
        <div className="tp-shell">
          <div className="tp-cta">
            <span className="tp-hero__glow" aria-hidden="true" style={{ inset: "auto -10% -60% auto" }} />
            <div className="tp-cta__copy">
              <h2 className="tp-h2">Traga o seu agente para a mesma linguagem.</h2>
              <p className="tp-sub">
                A biblioteca é MIT: use, mude e publique. O código-fonte está em <code>packages/ui</code> e o pacote
                sai no npm como <code>faang-ui</code>.
              </p>
            </div>
            <div className="tp-cta__actions">
              <Button variant="primary" asChild>
                <a href="https://github.com/ferforastieri/faang" target="_blank" rel="noreferrer">
                  Ver no GitHub
                </a>
              </Button>
              <Button asChild>
                <a href="/docs">Ler a documentação</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
