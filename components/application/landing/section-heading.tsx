import type { ReactNode } from "react";

import { cx } from "@/utils/cx";

/** The landing's section opener: a small label, a title, and a lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  className,
  children,
}: {
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
        <span className="text-caption-1-semibold tracking-[0.08em] text-text-tertiary uppercase">
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
