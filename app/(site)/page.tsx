import { ALL_ENTRIES } from "@/components/application/docs/components-index";
import { AgentSection } from "@/components/application/landing/agent-section";
import { ComponentShowcase, TemplateShowcase } from "@/components/application/landing/component-showcase";
import { FaqSection, FinalCta } from "@/components/application/landing/faq-section";
import { FeatureSections, ValueRow } from "@/components/application/landing/feature-sections";
import { Hero } from "@/components/application/landing/hero";

/**
 * The landing page. One screen of marketing per section, every visual a live
 * component from this repository rather than a screenshot: the catalogue
 * previews and the chart cards are the same ones the app ships.
 *
 * The header, the footer and the language live in this group's layout, so the
 * catalogue and the auth screens get the same frame.
 */
export default function LandingPage() {
  const total = ALL_ENTRIES.length;

  return (
    <>
      <Hero total={total} />
      <ValueRow />
      <ComponentShowcase total={total} />
      <TemplateShowcase />
      <FeatureSections />
      <FaqSection />
      <AgentSection />
      <FinalCta />
    </>
  );
}
