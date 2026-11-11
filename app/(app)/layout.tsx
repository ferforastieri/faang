import type { ReactNode } from "react";

import { LandingCopyProvider } from "@/components/application/landing/landing-copy";
import { SiteFooter } from "@/components/application/landing/site-footer";
import { SiteHeader } from "@/components/application/landing/site-header";

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
          {/* The workspaces sit in the same 1200px column as every other page:
              the sidebar starts where the site's content starts, and the app
              keeps the same 32px below the header. The page scrolls to reach
              the footer. */}
          <div className="mx-auto flex h-[calc(100dvh-4rem)] min-h-[560px] w-full max-w-[1200px] flex-col px-4 pt-8 pb-8 sm:px-6">
            {children}
          </div>
        </main>
        <SiteFooter />
      </div>
    </LandingCopyProvider>
  );
}
