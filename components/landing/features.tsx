"use client";

import { Button } from "@ui/components/Button";
import { Composer } from "@ui/components/Composer";
import { ComposerLoader } from "@ui/components/ComposerLoader";
import { Icon } from "@ui/icons/Icon";
import { useState, type CSSProperties } from "react";

import { SectionHeading } from "./section-heading";

const SWATCHES = [
  { name: "Agente", variable: "--agent" },
  { name: "Texto", variable: "--ink" },
  { name: "Apoio", variable: "--muted" },
  { name: "Superfície", variable: "--raised" },
  { name: "Sucesso", variable: "--ok" },
  { name: "Atenção", variable: "--warn" },
  { name: "Perigo", variable: "--danger" },
  { name: "Informação", variable: "--info" },
];

function ComposerDemo() {
  const [text, setText] = useState("");

  return (
    <div className="tp-feature__composer">
      <ComposerLoader label="Trabalhando" />
      <Composer
        value={text}
        onChange={setText}
        onSend={() => setText("")}
        label="Mensagem para o agente"
        placeholder="Descreva o que o agente deve fazer…"
        sendLabel="Enviar"
        attachLabel="Anexar"
      />
      <p className="tp-feature__note">
        <Icon name="stop" size={14} />
        O botão de parar continua ao alcance enquanto o agente trabalha.
      </p>
    </div>
  );
}

export function Features() {
  return (
    <>
      <section className="tp-section">
        <div className="tp-shell tp-feature">
          <div className="tp-feature__copy">
            <SectionHeading
              index="03"
              eyebrow="A espera"
              title="A espera, visível."
              description="Enquanto o agente trabalha, uma faixa de luz atravessa o compositor. A pausa vira um estado com lugar na interface, em vez de um vazio."
            >
              <Button variant="primary" asChild>
                <a href="/chat">Ver no chat</a>
              </Button>
              <Button asChild>
                <a href="/docs/composer-loader">Docs do componente</a>
              </Button>
            </SectionHeading>
          </div>
          <div className="tp-feature__demo">
            <ComposerDemo />
          </div>
        </div>
      </section>

      <section className="tp-section">
        <div className="tp-shell tp-feature tp-feature--reverse">
          <div className="tp-feature__demo">
            <div className="tp-feature__tokens">
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
                <div className="tp-type__row">
                  <span className="tp-type__display">Display</span>
                  <span>32 / 600</span>
                </div>
                <div className="tp-type__row">
                  <span className="tp-type__title">Título</span>
                  <span>17 / 600</span>
                </div>
                <div className="tp-type__row">
                  <span className="tp-type__body">Corpo</span>
                  <span>15 / 400</span>
                </div>
                <div className="tp-type__row">
                  <span className="tp-type__mono">Código</span>
                  <span>12,5 / mono</span>
                </div>
              </div>
            </div>
          </div>

          <div className="tp-feature__copy">
            <SectionHeading
              index="04"
              eyebrow="Tokens"
              title="Um sistema, dois temas."
              description="Cores, raios e espaços vêm de tokens semânticos. Trocar o tema é trocar um atributo no html; nenhum componente precisa saber qual está ativo."
            >
              <Button asChild>
                <a href="/docs/color">Ler os tokens</a>
              </Button>
            </SectionHeading>
          </div>
        </div>
      </section>
    </>
  );
}
