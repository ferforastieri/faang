import { ComponentsCatalog } from "@/components/application/app-shell/components-catalog";

export const dynamic = "force-static";

/**
 * The catalogue page. It sits in the public group, so it carries the site's
 * header and footer instead of the app shell — the sidebar belongs to the
 * product, and this page is documentation. The contents column doubles as the
 * page's left rail, so its content starts at the same x as the dashboard's.
 */
export default function ComponentsPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-8 sm:px-6">
      <ComponentsCatalog />
    </div>
  );
}
