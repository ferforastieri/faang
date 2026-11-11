import { DocsShell } from "@/components/application/docs/docs-sidebar";
import { readDocsIndex } from "@/components/application/docs/registry-data";
import { TypographyTokensView } from "@/components/application/docs/tokens-view";

export const metadata = {
  title: "Typography — Faang",
  description: "The composite type utilities the design system ships.",
};

export const dynamic = "force-static";

/** The type scale, each style set at its own size. */
export default function TypographyDocsPage() {
  return (
    <DocsShell items={readDocsIndex()} current="typography">
      <TypographyTokensView />
    </DocsShell>
  );
}
