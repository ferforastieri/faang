"use client";

import { AgentThinking } from "@ui/components/AgentThinking";
import { Announcement } from "@ui/components/Announcement";
import { ApprovalCard } from "@ui/components/ApprovalCard";
import { AreaChart, BarChart } from "@ui/components/Charts";
import { Breadcrumb } from "@ui/components/Breadcrumb";
import { ButtonGroup } from "@ui/components/ButtonGroup";
import { Carousel } from "@ui/components/Carousel";
import { CloseButton } from "@ui/components/CloseButton";
import { CodeInput } from "@ui/components/CodeInput";
import { ComposerLoader } from "@ui/components/ComposerLoader";
import { DataGrid } from "@ui/components/DataGrid";
import { DataTable } from "@ui/components/DataTable";
import { DatePicker } from "@ui/components/DatePicker";
import { Divider } from "@ui/components/Divider";
import { FileUpload } from "@ui/components/FileUpload";
import { Notification } from "@ui/components/Notification";
import { NotificationCenter } from "@ui/components/NotificationCenter";
import { Pagination } from "@ui/components/Pagination";
import { RadioCard, RadioGroup, Switch, SwitchCard } from "@ui/components/Checkbox";
import { SettingsDialog } from "@ui/components/SettingsDialog";
import { Sidebar } from "@ui/components/Sidebar";
import { Slider } from "@ui/components/Slider";
import { SocialButton } from "@ui/components/SocialButton";
import { StatCard } from "@ui/components/StatCard";
import { Table, type TableColumn } from "@ui/components/Table";
import { Textarea } from "@ui/components/Field";
import { TreeView } from "@ui/components/TreeView";
import { LogoMark } from "@ui/components/Logo";
import { Menu, MenuItem, MenuSeparator } from "@ui/components/Menu";
import { Tip } from "@ui/components/Tip";
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

function InputOtpPreview() {
  const [code, setCode] = useState("");
  return (
    <CodeInput
      length={6}
      value={code}
      onChange={setCode}
      label="Código de verificação"
      boxLabel={(position, length) => `Dígito ${position} de ${length}`}
    />
  );
}

function RadioPreview() {
  const [plan, setPlan] = useState("pro");
  return (
    <RadioGroup value={plan} onValueChange={setPlan} aria-label="Plano" style={{ width: "100%" }}>
      <RadioCard id="radio-pro" value="pro" checked={plan === "pro"} title="Pro" description="Para times que já usam agentes." />
      <RadioCard id="radio-free" value="free" checked={plan === "free"} title="Grátis" description="Para experimentar." />
    </RadioGroup>
  );
}

function SwitchPreview() {
  const [on, setOn] = useState(true);
  return (
    <span style={{ display: "grid", gap: 12, width: "100%" }}>
      <SwitchCard
        id="switch-digest"
        checked={on}
        onCheckedChange={setOn}
        title="Resumo diário"
        description="Um e-mail com o que os agentes fizeram."
      />
      <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Switch checked={on} onCheckedChange={setOn} aria-label="Ativo" />
        <span className="tp-preview__note">{on ? "ligado" : "desligado"}</span>
      </span>
    </span>
  );
}

function SliderPreview() {
  const [value, setValue] = useState(62);
  return <Slider value={[value]} onValueChange={([next]) => setValue(next)} label="Esforço" format={(n) => `${n}%`} />;
}

function TextareaPreview() {
  return (
    <Field label="Instruções" example="o que o agente deve fazer" style={{ width: "100%" }}>
      <Textarea placeholder="Revise o PR #42 e deixe um resumo no canal." autoGrow />
    </Field>
  );
}

function DatePickerPreview() {
  const [date, setDate] = useState<string | null>("2026-11-13");
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      locale="pt-BR"
      labels={{ previousMonth: "Mês anterior", nextMonth: "Próximo mês", choose: "Escolher data" }}
      onClear={() => setDate(null)}
      size="sm"
    />
  );
}

