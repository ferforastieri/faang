import { Button } from "@ui/components/Button";

import { FaqSection } from "@/components/landing/faq-section";
import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { HeroWindow } from "@/components/landing/hero-window";
import { InstallCommand } from "@/components/landing/install-command";
import { Screens } from "@/components/landing/screens";
import { Showcase } from "@/components/landing/showcase";
import { Values } from "@/components/landing/values";

export default function LandingPage() {
  return (
    <>
      <section id="top" className="tp-hero">
        <span className="tp-hero__glow" aria-hidden="true" />
        <div className="tp-shell">
          <div className="tp-hero__grid">
            <div>
              <p className="tp-hero__eyebrow">
                <span className="tp-heading__line" aria-hidden="true" />
                101 componentes · MIT
              </p>

              <h1 className="tp-h1">
                Um sistema de design que parece produto, <em>não uma demo.</em>
              </h1>

              <p className="tp-lead">
                Os componentes desta página são a biblioteca: o catálogo, a documentação e o comando de instalação
                leem do mesmo código. Leve o que precisar, fique com os arquivos e publique como seu.
              </p>

              <div className="tp-actions">
                <Button variant="primary" asChild>
                  <a href="/components">Explorar a biblioteca</a>
                </Button>
                <Button asChild>
                  <a href="/chat">Ver as telas</a>
                </Button>
              </div>

              <div className="tp-hero__install">
                <InstallCommand command="npx faang@latest add --all" />
              </div>
            </div>

            <HeroWindow />
          </div>
        </div>
      </section>

      <Values />
      <Showcase />
      <Screens />
      <Features />
      <FaqSection />
      <FinalCta />
    </>
  );
}
