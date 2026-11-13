import { FoldRow } from "@ui/components/FoldRow";

const QUESTIONS = [
  {
    title: "Preciso de Tailwind?",
    answer:
      "Não. O kit é CSS próprio, com nomes ac-* e tokens semânticos. O Tailwind saiu do projeto: nada no kit depende de classes utilitárias, de um plugin ou de um passo de build extra.",
  },
  {
    title: "Dá para usar só uma peça?",
    answer:
      "Sim. Cada componente é um arquivo com as classes que ele usa e um export próprio: import { Button } from \"faang-ui/components/Button\". O código-fonte também fica no repositório, se você preferir copiar.",
  },
  {
    title: "Como o tema funciona?",
    answer:
      "O elemento html carrega data-theme=\"light\" ou \"dark\". Todos os valores de cor vêm de custom properties que trocam com esse atributo; nenhum componente sabe qual tema está ativo, e não existem variantes dark: espalhadas.",
  },
  {
    title: "E a acessibilidade?",
    answer:
      "Os controles interativos — diálogos, menus, selects, abas, popovers, checkbox — usam Radix por baixo: foco preso onde precisa, teclado, ARIA e leitor de tela. O restante segue o mesmo contrato de foco visível e alvos de toque.",
  },
  {
    title: "Qual é a licença?",
    answer:
      "MIT. O código é aberto e pode ser usado, alterado e publicado como você quiser — inclusive dentro de um produto fechado.",
  },
  {
    title: "De onde vêm os retratos?",
    answer:
      "São desenhados pelo próprio kit. O motor monta o corpo, os olhos e o acessório em pixel; os PNGs de personagem e o céu em canvas completam a cena, sem banco de imagens.",
  },
];

export function FaqSection() {
  return (
    <section id="perguntas" className="tp-section">
      <div className="tp-shell">
        <div className="tp-section__head">
          <p className="tp-kicker">Perguntas</p>
          <h2 className="tp-h2">O que costuma vir antes.</h2>
        </div>

        <div className="tp-faq">
          {QUESTIONS.map((question) => (
            <FoldRow key={question.title} title={question.title}>
              <p>{question.answer}</p>
            </FoldRow>
          ))}
        </div>
      </div>
    </section>
  );
}
