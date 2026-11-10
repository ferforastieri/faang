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
  "For agents": "Para agentes",
  "Docs your agent reads first": "Docs que o seu agente lê primeiro",
  "Three files describe the library in the shape a model can use — no scraping, no guessing which package a component needs.":
    "Três arquivos descrevem a biblioteca no formato que um modelo entende — sem scraping e sem adivinhar de que pacote cada componente depende.",
  "The one page an agent reads first: what Faang is, how to install it, the rules for generated code, and every item in one line.":
    "A primeira página que um agente lê: o que é o Faang, como instalar, as regras para código gerado e todos os itens em uma linha cada.",
  "The whole library in markdown: each item with its files, its npm packages and everything it pulls in.":
    "A biblioteca inteira em markdown: cada item com seus arquivos, seus pacotes npm e tudo que ele puxa junto.",
  "The machine-readable index the CLI reads — one JSON per item, source inline, dependencies declared.":
    "O índice que o CLI lê — um JSON por item, código embutido e dependências declaradas.",
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


  // Catalogue page
  "Every component, block, chart and template in Faang, 44 in all, and every one of them is already in this project as source. Each card opens its docs on faang.com, with the install command and the props.":
    "Todo componente, bloco, gráfico e template do Faang, 44 no total, e todos eles já estão neste projeto como código. Cada card abre a documentação no faang.com, com o comando de instalação e as props.",
  "The tokens everything else is built on.": "Os tokens sobre os quais tudo é construído.",
  "The everyday building blocks.": "Os blocos do dia a dia.",
  "Larger assemblies, ready to drop in.": "Montagens maiores, prontas para usar.",
  "Data cards for dashboards.": "Cards de dados para dashboards.",
  "Complete screens, wired together.": "Telas completas, já ligadas.",
  "The full palette and semantic tokens.": "A paleta completa e os tokens semânticos.",
  "Type scale, weights, and text styles.": "Escala tipográfica, pesos e estilos de texto.",
  "Dismissible banner for product news.": "Banner dispensável para novidades do produto.",
  "User photo with initials fallback.": "Foto do usuário com iniciais de reserva.",
  "Path trail with collapsing levels.": "Trilha de navegação com níveis recolhíveis.",
  "Primary, secondary, and danger actions.": "Ações primárias, secundárias e destrutivas.",
  "Fused row of selectable buttons.": "Linha de botões selecionáveis fundidos.",
  "Slide through cards with snap, arrows and dots.": "Deslize cards com encaixe, setas e indicadores.",
  "Animated tick, card variant, two sizes.": "Marca animada, variante em card e dois tamanhos.",
  "Compact removable filter tokens.": "Filtros compactos e removíveis.",
  "The little ×, done properly.": "O pequeno ×, feito direito.",
  "Popover calendar for single dates.": "Calendário em popover para uma data.",
  "Single, double, and filled content separators.": "Separadores de conteúdo simples, duplos e preenchidos.",
  "Composable menus - teams, models, actions.": "Menus compostos — times, modelos, ações.",
  "Drag, validate, and track upload progress.": "Arraste, valide e acompanhe o progresso do envio.",
  "Square action button, icon only.": "Botão de ação quadrado, só com ícone.",
  "Text field with addons and validation.": "Campo de texto com adereços e validação.",
  "One-time-code boxes with paste and autofill.": "Caixas de código único com colar e preenchimento automático.",
  "Inline text action styled like a link.": "Ação em texto, com aparência de link.",
  "Status messages with icons, avatars, and actions.": "Mensagens de status com ícones, avatares e ações.",
  "Page numbers with truncation.": "Números de página com reticências.",
  "Gradient dot, card variant, two sizes.": "Ponto em gradiente, variante em card e dois tamanhos.",
  "Sliding pill option switcher.": "Seletor de opções em pílula deslizante.",
  "Single-choice listbox with search.": "Lista de escolha única com busca.",
  "Single-value and min/max range selection.": "Seleção de valor único e de faixa mín/máx.",
  "Sign-in buttons for 24 providers, logos included.": "Botões de login para 24 provedores, com logos.",
  "On/off toggle with spring motion.": "Interruptor liga/desliga com mola.",
  "Sortable columns, sticky header.": "Colunas ordenáveis e cabeçalho fixo.",
  "Underline and pill tab lists.": "Listas de abas em sublinhado e em pílula.",
  "Multiline field with auto-grow and character count.": "Campo multilinha com crescimento automático e contagem.",
  "Nested folders with selection and keyboard navigation.": "Pastas aninhadas com seleção e navegação por teclado.",
  "Positioned hints on hover and focus.": "Dicas posicionadas no hover e no foco.",
  "Agent thinking indicators for chat composers.": "Indicadores de raciocínio para compositores de chat.",
  "Orbiting light band for a working composer.": "Faixa de luz orbitando um compositor em trabalho.",
  "Sign-in and sign-up blocks with social login.": "Blocos de login e cadastro com provedores sociais.",
  "Editable spreadsheet with selection, filters, and live summaries.": "Planilha editável com seleção, filtros e resumos ao vivo.",
  "Filters, selection, and pagination wired up.": "Filtros, seleção e paginação já ligados.",
  "Grouped activity inbox with tabs and actions.": "Caixa de atividade agrupada com abas e ações.",
  "Multi-page settings in a controlled dialog.": "Configurações em várias páginas num diálogo controlado.",
  "Floating app navigation with teams menu.": "Navegação flutuante do app com menu de times.",
  "KPI cards with delta chips or a footer band.": "Cards de KPI com selos de variação ou faixa no rodapé.",
  "This year against last, area over a dashed line.": "Este ano contra o anterior, área sobre linha tracejada.",
  "Monthly bars, this year beside last.": "Barras mensais, este ano ao lado do anterior.",
  "A deployable chat on your own model key.": "Um chat publicável na sua própria chave de modelo.",
  New: "Novo",
  Soon: "Em breve",


  // Auth screens
  "Welcome back": "Bem-vindo de volta",
  "Sign in to pick up where you left off.": "Entre para continuar de onde parou.",
  Email: "E-mail",
  Password: "Senha",
  "Remember me": "Lembrar de mim",
  "Forgot password?": "Esqueceu a senha?",
  "or continue with": "ou continue com",
  "New here?": "Primeira vez aqui?",
  "Create an account": "Criar uma conta",
  "Create your account": "Crie sua conta",
  "Create account": "Criar conta",
  "Enter your password": "Digite sua senha",
  "Enter your email below to create your account": "Informe seu e-mail para criar a conta",
  "Confirm password": "Confirmar senha",
  "Repeat your password": "Repita sua senha",
  "At least 8 characters": "Pelo menos 8 caracteres",
  "We use this to contact you, and never share it.": "Usamos para falar com você e nunca compartilhamos.",
  "Already have an account?": "Já tem conta?",
  "Start building with Faang in a couple of minutes.": "Comece a construir com o Faang em poucos minutos.",
  "Check your inbox": "Confira seu e-mail",
  "Enter the code we sent to finish signing in.": "Digite o código que enviamos para concluir o login.",
  "Code not arriving?": "O código não chegou?",
  "Send a new one": "Enviar outro",
  "Verify and continue": "Verificar e continuar",
  "Verification code": "Código de verificação",
  "Full name": "Nome completo",
  "By clicking continue, you agree to our Terms of Service and Privacy Policy.":
    "Ao continuar, você concorda com os Termos de Serviço e a Política de Privacidade.",

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
  {
    pattern: /^Continue with (.+)$/,
    replace: (m) => `Continuar com ${m[1]}`,
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
