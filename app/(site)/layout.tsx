import type { ReactNode } from "react";

import { LandingCopyProvider } from "@/components/application/landing/landing-copy";
import { SiteFooter } from "@/components/application/landing/site-footer";
import { SiteHeader } from "@/components/application/landing/site-header";

export const dynamic = "force-static";

/**
 * The public pages share one frame: the landing, the catalogue and the two
 * auth screens. Every route in this group gets the same header and footer, so
 * moving between them does not change the navigation under the visitor.
 *
 * The app screens (`/chat`, `/dashboard`) stay outside on purpose: they are
 * full-height workspaces with their own sidebar, and a marketing footer under
 * a 100vh frame would never be reachable.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LandingCopyProvider>
      <div className="flex min-h-dvh w-full flex-col bg-background-full">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </div>
    </LandingCopyProvider>
  );
}
