import * as React from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import {
  Search,
  Tag,
  ShieldCheck,
  DollarSign,
  Truck,
  PartyPopper,
  Check,
  Package,
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

function SceneFound() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Search className="h-6 w-6" />
      </div>
      <div className="w-full rounded-2xl border border-border bg-white p-4 shadow-sm">
        <div className="mb-3 h-28 w-full rounded-xl bg-gradient-to-br from-primary/15 to-violet-400/15" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-foreground">Retro Film Camera</p>
            <p className="text-xs text-muted-foreground">Listed by @stranger_seller</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
            <Tag className="h-3.5 w-3.5" /> $420
          </span>
        </div>
      </div>
      <p className="text-center text-sm font-medium text-muted-foreground">
        Great price. But can you trust them?
      </p>
    </div>
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
