import { ALL_ENTRIES } from "@/components/application/docs/components-index";
import { AgentSection } from "@/components/application/landing/agent-section";
import { ComponentShowcase, TemplateShowcase } from "@/components/application/landing/component-showcase";
import { LandingCopyProvider } from "@/components/application/landing/landing-copy";
import { FaqSection, FinalCta } from "@/components/application/landing/faq-section";
import { FeatureSections, ValueRow } from "@/components/application/landing/feature-sections";
import { Hero } from "@/components/application/landing/hero";
import { SiteFooter } from "@/components/application/landing/site-footer";
import { SiteHeader } from "@/components/application/landing/site-header";

/**
 * The landing page. One screen of marketing per section, every visual a live
 * component from this repository rather than a screenshot: the catalogue
 * previews and the chart cards are the same ones the app ships.
 *
 * `LandingCopyProvider` sits above everything so the header, the search and
 * the page itself share one language — and so the copy it translates is the
 * English written in the components, not a second source of truth.
 */
export default function LandingPage() {
  const total = ALL_ENTRIES.length;

  return (
    <LandingCopyProvider>
      <div className="flex min-h-dvh w-full flex-col bg-background-full">
        <SiteHeader />
        <main className="flex w-full flex-col">
          <Hero total={total} />
          <ValueRow />
          <ComponentShowcase total={total} />
          <TemplateShowcase />
          <FeatureSections />
          <FaqSection />
          <AgentSection />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </LandingCopyProvider>
  );
}
