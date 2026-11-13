"use client";

import { Button } from "@ui/components/Button";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/** Sun and moon at the kit's weight (20px grid, 1.6 stroke). */
function Sun() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" />
    </svg>
  );
}

function Moon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M16.2 12.4A7 7 0 0 1 7.6 3.8a7 7 0 1 0 8.6 8.6z" />
    </svg>
  );
}

/**
 * The theme is one attribute on <html> (`data-theme`), read by every token in
 * the kit. The choice is remembered; without one, the system's decides, and
 * the layout's inline script settles it before the first paint.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("tophs:theme", next);
    } catch {
      // Private mode: the choice lasts the page.
    }
    setTheme(next);
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      aria-label={theme === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
      onClick={toggle}
      // The glyph follows the attribute, not the state: no swap flash on hydration.
      suppressHydrationWarning
    >
      {ready && theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
