import { DocsIndexView } from "@/components/application/docs/docs-index-view";
import { readDocsIndex } from "@/components/application/docs/registry-data";

export const metadata = {
  title: "Documentation — Faang",
  description: "Every installable item in the Faang registry, with its files and packages.",
};

/** The documentation index, generated from the same registry the CLI reads. */
export default function DocsPage() {
  return <DocsIndexView items={readDocsIndex()} />;
}
