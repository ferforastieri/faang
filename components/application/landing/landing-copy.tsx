"use client";

import { useTemplateCopy, TemplateCopyProvider } from "@/components/foundations/template-copy/template-copy";

import { RiArrowDownSLine, RiCheckLine, RiGlobalLine } from "@remixicon/react";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { Dropdown, DropdownItem, DropdownPopover, DropdownTrigger } from "@/components/base/dropdown/dropdown";
import { cx } from "@/utils/cx";

export type LandingLanguage = "pt-BR" | "en";

const STORAGE_KEY = "faang:landing-language";

/** Order matters: the first entry is what a first visit gets. */
const LANGUAGES: { id: LandingLanguage; label: string; short: string }[] = [
  { id: "pt-BR", label: "Português (BR)", short: "PT-BR" },
  { id: "en", label: "English (US)", short: "EN" },
];

/**
 * The landing's copy, keyed by the English string it replaces. Anything not in
 * here passes through untouched, so the dictionary only has to carry what is
 * actually translated — and a new sentence on the page shows up in English
 * until its translation is added, instead of rendering a blank.
 */
const PT_BR: Record<string, string> = {
  // Header
  Components: "Componentes",
  Docs: "Documentação",
  "Open the library": "Abrir a biblioteca",
  "Faang home": "Início do Faang",
  "Open menu": "Abrir menu",
  "Close menu": "Fechar menu",
  Main: "Principal",
  "Open navigation": "Abrir navegação",
  "Close navigation": "Fechar navegação",

  // Hero
  "React design system": "Sistema de design React",
  "for agent interfaces": "para interfaces de agentes",
  "Browse the library": "Explorar a biblioteca",
  "See the chat starter": "Ver o chat starter",

  // Section headings
  Install: "Instalação",
  Templates: "Templates",
  "Loading states": "Estados de carregamento",
  FAQ: "Perguntas frequentes",
  "A pile of interactive dashboard components": "Uma pilha de componentes de dashboard",
  "See every component": "Ver todos os componentes",
  "A whole screen, not just the parts": "Uma tela inteira, não só as peças",
  "Open the chat": "Abrir o chat",
  "The chat starter wires the sidebar, the transcript, the composer and a streaming endpoint together. Bring one model key and it answers.":
    "O chat starter junta a barra lateral, a conversa, o compositor e um endpoint de streaming. Traga uma chave de modelo e ele responde.",
  "A loading state worth looking at": "Um estado de carregamento que vale a pena olhar",
  "The composer loader wraps your input in a light orbiting the rim while the agent works, glass controls included. Pick the colours; it follows the theme.":
    "O composer loader envolve a entrada numa luz que orbita a borda enquanto o agente trabalha, com controles em vidro. Escolha as cores; ele segue o tema.",
  "See it in the chat": "Ver no chat",
  "Component docs": "Docs do componente",
  Foundations: "Fundamentos",
  Base: "Base",
  Blocks: "Blocos",
  Charts: "Gráficos",
  "Install it with your agent": "Instale com o seu agente",
  "Faang speaks MCP. Connect your agent once and it can browse every component with real usage examples, configure your project and install the source files.":
    "O Faang fala MCP. Conecte o agente uma vez e ele navega por todos os componentes com exemplos reais, configura o projeto e instala os arquivos.",
  "Cursor and any other MCP client take the same server in their config. Then ask in plain words:":
    "Cursor e qualquer cliente MCP usam o mesmo servidor na configuração. Depois é só pedir:",
  "Everything about installing and shipping": "Tudo sobre instalar e publicar",
  "Licensing, the CLI and what the components run on. Anything else, the Discord answers the same day.":
    "Licença, CLI e o que os componentes usam por baixo. O resto, o GitHub resolve.",
  "Ask on Discord": "Perguntar no GitHub",
  "Start building agent interfaces": "Comece a construir interfaces de agentes",
  "A chat starter, the dashboard components and the tokens under both. Install what you need with one command — the code is yours.":
    "Um chat starter, os componentes de dashboard e os tokens que sustentam os dois. Instale o que precisar com um comando — o código é seu.",
  "Explore components": "Explorar componentes",
  "Open the chat starter": "Abrir o chat starter",

  // Values
  "Source, not a dependency": "Código, não dependência",
  "npx faang add copies the files in. Change anything.": "npx faang add copia os arquivos. Mude o que quiser.",
  "One visual language": "Uma linguagem visual só",
  "400+ semantic tokens, light and dark from the same classes.": "400+ tokens semânticos, claro e escuro com as mesmas classes.",
  "Accessible by default": "Acessível por padrão",
  "React Aria underneath, Tailwind v4 on top, no runtime CSS.": "React Aria por baixo, Tailwind v4 por cima, sem CSS em runtime.",

  // Showcase cards
  "Data table": "Tabela de dados",
  "Filter, sort and paginate complex data in a responsive table.": "Filtre, ordene e pagine dados complexos numa tabela responsiva.",
  Sidebar: "Barra lateral",
  "Navigation with search, badges and account controls.": "Navegação com busca, selos e controles da conta.",
  "Agent thinking": "Agente pensando",
  "Reasoning, search and writing indicators for a working agent.": "Indicadores de raciocínio, busca e escrita para um agente em ação.",
  "Composer loader": "Carregamento do compositor",
  "A light orbiting the composer while the agent works.": "Uma luz orbitando o compositor enquanto o agente trabalha.",
  "Stat cards": "Cards de indicadores",
  "KPI cards with delta chips and a footer band.": "Cards de KPI com selos de variação e faixa no rodapé.",
  "Notification center": "Central de notificações",
  "Grouped activity inbox with tabs, unread state and actions.": "Caixa de atividade agrupada com abas, não lidas e ações.",
  "Auth card": "Card de autenticação",
  "Sign-in and sign-up with providers, inline or stacked.": "Login e cadastro com provedores, em linha ou empilhados.",
  "Date picker": "Seletor de data",
  "Popover calendar, and a meeting scheduler in the same chrome.": "Calendário em popover e agendador de reuniões no mesmo acabamento.",
  "File upload": "Upload de arquivos",
  "Drag, validate and track upload progress.": "Arraste, valide e acompanhe o progresso.",
  "Revenue chart": "Gráfico de receita",
  "This year against last, with a count-up headline.": "Este ano contra o anterior, com número animado.",
  "Orders chart": "Gráfico de pedidos",
  "Monthly bars, this year beside last year for every month.": "Barras mensais, este ano ao lado do anterior.",
  "Settings modal": "Modal de configurações",
  "Multi-page settings in a controlled dialog.": "Configurações em várias páginas num diálogo controlado.",
  "Chat starter": "Chat starter",
  "Sidebar, streaming replies, thinking indicator, a composer pill with stop control, and a history rail with local threads.":
    "Barra lateral, respostas em streaming, indicador de raciocínio, compositor com botão de parar e histórico local.",

  // Composer demo
  "Build a revenue dashboard with stat cards and an area chart.": "Monte um dashboard de receita com cards de indicadores e um gráfico de área.",
  "Stop stays in reach the whole time": "O botão de parar fica sempre à mão",

  // FAQ
  "Is the whole library free?": "A biblioteca inteira é grátis?",
  "Yes. Every component, block, chart, template and token in this repository is MIT licensed and installs as source. There is no paid tier, no license key and no login.":
    "Sim. Todo componente, bloco, gráfico, template e token deste repositório é MIT e instala como código. Não existe plano pago, chave de licença nem login.",
  "How do I install a component?": "Como instalo um componente?",
  "With the CLI — npx faang@latest add data-table — or by asking your agent, once the MCP server is connected. Either way the files land in your project, with their dependencies, and you edit them like your own code.":
    "Pela CLI — npx faang@latest add data-table — ou pedindo ao seu agente, com o servidor MCP conectado. De qualquer forma os arquivos caem no seu projeto, com as dependências, e você edita como código seu.",
  "Is the code mine?": "O código é meu?",
  "It is. Components are copied into your repository, so you own the copy you ship. There is nothing to update from us unless you choose to re-run the CLI.":
    "É. Os componentes são copiados para o seu repositório, então a cópia que você publica é sua. Não há nada para atualizar do nosso lado, a menos que você rode a CLI de novo.",
  "Can I use it in commercial and client projects?": "Posso usar em projetos comerciais e de clientes?",
  "Yes. MIT allows commercial use, modification and redistribution. Keep the license notice with the parts you redistribute.":
    "Pode. A MIT permite uso comercial, modificação e redistribuição. Mantenha o aviso de licença nas partes que redistribuir.",
  "Which technologies does it use?": "Quais tecnologias ele usa?",
  "React 19 and Next.js on the app side, Tailwind CSS v4 for styling, React Aria Components for interaction and accessibility, TanStack Table for the data table, and Recharts behind the chart cards.":
    "React 19 e Next.js no app, Tailwind CSS v4 para estilo, React Aria Components para interação e acessibilidade, TanStack Table na tabela e Recharts atrás dos gráficos.",
  "Does it support dark mode?": "Tem suporte a modo escuro?",
  "Every component reads semantic tokens instead of raw colours, and the dark theme swaps those tokens through a class on the document root. Nothing is written twice.":
    "Todo componente lê tokens semânticos em vez de cores cruas, e o tema escuro troca esses tokens por uma classe na raiz do documento. Nada é escrito duas vezes.",
  "Does it support right-to-left languages?": "Tem suporte a idiomas da direita para a esquerda?",
  "Yes. Layouts use logical properties, and DirectionProvider feeds React Aria the locale, so keyboard navigation, calendars and portalled menus follow the direction too.":
    "Tem. Os layouts usam propriedades lógicas e o DirectionProvider passa o locale para o React Aria, então navegação por teclado, calendários e menus em portal seguem a direção também.",

  // Footer
  Library: "Biblioteca",
  Project: "Projeto",
  "Getting started": "Primeiros passos",
  "MCP server": "Servidor MCP",
  "Agent skills": "Skills para agentes",
  "RTL support": "Suporte a RTL",
  License: "Licença",
  "A React design system for agentic interfaces. Source files in your project, MIT licensed, light and dark from the same classes.":
    "Um sistema de design React para interfaces de agentes. Código no seu projeto, licença MIT, claro e escuro com as mesmas classes.",
  "Sign in": "Entrar",
  "Sign up": "Criar conta",

  // Search
  "Quick search": "Busca rápida",
  Landing: "Início",
  "Components and Blocks": "Componentes e blocos",
  "↑↓ to navigate": "↑↓ para navegar",
  "↵ to open": "↵ para abrir",
  "esc to close": "esc para fechar",
  "Search components and pages": "Buscar componentes e páginas",
  "No results found.": "Nada encontrado.",
  Pages: "Páginas",
  "Open page": "Abrir página",
  "to open": "para abrir",
  "to close": "para fechar",
  "to navigate": "para navegar",

  // Install command
  Copy: "Copiar",
  Copied: "Copiado",
  "Copy command": "Copiar comando",
};

