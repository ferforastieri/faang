import { Button } from "@ui/components/Button";
import { Icon } from "@ui/icons/Icon";

import { ChatDemo } from "./chat-demo";
import { SectionHeading } from "./section-heading";

const SCREENS = [
  {
    href: "/chat",
    title: "Chat",
    description: "Conversa, ferramentas, aprovação e compositor na mesma tela.",
    icon: "message" as const,
  },
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Números, gráfico, aprovações e a tabela de execuções.",
    icon: "chart" as const,
  },
  {
    href: "/login",
    title: "Auth",
    description: "Entrada e cadastro com o mesmo cartão e os mesmos campos.",
    icon: "lock" as const,
  },
];

/** The old template showcase: one real screen in a frame, then the other two as doors. */
export function Screens() {
  return (
    <section id="telas" className="tp-section">
      <div className="tp-shell">
        <div className="tp-screens__head">
          <SectionHeading
            index="02"
            eyebrow="Telas"
            title="Uma tela inteira, não só as peças."
            description="O chat, o dashboard e o auth são montados com a mesma biblioteca; nenhum tem um CSS próprio além do layout."
          />
          <Button asChild>
            <a href="/chat">Abrir o chat</a>
          </Button>
        </div>

        <div className="tp-screens__screen">
          <ChatDemo />
        </div>

        <div className="tp-screens__links">
          {SCREENS.map((screen) => (
            <a key={screen.href} href={screen.href} className="tp-screenlink">
              <span className="tp-screenlink__key">
                <Icon name={screen.icon} size={18} />
              </span>
              <span className="tp-screenlink__text">
                <b>{screen.title}</b>
                <span>{screen.description}</span>
              </span>
              <Icon name="chevronRight" size={16} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
