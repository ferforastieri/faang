"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { RiAddLine } from "@remixicon/react";
import { type ReactNode } from "react";
import {
  Button,
  Disclosure,
  DisclosureGroup,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import { cx } from "@/utils/cx";

/**
 * FAQ-style accordion: a stack of rows that open one at a time.
 *
 * React Aria's Disclosure group, so each row is a real button carrying
 * `aria-expanded` / `aria-controls` and the panel is hidden rather than
 * unmounted. The plus rotates into a close mark while the row is open.
 */
export function Accordion({
  items,
  className,
  multiple = false,
}: {
  items: { id: string; question: string; answer: ReactNode }[];
  className?: string;
  /** Let more than one row stay open. Defaults to one, the FAQ behaviour. */
  multiple?: boolean;
}) {
  const localize = useTemplateCopy();
  return localize((
    <DisclosureGroup
      allowsMultipleExpanded={multiple}
      className={cx("flex w-full flex-col border-t border-separator-border", className)}
    >
      {items.map((item) => (
        <Disclosure
          key={item.id}
          id={item.id}
          className="group border-b border-separator-border"
        >
          {({ isExpanded }) => (
            <>
              <Heading level={3} className="m-0">
                <Button
                  slot="trigger"
                  className={cx(
                    "flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-start",
                    "outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-inset",
                  )}
                >
                  <span className="text-title-3-medium text-text-primary">{item.question}</span>
                  <span
                    aria-hidden
                    className={cx(
                      "flex size-8 shrink-0 items-center justify-center rounded-full border border-border-button-default",
                      "text-foreground-icon-secondary transition-transform duration-200 ease",
                      isExpanded ? "rotate-45" : "",
                    )}
                  >
                    <RiAddLine className="size-4" />
                  </span>
                </Button>
              </Heading>
              <DisclosurePanel className="overflow-hidden pb-5">
                <div className="max-w-2xl text-body-regular text-text-secondary">{item.answer}</div>
              </DisclosurePanel>
            </>
          )}
        </Disclosure>
      ))}
    </DisclosureGroup>
  ));
}
