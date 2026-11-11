"use client";

import { useTemplateCopy } from "@/components/foundations/template-copy/template-copy";

import { TOKENS } from "@/components/application/docs/registry.generated";

/** The two ramps the system is built on, straight from `theme.css`. */
export function ColorTokensView() {
  const localize = useTemplateCopy();
  const ramps: { id: string; title: string; description: string }[] = [
    {
      id: "brand",
      title: "Brand",
      description: "The identity color. Every CTA, selection state and focus ring reads it.",
    },
    {
      id: "danger",
      title: "Danger",
      description: "Destructive actions and error states — a crimson, kept apart from the brand's scarlet.",
    },
  ];

  return localize((
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-4 py-14 sm:px-6 sm:py-20">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-3-semibold text-text-primary">Color</h1>
        <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">
          Two ramps carry the system: the brand and the danger. Everything else is a semantic token
          that points at one of their steps, so retinting the ramps retints the interface.
        </p>
      </header>

      {ramps.map((ramp) => (
        <section key={ramp.id} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-title-2-medium text-text-primary">{ramp.title}</h2>
            <p className="text-body-regular text-text-tertiary">{ramp.description}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-11">
            {(TOKENS.ramps[ramp.id] ?? []).map((tone) => (
              <div key={tone.step} className="flex flex-col gap-1">
                <span
                  className="h-16 w-full rounded-lg border border-separator-border"
                  style={{ backgroundColor: tone.hex }}
                />
                <span className="font-mono text-caption-2-medium text-text-primary">{tone.step}</span>
                <span className="font-mono text-caption-2-regular text-text-tertiary uppercase">{tone.hex}</span>
              </div>
            ))}
          </div>
          <p className="font-mono text-caption-1-regular text-text-tertiary">
            {`--color-${ramp.id}-50 … --color-${ramp.id}-950`}
          </p>
        </section>
      ))}

      <section className="flex flex-col gap-3 border-t border-separator-border pt-6">
        <h2 className="text-title-2-medium text-text-primary">Semantic tokens</h2>
        <p className="max-w-2xl text-body-regular text-text-secondary">
          Components never read a ramp directly. They read tokens such as
          <code className="mx-1 text-text-primary">text-text-primary</code>,
          <code className="mx-1 text-text-primary">bg-background-secondary-default</code> and
          <code className="mx-1 text-text-primary">border-border-button-default</code>, which resolve per
          theme — that is why light and dark need no second stylesheet.
        </p>
      </section>
    </div>
  ));
}

/** The type scale, each style set at its own size. */
export function TypographyTokensView() {
  const localize = useTemplateCopy();
  return localize((
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20">
      <header className="flex flex-col gap-4">
        <h1 className="text-display-3-semibold text-text-primary">Typography</h1>
        <p className="max-w-2xl text-title-3-regular text-pretty text-text-secondary">
          {`${TOKENS.typeScale.length} composite utilities. Each one sets size, line-height, weight and tracking together, so a heading never depends on three classes agreeing.`}
        </p>
      </header>

      <ul className="flex flex-col">
        {TOKENS.typeScale.map((style) => (
          <li
            key={style.name}
            className="grid gap-2 border-t border-separator-border py-5 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8"
          >
            <span
              className="min-w-0 truncate text-text-primary"
              style={{
                fontSize: style.size,
                lineHeight: style.lineHeight,
                fontWeight: style.weight,
                letterSpacing: style.tracking === "0" ? undefined : style.tracking,
              }}
            >
              Almost before we knew it, we had left the ground
            </span>
            <span className="font-mono text-caption-1-regular whitespace-nowrap text-text-tertiary">
              {`${style.name} · ${style.size}/${style.lineHeight} · ${style.weight}`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  ));
}
