# Valk UI

<div align="center">

![Valk UI](https://img.shields.io/badge/Valk%20UI-v1.4.6-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18%20%7C%2019-blue?style=for-the-badge&logo=react)

**Modern UI component library for React with TypeScript**

[Documentation](#-documentation) • [Installation](#-installation) • [Components](#-available-components) • [CLI](#-using-the-cli)

</div>

---

## ✨ Features

- 🎨 **Modern Design**: Beautiful and consistent components with Tailwind CSS
- ⚛️ **React 18 & 19**: Support for React 18 and React 19
- 📘 **TypeScript**: Fully typed and production-ready
- 🌙 **Dark Mode**: Native dark mode support
- 📦 **Interactive CLI**: Install only the components you need
- 🎯 **Zero Heavy Dependencies**: Lightweight and performant components
- ♿ **Accessible**: Built with accessibility in mind
- 🔧 **Customizable**: Easy to customize and extend

## 🚀 Installation

### Install the package

```bash
npm install ui-valk
# or
pnpm add ui-valk
# or
yarn add ui-valk
```

### Install peer dependencies

```bash
npm install react
```

## 📦 Using the CLI

Valk UI includes an interactive CLI to install components directly into your project:

```bash
npx ui-valk
```

The CLI allows you to:
- ✅ Choose language (PT, EN, ES)
- ✅ Install by category or individually
- ✅ Set custom installation directory
- ✅ Automatic Tailwind CSS configuration

## 🎨 Available Components

### 📝 Forms (`forms/`)

- **Button** - Buttons with multiple variants (primary, secondary, outline, ghost, destructive) and sizes
- **Input** - Input fields with icon support, labels, and validation
- **Select** - Custom selector with search and multiple mode
- **Checkbox** - Custom checkbox with label and description
- **Toggle** - Switch toggle with different sizes
- **DatePicker** - Date selector with interactive calendar

### 💬 Feedback (`feedback/`)

- **Modal** - Responsive modal with different sizes
- **Dialog** - Accessible dialog with overlay
- **Toast** - Toast notification system
- **ToastContext** - Context provider for toasts
- **StatusBadge** - Badges to indicate status
- **Badge** - Generic customizable badge
- **ProgressBar** - Progress bar with different colors
- **Skeleton** - Loading placeholder for async states
- **DropdownMenu** - Accessible dropdown menu
- **Command** - Command palette (command search)
- **ThemeToggle** - Toggle to switch light/dark theme

### 📐 Layout (`layout/`)

- **Card** - Card with header, content and footer
- **Avatar** - Avatar with fallback to initials
- **MetricCard** - Card to display metrics and KPIs
- **PaginatedTable** - Paginated table with search and sorting
- **Navigation** - Navigation component
- **Sidebar** - Collapsible sidebar
- **Tabs** - Tab system
- **Accordion** - Expandable accordion
- **Separator** - Visual separator
- **Sheet** - Side panel (drawer)
- **DocsSidebar** - Sidebar for documentation

### 📊 Charts (`charts/`)

- **BarChart** - Comparative bar chart
- **DonutChart** - Donut chart
- **LineChart** - Temporal line chart

## 🎯 Basic Usage

### Import components

```tsx
import { Button, Input, Modal, Card } from 'ui-valk'
```

### Complete example

```tsx
import { Button, Input, Modal, Card, CardHeader, CardTitle, CardContent } from 'ui-valk'

function App() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="p-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Valk UI</CardTitle>
        </CardHeader>
        <CardContent>
          <Input 
            label="Email" 
            placeholder="email@example.com" 
            type="email"
          />
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setIsOpen(true)}
          >
            Open Modal
          </Button>
        </CardContent>
      </Card>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Modal Title"
      >
        <p>Modal content here</p>
      </Modal>
    </div>
  )
}
```

## 🛠️ Requirements

- **React**: ^18.0.0 || ^19.0.0
- **TypeScript**: ^5.0.0 (recommended)
- **Tailwind CSS**: ^3.0.0
- **Node.js**: ^18.0.0

### Peer Dependencies

- `react`: ^18.0.0 || ^19.0.0

## ⚙️ Tailwind CSS Configuration

Valk UI requires Tailwind CSS. Add to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/ui-valk/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Your customizations
    },
  },
  plugins: [],
}
```

And import the CSS in your main file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 📖 Complete Documentation

For complete documentation with examples, visit:
- [Online Documentation](https://faang.vira.ia.br/)
- [GitHub Repository](https://github.com/ferforastieri/valk-ui)

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/ferforastieri/valk-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/ferforastieri/valk-ui/discussions)

---

<div align="center">

Made with ❤️ by [Fernando Forastieri](https://github.com/ferforastieri)

⭐ If this project was useful to you, consider giving it a star!

</div>
