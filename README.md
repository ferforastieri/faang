# Valk UI

<div align="center">

![Valk UI](https://img.shields.io/badge/Valk%20UI-v1.4.6-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18.3-blue?style=for-the-badge&logo=react)

**Biblioteca moderna de componentes UI para React**

[Documentação](#-documentação) • [Instalação](#-instalação-rápida) • [Componentes](#-componentes-disponíveis) • [Contribuir](#-contribuindo)

</div>

---

## ✨ Características

- 🎨 **Design Moderno**: Componentes bonitos e consistentes com Tailwind CSS
- ⚛️ **React/TypeScript**: Totalmente tipado e pronto para produção
- 🌙 **Dark Mode**: Suporte nativo a modo escuro
- 📦 **CLI Interativo**: Instale apenas os componentes que você precisa
- 🎯 **Zero Dependências**: Componentes leves e performáticos
- ♿ **Acessível**: Construído com acessibilidade em mente
- 🔧 **Customizável**: Fácil de personalizar e estender

## 🚀 Instalação Rápida

### Usando o CLI (Recomendado)

```bash
# Instalar globalmente
npm install -g valk-ui

# Ou usar diretamente com npx
npx valk-ui
```

O CLI interativo permite:
- ✅ Escolher idioma (PT, EN, ES)
- ✅ Instalar por categoria ou individualmente
- ✅ Definir diretório de instalação

### Instalação Manual

#### React/TypeScript

```bash
# Copie os componentes de packages/react/src/components
# para o seu projeto em ./src/components/ui
```


## 📖 Documentação

Acesse a documentação completa em: [https://faang.vira.ia.br/](https://faang.vira.ia.br/)

Ou execute localmente:

```bash
cd packages/docs
npm install
npm run dev
```

## 🎨 Componentes Disponíveis

### 📝 Formulários
- **Button** - Botões com múltiplas variantes e tamanhos
- **Input** - Campos de entrada com suporte a ícones e validação
- **Select** - Seletor customizado com busca e modo múltiplo
- **Checkbox** - Checkbox customizado com label e descrição
- **Toggle** - Switch toggle com diferentes tamanhos
- **DatePicker** - Seletor de data com calendário interativo

### 💬 Feedback
- **Modal** - Modal responsivo com diferentes tamanhos
- **StatusBadge** - Badges para indicar status
- **ProgressBar** - Barra de progresso com diferentes cores
- **Skeleton** - Placeholder de carregamento para estados assíncronos

### 📐 Layout
- **Avatar** - Avatar com fallback para iniciais
- **MetricCard** - Card para exibir métricas e KPIs
- **PaginatedTable** - Tabela paginada com busca e ordenação

### 📊 Gráficos
- **BarChart** - Gráfico de barras comparativo
- **DonutChart** - Gráfico de rosca (donut)
- **LineChart** - Gráfico de linha temporal

## 🏗️ Estrutura do Projeto

```
valk-ui/
├── packages/
│   ├── react/              # Componentes React/TypeScript
│   │   ├── cli/             # CLI publicado pelo pacote
│   │   ├── src/
│   │   │   ├── components/  # Componentes organizados por categoria
│   │   │   │   ├── forms/
│   │   │   │   ├── feedback/
│   │   │   │   ├── layout/
│   │   │   │   └── charts/
│   │   │   └── lib/         # Utilitários (cn, etc)
│   │   └── package.json
├── apps/
│   └── docs/                # Site de documentação
│       ├── src/
│       │   ├── pages/       # Páginas do site
│       │   └── components/  # Componentes do site
│       └── package.json
└── package.json             # Workspace root
```

## 🎯 Uso Básico

### React/TypeScript

```tsx
import { Button, Input, Modal } from '@/components/ui'

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Clique aqui
      </Button>
      <Input label="Email" placeholder="email@example.com" />
      <Modal isOpen={true} onClose={() => {}} title="Título">
        Conteúdo do modal
      </Modal>
    </div>
  )
}
```


## 🛠️ Requisitos

- **React**: ^18.0.0
- **TypeScript**: ^5.0.0
- **Tailwind CSS**: ^3.0.0
- **Node.js**: ^18.0.0

## 📦 Dependências dos Componentes

### React
- `react` ^18.0.0


## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [shadcn/ui](https://ui.shadcn.com/) - Inspiração para a estrutura

## 📧 Contato

- **Website**: [https://faang.vira.ia.br/](https://faang.vira.ia.br/)
- **Issues**: [GitHub Issues](https://github.com/ferforastieri/valk-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ferforastieri/valk-ui/discussions)

---

<div align="center">

Feito com ❤️ por Fernando Forastieri

⭐ Se este projeto foi útil para você, considere dar uma estrela!

</div>