/**
 * Sentences the page builds with a number in them. Exact-string lookup cannot
 * match those, so they are rewritten from the English shape instead.
 */
/**
 * The catalogue's names are Title Case ("Revenue Chart") while the landing
 * writes them as sentences ("Revenue chart"); one folded map keeps a single
 * translation serving both.
 */
const PT_BR_FOLDED = new Map(Object.entries(PT_BR).map(([key, value]) => [key.toLocaleLowerCase(), value]));

const PT_BR_RULES: { pattern: RegExp; replace: (match: RegExpMatchArray) => string }[] = [
  {
    pattern: /^(\d+) components, charts and templates\. All MIT\.$/,
    replace: (m) => `${m[1]} componentes, gráficos e templates. Tudo MIT.`,
  },
  {
    pattern:
      /^Faang is a React design system with (\d+) components, charts and templates, plus 400\+ design tokens, built in Figma\. The parts an AI product needs and the parts every dashboard needs, in one visual language, as source files in your project\.$/,
    replace: (m) =>
      `Faang é um sistema de design React com ${m[1]} componentes, gráficos e templates, além de 400+ tokens, feito no Figma. As peças que um produto de IA precisa e as que todo dashboard precisa, numa linguagem visual só, como código no seu projeto.`,
  },
  {
    pattern: /^Components for agent products, forms, calendars and meeting scheduling — (\d+) in all, shipped as source you own\.$/,
    replace: (m) =>
      `Componentes para produtos de agentes, formulários, calendários e agendamento de reuniões — ${m[1]} no total, entregues como código que é seu.`,
  },
  {
    pattern: /^© (\d{4}) Faang\. MIT licensed\.$/,
    replace: (m) => `© ${m[1]} Faang. Licença MIT.`,
  },
];

