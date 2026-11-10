import type { ReactNode } from "react";

import { cx } from "@/utils/cx";

/** The landing's section opener: a small label, a title, and a lead paragraph. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "start",
  className,
  children,
}: {
  /** Section number, drawn in mono beside the label ("01", "02"...). */
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `center` for sections that read as a single statement. */
  align?: "start" | "center";
  className?: string;
  /** Trailing actions, usually a button pair. */
  children?: ReactNode;
}) {
  return (
    <div
      className={cx(
        "flex w-full flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <span className="flex items-center gap-3 font-mono text-caption-1-medium tracking-[0.14em] text-text-tertiary uppercase">
          {index ? <span className="text-accent-600">{index}</span> : null}
          <span className="h-px w-6 bg-separator-border" aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className="max-w-3xl text-display-3-semibold text-balance text-text-primary">{title}</h2>
      {description ? (
        <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">{description}</p>
      ) : null}
      {children}
    </div>
  );
}
