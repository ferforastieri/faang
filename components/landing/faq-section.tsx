import { Button } from "@ui/components/Button";

import { SectionHeading } from "./section-heading";

const FAQ = [
  {
    question: "A biblioteca inteira é gratuita?",
    answer:
      "Sim. Todos os componentes, tokens, telas e documentação são MIT: sem plano pago, sem chave e sem login.",
  },
  {
    question: "Como instalo um componente?",
    answer:
      "Com o CLI — npx faang@latest add data-table — ou com npm i faang-ui e o import direto. O CSS entra uma vez no layout.",
  },
  {
    question: "O código é meu?",
    answer:
      "É. O kit vive em packages/ui no seu repositório e o pacote leva o mesmo código-fonte. Você edita e publica como quiser.",
  },
  {
    question: "Posso usar em projetos comerciais?",
    answer: "Sim. MIT permite uso comercial, alteração e redistribuição; mantenha o aviso de licença no que redistribuir.",
  },
  {
    question: "Quais tecnologias o kit usa?",
    answer: "React 19 e Next.js no site, CSS próprio com tokens semânticos e Radix nos controles interativos.",
  },
  {
    question: "Tem tema escuro?",
    answer:
      "Todo componente lê tokens semânticos; data-theme=\"dark\" no html troca os valores. Nada é escrito duas vezes.",
  },
  {
    question: "E a acessibilidade?",
    answer:
      "Diálogos, menus, selects, abas e popovers usam Radix: foco preso onde precisa, teclado, ARIA e leitor de tela. O resto segue o mesmo contrato de foco visível.",
  },
];

export function FaqSection() {
  return (
    <section id="perguntas" className="tp-section">
      <div className="tp-shell">
        <div className="tp-faq__head">
          <SectionHeading
            index="03"
            eyebrow="Perguntas"
            title="As perguntas antes do primeiro install."
            description="Licença, CLI e o que está por baixo dos componentes. O resto fica nas issues do GitHub."
          />
          <Button asChild>
            <a href="https://github.com/ferforastieri/faang/issues" target="_blank" rel="noreferrer">
              Perguntar no GitHub
            </a>
          </Button>
        </div>

        <div className="tp-faq__list">
          {FAQ.map((item, index) => (
            <div key={item.question} className="tp-faq__row">
              <h3>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item.question}
              </h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
