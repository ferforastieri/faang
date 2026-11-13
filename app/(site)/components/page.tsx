import { CatalogIndex } from "@/components/catalog/catalog-index";

export const metadata = {
  title: "Componentes — Faang",
  description: "O índice dos componentes do Faang UI, por seção, com documentação e prévia.",
};

export default function ComponentsPage() {
  return (
    <div className="tp-shell">
      <CatalogIndex />
    </div>
  );
}
