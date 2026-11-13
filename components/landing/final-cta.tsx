import { Button } from "@ui/components/Button";

import { InstallCommand } from "./install-command";

/** The last band: everything seen is installable, take the set or one piece. */
export function FinalCta() {
  return (
    <section className="tp-final">
      <div className="tp-shell tp-final__inner">
        <div className="tp-final__copy">
          <h2 className="tp-h2">Desmonte a demo.</h2>
          <p className="tp-sub">
            Tudo o que você viu é código instalável. Comece pelo conjunto inteiro ou pegue só o componente que
            precisa.
          </p>
        </div>
        <div className="tp-final__actions">
          <InstallCommand command="npx faang@latest add --all" />
          <div className="tp-final__buttons">
            <Button variant="primary" asChild>
              <a href="/components">Abrir o catálogo</a>
            </Button>
            <Button asChild>
              <a href="/chat">Ver o chat</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
