"use client";

import { ApprovalCard } from "@ui/components/ApprovalCard";
import { Avatar } from "@ui/components/Avatar";
import { Button } from "@ui/components/Button";
import { CheckboxPill } from "@ui/components/Checkbox";
import { Chip } from "@ui/components/Chip";
import { Composer } from "@ui/components/Composer";
import { FactStrip } from "@ui/components/FactStrip";
import { Field, Input } from "@ui/components/Field";
import { FoldRow } from "@ui/components/FoldRow";
import { Kbd } from "@ui/components/Kbd";
import { Message, MessageText } from "@ui/components/Message";
import { PixelSky, glowOptions } from "@ui/components/PixelSky";
import { PixelSpinner } from "@ui/components/PixelSpinner";
import { Segmented } from "@ui/components/Segmented";
import { Select } from "@ui/components/Select";
import { Skeleton } from "@ui/components/Skeleton";
import { Card, CardHeader } from "@ui/components/Surfaces";
import { StepTrack } from "@ui/components/StepTrack";
import { TabPanel, Tabs } from "@ui/components/Tabs";
import { ToolBlock } from "@ui/components/ToolBlock";
import { Icon } from "@ui/icons/Icon";
import { useState } from "react";

function ButtonPreview() {
  return (
    <>
      <Button variant="primary" size="sm" icon="plus">
        Criar agente
      </Button>
      <Button size="sm">Duplicar</Button>
      <Button variant="ghost" size="sm" icon="settings" iconOnly aria-label="Ajustes" />
    </>
  );
}

function ChipPreview() {
  return (
    <>
      <Chip icon="check" tone="done">
        Concluído
      </Chip>
      <Chip icon="waiting" tone="waiting">
        Aguardando você
      </Chip>
      <Chip icon="agent">Ada trabalhando</Chip>
    </>
  );
}

function KbdPreview() {
  return (
    <>
      <span className="tp-kbd__row">
        <Kbd>⌘</Kbd>
        <Kbd>K</Kbd>
      </span>
      <span className="tp-kbd__row">
        <Kbd>⌘</Kbd>
        <Kbd>↵</Kbd>
      </span>
    </>
  );
}

function AvatarPreview() {
  return (
    <>
      <Avatar kind="agent" name="Ada" appearance={{ color: "violet", accessory: "crown" }} />
      <Avatar kind="agent" name="Bento" appearance={{ color: "green", accessory: "headphones" }} />
      <Avatar kind="agent" name="Cora" appearance={{ color: "rose", accessory: "flower" }} />
      <Avatar name="Fernando" />
    </>
  );
}

function CardPreview() {
  return (
    <Card padded style={{ width: "100%" }}>
      <CardHeader
        icon="agent"
        title="Agente"
        subtitle="Ada · revisão de código"
        action={
          <Button variant="ghost" size="sm" icon="more" iconOnly aria-label="Mais ações" />
        }
      />
    </Card>
  );
}

function SkeletonPreview() {
  return (
    <span style={{ display: "grid", gap: 8, width: "100%" }}>
      <Skeleton width="70%" />
      <Skeleton width="100%" />
      <Skeleton width="45%" />
    </span>
  );
}

function SpinnerPreview() {
  return (
    <>
      <PixelSpinner label="Trabalhando" />
      <span className="tp-preview__note">o mesmo indicador em toda a interface</span>
    </>
  );
}

function FieldPreview() {
  return (
    <Field
      label="Nome do agente"
      hint={{ name: "Nome", text: "Como o agente aparece nas conversas." }}
      example="ex.: Ada"
      style={{ width: "100%" }}
    >
      <Input placeholder="Ada" defaultValue="Ada" />
    </Field>
  );
}

function SegmentedPreview() {
  const [view, setView] = useState<"lista" | "quadro">("lista");
  return (
    <Segmented
      value={view}
      onValueChange={setView}
      label="Visualização"
      size="sm"
      options={[
        { value: "lista", label: "Lista" },
        { value: "quadro", label: "Quadro" },
      ]}
    />
  );
}

const MODELS = [
  { value: "sonnet", label: "Sonnet 5.5", group: "Anthropic" },
  { value: "opus", label: "Opus 5", group: "Anthropic" },
  { value: "gpt", label: "GPT-6", group: "OpenAI" },
];

function SelectPreview() {
  const [model, setModel] = useState("sonnet");
  return (
    <Select
      value={model}
      onValueChange={setModel}
      options={MODELS}
      aria-label="Modelo"
      size="sm"
    />
  );
}

function CheckboxPreview() {
  const [on, setOn] = useState(true);
  return (
    <CheckboxPill id="catalog-review" checked={on} onCheckedChange={setOn}>
      Revisar antes de enviar
    </CheckboxPill>
  );
}