export function translateLandingCopy(text: string, language: LandingLanguage): string {
  if (language === "en") return text;
  const exact = PT_BR[text] ?? PT_BR_FOLDED.get(text.toLocaleLowerCase());
  if (exact !== undefined) return exact;
  for (const rule of PT_BR_RULES) {
    const match = text.match(rule.pattern);
    if (match) return rule.replace(match);
  }
  return text;
}

type LanguageSettings = {
  language: LandingLanguage;
  setLanguage: (language: LandingLanguage) => void;
};

const LanguageContext = createContext<LanguageSettings | null>(null);

/** The landing's language, persisted the same way the theme is. */
export function LandingCopyProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<LandingLanguage>(LANGUAGES[0].id);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "pt-BR") setLanguage(stored);
    } catch {
      /* storage blocked: the default stands */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* storage blocked: the choice lasts the visit */
    }
  }, [language]);

  const translate = useMemo(() => (text: string) => translateLandingCopy(text, language), [language]);
  const settings = useMemo(() => ({ language, setLanguage }), [language]);

  return (
    <LanguageContext.Provider value={settings}>
      <TemplateCopyProvider translate={translate}>{children}</TemplateCopyProvider>
    </LanguageContext.Provider>
  );
}

export function useLandingLanguage(): LanguageSettings {
  const settings = useContext(LanguageContext);
  if (!settings) throw new Error("useLandingLanguage needs a LandingCopyProvider");
  return settings;
}

