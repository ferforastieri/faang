"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiArrowRightLine, RiSearchLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog, Input, Modal, ModalOverlay, TextField } from "react-aria-components";

import { ALL_ENTRIES, COMPONENT_SECTIONS } from "@/components/application/docs/components-index";
import { translateLandingCopy, useLandingLanguage } from "@/components/application/landing/landing-copy";
import { cx } from "@/utils/cx";

const SITE = "https://www.faang.com";

/** The catalogue section each component sits in, used as the result's caption. */
const SECTION_OF = new Map(
  COMPONENT_SECTIONS.flatMap((section) => section.entries.map((entry) => [entry.href, section.title] as const)),
);

type Hit = {
  id: string;
  label: string;
  hint?: string;
  /** Internal route, or an absolute URL for the docs. */
  href: string;
  external?: boolean;
  group: "pages" | "components";
};

const PAGES: { label: string; hint: string; href: string }[] = [
  { label: "Landing", hint: "/", href: "/" },
  { label: "Chat", hint: "/chat", href: "/chat" },
  { label: "Dashboard", hint: "/dashboard", href: "/dashboard" },
  { label: "Components and Blocks", hint: "/components", href: "/components" },
  { label: "Sign in", hint: "/login", href: "/login" },
  { label: "Sign up", hint: "/signup", href: "/signup" },
];

/** Accents and case should not decide whether a result shows up. */
function fold(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase();
}

/**
 * The header's quick search: a pill that opens a palette, and ⌘K / Ctrl+K from
 * anywhere on the page. Pages come first, then every component in the
 * catalogue, opening its docs.
 */
export function QuickSearch({
  className,
  open: controlledOpen,
  onOpenChange,
}: {
  className?: string;
  /** Lets the header open the same palette from its phone menu. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const localize = useTemplateCopy();
  const router = useRouter();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [shortcut, setShortcut] = useState("⌘K");
  const { language } = useLandingLanguage();
  const t = (value: string) => translateLandingCopy(value, language);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMac = useMemo(() => {
    if (typeof navigator === "undefined") return true;
    return /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent);
  }, []);

  useEffect(() => setShortcut(hasMac ? "⌘K" : "Ctrl K"), [hasMac]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLocaleLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, setOpen]);

  // Every open starts clean and with the caret in the field: React's
  // `autoFocus` loses to the modal's own focus management here.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const term = fold(query.trim());
    const matches = (value: string) => (term ? fold(value).includes(term) : true);

    // Matching runs over the copy the visitor is reading, not just the English
    // source: typing "receita" has to find "Revenue chart".
    const pages: Hit[] = PAGES.filter(
      (page) => matches(page.label) || matches(t(page.label)) || matches(page.hint),
    ).map((page) => ({
      id: `page-${page.href}`,
      label: t(page.label),
      hint: page.hint,
      href: page.href,
      group: "pages",
    }));

    const components: Hit[] = ALL_ENTRIES.filter(
      (entry) => matches(entry.name) || matches(t(entry.name)) || matches(entry.description),
    )
      .slice(0, term ? 12 : 6)
      .map((entry) => ({
        id: `c-${entry.href}`,
        label: t(entry.name),
        hint: t(SECTION_OF.get(entry.href) ?? "Components"),
        href: `${SITE}${entry.href}`,
        external: true,
        group: "components",
      }));

    return [...pages, ...components];
  }, [query, language]);

  const go = (hit: Hit | undefined) => {
    if (!hit) return;
    setOpen(false);
    if (hit.external) window.open(hit.href, "_blank", "noreferrer");
    else router.push(hit.href);
  };

  const onListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((index) => Math.min(index + 1, hits.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      go(hits[active]);
    }
  };

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`);
    node?.scrollIntoView({ block: "nearest" });
  }, [active]);

  return localize((
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Quick search"
        className={cx(
          "flex h-9 items-center gap-2 rounded-full border border-border-button-default bg-background-secondary-default px-3",
          "text-body-2-regular text-text-tertiary transition-colors duration-150 ease",
          "hover:border-border-button-hover hover:text-text-secondary",
          "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
          className,
        )}
      >
        <RiSearchLine className="size-4 shrink-0" aria-hidden />
        <span className="hidden lg:inline">Quick search</span>
        <span
          aria-hidden
          className="hidden rounded-md border border-border-button-default bg-background-primary-default px-1.5 py-0.5 font-mono text-[10px] leading-4 text-text-tertiary lg:inline"
        >
          {shortcut}
        </span>
      </button>

      <ModalOverlay
        isOpen={open}
        onOpenChange={setOpen}
        isDismissable
        className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
      >
        <Modal className="w-full max-w-[560px] rounded-2xl border border-border-button-default bg-background-primary-default shadow-2xl outline-none">
          <Dialog aria-label="Quick search" className="flex flex-col outline-none">
            {/* The input owns the arrow/enter keys while typing: focus never
                leaves it, and the list follows `active`. */}
            <div onKeyDown={onListKeyDown}>
              <TextField
                aria-label="Search components and pages"
                value={query}
                onChange={(value) => {
                  setQuery(value);
                  setActive(0);
                }}
                autoFocus
                className="flex flex-col"
              >
                <div className="flex items-center gap-2.5 border-b border-separator-border px-4">
                  <RiSearchLine className="size-5 shrink-0 text-foreground-icon-secondary" aria-hidden />
                  <Input
                    ref={inputRef}
                    placeholder="Search components and pages"
                    className="h-14 w-full bg-transparent text-body-medium text-text-primary outline-none placeholder:text-text-placeholder"
                  />
                </div>
              </TextField>

              <div ref={listRef} role="listbox" aria-label="Results" className="max-h-[46vh] overflow-y-auto p-2">
                {hits.length === 0 ? (
                  <p className="px-3 py-6 text-center text-body-regular text-text-tertiary">No results found.</p>
                ) : (
                  hits.map((hit, index) => {
                    const firstOfGroup = index === 0 || hits[index - 1].group !== hit.group;
                    return (
                      <div key={hit.id}>
                        {firstOfGroup ? (
                          <p className="px-2 pt-2 pb-1 text-caption-1-semibold tracking-wide text-text-tertiary uppercase">
                            {hit.group === "pages" ? "Pages" : "Components"}
                          </p>
                        ) : null}
                        <button
                          type="button"
                          role="option"
                          aria-selected={index === active}
                          data-index={index}
                          onMouseEnter={() => setActive(index)}
                          onClick={() => go(hit)}
                          className={cx(
                            "flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-start",
                            index === active ? "bg-background-secondary-default" : "bg-transparent",
                          )}
                        >
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate text-body-medium text-text-primary">{hit.label}</span>
                            {hit.hint ? (
                              <span className="truncate text-body-2-regular text-text-tertiary">{hit.hint}</span>
                            ) : null}
                          </span>
                          <RiArrowRightLine
                            className={cx(
                              "size-4 shrink-0",
                              index === active ? "text-foreground-icon-secondary" : "text-transparent",
                            )}
                            aria-hidden
                          />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-separator-border px-4 py-2 text-caption-1-regular text-text-tertiary">
                <span className="flex items-center gap-3">
                  <span>↑↓ to navigate</span>
                  <span>↵ to open</span>
                </span>
                <span>esc to close</span>
              </div>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  ));
}
