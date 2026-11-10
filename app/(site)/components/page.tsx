"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { ComponentsCatalog } from "@/components/application/app-shell/components-catalog";

/**
 * The catalogue page. It sits in the public group, so it carries the site's
 * header and footer instead of the app shell — the sidebar belongs to the
 * product, and this page is documentation.
 */
export default function ComponentsPage() {
  const localize = useTemplateCopy();
  return localize((
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col gap-3">
        <p className="flex items-center gap-3 font-mono text-caption-1-medium tracking-[0.14em] text-text-tertiary uppercase">
          <span className="h-px w-8 bg-accent-500" aria-hidden />
          Library
        </p>
        <h1 className="text-display-3-semibold text-balance text-text-primary">
          Components and Blocks
        </h1>
      </div>
      <ComponentsCatalog />
    </div>
  ));
}
