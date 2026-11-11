<a href="https://faang.fer.tec.br"><img src=".github/readme-banner.png" alt="Faang — sistema de design React para interfaces de agentes" width="100%"></a>

# Faang

Um sistema de design React para **interfaces de agentes**: as peças que um produto de IA precisa e as que todo dashboard precisa, na mesma linguagem visual, como **código-fonte dentro do seu projeto**.

Não é uma dependência. Cada componente é instalado como arquivo, editável como qualquer código seu.

---

## O que o projeto entrega

- **44 componentes e blocos** — de Button, Input e Select a Data Table, Sidebar, Chat e Notification Center.
- **2 gráficos de dashboard** (receita e pedidos) construídos sobre Recharts.
- **Mais de 400 tokens semânticos** — cor, tipografia, espaçamento, sombra e raio — com claro e escuro trocando pelas mesmas classes.
- **Acessibilidade de base**: React Aria por baixo dos componentes interativos, navegação por teclado e suporte a RTL.
- **Um app inteiro funcionando**: landing, catálogo, documentação, chat com IA, dashboard e telas de autenticação — todos montados com os próprios componentes.

---

## Arquitetura

O app é um Next.js com App Router, organizado em três grupos de rotas:

| Grupo | Rotas | Papel |
| --- | --- | --- |
| `app/(site)` | `/`, `/components`, `/docs`, `/login`, `/signup` | Páginas públicas, com header e footer do site |
| `app/(app)` | `/chat`, `/dashboard` | Workspaces de altura cheia, com a navegação do produto |
| `app/api` | `/api/chat` | O runtime do chat: recebe mensagens e devolve a resposta em streaming |

O código dos componentes se divide em três camadas:

```
components/
├── base/          átomos: button, input, select, table, tabs, switch…
├── application/   blocos: chat, dashboard, sidebar, catálogo, docs, auth…
└── foundations/   marca, direção (RTL), ícones e tradução
styles/
├── theme.css      primitivas de cor e os tokens semânticos
├── typography.css a escala tipográfica como utilitários compostos
└── globals.css    entrada do Tailwind, reset e animações
```

Duas peças são **geradas em tempo de build**, a partir do código real:

- **registry** (`public/r/*.json`) — cada componente com seus arquivos, pacotes npm e dependências;
- **documentação para agentes** (`public/llms.txt` e `public/docs.md`) — o mesmo conteúdo em texto.

---

## Tecnologias

| Camada | Escolha |
| --- | --- |
| Framework | Next.js (App Router), React 19 |
| Estilo | Tailwind CSS v4 com tokens semânticos |
| Interação | React Aria Components |
| Dados | TanStack Table · Recharts |
| IA | Cloudflare Workers AI, pelo binding `AI` do Worker |
| Runtime | Cloudflare Workers, via adaptador OpenNext |

---

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
```

No `dev` o app roda sem o runtime do Cloudflare, então o chat fica em **modo demonstração**: as respostas são roteirizadas e todo o resto da interface funciona normalmente.

Para ter o modelo respondendo de verdade, rode como Worker:

```bash
npm run preview   # build do Worker + servidor local com o binding de IA
```

O binding `AI` está declarado no `wrangler.jsonc` e é a própria credencial — não existe chave para configurar.

**Rotas para conhecer:**

| Rota | O que mostra |
| --- | --- |
| `/` | A apresentação do projeto |
| `/components` | O catálogo, com previews vivos de cada componente |
| `/docs` | A documentação de cada item: arquivos, pacotes e código |
| `/chat` | O chat com IA, em streaming |
| `/dashboard` | Um dashboard montado com os blocos do sistema |

---

## Personalizando

- **Cores**: `styles/theme.css` tem uma rampa `brand` (identidade) e uma `danger` (erro e destruição), e todo o resto referencia tokens semânticos (`text-text-primary`, `background-secondary-default`, `border-button-default`…). Trocar a rampa re-tinge o sistema inteiro.
- **Tipografia**: `styles/typography.css` define a escala como utilitários compostos (`text-title-2-medium`, `text-body-regular`) — tamanho, peso, entrelinha e tracking juntos.
- **Marca**: os arquivos ficam em `public/brand/` e os componentes `Logo` e `LogoLockup` em `components/foundations/brand/`.
- **Textos da página**: o site abre em português e alterna para inglês no seletor do header; o dicionário fica em `components/application/landing/landing-copy.tsx`.

---

## Licença

[MIT](LICENSE). Use, altere, publique e compartilhe.
