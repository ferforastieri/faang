# Contributing

O repositório é a fonte: a biblioteca (`packages/ui`), o site (`app/`) e o CLI
(`cli/`) vivem juntos. Pull requests são bem-vindos.

Antes de abrir um PR:

```bash
npm install
npm run typecheck
npm run build
```

- UI nova? Ela mora em `packages/ui/src/components`, com CSS em
  `packages/ui/src/styles/components.css` e export gerado por
  `npm run ui:exports`.
- Documentação de uma peça? Adicione a entrada em
  `components/catalog/entries.ts` e a prévia em `components/catalog/previews.tsx`.
- Textos da interface em português, sem jargão de framework na copy.

Licença: MIT.