function CarouselPreview() {
  return (
    <Carousel label="Sugestões" previousLabel="Anterior" nextLabel="Próximo" className="tp-carousel">
      {["Revisar PR", "Resumir issue", "Rodar testes", "Publicar nota", "Abrir incidente"].map((label) => (
        <Chip key={label}>{label}</Chip>
      ))}
    </Carousel>
  );
}

function FileUploadPreview() {
  const [files, setFiles] = useState<{ name: string; size?: number; status?: "uploading" | "done" | "failed"; progress?: number }[]>([
    { name: "relatorio.pdf", size: 820_000, status: "done" },
  ]);
  return (
    <FileUpload
      label="Arraste o relatório"
      hint="PDF ou PNG"
      accept=".pdf,.png"
      maxSize={5 * 1024 * 1024}
      files={files}
      onFiles={(picked) => setFiles((current) => [...current, ...picked.map((file) => ({ name: file.name, size: file.size, status: "done" as const }))])}
      onRemove={(index) => setFiles((current) => current.filter((_, position) => position !== index))}
    />
  );
}

function SocialPreview() {
  return (
    <span style={{ display: "grid", gap: 8, width: "100%" }}>
      <SocialButton provider="github" label="Continuar com GitHub" />
      <SocialButton provider="google" label="Continuar com Google" />
    </span>
  );
}

function IconButtonPreview() {
  return (
    <>
      <Button icon="settings" iconOnly aria-label="Ajustes" />
      <Button icon="search" iconOnly aria-label="Buscar" size="sm" variant="ghost" />
      <Button icon="more" iconOnly aria-label="Mais" size="sm" variant="ghost" />
    </>
  );
}

function LinkButtonPreview() {
  return (
    <>
      <Button variant="link">Editar</Button>
      <Button variant="link">Mudar</Button>
      <Button variant="link">Ver</Button>
    </>
  );
}

function AnnouncementPreview() {
  return (
    <Announcement
      title="Aprovações com prazo"
      description="Toda ação sensível agora expira em 24 h."
      icon="bulb"
      tone="info"
      dismissible
      action={<Button size="sm">Ver o que mudou</Button>}
    />
  );
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb
      items={[
        { label: "Acme", href: "/" },
        { label: "eng", href: "/chat" },
        { label: "PR #42" },
      ]}
    />
  );
}

function ButtonGroupPreview() {
  return (
    <ButtonGroup label="Período">
      <Button size="sm">Dia</Button>
      <Button size="sm">Semana</Button>
      <Button size="sm">Mês</Button>
    </ButtonGroup>
  );
}

function CloseButtonPreview() {
  return (
    <>
      <CloseButton label="Fechar" />
      <CloseButton label="Fechar" size="sm" />
    </>
  );
}

function DividerPreview() {
  return <Divider label="ou" />;
}

function NotificationPreview() {
  return (
    <span style={{ display: "grid", gap: 8, width: "100%" }}>
      <Notification tone="done" title="Publicado" description="O relatório já está no ar." />
      <Notification tone="attention" title="Espera você" description="Ada pede aprovação do merge." />
    </span>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} pageCount={24} onPageChange={setPage} />;
}

type Run = { id: string; agent: string; action: string; time: string };

const RUN_COLUMNS: TableColumn<Run>[] = [
  { key: "agent", title: "Agente", sortable: true },
  { key: "action", title: "Ação", sortable: true },
  { key: "time", title: "Hora", align: "end" },
];

const RUNS: Run[] = [
  { id: "1", agent: "Ada", action: "Abriu o PR #42", time: "09:12" },
  { id: "2", agent: "Bento", action: "Importou 1.204 pedidos", time: "08:54" },
  { id: "3", agent: "Cora", action: "Publicou o relatório", time: "08:31" },
];

function TablePreview() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Table
      columns={RUN_COLUMNS}
      rows={RUNS}
      getKey={(row) => row.id}
      label="Execuções"
      selected={selected}
      onSelectedChange={setSelected}
    />
  );
}

const TREE = [
  {
    id: "agents",
    label: "Agentes",
    icon: "agent" as const,
    children: [
      { id: "ada", label: "Ada", icon: "document" as const },
      { id: "bento", label: "Bento", icon: "document" as const },
    ],
  },
  {
    id: "skills",
    label: "Habilidades",
    icon: "drive" as const,
    children: [
      { id: "review", label: "review", icon: "page" as const },
      { id: "deploy", label: "deploy", icon: "page" as const },
    ],
  },
];

