"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { useState } from "react";

import { cx } from "@/utils/cx";

/**
 * The install line: a monospace command on a sunken surface with a copy
 * button that confirms in place. Falls back to selecting the text when the
 * clipboard API is unavailable, which is the only case the pitch needs.
 */
export function InstallCommand({
  command,
  className,
  size = "medium",
}: {
  command: string;
  className?: string;
  size?: "medium" | "large";
}) {
  const localize = useTemplateCopy();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the command stays selectable */
    }
  };

  return localize((
    <div
      className={cx(
        "flex w-full items-center justify-between gap-3 rounded-full border border-border-button-default bg-background-secondary-default ps-4 pe-1.5",
        size === "large" ? "h-12" : "h-10",
        className,
      )}
    >
      <code
        className={cx(
          "min-w-0 truncate font-mono text-text-primary select-all",
          size === "large" ? "text-body-medium" : "text-body-2-medium",
        )}
      >
        <span className="text-text-tertiary select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy command"}
        className={cx(
          "flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-body-2-medium",
          "text-text-secondary transition-colors duration-150 ease hover:bg-background-tertiary-default hover:text-text-primary",
          "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
        )}
      >
        {copied ? (
          <RiCheckLine className="size-4 text-foreground-icon-secondary" aria-hidden />
        ) : (
          <RiFileCopyLine className="size-4 text-foreground-icon-secondary" aria-hidden />
        )}
        <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  ));
}
