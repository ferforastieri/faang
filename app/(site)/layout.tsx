import type { ReactNode } from "react";

import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";

/**
 * The public frame: the landing, the catalogue, the docs and the two auth
 * screens share one header and one footer. The app screens (`/chat`,
 * `/dashboard`) live outside this group, with their own full-height shell.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="tp-page">
      <SiteHeader />
      <main className="tp-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
