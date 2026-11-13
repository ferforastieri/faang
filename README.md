# Faang

Um sistema de design para **interfaces de agentes** — e o site que o mostra
funcionando. A biblioteca vive em `packages/ui` e sai no npm como
[`faang-ui`](https://www.npmjs.com/package/faang-ui); o site consome a mesma
fonte, então cada componente da landing, do catálogo e das telas de app é o
componente publicado.

Não é uma dependência fechada: o CSS é próprio, os tokens são variáveis
semânticas e o código fica no repositório, editável como qualquer código seu.

---

## O que o projeto entrega

- **101 componentes** em `packages/ui/src/components` — de Button, Input e
  Segmented a Message, ToolBlock, ApprovalCard e PixelSky.
- **52 peças documentadas com prévia viva** em `/components` e `/docs`.
- **Dois temas** por um único atributo (`data-theme` no `<html>`), sem
  variantes `dark:` espalhadas e sem runtime de estilo.
- **Acessibilidade do Radix** nos controles interativos: foco, teclado, ARIA e
  leitor de tela.
- **Um site inteiro funcionando**: landing, catálogo, docs, login, signup,
  chat com agente e dashboard — todos montados com o próprio kit.
- **Um CLI** (`cli/`) que instala a biblioteca e mostra os imports.

## Arquitetura

```
app/                    o site (Next.js App Router)
├── (site)/             landing, catálogo, docs, login, signup
├── (app)/              chat e dashboard, em tela cheia
packages/ui/            faang-ui — a biblioteca (TS + CSS)
├── src/components/     as 101 peças
├── src/agent/          o motor do retrato em pixel
├── src/sky/            o céu em canvas
├── src/tokens/         valores compartilhados
├── src/i18n/           locale e menções
└── src/styles/         tokens.css + components.css
components/             as peças do site (landing, catálogo, app shell)
cli/                    o pacote `faang` do npm
```

O site importa a biblioteca pelo alias `@ui/*` (veja `tsconfig.json`). O pacote
declara um export por arquivo (`faang-ui/components/Button`), gerado por
`npm run ui:exports`.

## Tecnologias

| Camada | Escolha |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Estilo | CSS próprio com tokens semânticos — **sem Tailwind** |
| Interação | Radix UI |
| Tipografia | Source Sans 3 + JetBrains Mono (`@fontsource`) |
| Runtime | Cloudflare Workers, via adaptador OpenNext |
| Licença | MIT |

## Como rodar

```bash
npm install
npm run dev       # http://localhost:3000
```

| Script | O que faz |
| --- | --- |
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção (gera os docs para agentes antes) |
| `npm run typecheck` | TypeScript estrito em todo o monorepo |
| `npm run ui:exports` | regenera os `exports` de `packages/ui/package.json` |
| `npm run preview` | build + preview do Worker (Cloudflare) |
| `npm run deploy` | publica o Worker |

## Rotas

| Rota | O que mostra |
| --- | --- |
| `/` | A apresentação do projeto |
| `/components` | O catálogo, com prévia viva de 52 peças |
| `/docs` | A documentação: fundamentos, tokens e componentes |
| `/chat` | O chat de demonstração, com agente, ferramentas e aprovação |
| `/dashboard` | O dashboard montado com os blocos do kit |
| `/login`, `/signup` | As telas de autenticação |

## Publicando a biblioteca

```bash
cd packages/ui
npm publish
```

O pacote inclui `src/` e `styles.css`. Para consumir em Next:

```tsx
// next.config.ts
transpilePackages: ["faang-ui"]

// app/layout.tsx
import "faang-ui/styles.css";

// componente
import { Button } from "faang-ui/components/Button";
```

## Licença

[MIT](LICENSE). Use, altere, publique e compartilhe.