/** Globe + current language, the way the site's own switcher reads. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { language, setLanguage } = useLandingLanguage();
  const current = LANGUAGES.find((item) => item.id === language) ?? LANGUAGES[0];
  const [open, setOpen] = useState(false);
  const localize = useTemplateCopy();

  return localize((
    // Controlled: choosing a language closes the popover, which an uncontrolled
    // menu does not do here — leaving it floating over the page.
    <Dropdown isOpen={open} onOpenChange={setOpen}>
      <DropdownTrigger
        aria-label={`Language: ${current.label}`}
        className={cx(
          "flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-body-2-medium text-text-secondary",
          "transition-colors duration-150 ease hover:bg-background-secondary-default hover:text-text-primary",
          "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
          className,
        )}
      >
        <RiGlobalLine className="size-[18px] shrink-0" aria-hidden />
        <span className="hidden sm:inline">{current.short}</span>
        <RiArrowDownSLine className="size-4 shrink-0" aria-hidden />
      </DropdownTrigger>
      <DropdownPopover aria-label="Language" placement="bottom end" className="w-[196px] p-1.5">
        {LANGUAGES.map((item) => (
          <DropdownItem
            key={item.id}
            onSelect={() => {
              setLanguage(item.id);
              setOpen(false);
            }}
            className="px-2 py-1.5"
          >
            <span className="flex w-full items-center justify-between gap-2">
              <span className="truncate text-body-medium text-text-primary">{item.label}</span>
              {item.id === language ? (
                <RiCheckLine className="size-4 shrink-0 text-foreground-icon-primary" aria-hidden />
              ) : null}
            </span>
          </DropdownItem>
        ))}
      </DropdownPopover>
    </Dropdown>
  ));
}
