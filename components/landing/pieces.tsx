"use client";

import { ApprovalCard } from "@ui/components/ApprovalCard";
import { Button } from "@ui/components/Button";
import { Card } from "@ui/components/Surfaces";
import { CheckboxPill, SwitchCard } from "@ui/components/Checkbox";
import { Breadcrumb } from "@ui/components/Breadcrumb";
import { Divider } from "@ui/components/Divider";
import { Notification } from "@ui/components/Notification";
import { Slider } from "@ui/components/Slider";
import { Table, type TableColumn } from "@ui/components/Table";
import { AttentionNote, Chip } from "@ui/components/Chip";
import { FactStrip } from "@ui/components/FactStrip";
import { Field, Input } from "@ui/components/Field";
import { Kbd } from "@ui/components/Kbd";
import { Segmented } from "@ui/components/Segmented";
import { ToolBlock } from "@ui/components/ToolBlock";
import { Icon } from "@ui/icons/Icon";
import { useState } from "react";

function Piece({
  title,
  note,
  wide,
  children,
}: {
  title: string;
  note: string;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Card as="div" className={`tp-piece${wide ? " tp-piece--wide" : ""}`}>
      <div className="tp-piece__head">
        <h3 className="tp-piece__title">{title}</h3>
        <p className="tp-piece__note">{note}</p>
      </div>
      <div className="tp-piece__demo">{children}</div>
    </Card>
  );
}

type Run = { id: string; agent: string; action: string; time: string };

const TABLE_COLUMNS: TableColumn<Run>[] = [
  { key: "agent", title: "Agente", sortable: true },
  { key: "action", title: "Ação", sortable: true },
  { key: "time", title: "Hora", align: "end" },
];

const TABLE_ROWS: Run[] = [
  { id: "1", agent: "Ada", action: "Abriu o PR #42", time: "09:12" },
  { id: "2", agent: "Bento", action: "Importou 1.204 pedidos", time: "08:54" },
  { id: "3", agent: "Cora", action: "Publicou o relatório", time: "08:31" },
];

/**
 * Twelve pieces, each drawn by the component it names. The state is local: these
 * are real controls, not screenshots.
 */
export function Pieces() {
  const [view, setView] = useState<"lista" | "quadro">("lista");
  const [review, setReview] = useState(true);
  const [approved, setApproved] = useState(false);
  const [digest, setDigest] = useState(true);
  const [effort, setEffort] = useState(62);
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <div className="tp-grid tp-grid--3">
      <Piece title="Ações" note="Uma ação principal por área; o resto é silêncio.">
        <Button variant="primary" size="sm" icon="plus">
          Criar agente
        </Button>
        <Button size="sm">Duplicar</Button>
        <Button variant="ghost" size="sm" icon="settings" iconOnly aria-label="Ajustes" />
      </Piece>

      <Piece title="Estados" note="Estado se diz com ícone e palavra, nunca com um ponto colorido.">
        <Chip icon="check" tone="done">
          Concluído
        </Chip>
        <Chip icon="waiting" tone="waiting">
          Aguardando você
        </Chip>
        <Chip icon="agent">Ada trabalhando</Chip>
        <AttentionNote>pede aprovação</AttentionNote>
      </Piece>

      <Piece title="Campos" note="Rótulo visível, exemplo no lugar certo e o porquê atrás do ⓘ.">
        <Field
          label="Nome do agente"
          hint={{ name: "Nome", text: "Como o agente aparece nas conversas e nos recibos." }}
          example="ex.: Ada"
          className="tp-field"
        >
          <Input placeholder="Ada" defaultValue="Ada" />
        </Field>
      </Piece>

      <Piece title="Escolhas" note="Poucas opções, uma escolha; o resto se lê de relance.">
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
        <CheckboxPill id="tp-review" checked={review} onCheckedChange={setReview}>
          Revisar antes de enviar
        </CheckboxPill>
      </Piece>

      <Piece title="Atalhos" note="O teclado é cidadão de primeira classe, com a tecla à vista.">
        <div className="tp-kbd">
          <span className="tp-kbd__row">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </span>
          <span className="tp-kbd__row">
            <Kbd>⌘</Kbd>
            <Kbd>↵</Kbd>
          </span>
        </div>
        <Button size="sm" kbd={["⌘", "K"]}>
          Abrir a busca
        </Button>
        <span className="tp-kbd__note">Foco visível em tudo o que recebe tecla.</span>
      </Piece>

      <Piece title="Ferramentas" note="O que o agente usou, em linhas que abrem no detalhe.">
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
                label: "Leu o banco de produção",
                hint: "postgres",
                time: "2,2 s",
              },
            },
          ]}
        />
      </Piece>

      <Piece title="Fatos" note="O resumo de uma linha, dividido por hairlines.">
        <FactStrip
          facts={[
            { key: "where", icon: "channel", label: "Onde", value: "#eng" },
            { key: "effect", icon: "bolt", label: "Efeito", value: "3 arquivos" },
            { key: "when", icon: "clock", label: "Prazo", value: "hoje" },
          ]}
        />
      </Piece>

      <Piece title="Ajustes" note="Liga e desliga, e uma faixa com o número sempre à vista.">
        <SwitchCard
          id="landing-digest"
          checked={digest}
          onCheckedChange={setDigest}
          title="Resumo diário"
          description="Um e-mail com o que os agentes fizeram."
        />
        <Slider value={[effort]} onValueChange={([next]) => setEffort(next)} label="Esforço" format={(n) => `${n}%`} />
      </Piece>

      <Piece title="Tabela" note="Colunas ordenáveis e seleção; o cabeçalho não sai da vista.">
        <Table
          columns={TABLE_COLUMNS}
          rows={TABLE_ROWS}
          getKey={(row) => row.id}
          label="Execuções"
          selected={selected}
          onSelectedChange={setSelected}
        />
      </Piece>

      <Piece title="Avisos" note="O que aconteceu, com tom, ícone e uma ação.">
        <Notification
          tone="done"
          title="Publicado"
          description="O relatório já está no ar para o time."
          action={
            <Button variant="ghost" size="sm">
              Ver
            </Button>
          }
        />
        <Notification tone="attention" title="Espera você" description="Ada pede aprovação do merge." />
      </Piece>

      <Piece title="Trilha" note="O caminho até a tela e a régua entre blocos.">
        <Breadcrumb
          items={[
            { label: "Acme", href: "/" },
            { label: "eng", href: "/chat" },
            { label: "PR #42" },
          ]}
        />
        <Divider label="ou" />
      </Piece>

      <Piece title="Aprovação" note="A ação sensível espera uma pessoa, com o porquê junto." wide>
        <ApprovalCard
          status={approved ? "approved" : "waiting"}
          who={
            <>
              <b>Ada</b> pede aprovação
            </>
          }
          statusLabel={approved ? "Aprovado por você · agora" : "Aguardando você"}
          title={approved ? undefined : "Publicar o relatório de setembro"}
          detail="notion · acme/relatórios"
          why={approved ? undefined : "O relatório sai do rascunho e vai para o time inteiro."}
          actions={
            approved ? undefined : (
              <>
                <Button variant="primary" size="sm" onClick={() => setApproved(true)}>
                  Aprovar
                </Button>
                <Button size="sm">Recusar</Button>
              </>
            )
          }
          compact={approved}
        />
      </Piece>
    </div>
  );
}
