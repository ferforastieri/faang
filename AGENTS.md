# Faang design rules

Este repositório é o **Faang UI**: uma biblioteca React com CSS próprio em
`packages/ui` e o site que a consome em `app/`. Estas regras valem sempre que
você escrever ou alterar UI.

## Componentes primeiro

- Antes de montar qualquer elemento, procure em `packages/ui/src/components` e
  prefira a peça existente.
- Importe pelo alias do site: `import { Button } from "@ui/components/Button"`.
  No pacote publicado, o mesmo arquivo é `faang-ui/components/Button`.
- Não instale Tailwind, CSS-in-JS ou uma segunda biblioteca de componentes. O
  visual vem de `packages/ui/src/styles/components.css` e dos tokens.

## Cor: só tokens semânticos

- Nunca use hex, `oklch()` ou nomes de matiz soltos. Toda cor usa um token:
  `var(--ink)`, `var(--muted)`, `var(--raised)`, `var(--line)`,
  `var(--agent)`, `var(--ok)`, `var(--warn)`, `var(--danger)`, `var(--info)`.
- O tema é `data-theme="light" | "dark"` no `<html>`. Não escreva regras
  `dark:` nem `[data-theme] .alguma-coisa` por componente: os tokens já trocam.
- Estado nunca é dito só por cor — sempre um ícone e uma palavra (`Chip`).

## Layout e forma

- Espaçamento e raios vêm dos tokens (`--space-*`, `--radius-*`,
  `--control-h-*`). Página pode ter números próprios, componente não.
- Uma ação principal por área (`Button variant="primary"`); o resto é
  `default`, `ghost` ou `link`.
- Nada de utilitários de layout no site: as páginas usam as classes `tp-*` em
  `app/*.css`; os componentes usam `ac-*` no pacote.

## Tipografia

- `--font-sans` (Source Sans 3) para a UI, `--font-mono` (JetBrains Mono) para
  código, tokens e atalhos.
- Tamanhos vêm de `--text-*`; não empilhe `text-sm font-medium leading-5`.

## Acessibilidade

- Controles interativos usam Radix (`radix-ui`) por baixo. Não recrie o
  comportamento de diálogo, menu, select ou tabs à mão.
- Foco sempre visível (`--focus-ring`), alvo de toque de 44px (`--touch-target`).

## Fontes de verdade

- Componentes e tokens: `packages/ui/src`.
- Catálogo e docs: `components/catalog/entries.ts` (uma entrada por peça
  documentada) e `components/catalog/previews.tsx` (a prévia viva).
- Ao adicionar uma peça documentada, atualize os dois e rode
  `npm run typecheck` + `npm run build`.
