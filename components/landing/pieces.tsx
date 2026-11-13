"use client";

import { ApprovalCard } from "@ui/components/ApprovalCard";
import { Button } from "@ui/components/Button";
import { Card } from "@ui/components/Surfaces";
import { CheckboxPill } from "@ui/components/Checkbox";
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

/**
 * Six pieces, each drawn by the component it names. The state is local: these
 * are real controls, not screenshots.
 */
export function Pieces() {
  const [view, setView] = useState<"lista" | "quadro">("lista");
  const [review, setReview] = useState(true);
  const [approved, setApproved] = useState(false);

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
