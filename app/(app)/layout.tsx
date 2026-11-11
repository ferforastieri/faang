import type { ReactNode } from "react";

import { LandingCopyProvider } from "@/components/application/landing/landing-copy";
import { SiteFooter } from "@/components/application/landing/site-footer";
import { SiteHeader } from "@/components/application/landing/site-header";

export const dynamic = "force-static";

/**
 * The workspaces: chat and dashboard. They keep the site's header and footer,
 * but not the page scroll — the app inside is exactly one viewport tall (minus
 * the header), so the frame never jumps while a thread streams. The footer sits
 * one scroll below, where every other page has it.
 */
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <LandingCopyProvider>
      <div className="flex min-h-dvh w-full flex-col bg-background-full">
        <SiteHeader />
        <main className="flex flex-1 flex-col">
          {/* The demo is a workspace, not a content page: it takes the full
              width with its own 12px frame, while the documentation stays in
              the 1200px column. The footer sits one scroll below. */}
          <div className="h-[calc(100dvh-4rem)] min-h-[560px] w-full">{children}</div>
        </main>
        <SiteFooter />
      </div>
    </LandingCopyProvider>
  );
}
