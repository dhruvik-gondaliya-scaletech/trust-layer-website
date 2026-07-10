import { BRANDS } from "../lib/brands"
import { Reveal } from "../lib/primitives"

export function TrustBanner() {
  // Duplicate the list so the -50% marquee loops seamlessly.
  const row = [...BRANDS, ...BRANDS]

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-10">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mb-7 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Protecting deals from the platforms you already use
          </p>
        </Reveal>

        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
            {row.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span style={{ color: brand.color }}>
                  <brand.Glyph className="h-7 w-7" />
                </span>
                <span className="whitespace-nowrap text-base font-semibold">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
