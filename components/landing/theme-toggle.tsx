"use client";

import { Button } from "@ui/components/Button";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";
type Origin = { x: number; y: number };
type ViewTransition = { ready: Promise<void>; finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => ViewTransition;
};

const DURATION = 820;
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const STYLE_ID = "faang-theme-transition";

let running = false;

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("faang:theme", theme);
  } catch {
    // Private mode: the choice lasts the page.
  }
}

/** The soft, blurred circle that opens from the click: a lamp coming on. */
function blurredCircleMask() {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">',
    '<defs><filter id="blur" x="-50%" y="-50%" width="200%" height="200%">',
    '<feGaussianBlur stdDeviation="2" /></filter></defs>',
    '<circle cx="50" cy="50" r="42" fill="white" filter="url(#blur)" />',
    "</svg>",
  ].join("");
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function installTransitionStyle({ x, y }: Origin, radius: number, duration: number) {
  document.getElementById(STYLE_ID)?.remove();

  const mask = blurredCircleMask();
  const size = radius * 2.5;
  const left = x - size / 2;
  const top = y - size / 2;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    ::view-transition-new(root) {
      -webkit-mask-image: ${mask};
      mask-image: ${mask};
      -webkit-mask-repeat: no-repeat;
      mask-repeat: no-repeat;
      animation: faang-theme-mask-reveal ${duration}ms ${EASING} both;
      transform-origin: ${x}px ${y}px;
      will-change: -webkit-mask-size, -webkit-mask-position, mask-size, mask-position;
    }
    @keyframes faang-theme-mask-reveal {
      from {
        -webkit-mask-position: ${x}px ${y}px;
        mask-position: ${x}px ${y}px;
        -webkit-mask-size: 0px 0px;
        mask-size: 0px 0px;
      }
      to {
        -webkit-mask-position: ${left}px ${top}px;
        mask-position: ${left}px ${top}px;
        -webkit-mask-size: ${size}px ${size}px;
        mask-size: ${size}px ${size}px;
      }
    }
  `;
  document.head.appendChild(style);
  return style;
}

/**
 * Reveals the next theme from the point of the click with the browser's view
 * transition: a blurred circle grows over the whole page, so the light comes
 * on (or goes off) rather than the button alone changing. The old snapshot is
 * frozen under the new one by the rules in globals.css; reduced motion and
 * browsers without the API get the instant swap.
 */
async function transitionTheme(
  theme: Theme,
  origin: Origin,
  onApplied: () => void,
  duration = DURATION,
) {
  if (typeof document === "undefined" || currentTheme() === theme) {
    onApplied();
    return;
  }

  const documentWithTransition = document as ViewTransitionDocument;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!documentWithTransition.startViewTransition || reduceMotion) {
    applyTheme(theme);
    onApplied();
    return;
  }
  if (running) return;

  const x = Math.min(Math.max(origin.x, 0), window.innerWidth);
  const y = Math.min(Math.max(origin.y, 0), window.innerHeight);
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  running = true;
  document.documentElement.classList.add("theme-transitioning");
  const style = installTransitionStyle({ x, y }, radius, duration);
  try {
    const transition = documentWithTransition.startViewTransition(() => {
      flushSync(() => {
        applyTheme(theme);
        onApplied();
      });
    });
    await transition.ready;
    await transition.finished;
  } catch {
    if (currentTheme() !== theme) applyTheme(theme);
  } finally {
    style.remove();
    document.documentElement.classList.remove("theme-transitioning");
    running = false;
  }
}

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
 * the kit. A press reveals the new palette from the click as a soft circle —
 * the whole page lights up or goes dark, not just the glyph.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTheme(currentTheme());
    setReady(true);
  }, []);

  async function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    const next: Theme = currentTheme() === "dark" ? "light" : "dark";
    const rect = event.currentTarget.getBoundingClientRect();
    const origin =
      event.detail === 0
        ? { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        : { x: event.clientX, y: event.clientY };

    await transitionTheme(next, origin, () => setTheme(next));
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      aria-label={theme === "dark" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      title={theme === "dark" ? "Tema claro" : "Tema escuro"}
      onClick={toggle}
      suppressHydrationWarning
    >
      {ready && theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
