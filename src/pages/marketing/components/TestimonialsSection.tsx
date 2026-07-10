import { Star } from "lucide-react"
import { SectionHeading } from "../lib/primitives"
import { cn } from "@/lib/utils"

interface Review {
  name: string
  role: string
  gradient: string
  quote: string
}

const REVIEWS: Review[] = [
  { name: "Maya R.", role: "Sneaker buyer", gradient: "from-primary to-violet-500", quote: "Bought $600 of sneakers off Instagram. Escrow meant I actually slept that night." },
  { name: "Dek O.", role: "Camera seller", gradient: "from-emerald-500 to-teal-500", quote: "As a seller I finally know I'll get paid. Shipped same day, funds landed clean." },
  { name: "Priya S.", role: "Watch collector", gradient: "from-amber-500 to-orange-500", quote: "A $2k watch from a Discord stranger. TrustLayer made it feel like buying from a store." },
  { name: "Leon M.", role: "Marketplace flipper", gradient: "from-sky-500 to-blue-500", quote: "I do 10+ deals a week now. Zero chargebacks since I switched to escrow." },
  { name: "Aria K.", role: "GPU buyer", gradient: "from-fuchsia-500 to-pink-500", quote: "Almost got scammed twice before. Now I just refuse to pay without TrustLayer." },
  { name: "Tom B.", role: "Furniture seller", gradient: "from-rose-500 to-red-500", quote: "Buyer confirmed, money released instantly. Smoothest sale I've ever done." },
  { name: "Noor H.", role: "Vinyl trader", gradient: "from-indigo-500 to-purple-500", quote: "Tracking + escrow in one place. My buyers trust me way more now." },
  { name: "Sam W.", role: "Console buyer", gradient: "from-cyan-500 to-sky-500", quote: "Paid for a PS5 on Facebook, held safe till it arrived. Exactly as described." },
]

export function TestimonialsSection() {
  const rowA = REVIEWS.slice(0, 4)
  const rowB = REVIEWS.slice(4)
  return (
    <section className="overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionHeading
          eyebrow="Loved by dealmakers"
          title="Thousands of safe deals, and counting."
          subtitle="From sneakers to watches to GPUs — people trade with strangers every day and walk away happy."
          className="mb-16"
        />
      </div>

      <div className="space-y-6">
        <Marquee reviews={[...rowA, ...rowA]} />
        <Marquee reviews={[...rowB, ...rowB]} reverse />
      </div>
    </section>
  )
}

function Marquee({ reviews, reverse = false }: { reviews: Review[]; reverse?: boolean }) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <div
        className={cn(
          "flex w-max gap-5 hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {reviews.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} review={r} />
        ))}
      </div>
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="w-[340px] shrink-0 rounded-3xl border border-border/70 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg">
      <div className="mb-3 flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>
      <blockquote className="text-[15px] leading-relaxed text-foreground/90">
        “{review.quote}”
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold text-white",
            review.gradient,
          )}
        >
          {review.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}
