import { ENTRIES, type CatalogEntry } from "./entries";

export interface IndexItem {
  key: string;
  name: string;
  description: string;
  href: string;
}

export interface IndexSection {
  key: string;
  title: string;
  blurb: string;
  items: IndexItem[];
}

const bySlug = new Map(ENTRIES.map((entry) => [entry.slug, entry]));

const fromEntries = (slugs: string[]): IndexItem[] =>
  slugs
    .map((slug) => bySlug.get(slug))
    .filter((entry): entry is CatalogEntry => Boolean(entry))
    .map((entry) => ({
      key: entry.slug,
      name: entry.name,
      description: entry.summary,
      href: `/docs/${entry.slug}`,
    }));

/**
 * The catalogue's four sections, as the old site grouped them: tokens,
 * single-purpose elements, assemblies, data read-outs and the screens built
 * with them. A component appears in exactly one section.
 */
export const SECTIONS: IndexSection[] = [
  {
    key: "tokens",
    title: "Tokens",
    blurb: "Cor e tipografia: as duas decisões que tudo o mais herda.",
    items: [
      { key: "color", name: "Cor", description: "A paleta e os tokens semânticos, no claro e no escuro.", href: "/docs/color" },
      {
        key: "typography",
        name: "Tipografia",
        description: "A escala em tokens, sem utilitários compostos.",
        href: "/docs/typography",
      },
    ],
  },
  {
    key: "elements",
    title: "Elementos",
    blurb: "As peças de uso único: um campo, um botão, uma aba.",
    items: fromEntries([
      "button",
      "icon-button",
      "link-button",
      "button-group",
      "close-button",
      "chip",
      "kbd",
      "avatar",
      "card",
      "skeleton",
      "spinner",
      "divider",
      "announcement",
      "notification",
      "breadcrumb",
      "pagination",
      "dropdown",
      "tooltip",
      "table",
      "tree-view",
      "field",
      "segmented",
      "select",
      "checkbox",
      "tabs",
      "input-otp",
      "radio",
      "switch",
      "slider",
      "textarea",
      "date-picker",
      "carousel",
      "file-upload",
      "social-button",
      "pixel-sky",
    ]),
  },
  {
    key: "assemblies",
    title: "Conjuntos",
    blurb: "Vários elementos trabalhando como um painel.",
    items: fromEntries([
      "sidebar",
      "stat-card",
      "data-table",
      "data-grid",
      "notification-center",
      "settings-dialog",
      "message",
      "composer",
      "tool-block",
      "approval-card",
      "agent-thinking",
      "composer-loader",
    ]),
  },
  {
    key: "data",
    title: "Dados",
    blurb: "Leituras para dashboards: números, fatos e etapas.",
    items: fromEntries(["fact-strip", "fold-row", "step-track", "area-chart", "bar-chart"]),
  },
  {
    key: "screens",
    title: "Telas",
    blurb: "Páginas inteiras, já montadas com o kit.",
    items: [
      { key: "chat", name: "Chat", description: "Conversa, ferramentas, aprovação e compositor.", href: "/chat" },
      {
        key: "dashboard",
        name: "Dashboard",
        description: "Números, gráfico, aprovações e a tabela de execuções.",
        href: "/dashboard",
      },
      {
        key: "auth",
        name: "Auth",
        description: "Entrada e cadastro com o mesmo cartão.",
        href: "/login",
      },
    ],
  },
];

export const SECTION_TOTAL = SECTIONS.reduce((sum, section) => sum + section.items.length, 0);
