import { ColorTokensView } from "@/components/application/docs/tokens-view";

export const metadata = {
  title: "Color — Faang",
  description: "The brand and danger ramps, and the semantic tokens built on them.",
};

/** The colour documentation: the two ramps, read from the stylesheet at build. */
export default function ColorDocsPage() {
  return <ColorTokensView />;
}
