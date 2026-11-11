import { RiFontSize, RiPaletteLine } from "@remixicon/react";

/**
 * The catalogue behind faang.com/components: every component, block, chart
 * and template this repository ships, with its docs page. Plain data, so the
 * starter can show the same list (linking out to the site) without carrying
 * any component source of its own.
 */
export type Entry = {
  name: string;
  href: string;
  description: string;
  isNew?: boolean;
  /** Optional leading icon - used by the Foundations entries. */
  icon?: typeof RiPaletteLine;
};

const foundations: Entry[] = [
  {
    name: "Color",
    href: "/components/color",
    description: "The full palette and semantic tokens.",
    icon: RiPaletteLine,
  },
  {
    name: "Typography",
    href: "/components/typography",
    description: "Type scale, weights, and text styles.",
    icon: RiFontSize,
  },
];

const components: Entry[] = [
  { name: "Announcement", href: "/components/announcement", description: "Dismissible banner for product news." },
  { name: "Avatar", href: "/components/avatar", description: "User photo with initials fallback." },
  { name: "Breadcrumb", href: "/components/breadcrumb", description: "Path trail with collapsing levels." },
  { name: "Button", href: "/components/button", description: "Primary, secondary, and danger actions." },
  { name: "Button Group", href: "/components/button-group", description: "Fused row of selectable buttons." },
  { name: "Carousel", href: "/components/carousel", description: "Slide through cards with snap, arrows and dots.", isNew: true },
  { name: "Checkbox", href: "/components/checkbox", description: "Animated tick, card variant, two sizes." },
  { name: "Chip", href: "/components/chip", description: "Compact removable filter tokens." },
  { name: "Close Button", href: "/components/close-button", description: "The little ×, done properly." },
  { name: "Date Picker", href: "/components/date-picker", description: "Popover calendar for single dates." },
  { name: "Divider", href: "/components/divider", description: "Single, double, and filled content separators.", isNew: true },
  { name: "Dropdown", href: "/components/dropdown", description: "Composable menus - teams, models, actions." },
  { name: "File Upload", href: "/components/file-upload", description: "Drag, validate, and track upload progress." },
  { name: "Icon Button", href: "/components/icon-button", description: "Square action button, icon only." },
  { name: "Input", href: "/components/input", description: "Text field with addons and validation." },
  { name: "Input OTP", href: "/components/input-otp", description: "One-time-code boxes with paste and autofill." },
  { name: "Link Button", href: "/components/link-button", description: "Inline text action styled like a link." },
  { name: "Notification", href: "/components/notification", description: "Status messages with icons, avatars, and actions." },
  { name: "Pagination", href: "/components/pagination", description: "Page numbers with truncation." },
  { name: "Radio", href: "/components/radio", description: "Gradient dot, card variant, two sizes." },
  { name: "Segmented Control", href: "/components/segmented-control", description: "Sliding pill option switcher." },
  { name: "Select", href: "/components/select", description: "Single-choice listbox with search." },
  { name: "Slider", href: "/components/slider", description: "Single-value and min/max range selection.", isNew: true },
  { name: "Social Button", href: "/components/social-button", description: "Sign-in buttons for 24 providers, logos included." },
  { name: "Switch", href: "/components/switch", description: "On/off toggle with spring motion." },
  { name: "Table", href: "/components/table", description: "Sortable columns, sticky header." },
  { name: "Tabs", href: "/components/tabs", description: "Underline and pill tab lists." },
  { name: "Textarea", href: "/components/textarea", description: "Multiline field with auto-grow and character count.", isNew: true },
  { name: "Tree View", href: "/components/tree-view", description: "Nested folders with selection and keyboard navigation.", isNew: true },
  { name: "Tooltip", href: "/components/tooltip", description: "Positioned hints on hover and focus." },
];

const blocks: Entry[] = [
  { name: "Agent Thinking", href: "/components/agent-thinking", description: "Agent thinking indicators for chat composers.", isNew: true },
  { name: "Composer Loader", href: "/components/composer-loader", description: "Orbiting light band for a working composer.", isNew: true },
  { name: "Auth Card", href: "/components/auth-card", description: "Sign-in and sign-up blocks with social login.", isNew: true },
  { name: "Data Grid", href: "/components/data-grid", description: "Editable spreadsheet with selection, filters, and live summaries.", isNew: true },
  { name: "Data Table", href: "/components/data-table", description: "Filters, selection, and pagination wired up." },
  { name: "Notification Center", href: "/components/notification-center", description: "Grouped activity inbox with tabs and actions." },
  { name: "Settings Modal", href: "/components/settings-modal", description: "Multi-page settings in a controlled dialog." },
  { name: "Sidebar", href: "/components/sidebar", description: "Floating app navigation with teams menu." },
  { name: "Stat Cards", href: "/components/stat-cards", description: "KPI cards with delta chips or a footer band.", isNew: true },
];

const charts: Entry[] = [
  { name: "Revenue Chart", href: "/components/revenue-chart-card", description: "This year against last, area over a dashed line.", isNew: true },
  { name: "Orders Chart", href: "/components/orders-chart-card", description: "Monthly bars, this year beside last.", isNew: true },
];

const templates: Entry[] = [
  { name: "Chat Starter", href: "/components/chat-starter", description: "A deployable chat on Cloudflare's own inference.", isNew: true },
];

/**
 * `wide` halves the column count: a template card shows a whole app screen,
 * which is unreadable at a third of the width.
 */
export const COMPONENT_SECTIONS: { title: string; blurb: string; entries: Entry[]; wide?: boolean }[] = [
  { title: "Tokens", blurb: "Colors and type, the two decisions everything else inherits.", entries: foundations },
  { title: "Elements", blurb: "The single-purpose pieces: a field, a button, a tab.", entries: components },
  { title: "Assemblies", blurb: "Several elements working as one panel.", entries: blocks },
  { title: "Data", blurb: "Read-outs for dashboards: revenue and orders.", entries: charts },
  { title: "Screens", blurb: "Whole pages, already wired to a runtime.", entries: templates, wide: true },
];

export const ALL_ENTRIES = COMPONENT_SECTIONS.flatMap((section) => section.entries);