function TabsPreview() {
  const [tab, setTab] = useState("resumo");
  return (
    <span style={{ display: "block", width: "100%" }}>
      <Tabs
        value={tab}
        onValueChange={setTab}
        label="Seções"
        variant="segmented"
        items={[
          { value: "resumo", label: "Resumo" },
          { value: "historico", label: "Histórico" },
        ]}
      >
        <TabPanel value={tab}>
          <span className="tp-preview__note">O painel acompanha a aba escolhida.</span>
        </TabPanel>
      </Tabs>
    </span>
  );
}

function MessagePreview() {
  return (
    <Message
      agent
      avatar={<Avatar kind="agent" name="Ada" appearance={{ color: "violet" }} size="sm" />}
      author="Ada"
      time="09:12"
    >
      <MessageText className="tp-msg-text">
        <p>Li as três issues novas e já separei o que precisa de você.</p>
      </MessageText>
    </Message>
  );
}

function ComposerPreview() {
  const [text, setText] = useState("");
  return (
    <Composer
      value={text}
      onChange={setText}
      onSend={() => setText("")}
      label="Mensagem para Ada"
      placeholder="Escreva para a Ada…"
      sendLabel="Enviar"
      attachLabel="Anexar"
    />
  );
}

function ToolBlockPreview() {
  return (
    <ToolBlock
      label="O que a Ada fez"
      color="violet"
      logos={[<Icon key="repo" name="repo" size={14} />]}
      head={{ text: "Usou 2 ferramentas", state: "done", count: "2 passos", time: "4 s" }}
      items={[
        {
          kind: "line",
          line: {
            key: "repo",
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
            key: "db",
            state: "done",
            logo: <Icon name="database" size={14} />,
            label: "Leu o banco",
            hint: "postgres",
            time: "2,2 s",
          },
        },
      ]}
    />
  );
}

function ApprovalPreview() {
  const [status, setStatus] = useState<"waiting" | "approved">("waiting");
  return (
    <ApprovalCard
      status={status}
      who={<><b>Ada</b> pede aprovação</>}
      statusLabel={status === "approved" ? "Aprovado por você · agora" : "Aguardando você"}
      title={status === "approved" ? undefined : "Fazer merge do PR #42 em main"}
      detail="github · acme/web"
      actions={
        status === "waiting" ? (
          <Button variant="primary" size="sm" onClick={() => setStatus("approved")}>
            Aprovar
          </Button>
        ) : undefined
      }
      compact={status === "approved"}
    />
  );
}

function SkyPreview() {
  return (
    <span className="tp-preview__sky">
      <PixelSky options={glowOptions("violet", "--raised")} />
    </span>
  );
}

function FactsPreview() {
  return (
    <FactStrip
      facts={[
        { key: "where", icon: "channel", label: "Onde", value: "#eng" },
        { key: "effect", icon: "bolt", label: "Efeito", value: "3 arquivos" },
        { key: "when", icon: "clock", label: "Prazo", value: "hoje" },
      ]}
    />
  );
}

function FoldPreview() {
  return (
    <div style={{ width: "100%" }}>
      <FoldRow title="O que muda nesta versão">
        <p>Aprovações, ferramentas e o compositor na mesma linguagem.</p>
      </FoldRow>
    </div>
  );
}

function StepPreview() {
  return (
    <StepTrack
      steps={[
        { key: "read", icon: "repo", label: "Leu o PR", state: "done", time: "1,2 s" },
        { key: "test", icon: "check", label: "Rodou os testes", state: "done", time: "4,8 s" },
        { key: "ask", icon: "approve", label: "Pede aprovação", state: "now" },
      ]}
    />
  );
}

const PREVIEWS: Record<string, () => React.ReactNode> = {
  button: ButtonPreview,
  chip: ChipPreview,
  kbd: KbdPreview,
  avatar: AvatarPreview,
  card: CardPreview,
  skeleton: SkeletonPreview,
  spinner: SpinnerPreview,
  field: FieldPreview,
  segmented: SegmentedPreview,
  select: SelectPreview,
  checkbox: CheckboxPreview,
  tabs: TabsPreview,
  message: MessagePreview,
  composer: ComposerPreview,
  "tool-block": ToolBlockPreview,
  "approval-card": ApprovalPreview,
  "pixel-sky": SkyPreview,
  "fact-strip": FactsPreview,
  "fold-row": FoldPreview,
  "step-track": StepPreview,
};

/** The live preview of a catalogue entry; entries without one say so on the page. */
export function CatalogPreview({ slug }: { slug: string }) {
  const Preview = PREVIEWS[slug];
  if (!Preview) return <span className="tp-preview__note">Sem prévia: veja o código em /docs/{slug}.</span>;
  return <Preview />;
}
