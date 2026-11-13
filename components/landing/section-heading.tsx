import type { ReactNode } from "react";

/**
 * The landing's section head: a numbered eyebrow, one sentence of title and a
 * paragraph. The number is the same one the old index used, so the page reads
 * as a sequence rather than a pile of blocks.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `tp-heading ${className}` : "tp-heading"}>
      <p className="tp-heading__eyebrow">
        <span className="tp-heading__line" aria-hidden="true" />
        {index} · {eyebrow}
      </p>
      <h2 className="tp-h2">{title}</h2>
      <p className="tp-sub">{description}</p>
      {children ? <div className="tp-heading__actions">{children}</div> : null}
    </div>
  );
}