function TreePreview() {
  const [selected, setSelected] = useState("ada");
  return <TreeView items={TREE} selected={selected} onSelect={setSelected} defaultOpen={["agents"]} label="Arquivos" />;
}

function ThinkingPreview() {
  return <AgentThinking label="Lendo o repositório" detail="3 arquivos" color="violet" />;
}

function LoaderPreview() {
  return (
    <span style={{ display: "grid", gap: 8, width: "100%" }}>
      <ComposerLoader />
      <span className="tp-preview__note">a faixa atravessa enquanto o agente trabalha</span>
    </span>
  );
}

function DataTablePreview() {
  return (
    <DataTable
      columns={RUN_COLUMNS}
      rows={RUNS}
      getKey={(row) => row.id}
      searchText={(row) => `${row.agent} ${row.action}`}
      label="Execuções"
      pageSize={5}
    />
  );
}

function DataGridPreview() {
  const [rows, setRows] = useState<Record<string, string>[]>([
    { item: "Assinatura", price: "49", qty: "12" },
    { item: "Créditos", price: "0,02", qty: "4200" },
  ]);
  return (
    <DataGrid
      columns={[
        { key: "item", title: "Item" },
        { key: "price", title: "Preço", type: "number", align: "end" },
        { key: "qty", title: "Qtd.", type: "number", align: "end" },
      ]}
      rows={rows}
      onChange={setRows}
      label="Orçamento"
      summary={(current) => `Total: ${current.reduce((sum, row) => sum + Number(row.price || 0) * Number(row.qty || 0), 0).toLocaleString("pt-BR")}`}
    />
  );
}

function NotificationsPreview() {
  return (
    <NotificationCenter
      groups={[
        {
          key: "today",
          title: "Hoje",
          items: [
            {
              id: "n1",
              title: "Ada abriu o PR #42",
              description: "2 arquivos, testes passando.",
              time: "09:12",
              unread: true,
              face: <Avatar kind="agent" name="Ada" appearance={{ color: "violet" }} size="xs" />,
            },
            {
              id: "n2",
              title: "Bento importou 1.204 pedidos",
              time: "08:54",
              face: <Avatar kind="agent" name="Bento" appearance={{ color: "green" }} size="xs" />,
            },
          ],
        },
        {
          key: "before",
          title: "Antes",
          items: [
            {
              id: "n3",
              title: "Cora publicou o relatório",
              time: "ontem",
              unread: true,
              face: <Avatar kind="agent" name="Cora" appearance={{ color: "rose" }} size="xs" />,
            },
          ],
        },
      ]}
    />
  );
}

function StatsPreview() {
  return (
    <span style={{ display: "grid", gap: 10, width: "100%" }}>
      <StatCard label="Receita" value="R$ 48.210" delta="+12,4%" icon="chart" footer="mês contra o anterior" />
      <StatCard label="Aprovações" value="4" delta="aguardando você" tone="wait" icon="approve" />
    </span>
  );
}

const MONTHS = [
  { label: "jan", value: 42 },
  { label: "fev", value: 48 },
  { label: "mar", value: 44 },
  { label: "abr", value: 58 },
  { label: "mai", value: 54 },
  { label: "jun", value: 66 },
  { label: "jul", value: 62 },
  { label: "ago", value: 74 },
  { label: "set", value: 70 },
  { label: "out", value: 82 },
  { label: "nov", value: 78 },
  { label: "dez", value: 92 },
];

function AreaPreview() {
  return <AreaChart data={MONTHS} label="Receita nos últimos 12 meses" />;
}

function BarPreview() {
  return <BarChart data={MONTHS} label="Pedidos por mês" />;
}

