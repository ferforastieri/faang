import type { Metadata, Viewport } from "next";
import Script from "next/script";

import "./globals.css";

/** Resolved before the first paint: a stored choice, else the system's. */
const THEME_SCRIPT = `(() => {
  try {
    const stored = localStorage.getItem("tophs:theme");
    const dark = stored ? stored === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();`;

export const metadata: Metadata = {
  title: "Tophs UI — a interface para produtos de agente",
  description:
    "Um sistema de design em React para produtos de agente: conversa, ferramentas, aprovações e retratos em pixel. Dois temas, tokens semânticos e acessibilidade do Radix.",
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col">
        {/* The theme is a `data-theme` attribute on <html>; it is set before paint. */}
        <Script id="tophs-theme" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        {children}
      </body>
    </html>
  );
}
