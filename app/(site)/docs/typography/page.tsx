import { TypographyTokensView } from "@/components/application/docs/tokens-view";

export const metadata = {
  title: "Typography — Faang",
  description: "The composite type utilities the design system ships.",
};

/** The type scale, each style set at its own size. */
export default function TypographyDocsPage() {
  return <TypographyTokensView />;
}