function SettingsPreview() {
  const [open, setOpen] = useState(false);
  const [digest, setDigest] = useState(true);
  const [sounds, setSounds] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)} icon="settings">
        Abrir ajustes
      </Button>
      <SettingsDialog
        open={open}
        onOpenChange={setOpen}
        sections={[
          {
            key: "general",
            title: "Geral",
            rows: [
              { key: "digest", title: "Resumo diário", description: "Um e-mail com o que os agentes fizeram.", control: <Switch checked={digest} onCheckedChange={setDigest} aria-label="Resumo diário" /> },
              { key: "sounds", title: "Sons", description: "Um aviso curto quando um agente termina.", control: <Switch checked={sounds} onCheckedChange={setSounds} aria-label="Sons" /> },
            ],
          },
          {
            key: "profile",
            title: "Perfil",
            rows: [
              { key: "name", title: "Nome", description: "Como você aparece nos recibos.", control: <span className="tp-preview__note">Fernando</span> },
            ],
          },
        ]}
        footer={<Button variant="primary" size="sm" onClick={() => setOpen(false)}>Salvar</Button>}
      />
    </>
  );
}

function DropdownPreview() {
  return (
    <Menu
      label="Ações"
      trigger={<Button size="sm" icon="more" iconOnly aria-label="Ações" />}
    >
      <MenuItem icon="document">Abrir</MenuItem>
      <MenuItem icon="copy">Duplicar</MenuItem>
      <MenuSeparator />
      <MenuItem danger icon="trash">Excluir</MenuItem>
    </Menu>
  );
}

function TooltipPreview() {
  return (
    <Tip tip="Abre com ⌘K" look="ac-msg__tip ac-glass" button>
      <Button size="sm">Passe o mouse</Button>
    </Tip>
  );
}

function SidebarPreview() {
  return (
    <span className="tp-sidebar-preview">
      <Sidebar
        brand={
          <span className="tp-brand">
            <LogoMark size={24} />
            <span className="tp-brand__name">
              <b>Faang</b>
            </span>
          </span>
        }
        workspace={<span>Acme</span>}
        sections={[
          {
            key: "main",
            title: "Workspace",
            items: [
              { key: "chat", label: "Chat", icon: "message", href: "/chat" },
              { key: "dash", label: "Dashboard", icon: "chart", href: "/dashboard" },
            ],
          },
          {
            key: "agents",
            title: "Agentes",
            items: [
              { key: "ada", label: "Ada", chosen: true, face: <Avatar kind="agent" name="Ada" appearance={{ color: "violet" }} size="xs" />, count: 3 },
              { key: "bento", label: "Bento", face: <Avatar kind="agent" name="Bento" appearance={{ color: "green" }} size="xs" /> },
            ],
          },
        ]}
        footer={<Avatar name="Fernando" size="sm" />}
        label="Navegação"
      />
    </span>
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
  "input-otp": InputOtpPreview,
  radio: RadioPreview,
  switch: SwitchPreview,
  slider: SliderPreview,
  textarea: TextareaPreview,
  "date-picker": DatePickerPreview,
  carousel: CarouselPreview,
  "file-upload": FileUploadPreview,
  "social-button": SocialPreview,
  "icon-button": IconButtonPreview,
  "link-button": LinkButtonPreview,
  announcement: AnnouncementPreview,
  breadcrumb: BreadcrumbPreview,
  "button-group": ButtonGroupPreview,
  "close-button": CloseButtonPreview,
  divider: DividerPreview,
  notification: NotificationPreview,
  pagination: PaginationPreview,
  table: TablePreview,
  "tree-view": TreePreview,
  "agent-thinking": ThinkingPreview,
  "composer-loader": LoaderPreview,
  "data-table": DataTablePreview,
  "data-grid": DataGridPreview,
  "notification-center": NotificationsPreview,
  "stat-card": StatsPreview,
  "area-chart": AreaPreview,
  "bar-chart": BarPreview,
  "settings-dialog": SettingsPreview,
  sidebar: SidebarPreview,
  dropdown: DropdownPreview,
  tooltip: TooltipPreview,
};

/** The live preview of a catalogue entry; entries without one say so on the page. */
export function CatalogPreview({ slug }: { slug: string }) {
  const Preview = PREVIEWS[slug];
  if (!Preview) return <span className="tp-preview__note">Sem prévia: veja o código em /docs/{slug}.</span>;
  return <Preview />;
}
