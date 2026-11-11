"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";

import type { PreviewHref } from "@/components/application/docs/component-preview-hrefs";

/**
 * Loads a component preview in the browser instead of rendering it on the
 * server.
 *
 * The preview map pulls in every chart, chat and dashboard in the library —
 * tens of components — and the landing renders several of them. When the
 * Worker had to render those on a cold request it ran out of CPU and returned
 * Cloudflare's 1102. The page now ships a skeleton, and the preview arrives
 * after hydration, so the server only renders the surrounding copy.
 */
export function LazyPreview({ href, fallback }: { href: PreviewHref; fallback?: ReactNode }) {
  const [Preview, setPreview] = useState<ComponentType | null>(null);

  useEffect(() => {
    let cancelled = false;
    import("@/components/application/docs/component-previews-free").then((module) => {
      if (cancelled) return;
      const found = module.FREE_COMPONENT_PREVIEWS[href];
      if (found) setPreview(() => found);
    });
    return () => {
      cancelled = true;
    };
  }, [href]);

  if (!Preview) return <>{fallback ?? <PreviewSkeleton />}</>;
  return <Preview />;
}

/** The quiet box a preview leaves behind until it hydrates. */
export function PreviewSkeleton() {
  return (
    <div
      aria-hidden
      className="flex size-full items-center justify-center bg-background-secondary-default"
    >
      <span className="size-2 rounded-full bg-foreground-icon-quaternary" />
    </div>
  );
}
