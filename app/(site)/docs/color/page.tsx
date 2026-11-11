import { DocsShell } from "@/components/application/docs/docs-sidebar";
import { readDocsIndex } from "@/components/application/docs/registry-data";
import { ColorTokensView } from "@/components/application/docs/tokens-view";

export const metadata = {
  title: "Color — Faang",
  description: "The brand and danger ramps, and the semantic tokens built on them.",
};

export const dynamic = "force-static";

/** The colour documentation: the two ramps, read from the stylesheet at build. */
export default function ColorDocsPage() {
  return (
    <DocsShell items={readDocsIndex()} current="color">
      <ColorTokensView />
    </DocsShell>
  );
}
