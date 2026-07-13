import * as React from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import {
  Search,
  ShieldCheck,
  DollarSign,
  Truck,
  PartyPopper,
  Check,
  Package,
  Heart,
  MapPin,
  ShieldAlert,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

const CHAPTERS = [
  {
    kicker: "Chapter 1",
    title: "You found something online.",
    body: "A pair of sneakers on Instagram. A camera in a Facebook group. The price is great — but the seller is a stranger, and they want the money first.",
  },
  {
    kicker: "Chapter 2",
    title: "You pay. The money is protected.",
    body: "Instead of sending cash into the void, your payment flows into TrustLayer escrow. The seller can see it's funded — but can't touch it yet.",
  },
  {
    kicker: "Chapter 3",
    title: "The seller ships with confidence.",
    body: "Knowing the money is real and waiting, the seller ships right away. You follow the package with live tracking, every step of the way.",
  },
  {
    kicker: "Chapter 4",
    title: "You confirm. Everyone wins.",
    body: "The box arrives, everything checks out, you tap confirm — and the funds release instantly. No scams, no chargebacks, no regrets.",
  },
]

export function ScrollStorySection() {
  const [active, setActive] = React.useState(0)

  return (
    <section className="relative bg-gradient-to-b from-secondary/40 via-background to-background py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-2">
        {/* Sticky visual */}
        <div className="hidden lg:block">
          <div className="sticky top-28 flex h-[560px] items-center justify-center">
            <StoryVisual active={active} />
          </div>
        </div>

        {/* Scrolling chapters */}
        <div className="flex flex-col">
          {CHAPTERS.map((c, i) => (
            <Chapter key={i} index={i} onActive={setActive} isActive={active === i}>
              {/* Inline visual on mobile */}
              <div className="mb-8 flex justify-center lg:hidden">
                <StoryVisual active={i} />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                {c.kicker}
              </span>
              <h3 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
                {c.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </Chapter>
          ))}
        </div>
      </div>
    </section>
  )
}

function Chapter({
  index,
  onActive,
  isActive,
  children,
}: {
  index: number
  onActive: (i: number) => void
  isActive: boolean
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" })

  React.useEffect(() => {
    if (inView) onActive(index)
  }, [inView, index, onActive])

  return (
    <div
      ref={ref}
      className="flex min-h-[70vh] flex-col justify-center lg:min-h-screen"
    >
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.35 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function StoryVisual({ active }: { active: number }) {
  const reduce = useReducedMotion()
  return (
    <div className="relative flex h-[440px] w-full max-w-[400px] items-center justify-center rounded-[32px] border border-border/70 bg-white/80 p-8 shadow-[0_30px_80px_-30px_rgba(37,99,235,0.3)] backdrop-blur-sm">
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-grid-faint opacity-60" />
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: -20, scale: 0.96 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full"
        >
          {active === 0 && <SceneFound />}
          {active === 1 && <SceneProtected />}
          {active === 2 && <SceneShipping />}
          {active === 3 && <SceneComplete />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* --- Chapter 1: marketplace listings that rotate while the chapter is active --- */

const CONDITION_STYLES: Record<string, string> = {
  Excellent: "bg-success/10 text-success",
  "Like New": "bg-primary/10 text-primary",
  Used: "bg-amber-100 text-amber-700",
}

type Listing = {
  title: string
  price: string
  condition: keyof typeof CONDITION_STYLES
  seller: string
  location: string
  posted: string
  favorited: boolean
  market: { name: string; mono: string; badge: string }
  Photo: () => React.JSX.Element
}

const LISTINGS: Listing[] = [
  {
    title: "Retro Film Camera",
    price: "$420",
    condition: "Excellent",
    seller: "@stranger_seller",
    location: "Austin, TX • 5 km away",
    posted: "Posted 2 hours ago",
    favorited: false,
    market: { name: "Facebook Marketplace", mono: "f", badge: "bg-[#1877F2]" },
    Photo: PhotoCamera,
  },
  {
    title: "Air Jordan 1 High OG",
    price: "$185",
    condition: "Like New",
    seller: "@kickz_daily",
    location: "Brooklyn, NY • 3 km away",
    posted: "Recently listed",
    favorited: true,
    market: {
      name: "Instagram",
      mono: "IG",
      badge: "bg-gradient-to-tr from-amber-400 via-pink-500 to-purple-600",
    },
    Photo: PhotoSneaker,
  },
  {
    title: "Acoustic Guitar — Dreadnought",
    price: "$340",
    condition: "Used",
    seller: "@riff_master",
    location: "Nashville, TN • 8 km away",
    posted: "Posted 5 hours ago",
    favorited: false,
    market: { name: "Craigslist", mono: "CL", badge: "bg-violet-700" },
    Photo: PhotoGuitar,
  },
  {
    title: 'MacBook Pro 14"',
    price: "$1,150",
    condition: "Excellent",
    seller: "@deals_now",
    location: "Denver, CO • 2 km away",
    posted: "Posted 1 hour ago",
    favorited: false,
    market: { name: "OfferUp", mono: "OU", badge: "bg-green-500" },
    Photo: PhotoMacBook,
  },
]

function SceneFound() {
  const reduce = useReducedMotion()
  const [idx, setIdx] = React.useState(0)
  const [loaded, setLoaded] = React.useState(false)

  // Shimmer briefly, then reveal the current product photo.
  React.useEffect(() => {
    setLoaded(false)
    const reveal = setTimeout(() => setLoaded(true), reduce ? 0 : 650)
    return () => clearTimeout(reveal)
  }, [idx, reduce])

  // Cycle through different products so it feels like browsing listings.
  React.useEffect(() => {
    if (reduce) return
    const rotate = setInterval(
      () => setIdx((i) => (i + 1) % LISTINGS.length),
      3600,
    )
    return () => clearInterval(rotate)
  }, [reduce])

  const item = LISTINGS[idx]
  const Photo = item.Photo

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search className="h-6 w-6" />
      </div>

      <div className="group w-full overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-18px_rgba(37,99,235,0.45)]">
        {/* Image */}
        <div className="relative h-24 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Photo />
            </motion.div>
          </AnimatePresence>

          {/* Shimmer loading overlay */}
          {!loaded && (
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            </div>
          )}

          {/* Top-left marketplace badge */}
          <span className="absolute left-2 top-2 z-10 rounded-md bg-black/45 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            Marketplace Listing
          </span>

          {/* Top-right favorite */}
          <span className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur-sm">
            <Heart
              className={cn(
                "h-3.5 w-3.5",
                item.favorited
                  ? "fill-red-500 text-red-500"
                  : "text-slate-400",
              )}
            />
          </span>
        </div>

        {/* Content */}
        <div className="p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span
                className={cn(
                  "flex h-4 w-4 items-center justify-center rounded text-[7px] font-black leading-none text-white",
                  item.market.badge,
                )}
              >
                {item.market.mono}
              </span>
              <span className="text-[11px] font-semibold text-foreground/70">
                {item.market.name}
              </span>
            </span>
            <span className="flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
              <Clock className="h-3 w-3" />
              {item.posted}
            </span>
          </div>

          <h4 className="mt-2 text-[15px] font-bold leading-tight text-foreground">
            {item.title}
          </h4>

          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">
              Listed by{" "}
              <span className="font-semibold text-foreground">
                {item.seller}
              </span>
            </span>
            <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wide text-amber-700">
              <ShieldAlert className="h-2.5 w-2.5" />
              Unverified
            </span>
          </div>

          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3 shrink-0" />
            {item.location}
          </div>

          <div className="mt-2.5 flex items-center justify-between border-t border-border/60 pt-2.5">
            <span className="text-xl font-extrabold leading-none text-foreground">
              {item.price}
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                CONDITION_STYLES[item.condition],
              )}
            >
              {item.condition}
            </span>
          </div>
        </div>
      </div>

      <p className="text-center text-sm font-medium text-muted-foreground">
        Great price. But can you trust them?
      </p>
    </div>
  )
}

/* --- Simple inline SVG product photos (no external assets) --- */

function PhotoCamera() {
  return (
    <svg
      viewBox="0 0 240 130"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="camBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eef2ff" />
          <stop offset="1" stopColor="#e0e7ff" />
        </linearGradient>
        <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#475569" />
          <stop offset="1" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="camLens" cx="0.42" cy="0.38" r="0.65">
          <stop offset="0" stopColor="#64748b" />
          <stop offset="0.6" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </radialGradient>
      </defs>
      <rect width="240" height="130" fill="url(#camBg)" />
      <ellipse cx="120" cy="112" rx="72" ry="8" fill="#1e293b" opacity="0.12" />
      <rect x="88" y="32" width="46" height="14" rx="4" fill="#334155" />
      <rect x="52" y="44" width="136" height="62" rx="12" fill="url(#camBody)" />
      <circle cx="120" cy="75" r="27" fill="#0f172a" />
      <circle cx="120" cy="75" r="21" fill="url(#camLens)" />
      <circle cx="120" cy="75" r="10" fill="#0b1220" />
      <circle cx="112" cy="67" r="5" fill="#94a3b8" opacity="0.7" />
      <rect x="60" y="52" width="18" height="11" rx="2" fill="#f8fafc" opacity="0.85" />
      <circle cx="172" cy="56" r="4" fill="#ef4444" />
    </svg>
  )
}

function PhotoSneaker() {
  return (
    <svg
      viewBox="0 0 240 130"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="shoeBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff1f2" />
          <stop offset="1" stopColor="#ffe4e6" />
        </linearGradient>
        <linearGradient id="shoeUp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#shoeBg)" />
      <ellipse cx="120" cy="108" rx="86" ry="8" fill="#0f172a" opacity="0.1" />
      <path
        d="M34 84 C34 66 58 56 88 58 C104 59 112 50 130 48 C156 45 178 58 204 72 C214 77 214 88 202 90 L44 90 C36 90 34 88 34 84 Z"
        fill="url(#shoeUp)"
      />
      <path
        d="M32 90 C30 100 40 104 58 104 L198 104 C210 104 214 94 206 90 Z"
        fill="#ef4444"
      />
      <path
        d="M92 60 C120 66 150 74 188 82"
        stroke="#ef4444"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
        <line x1="70" y1="62" x2="82" y2="72" />
        <line x1="82" y1="60" x2="94" y2="70" />
        <line x1="94" y1="59" x2="106" y2="69" />
      </g>
    </svg>
  )
}

function PhotoGuitar() {
  return (
    <svg
      viewBox="0 0 240 130"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="gtrBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fffbeb" />
          <stop offset="1" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="gtrBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d97706" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#gtrBg)" />
      <ellipse cx="96" cy="112" rx="70" ry="7" fill="#78350f" opacity="0.15" />
      <rect
        x="150"
        y="6"
        width="16"
        height="120"
        rx="6"
        fill="#7c2d12"
        transform="rotate(38 158 66)"
      />
      <rect
        x="196"
        y="8"
        width="24"
        height="20"
        rx="4"
        fill="#78350f"
        transform="rotate(38 208 18)"
      />
      <ellipse cx="86" cy="82" rx="52" ry="40" fill="url(#gtrBody)" />
      <ellipse cx="86" cy="82" rx="42" ry="31" fill="none" stroke="#92400e" strokeWidth="2" opacity="0.5" />
      <circle cx="80" cy="78" r="14" fill="#451a03" />
      <rect x="96" y="96" width="26" height="6" rx="2" fill="#451a03" />
      <g stroke="#fde68a" strokeWidth="1.4" opacity="0.8">
        <line x1="60" y1="60" x2="150" y2="34" />
        <line x1="62" y1="66" x2="152" y2="40" />
        <line x1="64" y1="72" x2="154" y2="46" />
      </g>
    </svg>
  )
}

function PhotoMacBook() {
  return (
    <svg
      viewBox="0 0 240 130"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="mbBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="1" stopColor="#e2e8f0" />
        </linearGradient>
        <linearGradient id="mbScreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1e3a8a" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="240" height="130" fill="url(#mbBg)" />
      <ellipse cx="120" cy="110" rx="92" ry="7" fill="#0f172a" opacity="0.1" />
      <rect x="66" y="24" width="108" height="66" rx="7" fill="#334155" />
      <rect x="72" y="30" width="96" height="54" rx="3" fill="url(#mbScreen)" />
      <rect x="80" y="38" width="46" height="5" rx="2.5" fill="#3b82f6" opacity="0.7" />
      <rect x="80" y="48" width="72" height="4" rx="2" fill="#64748b" opacity="0.6" />
      <rect x="80" y="56" width="60" height="4" rx="2" fill="#64748b" opacity="0.5" />
      <path d="M50 90 L190 90 L206 104 L34 104 Z" fill="#cbd5e1" />
      <path d="M50 90 L190 90 L192 94 L48 94 Z" fill="#94a3b8" />
      <rect x="104" y="96" width="32" height="4" rx="2" fill="#94a3b8" />
    </svg>
  )
}

function SceneProtected() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary text-white shadow-xl shadow-primary/40"
        >
          <ShieldCheck className="h-12 w-12" />
        </motion.div>
        <motion.div
          initial={{ x: -70, y: -50, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: [0, 1, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, times: [0, 0.3, 0.7, 1] }}
          className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-success text-white shadow-lg"
        >
          <DollarSign className="h-4 w-4" strokeWidth={3} />
        </motion.div>
      </div>
      <div className="rounded-full bg-success/10 px-4 py-1.5 text-sm font-bold text-success">
        $420 locked in escrow
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">
        The seller can see it's funded — but can't touch it yet.
      </p>
    </div>
  )
}

function SceneShipping() {
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="relative h-16 w-full">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full border-b-2 border-dashed border-border" />
        <motion.div
          animate={{ left: ["0%", "100%"] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-primary text-white shadow-lg"
        >
          <Truck className="h-6 w-6" />
        </motion.div>
      </div>
      <div className="w-full space-y-2">
        {["Label created", "Picked up", "In transit"].map((t, i) => (
          <div key={t} className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-2.5 shadow-sm">
            <span className={cn("flex h-6 w-6 items-center justify-center rounded-full text-white", i < 2 ? "bg-success" : "bg-primary")}>
              {i < 2 ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Package className="h-3.5 w-3.5" />}
            </span>
            <span className="text-sm font-semibold text-foreground">{t}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SceneComplete() {
  const pieces = Array.from({ length: 12 }, (_, i) => i)
  return (
    <div className="relative flex flex-col items-center gap-5">
      <div className="pointer-events-none absolute inset-x-0 top-0">
        {pieces.map((i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 0, x: 0 }}
            animate={{ opacity: [1, 0], y: -60 - (i % 4) * 20, x: (i - 6) * 18 }}
            transition={{ repeat: Infinity, duration: 1.6, delay: (i % 5) * 0.1 }}
            className="absolute left-1/2 top-16 h-2.5 w-2.5 rounded-[2px]"
            style={{ backgroundColor: ["#2563eb", "#22c55e", "#a855f7", "#f59e0b"][i % 4] }}
          />
        ))}
      </div>
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-success text-white shadow-xl shadow-success/40"
      >
        <PartyPopper className="h-12 w-12" />
      </motion.div>
      <div className="rounded-full bg-success/10 px-4 py-1.5 text-sm font-bold text-success">
        $420 released to seller
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">
        Item confirmed. Everyone paid. Zero fraud.
      </p>
    </div>
  )
}
