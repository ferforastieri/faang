const VALUES = [
  {
    title: "Código, não caixa-preta",
    body: "O kit vive em packages/ui e sai no npm como faang-ui. Leia, mude e publique; não há dependência fechada no meio.",
  },
  {
    title: "Uma linguagem só",
    body: "101 componentes, tokens semânticos e dois temas na mesma linguagem. O que você vê no catálogo é o que o app usa.",
  },
  {
    title: "Acessível por padrão",
    body: "Os controles interativos usam Radix: foco, teclado e leitor de tela resolvidos antes de qualquer estilo.",
  },
];

export function Values() {
  return (
    <section className="tp-values">
      <div className="tp-shell">
        <div className="tp-values__panel">
          {VALUES.map((value, index) => (
            <div key={value.title} className="tp-value">
              <span className="tp-value__index">{String(index + 1).padStart(2, "0")}</span>
              <h2 className="tp-value__title">{value.title}</h2>
              <p className="tp-value__body">{value.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
