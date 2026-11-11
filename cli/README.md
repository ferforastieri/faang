# faang

Instala os componentes do [Faang](https://faang.fer.tec.br) no seu projeto como
**código-fonte** — arquivos no seu repositório, editáveis como qualquer código
seu. Não é uma dependência e não fica preso a uma versão.

```bash
npx faang@latest list              # todos os itens disponíveis
npx faang@latest add button        # um componente
npx faang@latest add data-table    # um bloco inteiro
npx faang@latest add --all         # o catálogo completo
```

Cada item declara os outros itens que importa e os pacotes npm de que precisa.
O `add` resolve esse grafo na ordem certa, escreve os arquivos e termina
mostrando a linha de `npm install` que falta no seu projeto.

## O que ele grava

- os arquivos do componente, no caminho original (`components/base/…`);
- as peças que ele importa (utilitários, ícones, tokens de estilo);
- nada é sobrescrito sem `--overwrite`.

## Opções

| Opção | O que faz |
| --- | --- |
| `--cwd <dir>` | projeto onde escrever (padrão: diretório atual) |
| `--registry <url>` | registry alternativo (padrão: `https://faang.fer.tec.br/r`) |
| `--overwrite` | substitui arquivos que já existem |
| `--dry-run` | mostra o plano sem escrever nada |
| `--json` | saída legível por máquina no `list` |
| `-h`, `--help` | ajuda |

`FAANG_REGISTRY` faz o mesmo que `--registry`, útil em CI.

## Requisitos do projeto

Next.js com App Router, Tailwind CSS v4, o alias `@/` apontando para a raiz e
`react-aria-components` para os componentes interativos. O comando
`npx faang add globals` instala os três arquivos de estilo.

## Documentação

- Site: [faang.fer.tec.br](https://faang.fer.tec.br)
- Índice para agentes: [llms.txt](https://faang.fer.tec.br/llms.txt)
- Documentação completa: [docs.md](https://faang.fer.tec.br/docs.md)
- Registry: [r/index.json](https://faang.fer.tec.br/r/index.json)

## Licença

MIT.
