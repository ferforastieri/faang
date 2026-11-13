export type CatalogGroup = "Base" | "Formulários" | "Conversa" | "Agente" | "Dados";

export const GROUPS: CatalogGroup[] = ["Base", "Formulários", "Conversa", "Agente", "Dados"];

export interface CatalogEntry {
  slug: string;
  name: string;
  group: CatalogGroup;
  summary: string;
  importPath: string;
  /** When the sample imports more than the entry's own name ("{ Card, CardHeader }"). */
  imports?: string;
  code: string;
  preview?: boolean;
}

export const ENTRIES: CatalogEntry[] = [
  {
    slug: "button",
    name: "Button",
    group: "Base",
    summary: "Ação com variante, tamanho e estado de carregamento. Uma principal por área.",
    importPath: "faang-ui/components/Button",
    code: `<Button variant="primary" icon="plus">Criar agente</Button>`,
    preview: true,
  },
  {
    slug: "chip",
    name: "Chip",
    group: "Base",
    summary: "Estado dito com ícone e palavra; nunca um ponto colorido solto.",
    importPath: "faang-ui/components/Chip",
    code: `<Chip icon="waiting" tone="waiting">Aguardando você</Chip>`,
    preview: true,
  },
  {
    slug: "kbd",
    name: "Kbd",
    group: "Base",
    summary: "A tecla à vista, ao lado do que ela faz.",
    importPath: "faang-ui/components/Kbd",
    code: `<Kbd>⌘</Kbd><Kbd>K</Kbd>`,
    preview: true,
  },
  {
    slug: "avatar",
    name: "Avatar",
    group: "Base",
    summary: "Pessoa ou agente no mesmo tile; o agente vem do motor de retratos.",
    importPath: "faang-ui/components/Avatar",
    code: `<Avatar kind="agent" name="Ada" appearance={{ color: "violet" }} />`,
    preview: true,
  },
  {
    slug: "card",
    name: "Card",
    group: "Base",
    summary: "Superfície neutra com cabeçalho, ação e estado nunca tintado.",
    importPath: "faang-ui/components/Surfaces",
    imports: "{ Card, CardHeader }",
    code: `<Card padded><CardHeader title="Agente" /></Card>`,
    preview: true,
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    group: "Base",
    summary: "A espera com a forma do que vem; nada de roda genérica.",
    importPath: "faang-ui/components/Skeleton",
    code: `<Skeleton width={160} />`,
    preview: true,
  },
  {
    slug: "spinner",
    name: "PixelSpinner",
    group: "Base",
    summary: "O indicador de trabalho do kit: um pixel orbitando na cor do agente.",
    importPath: "faang-ui/components/PixelSpinner",
    code: `<PixelSpinner label="Trabalhando" />`,
    preview: true,
  },
  {
    slug: "field",
    name: "Field",
    group: "Formulários",
    summary: "Rótulo visível, exemplo no lugar certo e o porquê atrás do ⓘ.",
    importPath: "faang-ui/components/Field",
    imports: "{ Field, Input }",
    code: `<Field label="Nome"><Input placeholder="Ada" /></Field>`,
    preview: true,
  },
  {
    slug: "segmented",
    name: "Segmented",
    group: "Formulários",
    summary: "Poucas opções, uma escolha; a pílula desliza sob a escolhida.",
    importPath: "faang-ui/components/Segmented",
    code: `<Segmented value={view} onValueChange={setView} options={options} label="Visão" />`,
    preview: true,
  },
  {
    slug: "select",
    name: "Select",
    group: "Formulários",
    summary: "Lista com grupos, descrições e ações, portais e teclado do Radix.",
    importPath: "faang-ui/components/Select",
    code: `<Select value={model} onValueChange={setModel} options={models} aria-label="Modelo" />`,
    preview: true,
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    group: "Formulários",
    summary: "Caixa com tri-estado e a pílula rotulada para escolhas em linha.",
    importPath: "faang-ui/components/Checkbox",
    imports: "{ CheckboxPill }",
    code: `<CheckboxPill id="review" checked={on} onCheckedChange={setOn}>Revisar</CheckboxPill>`,
    preview: true,
  },
  {
    slug: "tabs",
    name: "Tabs",
    group: "Formulários",
    summary: "Abas de linha ou segmentadas, com painel e setas do Radix.",
    importPath: "faang-ui/components/Tabs",
    code: `<Tabs value={tab} onValueChange={setTab} items={items} label="Seções">…</Tabs>`,
    preview: true,
  },
  {
    slug: "message",
    name: "Message",
    group: "Conversa",
    summary: "Linha de conversa com autor, hora, agrupamento e estado do agente.",
    importPath: "faang-ui/components/Message",
    code: `<Message agent author="Ada" time="09:12"><MessageText>…</MessageText></Message>`,
    preview: true,
  },
  {
    slug: "composer",
    name: "Composer",
    group: "Conversa",
    summary: "A caixa de escrever com anexo, menções, comandos e escolha de envio.",
    importPath: "faang-ui/components/Composer",
    code: `<Composer value={text} onChange={setText} onSend={send} label="Mensagem" sendLabel="Enviar" />`,
    preview: true,
  },
  {
    slug: "tool-block",
    name: "ToolBlock",
    group: "Conversa",
    summary: "O que o agente usou, em linhas que abrem no detalhe de cada chamada.",
    importPath: "faang-ui/components/ToolBlock",
    code: `<ToolBlock label="O que a Ada fez" head={{ text: "Usou 2 ferramentas" }} items={items} logos={[]} />`,
    preview: true,
  },
  {
    slug: "approval-card",
    name: "ApprovalCard",
    group: "Conversa",
    summary: "A ação sensível espera uma pessoa, com o porquê e o que será feito.",
    importPath: "faang-ui/components/ApprovalCard",
    code: `<ApprovalCard status="waiting" who={<><b>Ada</b> pede aprovação</>} title="Fazer merge" />`,
    preview: true,
  },
  {
    slug: "pixel-sky",
    name: "PixelSky",
    group: "Agente",
    summary: "O céu em pixel que acompanha o tema, desenhado em canvas.",
    importPath: "faang-ui/components/PixelSky",
    imports: "{ PixelSky, glowOptions }",
    code: `<PixelSky options={glowOptions("violet")} />`,
    preview: true,
  },
  {
    slug: "fact-strip",
    name: "FactStrip",
    group: "Dados",
    summary: "Fatos curtos com ícone, rótulo e valor, divididos por hairlines.",
    importPath: "faang-ui/components/FactStrip",
    code: `<FactStrip facts={facts} />`,
    preview: true,
  },
  {
    slug: "fold-row",
    name: "FoldRow",
    group: "Dados",
    summary: "Uma linha que abre no lugar, sem tirar o contexto da lista.",
    importPath: "faang-ui/components/FoldRow",
    code: `<FoldRow title="Detalhes">…</FoldRow>`,
    preview: true,
  },
  {
    slug: "step-track",
    name: "StepTrack",
    group: "Dados",
    summary: "As etapas de uma execução numa trilha horizontal, com a atual em foco.",
    importPath: "faang-ui/components/StepTrack",
    code: `<StepTrack steps={steps} />`,
    preview: true,
  },
];

export const entryBySlug = (slug: string) => ENTRIES.find((entry) => entry.slug === slug);
