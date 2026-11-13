"use client";

import { Button } from "@ui/components/Button";
import { Avatar } from "@ui/components/Avatar";
import { Composer } from "@ui/components/Composer";
import { Message, MessageText } from "@ui/components/Message";
import { ApprovalCard } from "@ui/components/ApprovalCard";
import { ToolBlock } from "@ui/components/ToolBlock";
import { Icon } from "@ui/icons/Icon";
import { useEffect, useRef, useState } from "react";

type Line = { id: number; own?: boolean; text: string };

const OPENING: Line[] = [
  {
    id: 1,
    text: "Bom dia. Li as três issues novas e separei o que precisa de você: o merge do PR #42 e a resposta para a Acme.",
  },
];

const REPLY =
  "Anotado. Vou abrir a issue no repositório, ligar ao PR #42 e deixar o resumo no canal #eng.";

/**
 * The hero's conversation: the kit's own Message, ToolBlock, ApprovalCard
 * and Composer with just enough state to feel alive. The agent's words are
 * canned; nothing here talks to a model.
 */
export function ChatDemo() {
  const [lines, setLines] = useState<Line[]>(OPENING);
  const [text, setText] = useState("");
  const [approval, setApproval] = useState<"waiting" | "approved">("waiting");
  const feed = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  // A new row scrolls into view, as a conversation does.
  useEffect(() => {
    const el = feed.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function send(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const own = nextId.current++;
    const reply = nextId.current++;
    setLines((current) => [...current, { id: own, own: true, text: trimmed }]);
    setText("");
    setTimeout(() => {
      setLines((current) => [...current, { id: reply, text: REPLY }]);
    }, 650);
  }

  const agent = (
    <Avatar kind="agent" name="Ada" appearance={{ color: "sky", eyes: "round" }} size="sm" />
  );

  return (
    <div className="tp-demo">
      <div className="tp-demo__bar">
        <span className="tp-demo__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="tp-demo__name">
          <Icon name="agent" size={14} />
          Ada
        </span>
        <span className="tp-demo__state">agente · trabalhando</span>
      </div>

      <div className="tp-demo__feed" ref={feed}>
        <Message agent avatar={agent} author="Ada" time="09:12">
          <MessageText className="tp-msg-text">
            <p>{OPENING[0].text}</p>
          </MessageText>
        </Message>

        <Message agent grouped avatar={agent} author="Ada" time="09:12">
          <MessageText className="tp-msg-text">
            <p>Consultei o repositório e o quadro antes de responder.</p>
          </MessageText>
          <ToolBlock
            label="O que a Ada fez"
            color="sky"
            logos={[<Icon key="repo" name="repo" size={14} />]}
            head={{ text: "Usou 3 ferramentas", state: "done", count: "3 passos", time: "6 s" }}
            items={[
              {
                kind: "line",
                line: {
                  key: "gh",
                  state: "done",
                  logo: <Icon name="repo" size={14} />,
                  label: "Consultou o repositório",
                  hint: "github",
                  time: "1,8 s",
                },
              },
              {
                kind: "line",
                line: {
                  key: "board",
                  state: "done",
                  logo: <Icon name="table" size={14} />,
                  label: "Leu o quadro de issues",
                  hint: "acme/board",
                  time: "2,1 s",
                },
              },
              {
                kind: "line",
                line: {
                  key: "pr",
                  state: "done",
                  logo: <Icon name="approve" size={14} />,
                  label: "Abriu o diff do PR #42",
                  hint: "github",
                  time: "2,4 s",
                },
              },
            ]}
          />
        </Message>

        <Message agent bare author="Ada" time="09:13" avatar={agent}>
          <ApprovalCard
            status={approval}
            who={
              <>
                <b>Ada</b> pede aprovação
              </>
            }
            statusLabel={approval === "approved" ? "Aprovado por você · agora" : "Aguardando você"}
            title={approval === "approved" ? undefined : "Fazer merge do PR #42 em main"}
            detail={<>github · acme/web · 2 arquivos</>}
            why={
              approval === "approved"
                ? undefined
                : "O teste de integração passou e o diff mexe só no parser de datas."
            }
            actions={
              approval === "waiting" ? (
                <>
                  <Button variant="primary" size="sm" onClick={() => setApproval("approved")}>
                    Aprovar
                  </Button>
                  <Button size="sm">Recusar</Button>
                </>
              ) : undefined
            }
            compact={approval === "approved"}
          />
        </Message>

        {lines
          .filter((line) => line.id !== 1)
          .map((line) =>
          line.own ? (
            <Message key={line.id} own author="Você" time="agora" run="solo">
              <MessageText className="tp-msg-text">
                <p>{line.text}</p>
              </MessageText>
            </Message>
          ) : (
            <Message key={line.id} agent avatar={agent} author="Ada" time="agora">
              <MessageText className="tp-msg-text">
                <p>{line.text}</p>
              </MessageText>
            </Message>
          ),
        )}
      </div>

      <div className="tp-demo__composer">
        <Composer
          value={text}
          onChange={setText}
          onSend={send}
          label="Mensagem para Ada"
          placeholder="Escreva para a Ada…"
          sendLabel="Enviar"
          attachLabel="Anexar"
        />
      </div>
    </div>
  );
}
