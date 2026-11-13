"use client";

import { AgentThinking } from "@ui/components/AgentThinking";
import { ApprovalCard } from "@ui/components/ApprovalCard";
import { Avatar } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import { Chip } from "@ui/components/Chip";
import { Composer } from "@ui/components/Composer";
import { DayDivider, Message, MessageText } from "@ui/components/Message";
import { ToolBlock } from "@ui/components/ToolBlock";
import { Icon } from "@ui/icons/Icon";
import { useEffect, useRef, useState } from "react";

type Line = { id: number; own?: boolean; text: string };

type Runtime = {
  configured: boolean;
  model?: string | null;
  reason?: string | null;
};

const OPENING: Line[] = [
  {
    id: 1,
    text: "Bom dia. Li as três issues novas e separei o que precisa de você: o merge do PR #42 e a resposta para a Acme.",
  },
];

const FOLLOW_UP = "Consultei o repositório e o quadro antes de responder.";

const REPLY =
  "Anotado. Vou abrir a issue no repositório, ligar ao PR #42 e deixar o resumo no canal #eng. Te aviso quando o teste de integração terminar.";

const ADA = { color: "sky" as const };

/** The history the model sees, in the UI-message shape the route validates. */
function history(lines: Line[], pending: string) {
  const messages = [
    { id: "opening", role: "assistant", parts: [{ type: "text", text: OPENING[0].text }] },
    { id: "tools", role: "assistant", parts: [{ type: "text", text: FOLLOW_UP }] },
    {
      id: "approval",
      role: "assistant",
      parts: [{ type: "text", text: "Pedi aprovação para fazer o merge do PR #42 em main." }],
    },
  ];

  for (const line of lines) {
    if (line.id === 1) continue;
    messages.push({
      id: String(line.id),
      role: line.own ? "user" : "assistant",
      parts: [{ type: "text", text: line.text }],
    });
  }

  messages.push({ id: "pending", role: "user", parts: [{ type: "text", text: pending }] });
  return messages;
}

/** Reads the UI-message SSE stream and hands each text delta to the caller. */
async function streamReply(messages: ReturnType<typeof history>, onDelta: (delta: string) => void) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok || !response.body) {
    const detail = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(detail?.message ?? `HTTP ${response.status}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const frames = buffer.split("\n");
    buffer = frames.pop() ?? "";

    for (const frame of frames) {
      const trimmed = frame.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      let data: { type?: string; delta?: string; errorText?: string };
      try {
        data = JSON.parse(payload);
      } catch {
        continue;
      }
      if (data.type === "text-delta" && typeof data.delta === "string") onDelta(data.delta);
      if (data.type === "error") throw new Error(data.errorText ?? "Workers AI não respondeu.");
    }
  }
}

export function ChatView() {
  const [lines, setLines] = useState<Line[]>(OPENING);
  const [text, setText] = useState("");
  const [approval, setApproval] = useState<"waiting" | "approved">("waiting");
  const [runtime, setRuntime] = useState<Runtime | null>(null);
  const [streaming, setStreaming] = useState<number | null>(null);
  const feed = useRef<HTMLDivElement>(null);
  const nextId = useRef(2);

  // The route says whether this runtime has the AI binding (a Worker) or not
  // (a plain `next dev`), so the screen can be honest before the first send.
  useEffect(() => {
    let alive = true;
    fetch("/api/chat")
      .then((response) => response.json())
      .then((data: Runtime) => alive && setRuntime(data))
      .catch(() => alive && setRuntime({ configured: false, reason: "Rota indisponível." }));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const el = feed.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, streaming]);

  async function send(value: string) {
    const trimmed = value.trim();
    if (!trimmed || streaming !== null) return;

    const own = nextId.current++;
    const answer = nextId.current++;
    setLines((current) => [...current, { id: own, own: true, text: trimmed }]);
    setText("");

    if (!runtime?.configured) {
      setTimeout(() => setLines((current) => [...current, { id: answer, text: REPLY }]), 700);
      return;
    }

    setLines((current) => [...current, { id: answer, text: "" }]);
    setStreaming(answer);

    try {
      await streamReply(history(lines, trimmed), (delta) => {
        setLines((current) =>
          current.map((line) => (line.id === answer ? { ...line, text: line.text + delta } : line)),
        );
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Workers AI não respondeu.";
      setLines((current) =>
        current.map((line) =>
          line.id === answer
            ? { ...line, text: `Não consegui falar com o Workers AI agora. ${message}` }
            : line,
        ),
      );
    } finally {
      setStreaming(null);
    }
  }

  const agent = <Avatar kind="agent" name="Ada" appearance={ADA} size="sm" />;
  const waiting = streaming !== null && !lines.find((line) => line.id === streaming)?.text;

  return (
    <div className="tp-chat">
      <div className="tp-chat__feed" ref={feed}>
        <div className="tp-chat__inner">
          <DayDivider day="2026-11-13">Hoje</DayDivider>

          <Message agent avatar={agent} author="Ada" time="09:12">
            <MessageText className="tp-msg-text">
              <p>{OPENING[0].text}</p>
            </MessageText>
          </Message>

          <Message agent grouped avatar={agent} author="Ada" time="09:12">
            <MessageText className="tp-msg-text">
              <p>{FOLLOW_UP}</p>
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

          <Message agent bare avatar={agent} author="Ada" time="09:13">
            <ApprovalCard
              status={approval}
              who={
                <>
                  <b>Ada</b> pede aprovação
                </>
              }
              statusLabel={approval === "approved" ? "Aprovado por você · agora" : "Aguardando você"}
              title={approval === "approved" ? undefined : "Fazer merge do PR #42 em main"}
              detail="github · acme/web · 2 arquivos"
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
                <Message
                  key={line.id}
                  agent
                  avatar={agent}
                  author="Ada"
                  time="agora"
                  streaming={streaming === line.id}
                >
                  <MessageText className="tp-msg-text">
                    <p>{line.text}</p>
                  </MessageText>
                </Message>
              ),
            )}

          {waiting && <AgentThinking label="Pensando" detail="Workers AI" color="sky" />}

          <p className="tp-chat__intro">
            <Chip icon="agent">Ada</Chip> está no canal <b>#eng</b> · 12 membros, 3 agentes ·{" "}
            {runtime === null
              ? "conectando…"
              : runtime.configured
                ? `Workers AI${runtime.model ? ` · ${runtime.model}` : ""}`
                : "modo demonstração (rode como Worker para o modelo real)"}
          </p>
        </div>
      </div>

      <div className="tp-chat__composer">
        <Composer
          value={text}
          onChange={setText}
          onSend={send}
          label="Mensagem para #eng"
          placeholder={streaming !== null ? "A Ada está respondendo…" : "Escreva para #eng…"}
          sendLabel="Enviar"
          attachLabel="Anexar"
          disabled={streaming !== null}
        />
      </div>
    </div>
  );
}
