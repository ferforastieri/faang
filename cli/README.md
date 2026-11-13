# faang

Instala o [Faang UI](https://faang.fer.tec.br) no seu projeto. A biblioteca é
um pacote npm (`faang-ui`, MIT); este CLI resolve os nomes, instala com o seu
gerenciador e mostra os imports exatos.

```bash
npx faang@latest list              # todos os componentes e o import de cada um
npx faang@latest add button        # instala faang-ui e mostra o import
npx faang@latest add button chip   # vários de uma vez
npx faang@latest init --write      # importa o CSS no app/layout.tsx
```

## O que ele faz

- **`list`** — lê o índice embutido (`components.json`) e imprime nome e caminho
  de import.
- **`add`** — detecta npm, pnpm, yarn ou bun pelo lockfile, instala
  `faang-ui` se ainda não estiver no `package.json` e imprime:
  `import { Button } from "faang-ui/components/Button";`
- **`init`** — encontra o layout do App Router (`app/layout.tsx` ou
  `src/app/layout.tsx`) e adiciona `import "faang-ui/styles.css";` com
  `--write`. Sem a flag, só mostra a linha.

## Opções

| Opção | O que faz |
| --- | --- |
| `--cwd <dir>` | projeto onde trabalhar (padrão: diretório atual) |
| `--write` | `init`: edita o layout em vez de só imprimir |
| `--dry-run` | mostra o plano sem instalar nem escrever |
| `--json` | saída legível por máquina no `list` |
| `-h`, `--help` | ajuda |
| `-v`, `--version` | versão |

## Uso no projeto

```tsx
// app/layout.tsx
import "faang-ui/styles.css";

// em qualquer componente
import { Button } from "faang-ui/components/Button";
```

Os componentes são TypeScript com CSS próprio; converse com o Next para
transpilar o pacote (`transpilePackages: ["faang-ui"]`) ou copie o código de
`packages/ui` no repositório.

## Documentação

- Site: [faang.fer.tec.br](https://faang.fer.tec.br)
- Catálogo: [faang.fer.tec.br/components](https://faang.fer.tec.br/components)
- Docs: [faang.fer.tec.br/docs](https://faang.fer.tec.br/docs)
- Índice para agentes: [llms.txt](https://faang.fer.tec.br/llms.txt)

## Licença

MIT.
