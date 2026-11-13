"use client";

import { Avatar } from "@ui/components/Avatar";
import { FactStrip, type Fact } from "@ui/components/FactStrip";
import { PixelSky, glowOptions } from "@ui/components/PixelSky";
import type { AgentAppearance } from "@ui/components/AgentLook";

const FACES: { name: string; appearance: AgentAppearance }[] = [
  { name: "Ada", appearance: { color: "sky", eyes: "round", accessory: "crown" } },
  { name: "Bento", appearance: { color: "green", eyes: "dots", accessory: "headphones" } },
  { name: "Cora", appearance: { color: "rose", eyes: "happy", accessory: "flower" } },
  { name: "Dora", appearance: { color: "teal", eyes: "wide", accessory: "cap" } },
];

const FACTS: Fact[] = [
  { key: "eyes", icon: "eye", label: "Olhos", value: "5 expressões" },
  { key: "accessories", icon: "crown", label: "Acessórios", value: "12 peças" },
  { key: "colors", icon: "preference", label: "Cores", value: "8 + hex" },
];

export function AgentSection() {
  return (
    <section id="agente" className="tp-section">
      <div className="tp-shell">
        <div className="tp-section__head">
          <p className="tp-kicker">Arte em pixel</p>
          <h2 className="tp-h2">O agente tem rosto.</h2>
          <p className="tp-sub">
            Os retratos são desenhados pelo próprio kit — olhos, acessórios e cor — sobre um céu que respira. Nada de
            foto de estoque: cada agente é uma personagem, e a mesma na conversa, no recibo e na barra lateral.
          </p>
        </div>

        <div className="tp-agent">
          <div className="tp-agent__copy">
            <p className="tp-sub" style={{ marginTop: 0 }}>
              Um look é só um punhado de valores: cor, olhos e acessório. O <code>Avatar</code> desenha o resto em
              canvas e PNG, no mesmo traço do resto da interface. As cinco poses cobrem espera, escrita, sono e as
              reações do dia a dia.
            </p>
            <FactStrip facts={FACTS} style={{ marginTop: 22 }} />
          </div>

          <div className="tp-sky">
            <PixelSky options={glowOptions("sky", "--raised")} />
            <div className="tp-sky__faces">
              {FACES.map((face, index) => (
                <span key={face.name} className={`tp-face ${index % 2 === 0 ? "tp-face--up" : "tp-face--down"}`}>
                  <Avatar kind="agent" name={face.name} appearance={face.appearance} size="lg" />
                  <span>{face.name}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
