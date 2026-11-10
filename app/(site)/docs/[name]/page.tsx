import { notFound } from "next/navigation";

import { DocItemView } from "@/components/application/docs/doc-item-view";
import { readDocItem, readDocsIndex } from "@/components/application/docs/registry-data";

/** Every item is known at build time, so each docs page is static. */
export function generateStaticParams() {
  return readDocsIndex().map((item) => ({ name: item.name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const items = readDocsIndex();
  const item = items.find((entry) => entry.name === name);
  return {
    title: item ? `${item.title} — Faang docs` : "Faang docs",
    description: item?.description,
  };
}

export default async function DocItemPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const item = readDocItem(name);
  if (!item) notFound();
  return <DocItemView item={item} />;
}
