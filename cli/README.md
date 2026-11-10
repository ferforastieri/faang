# faang

Add [Faang](https://faang.vira.ia.br) components to your project as source.

```bash
npx faang@latest list
npx faang@latest add button
npx faang@latest add data-table stat-cards
npx faang@latest add --all
```

Each item declares the other items it imports and the npm packages it needs, so
`add` pulls the whole graph in order and prints the one `npm install` line the
host project is missing.

Options: `--cwd <dir>`, `--registry <url>`, `--overwrite`, `--dry-run`, `--json`.
`FAANG_REGISTRY` sets the registry for CI. Default registry:
`https://faang.vira.ia.br/r`.
