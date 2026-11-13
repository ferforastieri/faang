import { Catalog } from "@/components/catalog/catalog";
import { INVENTORY } from "@/components/catalog/inventory";

export const metadata = {
  title: "Componentes — Faang",
  description: "As peças do Faang UI: prévia viva, import e documentação.",
};

export default function ComponentsPage() {
  return (
    <section className="tp-section tp-section--plain">
      <div className="tp-shell">
        <div className="tp-section__head">
          <p className="tp-kicker">Catálogo</p>
          <h1 className="tp-h2">As peças que constroem o produto.</h1>
          <p className="tp-sub">
            54 peças com prévia viva e documentação; o kit completo tem 101 arquivos em{" "}
            <code>packages/ui/src/components</code> e cada um tem um export próprio no pacote.
          </p>
        </div>

        <Catalog />

        <div className="tp-section__head" style={{ marginTop: 64 }}>
          <h2 className="tp-h2" style={{ fontSize: 22 }}>
            Todo o kit
          </h2>
          <p className="tp-sub">Os 101 componentes, em ordem alfabética.</p>
          <div className="tp-inventory">
            {INVENTORY.map((name) => (
              <code key={name}>{name}</code>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
